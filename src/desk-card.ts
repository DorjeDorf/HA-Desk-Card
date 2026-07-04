import { LitElement, html, CSSResultGroup, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DeskCardConfig, Preset, DEFAULTS, applyDefaults, validateConfig, createStubConfig } from './desk-card-config';
import { fireEntity, moveCover, toggleEntity, readNumber, setNumber } from './entity-actions';
import { heightUnit, formatHeight } from './units';
import { styles } from './styles';

@customElement('desk-card')
export class DeskCard extends LitElement {
  private _hass: any;

  @state() private _config?: DeskCardConfig;
  @state() private _height: number | null = null;
  // Direction the cover reports it is moving (may be 'none' if the cover doesn't
  // report opening/closing state).
  @state() private _dir: 'up' | 'down' | 'none' = 'none';
  // Direction the user last commanded via the up/down buttons. Latched until
  // they press stop, so the arrow stays highlighted the whole time the desk is
  // moving — a reliable "press stop to halt" cue even when the cover doesn't
  // report motion. Takes precedence over _dir (see _activeDir).
  @state() private _held: 'up' | 'down' | 'none' = 'none';
  @state() private _childLock = false;
  @state() private _alarm = false;
  @state() private _minH = DEFAULTS.min_height;
  @state() private _maxH = DEFAULTS.max_height;
  // Target height while dragging the position bar (and until the desk arrives).
  // null = show the live sensor height. See _shownHeight.
  @state() private _dragValue: number | null = null;
  private _dragging = false;
  // Digest of each preset entity's state, name and icon — read straight off _hass
  // (not reactive) to render the preset buttons, so we request a re-render only
  // when the digest changes. (Height comes from the reactive config, not here.)
  private _presetSig = '';

  // Reflected to the host so styles.ts :host([dark]) can pick dark-mode tints.
  @property({ type: Boolean, reflect: true }) dark = false;

  static get styles(): CSSResultGroup {
    return styles;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('desk-card-editor');
  }

  static getStubConfig(): Partial<DeskCardConfig> {
    return createStubConfig();
  }

  setConfig(config: DeskCardConfig): void {
    const merged = applyDefaults(config);
    const error = validateConfig(merged);
    if (error) throw new Error(error);
    this._config = merged;
  }

  set hass(hass: any) {
    this._hass = hass;
    if (!hass || !this._config) return;
    const c = this._config;

    this._height = readNumber(hass, c.height_sensor);
    // Drop the committed drag target once the desk has reached it (within 1 unit).
    if (this._dragValue !== null && !this._dragging && this._height !== null && Math.abs(this._height - this._dragValue) < 1) {
      this._dragValue = null;
    }

    const cover = hass.states?.[c.cover_entity];
    const st = cover?.state;
    const opening = st === 'opening' || cover?.attributes?.opening;
    const closing = st === 'closing' || cover?.attributes?.closing;
    this._dir = opening ? 'up' : closing ? 'down' : 'none';

    this._childLock = c.child_lock_entity ? hass.states?.[c.child_lock_entity]?.state === 'on' : false;
    this._alarm = c.alarm_entity ? hass.states?.[c.alarm_entity]?.state === 'on' : false;
    this.dark = !!hass.themes?.darkMode;

    // min/max are validated required numbers (min < max) — used as-is.
    this._minH = c.min_height;
    this._maxH = c.max_height;

    const sig = c.presets
      .map((p) => {
        const s = hass.states?.[p.entity];
        const a = s?.attributes;
        return `${p.entity}:${s?.state}:${a?.friendly_name}:${a?.icon}`;
      })
      .join('|');
    if (sig !== this._presetSig) {
      this._presetSig = sig;
      this.requestUpdate();
    }
  }

  get hass(): any {
    return this._hass;
  }

  getCardSize(): number {
    return 5;
  }

  // --- units: follow the height sensor's own unit; no conversion (see units.ts) ---
  private _fmt(value: number): { value: string; unit: string } {
    return { value: formatHeight(value), unit: heightUnit(this._hass, this._config?.height_sensor) };
  }

  // Preset height is set in the card config; entities can't expose one reliably
  // (ESPHome preset buttons have no height attribute). Name and icon still come
  // from the entity — see _presetName and the ha-state-icon in _renderPreset.
  private _presetHeight(p: Preset): number | null {
    return Number.isFinite(p.height) ? (p.height as number) : null;
  }

  private _presetName(p: Preset): string {
    const hass = this._hass;
    let name = hass?.states?.[p.entity]?.attributes?.friendly_name || p.entity || 'Preset';
    // HA composes friendly_name as "<device name> <entity name>" for
    // device-backed entities (e.g. ESPHome "office-desk Run"). Strip the device
    // prefix so the preset reads just its own name.
    const deviceId = hass?.entities?.[p.entity]?.device_id;
    if (deviceId) {
      const device = hass.devices?.[deviceId];
      const deviceName = device?.name_by_user || device?.name;
      if (deviceName && name.startsWith(deviceName + ' ')) {
        name = name.slice(deviceName.length + 1);
      }
    }
    return name;
  }

  // Effective movement direction: the user's latched command wins over the
  // cover's reported state, so the highlight persists until stop is pressed.
  private get _activeDir(): 'up' | 'down' | 'none' {
    return this._held !== 'none' ? this._held : this._dir;
  }

  private get _moving(): boolean {
    return this._activeDir !== 'none';
  }

  private _activePreset(): Preset | undefined {
    if (this._moving || this._height === null || !this._config) return undefined;
    const h = this._height;
    return this._config.presets.find((p) => {
      const ph = this._presetHeight(p);
      return ph !== null && Math.abs(h - ph) < 1;
    });
  }

  // Height to display on the bar: the drag target while setting, else the live
  // sensor reading.
  private get _shownHeight(): number | null {
    return this._dragValue ?? this._height;
  }

  // The bar is draggable only when a settable number entity is configured and
  // the card isn't child-locked.
  private get _interactive(): boolean {
    return !!this._config?.set_height_entity && !this._childLock;
  }

  private _progressPercent(): number {
    const h = this._shownHeight;
    if (h === null) return 0;
    const pct = ((h - this._minH) / (this._maxH - this._minH)) * 100;
    return Math.max(0, Math.min(100, pct));
  }

  private _status(active: Preset | undefined): { text: string; cls: string } {
    if (this._childLock) return { text: 'Locked', cls: 'locked' };
    if (this._activeDir === 'up') return { text: 'Raising…', cls: 'moving' };
    if (this._activeDir === 'down') return { text: 'Lowering…', cls: 'moving' };
    if (this._height === null) return { text: 'Unavailable', cls: '' };
    if (active) return { text: `At ${this._presetName(active)}`, cls: '' };
    return { text: 'Custom', cls: '' };
  }

  protected render() {
    const c = this._config;
    if (!c) return nothing;

    const active = this._activePreset();
    const status = this._status(active);
    const presets = c.presets;
    const hv = this._shownHeight === null ? { value: '—', unit: '' } : this._fmt(this._shownHeight);
    const minv = this._fmt(this._minH);
    const maxv = this._fmt(this._maxH);
    const pct = this._progressPercent();
    // Readout floats over the handle. The inset is asymmetric on purpose: a small
    // left inset lets it sit right over the handle at low values (using the space
    // there), a larger right inset keeps wide readouts clear of the card edge.
    const readoutLeft = `clamp(28px, ${pct}%, calc(100% - 46px))`;

    const showLock = !!c.child_lock_entity;
    const showAlarm = !!c.alarm_entity;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:desk"></ha-icon></div>
          <div class="title-area">
            <div class="title">${c.title}</div>
            <div class="status ${status.cls}">
              <span class="status-dot"></span><span>${status.text}</span>
            </div>
          </div>
        </div>

        <div class="gauge">
          <div class="gauge-top">
            <div class="gauge-value" style="left:${readoutLeft}">${hv.value}<span class="unit">${hv.unit}</span></div>
          </div>
          <div
            class="bar ${this._interactive ? 'interactive' : ''}"
            @pointerdown=${this._onBarDown}
            @pointermove=${this._onBarMove}
            @pointerup=${this._onBarUp}
            @pointercancel=${this._onBarCancel}
          >
            <div class="track"><div class="fill" style="width:${pct}%"></div></div>
            ${this._shownHeight !== null
              ? html`<div class="handle ${this._dragging ? 'dragging' : ''}" style="left:${pct}%"></div>`
              : nothing}
          </div>
          <div class="scale">
            <span>${minv.value} ${minv.unit}</span><span>${maxv.value} ${maxv.unit}</span>
          </div>
        </div>

        <div class="controls" data-count=${presets.length}>
          <div class="presets">
            ${presets.map((p) => this._renderPreset(p, p === active))}
          </div>
          <div class="manual">
            ${this._renderMove('up', 'mdi:chevron-up', 'Raise')}
            <button class="stop" title="Stop" aria-label="Stop" @click=${this._onStop}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
            ${this._renderMove('down', 'mdi:chevron-down', 'Lower')}
          </div>
        </div>

        ${showLock || showAlarm
          ? html`<div class="footer">
              ${showLock
                ? html`<div class="toggle-row">
                    <ha-icon icon=${this._childLock ? 'mdi:lock' : 'mdi:lock-open-variant'}></ha-icon>
                    <span class="toggle-label">Child lock</span>
                    <button
                      class="toggle ${this._childLock ? 'on' : ''}"
                      role="switch"
                      aria-label="Child lock"
                      aria-checked=${this._childLock}
                      @click=${this._onToggleLock}
                    >
                      <span class="knob"></span>
                    </button>
                  </div>`
                : nothing}
              ${showLock && showAlarm ? html`<div class="v-divider"></div>` : nothing}
              ${showAlarm
                ? html`<div class="toggle-row">
                    <ha-icon icon=${this._alarm ? 'mdi:bell-outline' : 'mdi:bell-off-outline'}></ha-icon>
                    <span class="toggle-label">Alarm</span>
                    <button
                      class="toggle ${this._alarm ? 'on' : ''}"
                      role="switch"
                      aria-label="Alarm"
                      aria-checked=${this._alarm}
                      @click=${this._onToggleAlarm}
                    >
                      <span class="knob"></span>
                    </button>
                  </div>`
                : nothing}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _renderPreset(p: Preset, active: boolean) {
    const ph = this._presetHeight(p);
    const cls = `preset ${active ? 'active' : ''} ${this._childLock ? 'disabled' : ''}`;
    const target = ph !== null ? this._fmt(ph) : null;
    return html`
      <button
        class=${cls}
        aria-pressed=${active}
        aria-disabled=${this._childLock}
        @click=${() => this._onPreset(p)}
      >
        <ha-state-icon .hass=${this._hass} .stateObj=${this._hass?.states?.[p.entity]}></ha-state-icon>
        <span class="preset-name">${this._presetName(p)}</span>
        <span class="preset-target">${target ? `${target.value} ${target.unit}` : ''}</span>
      </button>
    `;
  }

  // Manual up/down. Two interaction modes (see the `hold_to_move` config):
  //  - tap-to-move (default): a tap starts motion and latches the highlight; the
  //    desk keeps going until the user taps stop. Keyboard-accessible via click.
  //  - hold-to-move: motion runs only while the button is held (pointer down),
  //    and releasing it stops the desk — for covers that move only while
  //    actively commanded.
  private _renderMove(dir: 'up' | 'down', icon: string, label: string) {
    const cls = `updown ${this._activeDir === dir ? 'active' : ''} ${this._childLock ? 'disabled' : ''}`;
    // Both interaction modes bind the same handlers; each acts only in its mode
    // (tap → click, hold → pointer down/up) so mouse+touch never double-fire.
    return html`
      <button
        class=${cls}
        title=${label}
        aria-label=${label}
        aria-disabled=${this._childLock}
        @click=${() => this._tapMove(dir)}
        @pointerdown=${() => this._holdStart(dir)}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
      >
        <ha-icon icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _onPreset(p: Preset): void {
    if (this._childLock) return;
    fireEntity(this._hass, p.entity);
  }

  // Tap-to-move (default): tap starts motion and latches the highlight until stop.
  private _tapMove(dir: 'up' | 'down'): void {
    if (this._config?.hold_to_move) return; // hold mode drives via pointer events
    this._startMove(dir);
  }

  // Hold-to-move: motion runs only while the button is held.
  private _holdStart(dir: 'up' | 'down'): void {
    if (!this._config?.hold_to_move) return; // tap mode drives via click
    this._startMove(dir);
  }

  private _holdEnd = (): void => {
    if (this._config?.hold_to_move && this._held !== 'none') this._stop();
  };

  private _startMove(dir: 'up' | 'down'): void {
    if (this._childLock) return;
    this._held = dir; // latch the highlight; cleared by stop (or release in hold mode)
    moveCover(this._hass, this._config!.cover_entity, dir);
  }

  private _onStop(): void {
    this._stop();
  }

  private _stop(): void {
    this._held = 'none';
    moveCover(this._hass, this._config!.cover_entity, 'stop');
  }

  // --- draggable position bar (only when set_height_entity is configured) ---

  // Target height (in the sensor's unit) for a pointer x-position, clamped to the
  // configured min/max so the bar can never command outside [min_height, max_height].
  // Rounded to 0.1 so the step is fine in any unit (0.1 cm, 0.1 in, …).
  private _barValue(e: PointerEvent): number {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const frac = rect.width ? (e.clientX - rect.left) / rect.width : 0;
    const clamped = Math.max(0, Math.min(1, frac));
    return Math.round((this._minH + clamped * (this._maxH - this._minH)) * 10) / 10;
  }

  private _onBarDown = (e: PointerEvent): void => {
    if (!this._interactive) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._dragging = true;
    this._dragValue = this._barValue(e);
  };

  private _onBarMove = (e: PointerEvent): void => {
    if (!this._dragging) return;
    this._dragValue = this._barValue(e);
  };

  private _onBarUp = (): void => {
    if (!this._dragging) return;
    this._dragging = false;
    // Commit the target; _dragValue stays as the preview until the desk arrives.
    if (this._dragValue !== null) setNumber(this._hass, this._config!.set_height_entity!, this._dragValue);
  };

  private _onBarCancel = (): void => {
    if (!this._dragging) return;
    this._dragging = false;
    this._dragValue = null; // aborted — revert to the live height
  };

  private _onToggleLock(): void {
    if (this._config?.child_lock_entity) toggleEntity(this._hass, this._config.child_lock_entity);
  }

  private _onToggleAlarm(): void {
    if (this._config?.alarm_entity) toggleEntity(this._hass, this._config.alarm_entity);
  }
}
