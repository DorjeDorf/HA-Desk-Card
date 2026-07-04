import { css } from 'lit';

export const styles = css`
  :host {
    /* Handoff design tokens mapped to Home Assistant theme variables so the
       card follows the active HA theme (light or dark) automatically. */
    --dc-p: var(--primary-color);
    --dc-onp: var(--text-primary-color, #fff);
    --dc-text: var(--primary-text-color);
    --dc-text2: var(--secondary-text-color);
    --dc-divider: var(--divider-color);
    --dc-btn: var(--secondary-background-color);
    --dc-danger: var(--error-color);
    /* Light-theme tint opacities (see :host([dark]) for dark). */
    --dc-track: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    --dc-dangerBg: color-mix(in srgb, var(--error-color) 10%, transparent);
    --dc-accentBg: color-mix(in srgb, var(--primary-color) 13%, transparent);
  }

  :host([dark]) {
    /* Handoff specifies stronger tints in dark mode (otherwise ~36% too dim). */
    --dc-track: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
    --dc-dangerBg: color-mix(in srgb, var(--error-color) 16%, transparent);
    --dc-accentBg: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }

  ha-card {
    overflow: hidden;
    color: var(--dc-text);
    font-family: Roboto, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 14px 10px;
  }
  .icon-badge {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--dc-accentBg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .icon-badge ha-icon {
    color: var(--dc-p);
    --mdc-icon-size: 20px;
  }
  .title-area {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    font-size: 12px;
    margin-top: 1px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--dc-text2);
  }
  .status.moving {
    color: var(--dc-p);
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex: none;
    background: var(--dc-text2);
    opacity: 0.6;
  }
  .status.moving .status-dot {
    background: var(--dc-p);
    opacity: 1;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dc-p) 18%, transparent);
  }
  .status.locked .status-dot {
    background: var(--dc-danger);
    opacity: 1;
  }

  /* Gauge */
  .gauge {
    padding: 2px 16px 14px;
  }
  /* Current-height readout floats above the bar, centered over the fill edge. */
  .gauge-top {
    position: relative;
    height: 34px;
    margin-bottom: 12px;
  }
  .gauge-value {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -1px;
    white-space: nowrap;
    transition: left 0.09s linear;
  }
  .gauge-value .unit {
    font-size: 15px;
    font-weight: 400;
    color: var(--dc-text2);
    margin-left: 4px;
  }
  /* Bar wrapper is the pointer hit area; it's taller than the visible track. */
  .bar {
    position: relative;
    padding: 8px 0;
  }
  .bar.interactive {
    cursor: pointer;
    touch-action: none; /* let drag work without the page scrolling */
  }
  .track {
    height: 8px;
    border-radius: 5px;
    background: var(--dc-track);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: var(--dc-p);
    border-radius: 5px;
    transition: width 0.09s linear;
  }
  .handle {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--dc-p);
    border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    transition: left 0.09s linear;
  }
  .bar.interactive .handle {
    cursor: grab;
  }
  .handle.dragging {
    cursor: grabbing;
    transition: none;
    transform: translate(-50%, -50%) scale(1.15);
  }
  .scale {
    display: flex;
    justify-content: space-between;
    font-size: 10.5px;
    color: var(--dc-text2);
    margin-top: 5px;
  }

  /* Controls row */
  .controls {
    display: flex;
    gap: 12px;
    padding: 0 16px 14px;
    align-items: flex-start;
  }
  .presets {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 8px;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(var(--preset-cols), minmax(0, 1fr));
  }
  /* Preset count drives column layout and row height. 4 presets wrap to a
     2×2 grid (taller); 1–3 sit in a single row. */
  .presets,
  .manual {
    height: var(--preset-h);
  }
  .controls {
    --preset-cols: 1;
    --preset-h: 150px;
  }
  .controls[data-count='2'] {
    --preset-cols: 2;
  }
  .controls[data-count='3'] {
    --preset-cols: 3;
  }
  .controls[data-count='4'] {
    --preset-cols: 2;
    --preset-h: 176px;
  }
  .preset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 6px;
    border-radius: 10px;
    border: 1.5px solid transparent;
    background: var(--dc-btn);
    color: var(--dc-text);
    cursor: pointer;
    overflow: hidden;
    min-height: 0;
    box-sizing: border-box;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s;
  }
  .preset.active {
    border-color: var(--dc-p);
    background: var(--dc-accentBg);
    color: var(--dc-p);
  }
  .preset.disabled {
    opacity: 0.45;
    cursor: default;
  }
  .preset ha-icon {
    --mdc-icon-size: 21px;
  }
  .preset-name {
    font-size: 13.5px;
    font-weight: 500;
    margin-top: 4px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .preset-target {
    font-size: 11px;
    opacity: 0.65;
    margin-top: 1px;
  }

  /* Manual column */
  .manual {
    width: 62px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .manual button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    background: var(--dc-btn);
    color: var(--dc-text);
    transition: background 0.15s;
  }
  .manual button.active {
    background: var(--dc-p);
    color: var(--dc-onp);
  }
  .manual button.stop {
    background: var(--dc-dangerBg);
    color: var(--dc-danger);
  }
  .manual button.disabled {
    opacity: 0.45;
    cursor: default;
  }
  .manual .updown {
    --mdc-icon-size: 32px;
  }
  .manual .stop ha-icon {
    --mdc-icon-size: 22px;
  }

  /* Footer toggles */
  .footer {
    border-top: 1px solid var(--dc-divider);
    padding: 2px 4px;
    display: flex;
    align-items: center;
  }
  .toggle-row {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .toggle-row ha-icon {
    color: var(--dc-text2);
    --mdc-icon-size: 17px;
    margin-right: 9px;
    flex: none;
  }
  .toggle-label {
    flex: 1;
    font-size: 12.5px;
  }
  .toggle {
    position: relative;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    border: 0;
    padding: 0;
    flex: none;
    cursor: pointer;
    background: var(--dc-track);
    transition: background 0.2s;
  }
  .toggle.on {
    background: var(--dc-p);
  }
  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
  }
  .toggle.on .knob {
    transform: translateX(16px);
  }
  .v-divider {
    width: 1px;
    height: 22px;
    background: var(--dc-divider);
    flex: none;
  }
`;
