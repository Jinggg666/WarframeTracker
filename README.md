# Warframe Prime Market Tracker

A local dashboard that pulls live Prime Warframe prices from [warframe.market](https://warframe.market/) and shows the cheapest 3 in-game/online sellers for every set and part.

## Run

```
npm install
npm start
```

Open <http://localhost:3000>.

## How it works

- On startup the server fetches the WFM item catalog and groups every `<Warframe> Prime` item by Warframe. Only entries with all 5 standard parts (Set, Blueprint, Chassis, Neuroptics, Systems) are kept, so weapons/sentinels are excluded automatically.
- A background loop refreshes one item every 500 ms (~2 requests/sec, safely under WFM's rate limit). With ~50 Warframes × ~5 items ≈ 250 endpoints, a full cycle takes ~125 s.
- The Warframe you currently have open in the UI is **prioritised** in the queue — its 5 parts get refreshed first on each pass.
- The frontend polls the backend every 30 s. The UI shows when each item was last refreshed; entries older than 2.5 min turn amber.

## Adding weapons / melees later

The filter that decides what counts as a "Warframe" is in `server.js`:

```js
const PART_NAMES = ['Set', 'Blueprint', 'Chassis', 'Neuroptics', 'Systems'];
```

To support primed weapons, group by a different required-parts set (e.g. `['Set', 'Blueprint', 'Barrel', 'Receiver', 'Stock']` for primary/secondary, or `['Set', 'Blade', 'Handle']` for melee). The frontend already handles arbitrary part keys via `PART_DISPLAY_ORDER` in `public/app.js`.
