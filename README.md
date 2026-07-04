# Standing Desk Control Card

<img src="https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/images/icon.jpeg" align="right" width="120" alt="Standing Desk Control Card icon" />

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![Validate](https://github.com/DorjeDorf/HA-Desk-Card/actions/workflows/validate.yml/badge.svg)](https://github.com/DorjeDorf/HA-Desk-Card/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A Home Assistant custom Lovelace card for motorized sit/stand desks — live height
gauge, entity-bound position presets, manual up/down/stop, and optional child-lock
and alarm toggles. Built with [Lit](https://lit.dev/) and Home Assistant's custom
card API; follows your active HA theme (light/dark) and unit system (metric/imperial).

> Designed around ESPHome desks (e.g. LoctekMotion / Flexispot via the
> [LoctekMotion_IoT](https://github.com/iMicknl/LoctekMotion_IoT) component), but works
> with any integration that exposes a height sensor, a cover, and preset entities.
> Building the firmware is up to you — the card only consumes the resulting entities.

![The Standing Desk Control card](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/card-mid.png)

| Lowered | Raised | Imperial units |
|:---:|:---:|:---:|
| ![Desk lowered](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/card-min.png) | ![Desk raised](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/card-max.png) | ![Imperial units](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/card-imperial.png) |

## Features

- Live height readout with a progress gauge (in your height sensor's own unit — cm, in, mm, …)
- 1–4 position presets, each bound to a real entity — **name and icon come from the
  entity**; set each preset's height in the card; tap a preset to fire it
- Manual raise / lower / stop via a cover entity
- Optional child-lock and alarm toggles (shown only when their entity is set)
- Visual configuration editor with entity pickers — no YAML required
- Theme-aware styling; no light-on-dark mismatch

## Quick start

### Install (HACS)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/DorjeDorf/HA-Desk-Card`,
   category **Dashboard**.
2. Find **Standing Desk Control Card** → **Download**.
3. Reload your browser.

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=DorjeDorf&repository=HA-Desk-Card&category=dashboard)

(Manual install and resource registration: see [docs/installation.md](docs/installation.md).)

### Add the card

Edit a dashboard → **+ Add Card** → search **"Standing Desk Control"**. The visual
editor opens by default, with entities grouped by purpose and heights shown in
your unit system:

| Metric | Imperial |
|:---:|:---:|
| ![Visual editor — metric](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/editor-metric.png) | ![Visual editor — imperial](https://raw.githubusercontent.com/DorjeDorf/HA-Desk-Card/main/screenshots/editor-imperial.png) |

Or paste YAML:

```yaml
type: custom:desk-card
height_sensor: sensor.office_desk_desk_height
cover_entity: cover.office_desk_desk
presets:
  - entity: button.office_desk_sit
  - entity: button.office_desk_stand
```

See [Configuration](docs/configuration.md) for every option and a full example.

## Documentation

- **[Installation](docs/installation.md)** — HACS and manual install, updating
- **[Configuration](docs/configuration.md)** — every option, the preset model, units, examples
- **[Troubleshooting](docs/troubleshooting.md)**

## Development

```bash
npm install      # requires npm >= 11 (see supply-chain note below)
npm run build    # → dist/desk-card.js
npm run dev      # rebuild on change
```

This repo pins a **7-day minimum release age** for dependencies (`.npmrc`
`min-release-age=7`) as supply-chain protection, enforced via `engine-strict` +
`engines.npm >= 11`. Upgrade npm (`npm install -g npm@latest`) before installing.

```
src/                TypeScript source (card, editor, config, actions, styles)
dist/desk-card.js   Compiled card (committed — HACS loads it from the repo)
docs/               End-user documentation
```

The compiled `dist/desk-card.js` is committed to the repo because HACS loads a
plugin's file straight from the repository tree. **After changing anything in
`src/`, run `npm run build` and commit the updated `dist/desk-card.js`** so the
published card matches the source.

## License

MIT — see [LICENSE](LICENSE).
