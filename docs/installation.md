# Installation

## HACS (recommended)

1. Open **HACS** → the **⋮** menu (top right) → **Custom repositories**.
2. Enter `https://github.com/DorjeDorf/HA-Desk-Card` and choose category
   **Dashboard** (formerly "Lovelace"), then **Add**.
3. Find **Standing Desk Control Card** in HACS → **Download**.
4. Reload your browser (a hard refresh, `Ctrl/Cmd + Shift + R`).

HACS registers the dashboard resource for you. Skip to
[Add the card](#add-the-card).

## Manual installation

1. Download `desk-card.js` from the latest [release](../../releases) (or build it
   yourself — see below).
2. Copy it into your Home Assistant config under `www/`, e.g.
   `<config>/www/desk-card.js`. Anything in `www/` is served at `/local/`.
3. Register it as a dashboard resource:
   - **UI:** Settings → Dashboards → **⋮** → **Resources** → **+ Add Resource**
     - URL: `/local/desk-card.js`
     - Type: **JavaScript Module**
     - (If "Resources" is missing, enable **Advanced Mode** in your user profile.)
   - **YAML mode:**
     ```yaml
     resources:
       - url: /local/desk-card.js
         type: module
     ```
4. Hard-refresh the browser.

### Building it yourself

```bash
npm install        # requires npm >= 11 (repo enforces a dependency cooldown)
npm run build      # → dist/desk-card.js
```

Copy `dist/desk-card.js` to `<config>/www/`.

## Add the card

1. Open a dashboard → **Edit** → **+ Add Card**.
2. Search for **Standing Desk Control** and select it.
3. The visual editor opens — assign your entities (see
   [Configuration](configuration.md)).

## Updating

- **HACS:** update from the HACS page, then hard-refresh.
- **Manual:** replace `desk-card.js` in `www/`, then hard-refresh. If the browser
  serves a stale copy, bump the resource URL's version query, e.g.
  `/local/desk-card.js?v=2`.
