# Configuration

The card is configured through the visual editor (recommended) or YAML. Heights
use your **height sensor's own unit** — whatever it reports (cm, in, mm, …). The
card never converts; min/max and preset heights are read and shown in that same
unit (see [Units](#units)).

## Options

| Option | Type | Required | Default | Description |
|--------|------|:--------:|---------|-------------|
| `type` | string | ✓ | — | Must be `custom:desk-card`. |
| `height_sensor` | entity | ✓ | — | Numeric sensor reporting current height. Its unit drives the gauge and every height the card shows. |
| `cover_entity` | entity | ✓ | — | A `cover` entity. Raise = `open_cover`, lower = `close_cover`, stop = `stop_cover`. |
| `set_height_entity` | entity | | — | A `number` entity that sets the desk height. When present, the position bar becomes draggable — tap or drag it to send the desk to a height (`number.set_value`). See [Setting height from the bar](#setting-height-from-the-bar). |
| `hold_to_move` | boolean | | `false` | How the up/down buttons behave. `false` (default): tap to start moving — the arrow stays highlighted and the desk keeps going until you tap **stop**. `true`: press and hold to move; releasing stops the desk (for covers that move only while actively commanded). |
| `presets` | list | ✓ | — | 1–4 presets. Each is `{ entity, height? }`. See [Presets](#presets). |
| `title` | string | | `Standing Desk` | Card header title. |
| `min_height` | number | | `60` | Bottom of the gauge range, in the height sensor's unit. |
| `max_height` | number | | `125` | Top of the gauge range, in the height sensor's unit. |
| `child_lock_entity` | entity | | — | A `switch`/`input_boolean`. Adds a child-lock toggle; when on, presets and up/down are disabled (stop stays live). |
| `alarm_entity` | entity | | — | A `switch`/`input_boolean`. Adds an alarm toggle. |

Invalid configuration (missing required entity, `min_height >= max_height`, 0 or
>4 presets, a preset without an entity) shows an error on the card — check the
fields in the editor.

## Presets

Each preset is bound to a Home Assistant **entity** and is otherwise
self-describing:

- **Name** — the entity's friendly name, with the device-name prefix stripped
  (HA composes it as `<device> <entity>`, so `office-desk Run` shows as `Run`).
- **Icon** — the entity's own icon (whatever the integration provides).
- **Height** — the preset's `height` field (in the sensor's unit), if you set one; otherwise the
  preset has no known height (no target label, no active highlight). Height is
  display + "which preset am I at?" only — the desk moves by firing the entity,
  not by the card driving to a number.

Tapping a preset **fires the entity** using its domain's natural action:

| Entity domain | Action |
|---------------|--------|
| `button`, `input_button` | `press` |
| `automation` | `trigger` |
| `script`, `scene`, `switch`, `input_boolean` | `turn_on` |

`select` / `input_select` and other domains are not supported as presets and are
excluded from the editor's picker.

### Editing presets

In the visual editor, each preset row is: **entity picker**, an optional **height**
box (in the sensor's unit), and a remove button. Add rows with **+ Add preset** (up to 4). The
height is optional — leave it blank and the preset just won't show a target or
highlight; type a number to enable both.

### YAML example

```yaml
type: custom:desk-card
title: Office Desk
height_sensor: sensor.office_desk_desk_height
cover_entity: cover.office_desk_desk
min_height: 62.5
max_height: 125
child_lock_entity: switch.office_desk_child_lock
presets:
  - entity: button.office_desk_sit
    height: 70
  - entity: button.office_desk_stand
    height: 110
  - entity: button.office_desk_run
    height: 120
```

## Setting height from the bar

Set `set_height_entity` to a `number` entity that drives the desk to a value
(e.g. an ESPHome template number), and the position bar becomes interactive:

- A **handle** sits on the bar at the current height, with the reading floating
  above it.
- **Tap** anywhere on the bar to send the desk there, or **drag** the handle for
  fine control — the value previews as you drag and commits on release.
- Targets are clamped to your configured **`min_height`…`max_height`**, so the
  bar can never command a height outside that range.

Without `set_height_entity`, the bar is display-only (the handle still shows the
current position). Dragging is disabled while the child lock is on.

## Units

The card follows the **height sensor's own unit** and never converts. Whatever
`unit_of_measurement` the sensor reports (cm, in, mm, …) is the unit the card
shows — on the gauge value, the min/max scale, and each preset's target — so the
card always agrees with what Home Assistant shows for that sensor.

`min_height`, `max_height`, and each preset `height` are interpreted in that same
unit, so enter them to match your sensor. If the sensor reports no unit, the card
shows the bare number.

## Status line

Under the title, the card shows one of:

- **Locked** — child lock is on (highest priority).
- **Raising… / Lowering…** — the cover reports motion.
- **Unavailable** — the height sensor isn't reporting a number.
- **At \<preset\>** — idle and within 1 unit of a preset's height.
- **Custom** — idle and not at any preset.

## Theming

The card wraps its content in `<ha-card>` and maps every color to a Home Assistant
theme variable, so it matches your dashboard in both light and dark. There is no
`theme` option — HA's active theme drives the card. Three surface tints (gauge
track, stop button, active preset) use slightly stronger opacities in dark mode to
match the original design.
