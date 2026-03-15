/* ═══════════════════════════════════════════════════════════════════
   app.js — StockPulse UI logic
   Depends on: data.js, api.js  (loaded before this file in index.html)
═══════════════════════════════════════════════════════════════════ */

/* ── State ───────────────────────────────────────────────────── */
let currentShop = null;

/* ── Page navigation ─────────────────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
}

/* ── Auth handlers ───────────────────────────────────────────── */
function handleLogin() {
  const e = document.getElementById('login-email').value;
  const p = document.getElementById('login-password').value;
  if (!e || !p) { showToast('⚠️ Please fill in all fields'); return; }
  const name = e.split('@')[0];
  document.getElementById('nav-username').textContent = name;
  renderShops('all');
  showPage('shops');
  showToast('👋 Welcome back, ' + name + '!');
}

function demoLogin() {
  document.getElementById('nav-username').textContent = 'Arjun';
  renderShops('all');
  showPage('shops');
  showToast('🚀 Demo mode activated!');
}

function handleSignup() {
  renderShops('all');
  showPage('shops');
  showToast('🎉 Account created! Welcome to StockPulse.');
}

function handleLogout() {
  showPage('login');
  showToast('👋 Logged out successfully.');
}

/* ── Shops page ──────────────────────────────────────────────── */
function renderShops(filter) {
  const grid = document.getElementById('shops-grid');
  let list = SHOPS;
  if (filter === 'critical') list = SHOPS.filter(s => s.status === 'critical');
  else if (filter === 'ok')     list = SHOPS.filter(s => s.status === 'ok');
  else if (filter === 'pune')   list = SHOPS.filter(s => s.city === 'pune');
  else if (filter === 'mumbai') list = SHOPS.filter(s => s.city === 'mumbai');

  document.getElementById('shop-count').textContent = list.length;

  grid.innerHTML = list.map((s, idx) => {
    const dotClass    = s.status === 'ok' ? 'dot-green' : s.status === 'critical' ? 'dot-red' : 'dot-yellow';
    const statusLabel = s.status === 'ok' ? 'Healthy' : s.status === 'critical' ? 'Needs Attention' : 'Warning';
    const st          = STORE_TYPES[s.type];
    return `
    <div class="shop-card" onclick="openShop('${s.id}')"
         style="animation-delay:${idx * 0.07}s;"
         onmousemove="updateCardGlow(event,this)">
      <div class="shop-card-top">
        <div class="shop-icon" style="background:${s.color}22;">${s.icon}</div>
        <div class="shop-status">
          <div class="dot ${dotClass}"></div>
          ${statusLabel}
        </div>
      </div>
      <h3>${s.name}</h3>
      <div class="location">📍 ${s.location}</div>
      <span class="store-type-badge ${st.cls}">${st.icon} ${st.label}</span>
      <div class="shop-mini-stats">
        <div class="mini-stat">
          <div class="v ok">${s.kpi.total}</div>
          <div class="k">Products</div>
        </div>
        <div class="mini-stat">
          <div class="v ${s.kpi.low > 8 ? 'danger' : 'warn'}">${s.kpi.low}</div>
          <div class="k">Low Stock</div>
        </div>
        <div class="mini-stat">
          <div class="v" style="color:${s.color};">${s.score}/100</div>
          <div class="k">Score</div>
        </div>
      </div>
      <div class="arrow">→</div>
    </div>`;
  }).join('');
}

function updateCardGlow(e, card) {
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
  const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
  card.style.setProperty('--mx', x + '%');
  card.style.setProperty('--my', y + '%');
}

function filterShops(f, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderShops(f);
}

/* ── Open shop → dashboard ───────────────────────────────────── */
async function openShop(id) {
  currentShop = SHOPS.find(s => s.id === id);
  if (!currentShop) return;

  // Try backend; falls back to mock
  const backendData = await fetchDashboardData(id);

  const st = STORE_TYPES[currentShop.type];

  document.getElementById('sidebar-shop-name').textContent = currentShop.name;
  document.getElementById('sidebar-shop-loc').textContent  = '📍 ' + currentShop.location;
  document.getElementById('dash-title').textContent        = currentShop.name;
  document.getElementById('dash-breadcrumb').textContent   = currentShop.name;
  document.getElementById('sidebar-store-type-wrap').innerHTML =
    `<span class="store-type-badge ${st.cls}" style="font-size:.72rem;">${st.icon} ${st.label}</span>`;

  // KPIs
  const kpiData = backendData ? backendData.summary : currentShop.kpi;
  const score   = backendData ? backendData.summary.retailScore : currentShop.score;

  animateNumber('kpi-total',    kpiData.totalProducts || kpiData.total);
  animateNumber('kpi-trending', kpiData.trendingNow   || kpiData.trending);
  animateNumber('kpi-low',      kpiData.lowStockAlerts || kpiData.low);
  animateNumber('kpi-dead',     kpiData.dead || currentShop.kpi.dead);
  animateNumber('kpi-score',    score);
  animateNumber('gauge-num',    score);
  document.getElementById('nb-low').textContent    = kpiData.lowStockAlerts || kpiData.low;
  document.getElementById('nb-alerts').textContent = ALERTS_BY_TYPE[currentShop.type].filter(a => a.type === 'red').length;

  // Score arc
  const offset = 351.86 * (1 - score / 100);
  document.getElementById('score-arc').style.strokeDashoffset = offset;
  document.getElementById('score-arc').style.stroke =
    score >= 80 ? '#7c6cfc' : score >= 60 ? '#ffb347' : '#ff4d6d';

  buildWeatherStrip();
  buildTrendChart();
  buildStockBars();
  buildActivityFeed();
  buildInventoryTable();
  buildTrendingList();
  buildForecastChart();
  buildAlerts();
  buildDeadStock();

  switchTab('overview', document.querySelector('.nav-item'));
  showPage('dashboard');
}

/* ── Number counter animation ────────────────────────────────── */
function animateNumber(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration  = 700;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ── Weather strip ───────────────────────────────────────────── */
function buildWeatherStrip() {
  document.getElementById('ws-temp').textContent      = WEATHER.temp_c + '°C';
  document.getElementById('ws-condition').textContent = WEATHER.condition + ' · Hot Day in Pune';
  document.getElementById('ws-label').textContent     = WEATHER.label;
  document.getElementById('ws-tag').textContent       = WEATHER.tag;
  document.querySelector('.ws-icon').textContent      = WEATHER.icon;
}

/* ── Trend chart ─────────────────────────────────────────────── */
function buildTrendChart() {
  const svg = document.getElementById('trend-chart');
  const pts  = Array.from({length: 14}, (_, i) => [i * 46 + 10, 20 + Math.random() * 80]);
  const line = pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const area = line + ` L${pts[pts.length - 1][0]},135 L${pts[0][0]},135 Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="${currentShop.color}" stop-opacity=".35"/>
        <stop offset="100%" stop-color="${currentShop.color}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#cg)"/>
    <path d="${line}" fill="none" stroke="${currentShop.color}" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="1000" stroke-dashoffset="1000"
      style="animation:drawLine 1.2s ease forwards;"/>
    ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${currentShop.color}"
      opacity="0" style="animation:fadeIn .3s ease forwards .8s;"/>`).join('')}
    ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Today']
      .map((d, i) => i % 2 === 0
        ? `<text x="${i * 46 + 10}" y="138" fill="#6b6b85" font-size="9" font-family="DM Mono" text-anchor="middle">${d}</text>`
        : '').join('')}`;

  if (!document.getElementById('line-anim-style')) {
    const s = document.createElement('style');
    s.id          = 'line-anim-style';
    s.textContent = '@keyframes drawLine{to{stroke-dashoffset:0;}}';
    document.head.appendChild(s);
  }
}

/* ── Stock bars ──────────────────────────────────────────────── */
function buildStockBars() {
  const cats = STOCK_BARS_BY_TYPE[currentShop.type] || STOCK_BARS_BY_TYPE.grocery;
  document.getElementById('stock-bars').innerHTML = cats.map(c => `
    <div class="stock-bar-item">
      <div class="sbi-header">
        <span class="sbi-name">${c.name}</span>
        <span class="sbi-val">${c.pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${c.cls}" data-pct="${c.pct}" style="width:0%"></div>
      </div>
    </div>`).join('');
  requestAnimationFrame(() => {
    document.querySelectorAll('.bar-fill').forEach(b => {
      b.style.width = b.dataset.pct + '%';
    });
  });
}

/* ── Activity feed ───────────────────────────────────────────── */
function buildActivityFeed() {
  const acts = ACTIVITY_BY_TYPE[currentShop.type] || ACTIVITY_BY_TYPE.grocery;
  document.getElementById('activity-feed').innerHTML = acts.map((a, i) => `
    <div class="activity-item" style="animation:cardEntry .3s ease both;animation-delay:${i * 0.06}s;">
      <div class="act-dot" style="background:${a.color};"></div>
      <div>
        <div class="act-text">${a.text}</div>
        <div class="act-time">${a.time}</div>
      </div>
    </div>`).join('');
}

/* ── Inventory table ─────────────────────────────────────────── */
function buildInventoryTable() {
  const inv      = INVENTORY_BY_TYPE[currentShop.type] || INVENTORY_BY_TYPE.grocery;
  const tagMap   = {low: 'tag-yellow', out: 'tag-red', ok: 'tag-green'};
  const labelMap = {low: 'Low Stock',  out: 'Out of Stock', ok: 'In Stock'};
  document.getElementById('inventory-tbody').innerHTML = inv.map(r => `
    <tr>
      <td style="font-weight:600;">${r.name}</td>
      <td style="color:var(--muted);">${r.cat}</td>
      <td style="font-family:var(--font-m);">${r.stock}</td>
      <td style="font-family:var(--font-m);color:var(--muted);">${r.reorder}</td>
      <td><span class="tag ${tagMap[r.status]}">${labelMap[r.status]}</span></td>
      <td style="color:var(--muted);font-family:var(--font-m);font-size:.75rem;">${r.updated}</td>
    </tr>`).join('');
}

/* ── Trending list ───────────────────────────────────────────── */
function buildTrendingList() {
  const trends = TRENDING_BY_TYPE[currentShop.type] || TRENDING_BY_TYPE.grocery;
  document.getElementById('trending-list').innerHTML = trends.map((t, i) => `
    <div class="trend-item" style="animation-delay:${i * 0.05}s;">
      <div class="trend-rank">#${i + 1}</div>
      <div class="trend-icon">${t.icon}</div>
      <div class="trend-info">
        <div class="tn">${t.name}</div>
        <div class="ts">${t.cat}</div>
      </div>
      <div class="trend-badge">${t.delta}</div>
    </div>`).join('');
}

/* ── Forecast chart ──────────────────────────────────────────── */
function buildForecastChart() {
  const svg      = document.getElementById('forecast-chart');
  const actual   = [80, 95, 70, 110, 100, 88, 120];
  const forecast = [null, null, null, null, 110, 130, 145, 160, 155];
  const maxV = 170, w = 400, h = 130;
  const xS   = w / (forecast.length - 1);
  const yS   = (h - 20) / maxV;

  const actPts  = actual.map((v, i) => [i * xS, h - v * yS]);
  const forPts  = forecast.map((v, i) => v !== null ? [i * xS, h - v * yS] : null).filter(Boolean);
  const actLine = actPts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const forLine = forPts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');

  svg.innerHTML = `
    <path d="${actLine}" fill="none" stroke="${currentShop.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${forLine}" fill="none" stroke="#7c6cfc" stroke-width="2" stroke-dasharray="6 4" stroke-linecap="round"/>
    <text x="10" y="15" fill="#7c6cfc" font-size="9" font-family="DM Mono">— Forecast</text>
    <text x="80" y="15" fill="${currentShop.color}" font-size="9" font-family="DM Mono">— Actual</text>`;
}

/* ── Alerts ──────────────────────────────────────────────────── */
function buildAlerts() {
  const alerts = ALERTS_BY_TYPE[currentShop.type] || ALERTS_BY_TYPE.grocery;
  document.getElementById('alerts-list').innerHTML = alerts.map((a, i) => `
    <div class="alert-item a-${a.type}" style="animation:cardEntry .3s ease both;animation-delay:${i * 0.07}s;">
      <div class="alert-icon">${a.icon}</div>
      <div class="alert-text">
        <div class="at-title">${a.title}</div>
        <div class="at-sub">${a.sub}</div>
      </div>
    </div>`).join('');
  document.getElementById('alert-count-badge').textContent  = alerts.length + ' active';
  document.getElementById('nb-alerts').textContent          = alerts.filter(a => a.type === 'red').length;
}

/* ── Dead stock ──────────────────────────────────────────────── */
function buildDeadStock() {
  document.getElementById('dead-tbody').innerHTML = MOCK_DEAD.map(r => `
    <tr>
      <td style="font-weight:600;">${r.name}</td>
      <td style="font-family:var(--font-m);">${r.units}</td>
      <td><span class="tag tag-red">${r.days} days</span></td>
      <td style="font-family:var(--font-m);color:var(--danger);">${r.loss}</td>
      <td>
        <button
          onclick="this.textContent='Marked ✓';this.style.color='var(--accent)';this.style.borderColor='rgba(0,229,160,.3)';"
          style="padding:.3rem .7rem;background:rgba(255,77,109,.1);border:1px solid rgba(255,77,109,.3);
                 border-radius:6px;color:#ff4d6d;font-size:.75rem;cursor:pointer;transition:all .2s;">
          Mark for clearance
        </button>
      </td>
    </tr>`).join('');
}

/* ── Tab switching ───────────────────────────────────────────── */
function switchTab(name, btn) {
  ['overview', 'inventory', 'trending', 'alerts', 'deadstock'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.style.display = t === name ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ── Toast ───────────────────────────────────────────────────── */
function showToast(msg) {
  const t    = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

/* ── Init ────────────────────────────────────────────────────── */
renderShops('all');
