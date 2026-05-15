const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const WFM_BASE = 'https://api.warframe.market/v2';
const REQUEST_INTERVAL_MS = 500; // 2 requests/sec, well under WFM's ~3/s rate limit

// Items in a Prime Warframe set on warframe.market: Set + main BP + 3 component BPs.
// The naming convention is `<Warframe> Prime <Component> Blueprint` for components and
// `<Warframe> Prime Blueprint` for the main BP. We detect Warframes by the (prime + warframe) tag pair.
const COMPONENT_LABEL = {
  'Set': 'Set',
  'Blueprint': 'Main Blueprint',
  'Neuroptics Blueprint': 'Neuroptics',
  'Chassis Blueprint': 'Chassis',
  'Systems Blueprint': 'Systems',
  'Wings Blueprint': 'Wings',
  'Harness Blueprint': 'Harness'
};
const PART_DISPLAY_ORDER = ['Set', 'Blueprint', 'Neuroptics Blueprint', 'Chassis Blueprint', 'Systems Blueprint', 'Wings Blueprint', 'Harness Blueprint'];
const REQUIRED_PARTS = ['Set', 'Blueprint', 'Neuroptics Blueprint', 'Chassis Blueprint', 'Systems Blueprint'];

const REQUEST_HEADERS = {
  'Platform': 'pc',
  'Language': 'en',
  'User-Agent': 'WarframeTracker/1.0 (local dashboard)',
  'Accept': 'application/json'
};

let warframes = [];                  // [{name, thumb, parts: {partKey: slug}}]
const cache = new Map();             // slug -> { orders, lastUpdated }
let refreshQueue = [];               // [{ slug, warframeName }]
let priorityWarframe = null;
let priorityExpiresAt = 0;
const PRIORITY_TTL_MS = 60_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wfmFetch(urlPath) {
  const res = await fetch(`${WFM_BASE}${urlPath}`, { headers: REQUEST_HEADERS });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${urlPath}`);
  return res.json();
}

function parsePart(itemName) {
  // Returns { warframeName, partKey } or null
  const m = itemName.match(/^(.+ Prime)(?: (Set|Blueprint|Neuroptics Blueprint|Chassis Blueprint|Systems Blueprint|Wings Blueprint|Harness Blueprint))?$/);
  if (!m) return null;
  const warframeName = m[1];
  const partKey = m[2] || 'Blueprint'; // "<Warframe> Prime" alone shouldn't happen, but fall back to Blueprint
  return { warframeName, partKey };
}

async function buildWarframeList() {
  const json = await wfmFetch('/items');
  const items = json.data || [];
  const grouped = {};
  for (const item of items) {
    if (!item.tags?.includes('prime') || !item.tags?.includes('warframe')) continue;
    const name = item.i18n?.en?.name;
    if (!name) continue;
    const parsed = parsePart(name);
    if (!parsed) continue;
    const { warframeName, partKey } = parsed;
    if (!grouped[warframeName]) grouped[warframeName] = { thumb: null, parts: {} };
    grouped[warframeName].parts[partKey] = item.slug;
    if (partKey === 'Set') grouped[warframeName].thumb = item.i18n.en.thumb;
  }
  warframes = Object.entries(grouped)
    .filter(([, g]) => REQUIRED_PARTS.every((p) => g.parts[p]))
    .map(([name, g]) => ({ name, thumb: g.thumb, parts: g.parts }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function buildRefreshQueue() {
  refreshQueue = [];
  // Sets first so the grid view populates in ~25 s instead of ~120 s.
  for (const wf of warframes) {
    if (wf.parts['Set']) refreshQueue.push({ slug: wf.parts['Set'], warframeName: wf.name });
  }
  for (const wf of warframes) {
    for (const [partKey, slug] of Object.entries(wf.parts)) {
      if (partKey === 'Set') continue;
      refreshQueue.push({ slug, warframeName: wf.name });
    }
  }
}

async function fetchOrders(slug) {
  const json = await wfmFetch(`/orders/item/${slug}`);
  const sellOrders = (json.data || []).filter((o) => o.type === 'sell' && o.user);

  const online = sellOrders
    .filter((o) => o.user.status === 'ingame' || o.user.status === 'online')
    .sort((a, b) => {
      if (a.platinum !== b.platinum) return a.platinum - b.platinum;
      // Tie-breaker: prefer ingame over online
      return (a.user.status === 'ingame' ? 0 : 1) - (b.user.status === 'ingame' ? 0 : 1);
    });

  const offline = sellOrders
    .filter((o) => o.user.status === 'offline')
    .sort((a, b) => a.platinum - b.platinum);

  // Take up to 3 online; if fewer than 3, fill the rest from cheapest offline.
  const picked = online.slice(0, 3);
  if (picked.length < 3) picked.push(...offline.slice(0, 3 - picked.length));

  const orders = picked.map((o) => ({
    ingameName: o.user.ingameName,
    status: o.user.status, // 'ingame' | 'online' | 'offline'
    platinum: o.platinum,
    quantity: o.quantity,
    reputation: o.user.reputation ?? 0
  }));
  return { orders, lastUpdated: Date.now() };
}

function pickNextQueueIndex() {
  if (priorityWarframe && Date.now() < priorityExpiresAt) {
    const idx = refreshQueue.findIndex((q) => q.warframeName === priorityWarframe);
    if (idx >= 0) return idx;
  }
  return 0;
}

async function refreshLoop() {
  while (true) {
    if (refreshQueue.length === 0) {
      await sleep(REQUEST_INTERVAL_MS);
      continue;
    }
    const idx = pickNextQueueIndex();
    const [item] = refreshQueue.splice(idx, 1);
    try {
      const result = await fetchOrders(item.slug);
      cache.set(item.slug, result);
    } catch (err) {
      console.warn(`[refresh] ${item.slug}: ${err.message}`);
    }
    refreshQueue.push(item);
    await sleep(REQUEST_INTERVAL_MS);
  }
}

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (_req, res) => {
  const totalItems = warframes.reduce((n, wf) => n + Object.keys(wf.parts).length, 0);
  let oldest = null;
  for (const v of cache.values()) {
    if (oldest === null || v.lastUpdated < oldest) oldest = v.lastUpdated;
  }
  res.json({
    warframeCount: warframes.length,
    totalItems,
    cached: cache.size,
    fullCycleSeconds: Math.round((totalItems * REQUEST_INTERVAL_MS) / 1000),
    oldestUpdate: oldest,
    priority: priorityWarframe && Date.now() < priorityExpiresAt ? priorityWarframe : null
  });
});

app.get('/api/warframes', (_req, res) => {
  const out = warframes.map((wf) => {
    const setSlug = wf.parts['Set'];
    const setEntry = cache.get(setSlug);
    return {
      name: wf.name,
      thumb: wf.thumb,
      cached: cache.has(setSlug),
      setPrice: setEntry?.orders?.[0]?.platinum ?? null,
      setSellers: setEntry?.orders?.length ?? 0,
      lastUpdated: setEntry?.lastUpdated ?? null
    };
  });
  res.json(out);
});

app.get('/api/warframes/:name', (req, res) => {
  const wf = warframes.find((w) => w.name === req.params.name);
  if (!wf) return res.status(404).json({ error: 'Warframe not found' });

  priorityWarframe = wf.name;
  priorityExpiresAt = Date.now() + PRIORITY_TTL_MS;

  const data = {};
  for (const [partKey, slug] of Object.entries(wf.parts)) {
    const entry = cache.get(slug);
    data[partKey] = {
      label: COMPONENT_LABEL[partKey] || partKey,
      slug,
      orders: entry?.orders ?? [],
      lastUpdated: entry?.lastUpdated ?? null
    };
  }
  const orderedParts = PART_DISPLAY_ORDER.filter((p) => data[p]);
  res.json({ name: wf.name, thumb: wf.thumb, partOrder: orderedParts, data });
});

(async () => {
  console.log('Fetching Warframe Market item catalog (v2)...');
  try {
    await buildWarframeList();
  } catch (err) {
    console.error('Failed to load item catalog:', err.message);
    process.exit(1);
  }
  const totalItems = warframes.reduce((n, wf) => n + Object.keys(wf.parts).length, 0);
  console.log(`Found ${warframes.length} Prime Warframes (${totalItems} tradeable items).`);
  buildRefreshQueue();
  refreshLoop();
  app.listen(PORT, () => {
    const cycleSec = Math.round((totalItems * REQUEST_INTERVAL_MS) / 1000);
    console.log(`Tracker running at http://localhost:${PORT}`);
    console.log(`Full refresh cycle: ~${cycleSec}s (every item re-checked at least this often).`);
  });
})();
