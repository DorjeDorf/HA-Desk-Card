# Troubleshooting

Open your browser's developer console (F12) — most problems surface there.

## The card won't load / shows "Custom element doesn't exist: desk-card"

- Confirm the dashboard resource points at the file (`/local/desk-card.js`) with
  type **JavaScript Module**.
- Hard-refresh (`Ctrl/Cmd + Shift + R`). If it's still stale, bump the resource
  URL: `/local/desk-card.js?v=2`.
- Manual installs: verify the file is really at `<config>/www/desk-card.js`.

## "Invalid configuration" / card shows an error

`setConfig` rejects invalid config. Check:

- `type` is `custom:desk-card`.
- `height_sensor` and `cover_entity` are set.
- `min_height < max_height`.
- There are **1–4 presets** and **every preset has an entity** (the editor shows
  "Select an entity for this preset" until you pick one).

## The visual editor stays on "Loading editor…" or "Editor failed to load"

The editor uses Home Assistant's built-in form/entity-picker components. If they
don't load, edit the card in **YAML mode** instead (the card works the same). If
you hit this consistently, please open an issue with your HA version.

## Height shows "—" / status reads "Unavailable" / doesn't update

- The card shows `—` and "Unavailable" when the height sensor isn't reporting a
  number. Check `sensor...desk_height` in **Developer Tools → States** — it must
  report a **numeric** value (not `unavailable`/`unknown`).
- The gauge needs `min_height`/`max_height` to bracket the real range.

## Wrong units

The card displays the **height sensor's own unit** (`unit_of_measurement`) and
never converts. If the unit is wrong, fix it on the sensor — set its
`unit_of_measurement` (template/ESPHome sensor), or override it under
**Settings → Devices & Services → Entities → (sensor) → Unit of measurement**.
There is no per-card unit option.

## Preset name shows the device prefix (e.g. "office-desk Run")

The card strips the `<device name> ` prefix from the entity's friendly name using
HA's device registry. If you **renamed the device** so it no longer matches the
entity's friendly-name prefix, the strip won't fire. Either rename consistently, or
open an issue — the matching can be made more lenient.

## A preset doesn't move the desk

- Make sure each preset points at a **distinct** entity. If Sit/Stand/Run all point
  at the same entity, they'll all do the same thing.
- Tap the entity directly in Developer Tools to confirm it moves the desk.
- Supported preset domains: `button`, `input_button`, `automation`, `script`,
  `scene`, `switch`, `input_boolean`. A `select` entity won't work (see
  [Configuration → Presets](configuration.md#presets)).

## Child lock / alarm toggle flips back by itself

Your switch is **momentary** (common on ESPHome LoctekMotion firmware) — it sends a
command and turns itself back off, so the "Locked" state won't persist. The card's
toggle expects a stateful switch. Either leave the entity unset, or point it at a
stateful `input_boolean` (driven by an automation that fires the momentary command)
so the card reflects a persistent state.

## "At \<preset\>" never shows / always "Custom"

The card marks a preset active when the current height is within 1 unit of that
preset's height. Enter a height for each preset in the editor; a preset with
no height can never be "active".
