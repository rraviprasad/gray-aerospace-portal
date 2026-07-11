# Gray Aerospace Portal

Standalone admin portal frontend for Gray Aerospace — React + Vite + Tailwind CSS v4 + Framer Motion.

## Setup
```
npm install
npm run dev
```

## Build
```
npm run build
```

## Structure
- `src/components/TopBar.jsx` — top navigation bar
- `src/components/Dashboard.jsx` — module tile dashboard (10 modules)
- `src/components/BPCodeModule.jsx` — BP Code (Business Partner) module, fully working demo (New/Save/Refresh/Export, city search, data grid)
- `src/data/modules.js` — module list config; only `bp-code` is wired up, rest show "Coming soon"

## Design
Dark "blueprint / avionics HUD" theme — deep navy panels, amber caution accent, cyan data highlights, corner-bracket hover state on cards, monospace type for codes/data (Space Grotesk + Inter + JetBrains Mono).

## Notes
- No backend wired yet — BP Code form saves to local component state only (resets on refresh). Backend (likely Firebase) to be connected later.
- To add a new module screen: create a component in `src/components/`, register it in `screens` map in `App.jsx`, and set `ready: true` for it in `src/data/modules.js`.
