import { LitElement, html, css, nothing, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { DeskCardConfig, Preset } from './desk-card-config';
import { FIRE_DOMAINS } from './entity-actions';
import { heightUnit } from './units';

// Schema is split into labelled sections (see render). Each ha-form owns a
// disjoint set of fields, so their value-changed events merge cleanly into one
// config via _scalarsChanged.
const SCHEMA_GENERAL = [{ name: 'title', selector: { text: {} } }];

// Height-adjustment schema. min/max carry the height sensor's own unit as a
// suffix (no conversion — same value the config stores and the card shows). Step
// is omitted so both whole cm and fractional inches can be entered freely.
const heightSchema = (unit: string) => [
  { name: 'cover_entity', selector: { entity: { domain: 'cover' } } },
  { name: 'height_sensor', selector: { entity: { domain: 'sensor' } } },
  { name: 'set_height_entity', selector: { entity: { domain: 'number' } } },
  { name: 'hold_to_move', selector: { boolean: {} } },
  {
    name: '',
    type: 'grid', // renders min/max side by side
    schema: [
      { name: 'min_height', selector: { number: { mode: 'box', min: 0, unit_of_measurement: unit } } },
      { name: 'max_height', selector: { number: { mode: 'box', min: 0, unit_of_measurement: unit } } },
    ],
  },
];

const SCHEMA_OPTIONAL = [
  { name: 'child_lock_entity', selector: { entity: { domain: ['switch', 'input_boolean'] } } },
  { name: 'alarm_entity', selector: { entity: { domain: ['switch', 'input_boolean'] } } },
];

const LABELS: Record<string, string> = {
  title: 'Title',
  height_sensor: 'Height sensor',
  cover_entity: 'Cover entity',
  set_height_entity: 'Set-height number entity (optional) — enables the draggable bar',
  hold_to_move: 'Hold Raise/Lower to move (release to stop)',
  child_lock_entity: 'Child lock entity (optional)',
  alarm_entity: 'Alarm entity (optional)',
  min_height: 'Minimum height',
  max_height: 'Maximum height',
};

@customElement('desk-card-editor')
export class DeskCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config?: DeskCardConfig;
  @state() private _loaded = false;
  @state() private _error = false;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        width: 100%;
      }
      .msg {
        padding: 16px;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
      .section-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin: 20px 0 8px;
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: -4px 0 10px;
      }
      .preset-row {
        display: flex;
        gap: 8px;
        align-items: center;
        width: 100%;
        margin-bottom: 8px;
      }
      .preset-row ha-entity-picker {
        flex: 1;
        min-width: 0;
      }
      .preset-row .height {
        width: 92px;
        flex: none;
        box-sizing: border-box;
        padding: 10px 8px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 14px;
      }
      .preset-row .height:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .remove {
        border: 0;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        flex: none;
      }
      .remove:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .add {
        width: 100%;
        margin-top: 8px;
        padding: 10px;
        border: 1.5px dashed var(--divider-color);
        border-radius: 10px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font: inherit;
      }
      ha-alert {
        display: block;
        margin: -2px 0 10px;
      }
    `;
  }

  public setConfig(config: DeskCardConfig): void {
    // Skip the HA config-changed echo: if nothing changed, don't reassign
    // _config (keeps ha-form's .data identity stable → no focus loss).
    if (JSON.stringify(config) === JSON.stringify(this._config)) return;
    this._config = config;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this._loaded || this._error) return;
    this._ensureLoaded();
  }

  private async _ensureLoaded(): Promise<void> {
    try {
      const loadHelpers = (window as any).loadCardHelpers;
      if (typeof loadHelpers === 'function') {
        try {
          // Best-effort: load the card-helpers bundle and instantiate a built-in
          // card to prime HA's lazily-registered components. The whenDefined race
          // below is the real gate — this just makes the happy path likelier.
          const helpers = await loadHelpers();
          helpers?.createCardElement?.({ type: 'entities', entities: [] });
        } catch {
          /* non-fatal — components are usually already registered */
        }
      }
      let timer: ReturnType<typeof setTimeout>;
      const timeout = new Promise<boolean>((resolve) => {
        timer = setTimeout(resolve, 3000, false);
      });
      const defined = await Promise.race([
        customElements.whenDefined('ha-entity-picker').then(() => true),
        timeout,
      ]);
      clearTimeout(timer!);
      if (!this.isConnected) return; // dialog closed before we resolved
      this._loaded = defined;
      this._error = !defined;
    } catch {
      if (!this.isConnected) return;
      this._error = true;
    }
  }

  private _computeLabel = (schema: { name: string }): string => LABELS[schema.name] ?? schema.name;

  protected render() {
    if (!this._config) return nothing;
    if (this._error) return html`<div class="msg">Editor failed to load — edit this card in YAML.</div>`;
    if (!this._loaded) return html`<div class="msg">Loading editor…</div>`;

    const presets = this._config.presets ?? [];
    const unit = heightUnit(this.hass, this._config.height_sensor);
    const unitSuffix = unit ? ` (${unit})` : '';
    const form = (schema: unknown) => html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._scalarsChanged}
      ></ha-form>
    `;

    return html`
      <div class="section-label">General</div>
      ${form(SCHEMA_GENERAL)}

      <div class="section-label">Height adjustment</div>
      ${form(heightSchema(unit))}

      <div class="section-label">Presets (1–4)</div>
      <div class="hint">Name and icon come from the entity. Enter each preset's
        target height${unitSuffix} to show its target and highlight it when the desk is there.</div>
      ${presets.map((p, i) => this._renderPresetRow(p, i, presets.length, unit, unitSuffix))}
      ${presets.length < 4
        ? html`<button class="add" @click=${this._addPreset}>+ Add preset</button>`
        : nothing}

      <div class="section-label">Optional features</div>
      ${form(SCHEMA_OPTIONAL)}
    `;
  }

  private _renderPresetRow(p: Preset, i: number, count: number, unit: string, unitSuffix: string) {
    return html`
      <div class="preset-row">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${p.entity}
          .includeDomains=${FIRE_DOMAINS}
          allow-custom-entity
          @value-changed=${(e: any) => this._updateEntity(i, e.detail.value)}
        ></ha-entity-picker>
        <input
          class="height"
          type="number"
          inputmode="decimal"
          placeholder=${unit}
          title=${`Target height${unitSuffix}`}
          .value=${live(p.height != null ? String(p.height) : '')}
          @input=${(e: any) => this._updateHeight(i, e.target.value)}
        />
        <button
          class="remove"
          title="Remove preset"
          ?disabled=${count <= 1}
          @click=${() => this._removePreset(i)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
      ${!p.entity
        ? html`<ha-alert alert-type="warning">Select an entity for this preset</ha-alert>`
        : nothing}
    `;
  }

  private _scalarsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    this._config = { ...this._config, ...(ev.detail.value as Partial<DeskCardConfig>) };
    this._emit();
  }

  private _updateEntity(i: number, value: string): void {
    this._patchPreset(i, (p) => ({ ...p, entity: value }));
  }

  private _updateHeight(i: number, raw: string): void {
    const n = parseFloat((raw ?? '').trim());
    this._patchPreset(i, (p) => {
      const next: Preset = { ...p };
      if (Number.isFinite(n)) next.height = n;
      else delete next.height;
      return next;
    });
  }

  private _patchPreset(i: number, fn: (p: Preset) => Preset): void {
    if (!this._config) return;
    const presets = this._config.presets.map((p, idx) => (idx === i ? fn(p) : p));
    this._config = { ...this._config, presets };
    this._emit();
  }

  private _addPreset(): void {
    if (!this._config || this._config.presets.length >= 4) return;
    const presets = [...this._config.presets, { entity: '' }];
    this._config = { ...this._config, presets };
    this._emit();
  }

  private _removePreset(i: number): void {
    if (!this._config || this._config.presets.length <= 1) return;
    const presets = this._config.presets.filter((_, idx) => idx !== i);
    this._config = { ...this._config, presets };
    this._emit();
  }

  /** Dispatch config-changed — but only when every preset has an entity. */
  private _emit(): void {
    const cfg = this._config;
    if (!cfg) return;
    const incomplete = !cfg.presets?.length || cfg.presets.some((p) => !p.entity);
    if (incomplete) return; // keep local edits visible; wait for a valid config
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config: cfg }, bubbles: true, composed: true })
    );
  }
}
