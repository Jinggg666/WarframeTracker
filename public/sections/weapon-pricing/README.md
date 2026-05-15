# Weapon Pricing · 武器价格

Prime weapons market tracker. Placeholder until wired up.

**To activate:**

1. In `server.js`, add a second catalog group for items tagged `prime + weapon`. Weapon part keys differ from Warframes (`Set`, `Blueprint`, `Barrel`, `Receiver`, `Stock` / `Blade`, `Handle` / etc).
2. Add `/api/weapons` and `/api/weapons/:name` endpoints mirroring the Warframe ones.
3. In `app.js`, duplicate the warframe-pricing render functions for weapons and call them when `activeSection === 'weapon-pricing'`.
4. Expect the full refresh cycle to grow to ~3 min with both pools active.
