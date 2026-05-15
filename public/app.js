const THUMB_BASE = 'https://warframe.market/static/assets/';
const POLL_MS = 30_000;
const STALE_AFTER_MS = 150_000;

// ============ i18n ============
const I18N = {
  en: {
    'brand.title': 'WarframeTracker',
    'brand.sub': 'Prices & guides',
    'nav.warframe.label': 'Warframe Pricing',
    'nav.warframe.sub': 'Prime sets & parts',
    'nav.weapon.label': 'Weapon Pricing',
    'nav.weapon.sub': 'Prime weapons',
    'nav.tutorials': 'Tutorials',
    'nav.gameplay.label': 'Gameplay',
    'nav.gameplay.sub': 'Missions & modes',
    'nav.vweapons.label': 'Vanilla Weapons',
    'nav.vweapons.sub': 'Non-Prime weapons',
    'nav.vwarframes.label': 'Vanilla Warframes',
    'nav.vwarframes.sub': 'Non-Prime frames',
    'nav.materials.label': 'Material Farming',
    'nav.materials.sub': 'Resource grinds',

    'section.warframe.title': 'Warframe Pricing',
    'section.warframe.sub': 'Live cheapest sellers per Prime Warframe set & parts. Click a Warframe to see details on the right.',
    'section.weapon.title': 'Weapon Pricing',
    'section.weapon.sub': 'Prime weapons market tracker.',
    'weapon.placeholder.title': 'Coming soon',
    'weapon.placeholder.body': 'This section will use the same live-pricing UI as Warframes, but for Prime weapons (primary, secondary, melee, archwing). The backend will need a second item filter — prime + weapon tags from warframe.market — and the refresh cycle will lengthen to roughly 3 minutes for full coverage.',

    'section.gameplay.title': 'Gameplay Tutorials',
    'section.gameplay.sub': "Guides for missions, modes, mechanics and everything that isn't gear-specific.",
    'section.gameplay.placeholder': 'Add tutorials in public/sections/gameplay-tutorials/.',
    'section.vweapons.title': 'Vanilla Weapons Tutorials',
    'section.vweapons.sub': 'Build guides, MR fodder lists and recommendations for non-Prime weapons.',
    'section.vweapons.placeholder': 'Add tutorials in public/sections/vanilla-weapons-tutorials/.',
    'section.vwarframes.title': 'Vanilla Warframes',
    'section.vwarframes.sub': 'How to obtain each non-Prime Warframe.',
    'vwf.loading': 'Loading warframe data…',
    'vwf.search.placeholder': 'Search warframes, bosses, locations…',
    'vwf.filter.all': 'All',
    'vwf.filter.boss': 'Boss Drop',
    'vwf.filter.quest': 'Quest',
    'vwf.filter.dojo': 'Dojo',
    'vwf.filter.other': 'Other',
    'vwf.blueprint': 'Blueprint',
    'vwf.components': 'Components',
    'vwf.source': 'Source',
    'section.materials.title': 'Material Farming',
    'section.materials.sub': 'Where and how to farm each crafting resource efficiently.',

    'materials.loading': 'Loading farming guide…',
    'materials.source': 'Source',
    'materials.license': 'License',
    'materials.fetched': 'Fetched',
    'materials.search.placeholder': 'Search resources, nodes, or tips…',
    'materials.filter.all': 'All',
    'materials.tips.heading': 'General Farming Tips',
    'materials.ow.heading': 'Open World Mining & Gems',
    'materials.empyrean.heading': 'Empyrean (Railjack) Resources',
    'materials.ow.ores': 'Ores',
    'materials.ow.gems': 'Gems',
    'materials.ow.extras': 'Extras',

    'rarity.Common': 'Common',
    'rarity.Uncommon': 'Uncommon',
    'rarity.Rare': 'Rare',
    'rarity.Research': 'Research',

    'status.loading': 'Loading...',
    'status.error': 'Error loading data',
    'status.summary': '{n} Prime Warframes · {c}/{t} cached · full cycle ~{cycle}',
    'card.set': 'p · set',
    'card.no_sellers': 'no sellers',
    'card.loading': 'loading…',
    'card.fetching': 'fetching…',
    'time.never': 'never',
    'time.ago.s': '{n}s ago',
    'time.ago.m': '{m}m {s}s ago',
    'time.ago.h': '{n}h ago',

    'detail.close': '← Close',
    'detail.hint': 'Top 3 sellers (online preferred, offline as fallback) · refreshing every 30 s',
    'detail.no_sellers': 'No sellers found.',
    'detail.loading_sellers': 'Loading sellers…',
    'seller.ingame': 'In-game',
    'seller.online': 'Online',
    'seller.offline': 'Offline',
    'button.copy': 'Copy',
    'button.copied': 'Copied',
    'toast.copied': 'Whisper copied — paste into Warframe chat',
    'toast.copy_failed': 'Copy failed — clipboard blocked',

    'lang.toggle': '中文'
  },

  zh: {
    'brand.title': 'WF维基',
    'brand.sub': '价格与教程',
    'nav.warframe.label': '战甲价格',
    'nav.warframe.sub': 'P套与部件',
    'nav.weapon.label': '武器价格',
    'nav.weapon.sub': 'P武器',
    'nav.tutorials': '教程',
    'nav.gameplay.label': '游戏玩法',
    'nav.gameplay.sub': '任务与模式',
    'nav.vweapons.label': '原版武器',
    'nav.vweapons.sub': '非P武器',
    'nav.vwarframes.label': '原版战甲',
    'nav.vwarframes.sub': '非P战甲',
    'nav.materials.label': '材料刷取',
    'nav.materials.sub': '资源刷法',

    'section.warframe.title': '战甲价格',
    'section.warframe.sub': '显示每个P战甲套装和部件的最低价卖家。点击战甲在右侧查看详情。',
    'section.weapon.title': '武器价格',
    'section.weapon.sub': 'P武器市场追踪。',
    'weapon.placeholder.title': '即将推出',
    'weapon.placeholder.body': '此区域将与战甲价格使用相同的实时报价界面，只是针对P武器（主武器、副武器、近战、飞翼）。后端需要增加第二个物品筛选（warframe.market 的 prime + weapon 标签），刷新周期会延长到约3分钟以覆盖所有物品。',

    'section.gameplay.title': '游戏玩法教程',
    'section.gameplay.sub': '关于任务、模式、机制等非装备相关的攻略。',
    'section.gameplay.placeholder': '把教程放在 public/sections/gameplay-tutorials/ 中。',
    'section.vweapons.title': '原版武器教程',
    'section.vweapons.sub': '非P武器的配装教程、MR水货清单与推荐。',
    'section.vweapons.placeholder': '把教程放在 public/sections/vanilla-weapons-tutorials/ 中。',
    'section.vwarframes.title': '原版战甲',
    'section.vwarframes.sub': '每个非P战甲的获取途径。',
    'vwf.loading': '加载战甲数据中…',
    'vwf.search.placeholder': '搜索战甲、Boss、地点…',
    'vwf.filter.all': '全部',
    'vwf.filter.boss': 'Boss掉落',
    'vwf.filter.quest': '任务解锁',
    'vwf.filter.dojo': '道场研究',
    'vwf.filter.other': '其他',
    'vwf.blueprint': '主蓝图',
    'vwf.components': '部件蓝图',
    'vwf.source': '数据来源',
    'section.materials.title': '材料刷取',
    'section.materials.sub': '每种制造材料的高效刷取地点与方法。',

    'materials.loading': '加载刷取攻略中…',
    'materials.source': '来源',
    'materials.license': '许可证',
    'materials.fetched': '抓取于',
    'materials.search.placeholder': '搜索材料、节点或技巧…',
    'materials.filter.all': '全部',
    'materials.tips.heading': '通用刷取技巧',
    'materials.ow.heading': '开放世界采矿与宝石',
    'materials.empyrean.heading': '虚空领航器资源',
    'materials.ow.ores': '矿石',
    'materials.ow.gems': '宝石',
    'materials.ow.extras': '其他',

    'rarity.Common': '普通',
    'rarity.Uncommon': '罕见',
    'rarity.Rare': '稀有',
    'rarity.Research': '研究',

    'status.loading': '加载中...',
    'status.error': '加载数据失败',
    'status.summary': '{n} 个P战甲 · 已缓存 {c}/{t} · 完整周期约 {cycle}',
    'card.set': '白金 · 套装',
    'card.no_sellers': '无卖家',
    'card.loading': '加载中…',
    'card.fetching': '获取中…',
    'time.never': '从未',
    'time.ago.s': '{n}秒前',
    'time.ago.m': '{m}分{s}秒前',
    'time.ago.h': '{n}小时前',

    'detail.close': '← 关闭',
    'detail.hint': '前3名最低价卖家（优先在线，离线作为备选）· 每30秒刷新',
    'detail.no_sellers': '暂无卖家。',
    'detail.loading_sellers': '正在加载卖家…',
    'seller.ingame': '游戏中',
    'seller.online': '在线',
    'seller.offline': '离线',
    'button.copy': '复制',
    'button.copied': '已复制',
    'toast.copied': '密语已复制 — 粘贴到游戏聊天框',
    'toast.copy_failed': '复制失败 — 剪贴板被禁用',

    'lang.toggle': 'EN'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key, params) {
  let s = I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, v);
  }
  return s;
}

function applyStaticTranslations() {
  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }
  document.documentElement.lang = currentLang === 'zh' ? 'zh' : 'en';
  document.title = t('brand.title');
}

// ============ Elements ============
const els = {
  navButtons: document.querySelectorAll('.nav-btn'),
  sections: document.querySelectorAll('.section'),
  layout: document.getElementById('layout'),
  grid: document.getElementById('grid'),
  detail: document.getElementById('detail'),
  status: document.getElementById('status'),
  toast: document.getElementById('toast'),
  langToggle: document.getElementById('lang-toggle')
};

let activeSection = 'warframe-pricing';
let warframes = [];
let lastStatus = null;
let selectedName = null;
let lastDetailData = null;
let detailPollHandle = null;
let gridPollHandle = null;
let toastTimer = null;
let materialFarmingData = null;
let vanillaWarframesData = null;
let warframeBios = {};

// ============ Nav ============
for (const btn of els.navButtons) {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
}

function showSection(name) {
  activeSection = name;
  for (const sec of els.sections) {
    const isActive = sec.id === `section-${name}`;
    sec.classList.toggle('is-active', isActive);
    sec.hidden = !isActive;
  }
  for (const btn of els.navButtons) {
    btn.classList.toggle('is-active', btn.dataset.section === name);
  }
  if (name === 'warframe-pricing') {
    if (!gridPollHandle) gridPollHandle = setInterval(loadGrid, POLL_MS);
    loadGrid();
  } else {
    if (gridPollHandle) { clearInterval(gridPollHandle); gridPollHandle = null; }
    if (detailPollHandle) { clearInterval(detailPollHandle); detailPollHandle = null; }
  }
  if (name === 'material-farming-tutorials') loadMaterialFarming();
  if (name === 'vanilla-warframes-tutorials') loadVanillaWarframes();
}

// ============ Language Toggle ============
els.langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('lang', currentLang);
  applyLanguageEverywhere();
});

function applyLanguageEverywhere() {
  applyStaticTranslations();
  els.langToggle.textContent = t('lang.toggle');
  if (lastStatus) renderStatus(lastStatus);
  renderGrid();
  if (lastDetailData) renderDetail(lastDetailData);
  if (activeSection === 'material-farming-tutorials' && materialFarmingData) {
    renderMaterialFarming(materialFarmingData, document.getElementById('mf-content'));
  }
}

// ============ Utils ============
function timeAgo(ts) {
  if (!ts) return t('time.never');
  const sec = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (sec < 60) return t('time.ago.s', { n: sec });
  if (sec < 3600) return t('time.ago.m', { m: Math.floor(sec / 60), s: sec % 60 });
  return t('time.ago.h', { n: Math.floor(sec / 3600) });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
const escapeAttr = escapeHtml;

// ============ Warframe Pricing ============
async function loadWarframeBios() {
  try {
    const res = await fetch('/sections/warframe-pricing/bios.json');
    if (res.ok) warframeBios = await res.json();
  } catch (_) {}
}

async function loadGrid() {
  try {
    const [wfRes, statusRes] = await Promise.all([
      fetch('/api/warframes'),
      fetch('/api/status')
    ]);
    warframes = await wfRes.json();
    lastStatus = await statusRes.json();
    renderStatus(lastStatus);
    renderGrid();
  } catch (err) {
    els.status.textContent = t('status.error');
    console.error(err);
  }
}

function renderStatus(s) {
  const cycleMin = Math.floor(s.fullCycleSeconds / 60);
  const cycleSec = s.fullCycleSeconds % 60;
  const cycleStr = cycleMin ? `${cycleMin}m ${cycleSec}s` : `${cycleSec}s`;
  const summary = t('status.summary', { n: s.warframeCount, c: s.cached, t: s.totalItems, cycle: cycleStr });
  els.status.innerHTML = `<span class="pulse"></span>${summary}`;
}

function renderGrid() {
  els.grid.innerHTML = warframes.map((wf) => {
    const isSelected = wf.name === selectedName;
    let priceHtml, updatedClass = '', updatedText = '';
    if (!wf.cached) {
      priceHtml = `<span class="label">${t('card.loading')}</span>`;
      updatedClass = 'loading';
      updatedText = t('card.fetching');
    } else if (wf.setPrice == null) {
      priceHtml = `<span class="label">${t('card.no_sellers')}</span>`;
      updatedText = timeAgo(wf.lastUpdated);
    } else {
      priceHtml = `${wf.setPrice}<span class="label">${t('card.set')}</span>`;
      updatedText = timeAgo(wf.lastUpdated);
      if (wf.lastUpdated && (Date.now() - wf.lastUpdated > STALE_AFTER_MS)) updatedClass = 'stale';
    }
    return `
      <div class="card ${isSelected ? 'is-selected' : ''}" data-name="${escapeAttr(wf.name)}">
        <div class="card-thumb">
          <img src="${THUMB_BASE}${escapeAttr(wf.thumb)}" alt="${escapeAttr(wf.name)}" loading="lazy">
        </div>
        <div class="card-name">${escapeHtml(wf.name)}</div>
        <div class="card-price">${priceHtml}</div>
        <div class="card-updated ${updatedClass}">${updatedText}</div>
      </div>
    `;
  }).join('');
  for (const card of els.grid.querySelectorAll('.card')) {
    card.addEventListener('click', () => openDetail(card.dataset.name));
  }
}

async function loadDetail(name) {
  try {
    const [detailRes, statusRes] = await Promise.all([
      fetch(`/api/warframes/${encodeURIComponent(name)}`),
      fetch('/api/status')
    ]);
    if (!detailRes.ok) throw new Error(`${detailRes.status}`);
    const data = await detailRes.json();
    if (selectedName === name) {
      lastDetailData = data;
      renderDetail(data);
    }
    lastStatus = await statusRes.json();
    renderStatus(lastStatus);
  } catch (err) {
    console.error(err);
  }
}

function buildWhisper(seller, warframeName, partKey) {
  const itemName = `${warframeName} ${partKey}`;
  return `/w ${seller.ingameName} Hi! I want to buy: "${itemName}" for ${seller.platinum} platinum.`;
}

function renderDetail(data) {
  const partsHtml = data.partOrder.map((partKey) => {
    const part = data.data[partKey];
    const hasData = part.lastUpdated != null;
    const stale = hasData && (Date.now() - part.lastUpdated > STALE_AFTER_MS);
    const updatedClass = !hasData ? 'loading' : (stale ? 'stale' : '');
    const updatedText = !hasData ? t('card.fetching') : timeAgo(part.lastUpdated);
    let rows;
    if (!hasData) {
      rows = `<div class="empty">${t('detail.loading_sellers')}</div>`;
    } else if (part.orders.length === 0) {
      rows = `<div class="empty">${t('detail.no_sellers')}</div>`;
    } else {
      rows = part.orders.map((o) => {
        const whisper = buildWhisper(o, data.name, partKey);
        const isOffline = o.status === 'offline';
        const statusLabel = o.status === 'ingame' ? t('seller.ingame') : o.status === 'online' ? t('seller.online') : t('seller.offline');
        return `
          <div class="seller-row ${isOffline ? 'is-offline' : ''}">
            <span class="seller-name" title="${escapeAttr(o.ingameName)}">${escapeHtml(o.ingameName)}</span>
            <span class="seller-status status-${escapeAttr(o.status)}">${escapeHtml(statusLabel)}</span>
            <span class="seller-qty">×${o.quantity}</span>
            <span class="seller-price">${o.platinum}p</span>
            <button class="copy-btn" type="button" data-whisper="${escapeAttr(whisper)}" title="${escapeAttr(whisper)}">${t('button.copy')}</button>
          </div>
        `;
      }).join('');
    }
    return `
      <div class="part-block">
        <div class="part-title">
          <span class="name">${escapeHtml(part.label)}</span>
          <span class="updated ${updatedClass}">${updatedText}</span>
        </div>
        ${rows}
      </div>
    `;
  }).join('');

  const bio = warframeBios[data.name];
  const bioText = bio ? (currentLang === 'zh' ? bio.zh : bio.en) : '';
  const bioHtml = bioText ? `<p class="detail-bio">${escapeHtml(bioText)}</p>` : '';

  els.detail.innerHTML = `
    <button class="detail-back" type="button" data-back>${t('detail.close')}</button>
    <div class="detail-header">
      <img src="${THUMB_BASE}${escapeAttr(data.thumb)}" alt="${escapeAttr(data.name)}">
      <div>
        <h3>${escapeHtml(data.name)}</h3>
        <div class="hint">${t('detail.hint')}</div>
      </div>
    </div>
    ${bioHtml}
    <div class="parts">${partsHtml}</div>
  `;
  els.detail.querySelector('[data-back]').addEventListener('click', closeDetail);
  for (const btn of els.detail.querySelectorAll('.copy-btn')) {
    btn.addEventListener('click', () => copyWhisper(btn));
  }
}

async function copyWhisper(btn) {
  const text = btn.dataset.whisper;
  try {
    await navigator.clipboard.writeText(text);
    btn.classList.add('copied');
    btn.textContent = t('button.copied');
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = t('button.copy');
    }, 1500);
    showToast(t('toast.copied'));
  } catch (err) {
    showToast(t('toast.copy_failed'));
    console.error(err);
  }
}

function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.hidden = false;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 2200);
}

function openDetail(name) {
  selectedName = name;
  els.detail.hidden = false;
  els.layout.classList.add('layout--split');
  els.detail.innerHTML = `<div class="empty">${t('detail.loading_sellers')}</div>`;
  renderGrid();
  loadDetail(name);
  if (detailPollHandle) clearInterval(detailPollHandle);
  detailPollHandle = setInterval(() => loadDetail(name), POLL_MS);
}

function closeDetail() {
  selectedName = null;
  lastDetailData = null;
  els.detail.hidden = true;
  els.layout.classList.remove('layout--split');
  if (detailPollHandle) { clearInterval(detailPollHandle); detailPollHandle = null; }
  renderGrid();
}

// ============ Vanilla Warframes ============
const VWF_IMAGE_BASE = 'https://wiki.warframe.com/w/Special:FilePath/';

const ACQUIRE_TYPE_COLOR = {
  'boss':  { bg: 'rgba(224,179,74,0.12)',  fg: '#e0b34a' },
  'quest': { bg: 'rgba(74,177,255,0.12)',  fg: '#4ab1ff' },
  'dojo':  { bg: 'rgba(192,132,252,0.12)', fg: '#c084fc' },
  'other': { bg: 'rgba(140,151,170,0.12)', fg: '#8c97aa' }
};

async function loadVanillaWarframes() {
  const container = document.getElementById('vwf-content');
  if (vanillaWarframesData) { renderVanillaWarframes(vanillaWarframesData, container); return; }
  try {
    const res = await fetch('/sections/vanilla-warframes-tutorials/warframes.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    vanillaWarframesData = await res.json();
    renderVanillaWarframes(vanillaWarframesData, container);
  } catch (err) {
    container.innerHTML = `<div class="placeholder"><h3>Couldn't load data</h3><p>${escapeHtml(err.message)}</p></div>`;
  }
}

function renderVanillaWarframes(data, container) {
  const warframes = data.warframes || data;
  const source = data.source || null;

  const sourceHtml = source
    ? `<div class="mf-source">${t('vwf.source')}: <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.name)}</a></div>`
    : '';

  const filterTypes = ['boss', 'quest', 'dojo', 'other'];
  const filterBtnsHtml = filterTypes.map(type => {
    const c = ACQUIRE_TYPE_COLOR[type];
    return `<button class="mf-filter-btn vwf-filter-btn" data-type="${escapeAttr(type)}">${escapeHtml(t('vwf.filter.' + type))}</button>`;
  }).join('');

  const cardsHtml = warframes.map(wf => renderVanillaWarframeCard(wf)).join('');

  container.innerHTML = `
    ${sourceHtml}
    <div class="mf-search">
      <input type="text" id="vwf-search-input" placeholder="${escapeAttr(t('vwf.search.placeholder'))}" autocomplete="off">
      <div class="mf-filter">
        <button class="mf-filter-btn is-active" data-type="">${escapeHtml(t('vwf.filter.all'))}</button>
        ${filterBtnsHtml}
      </div>
    </div>
    <div id="vwf-grid" class="vwf-grid">${cardsHtml}</div>
  `;

  const searchInput = container.querySelector('#vwf-search-input');
  const filterBtns = container.querySelectorAll('.mf-filter-btn');
  let activeType = '';
  let searchTerm = '';

  function applyFilters() {
    const term = searchTerm.toLowerCase();
    for (const card of container.querySelectorAll('.vwf-card')) {
      const matchSearch = !term || card.dataset.search.includes(term);
      const matchType = !activeType || card.dataset.type === activeType;
      card.hidden = !(matchSearch && matchType);
    }
  }

  searchInput.addEventListener('input', () => { searchTerm = searchInput.value; applyFilters(); });
  for (const btn of filterBtns) {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type;
      for (const b of filterBtns) b.classList.toggle('is-active', b === btn);
      applyFilters();
    });
  }
}

function renderVanillaWarframeCard(wf) {
  const name = pick(wf.nameZh, wf.name);
  const blueprint = pick(wf.blueprintSourceZh, wf.blueprintSource) || '';
  const components = pick(wf.componentSourceZh, wf.componentSource) || '';
  const notes = pick(wf.notesZh, wf.notes) || '';
  const type = wf.acquireType || 'other';
  const color = ACQUIRE_TYPE_COLOR[type] || ACQUIRE_TYPE_COLOR['other'];
  const badge = t('vwf.filter.' + type);
  const imgUrl = wf.image ? `${VWF_IMAGE_BASE}${escapeAttr(wf.image)}` : '';
  const imgHtml = imgUrl
    ? `<img class="vwf-card-img" src="${imgUrl}" alt="${escapeAttr(wf.name)}" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="vwf-card-img vwf-card-img--placeholder"></div>`;
  const searchBlob = `${wf.name} ${wf.nameZh || ''} ${wf.blueprintSource || ''} ${wf.componentSource || ''} ${wf.boss || ''} ${wf.bossZh || ''} ${wf.notes || ''}`.toLowerCase();

  return `
    <div class="vwf-card" data-type="${escapeAttr(type)}" data-search="${escapeAttr(searchBlob)}">
      <div class="vwf-card-head">
        ${imgHtml}
        <div class="vwf-card-title">
          <div class="vwf-card-name">${escapeHtml(name)}</div>
          <span class="mf-tier-badge" style="background:${color.bg};color:${color.fg}">${escapeHtml(badge)}</span>
        </div>
      </div>
      ${blueprint ? `<div class="vwf-row"><span class="vwf-label">${t('vwf.blueprint')}</span><span>${escapeHtml(blueprint)}</span></div>` : ''}
      ${components ? `<div class="vwf-row"><span class="vwf-label">${t('vwf.components')}</span><span>${escapeHtml(components)}</span></div>` : ''}
      ${notes ? `<div class="vwf-notes">${escapeHtml(notes)}</div>` : ''}
    </div>
  `;
}

// ============ Material Farming ============
const RARITY_ORDER = ['Common', 'Uncommon', 'Rare', 'Research'];
const RARITY_COLOR = {
  'Common':   '#a3a8b4',
  'Uncommon': '#4ab1ff',
  'Rare':     '#e0b34a',
  'Research': '#c084fc'
};

async function loadMaterialFarming() {
  const container = document.getElementById('mf-content');
  if (materialFarmingData) {
    renderMaterialFarming(materialFarmingData, container);
    return;
  }
  try {
    const res = await fetch('/sections/material-farming-tutorials/resources.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    materialFarmingData = await res.json();
    renderMaterialFarming(materialFarmingData, container);
  } catch (err) {
    container.innerHTML = `<div class="placeholder"><h3>Couldn't load resources</h3><p>${escapeHtml(err.message)}</p></div>`;
  }
}

function pick(zh, en) { return currentLang === 'zh' && zh ? zh : en; }

function renderMaterialFarming(d, container) {
  const grouped = {};
  for (const r of d.resources) (grouped[r.rarity] = grouped[r.rarity] || []).push(r);

  const tipsHtml = d.generalTips.map(tip => `
    <div class="mf-tip">
      <div class="mf-tip-title">${escapeHtml(pick(tip.titleZh, tip.title))}</div>
      <div class="mf-tip-body">${escapeHtml(pick(tip.bodyZh, tip.body))}</div>
    </div>
  `).join('');

  const rarityGroupsHtml = RARITY_ORDER.map(rarity => {
    const list = grouped[rarity];
    if (!list || !list.length) return '';
    const cards = list.map(r => renderResourceCard(r, d.imageBase)).join('');
    return `
      <div class="mf-group" data-rarity="${escapeAttr(rarity)}">
        <h3 class="mf-group-title">
          <span class="mf-tier-badge" style="background:${RARITY_COLOR[rarity] || '#888'}1f;color:${RARITY_COLOR[rarity] || '#fff'}">${escapeHtml(t('rarity.' + rarity))}</span>
          <span class="mf-group-count">${list.length}</span>
        </h3>
        <div class="mf-resource-grid">${cards}</div>
      </div>
    `;
  }).join('');

  const openWorldHtml = d.openWorld.map(ow => `
    <div class="mf-ow-block">
      <div class="mf-ow-title">${escapeHtml(pick(ow.regionZh, ow.region))}</div>
      ${ow.ores ? `<div class="mf-ow-row"><span class="mf-ow-label">${t('materials.ow.ores')}</span> ${ow.ores.map(o => renderResourceTag(o, d.imageBase)).join('')}</div>` : ''}
      ${ow.gems ? `<div class="mf-ow-row"><span class="mf-ow-label">${t('materials.ow.gems')}</span> ${ow.gems.map(o => renderResourceTag(o, d.imageBase)).join('')}</div>` : ''}
      ${ow.extras ? `<div class="mf-ow-row"><span class="mf-ow-label">${t('materials.ow.extras')}</span> ${ow.extras.map(o => renderResourceTag(o, d.imageBase)).join('')}</div>` : ''}
      <div class="mf-ow-tip">${escapeHtml(pick(ow.tipsZh, ow.tips))}</div>
    </div>
  `).join('');

  const empyreanHtml = Object.entries(d.empyrean.tiers).map(([tier, items]) => `
    <div class="mf-ow-row">
      <span class="mf-tier-badge" style="background:${RARITY_COLOR[tier] || '#888'}1f;color:${RARITY_COLOR[tier] || '#fff'}">${escapeHtml(t('rarity.' + tier))}</span>
      ${items.map(i => renderResourceTag(i, d.imageBase)).join('')}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="mf-source">
      ${t('materials.source')}: <a href="${escapeAttr(d.source.url)}" target="_blank" rel="noopener">${escapeHtml(d.source.name)}</a>
      · ${t('materials.license')}: ${escapeHtml(d.source.license)}
      · ${t('materials.fetched')} ${escapeHtml(d.source.fetched)}
    </div>

    <div class="mf-search">
      <input type="text" id="mf-search-input" placeholder="${escapeAttr(t('materials.search.placeholder'))}" autocomplete="off">
      <div class="mf-filter">
        ${RARITY_ORDER.map(r => `<button class="mf-filter-btn" data-rarity="${escapeAttr(r)}">${escapeHtml(t('rarity.' + r))}</button>`).join('')}
        <button class="mf-filter-btn mf-filter-clear is-active" data-rarity="">${escapeHtml(t('materials.filter.all'))}</button>
      </div>
    </div>

    <details class="mf-collapsible" open>
      <summary><h3>${t('materials.tips.heading')}</h3></summary>
      <div class="mf-tips-grid">${tipsHtml}</div>
      <div class="mf-squad">
        <div class="mf-squad-title">${escapeHtml(pick(d.squadComposition.titleZh, d.squadComposition.title))}</div>
        <div class="mf-squad-body">${escapeHtml(pick(d.squadComposition.bodyZh, d.squadComposition.body))}</div>
      </div>
    </details>

    <div id="mf-resources">${rarityGroupsHtml}</div>

    <details class="mf-collapsible">
      <summary><h3>${t('materials.ow.heading')}</h3></summary>
      <div class="mf-ow-grid">${openWorldHtml}</div>
    </details>

    <details class="mf-collapsible">
      <summary><h3>${t('materials.empyrean.heading')}</h3></summary>
      <div class="mf-empyrean">
        <div class="mf-ow-tip">${escapeHtml(pick(d.empyrean.noteZh, d.empyrean.note))}</div>
        ${empyreanHtml}
      </div>
    </details>
  `;

  const searchInput = container.querySelector('#mf-search-input');
  const filterBtns = container.querySelectorAll('.mf-filter-btn');
  let activeRarity = '';
  let searchTerm = '';

  function applyFilters() {
    const term = searchTerm.toLowerCase();
    for (const card of container.querySelectorAll('.mf-card')) {
      const matchSearch = !term || card.dataset.search.includes(term);
      const matchRarity = !activeRarity || card.dataset.rarity === activeRarity;
      card.hidden = !(matchSearch && matchRarity);
    }
    for (const group of container.querySelectorAll('.mf-group')) {
      const anyVisible = Array.from(group.querySelectorAll('.mf-card')).some(c => !c.hidden);
      group.hidden = !anyVisible;
    }
  }

  searchInput.addEventListener('input', () => { searchTerm = searchInput.value; applyFilters(); });
  for (const btn of filterBtns) {
    btn.addEventListener('click', () => {
      activeRarity = btn.dataset.rarity;
      for (const b of filterBtns) b.classList.toggle('is-active', b === btn);
      applyFilters();
    });
  }
}

function renderResourceTag(item, imageBase) {
  if (typeof item === 'string') return `<span class="mf-tag">${escapeHtml(item)}</span>`;
  const imgHtml = item.image
    ? `<img class="mf-tag-img" src="${escapeAttr(imageBase + item.image)}" alt="${escapeAttr(item.name)}" loading="lazy" onerror="this.style.display='none'">`
    : '';
  return `<span class="mf-tag">${imgHtml}${escapeHtml(item.name)}</span>`;
}

function renderResourceCard(r, imageBase) {
  const displayNodes = currentLang === 'zh' && r.bestNodesZh ? r.bestNodesZh : r.bestNodes;
  const nodesHtml = displayNodes.map(n => `<li>${escapeHtml(n)}</li>`).join('');
  const displayName = pick(r.nameZh, r.name);
  const displayMission = pick(r.missionTypeZh, r.missionType);
  const displayTips = pick(r.tipsZh, r.tips);
  const searchBlob = `${r.name} ${r.nameZh || ''} ${r.bestNodes.join(' ')} ${r.tips} ${r.tipsZh || ''} ${r.missionType}`.toLowerCase();
  const imgUrl = r.image ? `${imageBase}${r.image}` : '';
  const imgHtml = imgUrl
    ? `<img class="mf-card-img" src="${escapeAttr(imgUrl)}" alt="${escapeAttr(r.name)}" loading="lazy" onerror="this.style.display='none'">`
    : '';
  return `
    <div class="mf-card" data-rarity="${escapeAttr(r.rarity)}" data-search="${escapeAttr(searchBlob)}">
      <div class="mf-card-head">
        ${imgHtml}
        <div class="mf-card-name">${escapeHtml(displayName)}</div>
        <span class="mf-tier-badge" style="background:${RARITY_COLOR[r.rarity] || '#888'}1f;color:${RARITY_COLOR[r.rarity] || '#fff'}">${escapeHtml(t('rarity.' + r.rarity))}</span>
      </div>
      <div class="mf-card-mission">${escapeHtml(displayMission)}</div>
      <ul class="mf-card-nodes">${nodesHtml}</ul>
      <div class="mf-card-tip">${escapeHtml(displayTips)}</div>
    </div>
  `;
}

// ============ Boot ============
applyStaticTranslations();
els.langToggle.textContent = t('lang.toggle');
loadWarframeBios();
showSection('warframe-pricing');
