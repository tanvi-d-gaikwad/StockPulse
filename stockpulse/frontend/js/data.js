/* ═══════════════════════════════════════════════════════════════════
   data.js — All mock/seed data for StockPulse frontend
   Edit this file to update products, shops, weather, and alerts.
═══════════════════════════════════════════════════════════════════ */

/* ── Store type metadata ──────────────────────────────────────── */
const STORE_TYPES = {
  grocery:     { label:'Grocery Store',     cls:'stb-grocery',     icon:'🛒' },
  clothing:    { label:'Clothing Store',    cls:'stb-clothing',    icon:'👗' },
  snacks:      { label:'Snack Store',       cls:'stb-snacks',      icon:'🍿' },
  electronics: { label:'Electronics Store', cls:'stb-electronics', icon:'⚡' },
};

/* ── Shops ────────────────────────────────────────────────────── */
const SHOPS = [
  { id:'s1', name:'Koregaon Park Express',     location:'Koregaon Park, Pune',  city:'pune',
    icon:'🛒', type:'grocery',     status:'ok',       score:88,
    kpi:{total:210,trending:7,low:4,dead:2},  color:'#00e5a0' },
  { id:'s2', name:'Kothrud Supermart',          location:'Kothrud, Pune',        city:'pune',
    icon:'👗', type:'clothing',    status:'critical', score:64,
    kpi:{total:185,trending:3,low:14,dead:7}, color:'#ff4d6d' },
  { id:'s3', name:'Viman Nagar Hub',            location:'Viman Nagar, Pune',    city:'pune',
    icon:'🍿', type:'snacks',      status:'ok',       score:91,
    kpi:{total:240,trending:9,low:2,dead:1},  color:'#7c6cfc' },
  { id:'s4', name:'Bandra West Store',          location:'Bandra West, Mumbai',  city:'mumbai',
    icon:'⚡', type:'electronics', status:'critical', score:72,
    kpi:{total:198,trending:5,low:11,dead:4}, color:'#ff6b35' },
  { id:'s5', name:'Andheri Mega Centre',        location:'Andheri East, Mumbai', city:'mumbai',
    icon:'🛒', type:'grocery',     status:'ok',       score:85,
    kpi:{total:320,trending:12,low:6,dead:3}, color:'#00e5a0' },
  { id:'s6', name:'Hinjewadi Tech Park Kiosk', location:'Hinjewadi, Pune',      city:'pune',
    icon:'⚡', type:'electronics', status:'ok',       score:79,
    kpi:{total:95,trending:4,low:3,dead:0},   color:'#ffb347' },
];

/* ── Weather config (fetched live — update temp_c/condition as needed) */
const WEATHER = {
  temp_c:    33,
  temp_f:    91,
  condition: 'Partly Sunny',
  icon:      '☀️',
  is_hot:    true,
  season:    'summer',
  tag:       '🌡️ Heat-driven demand',
  label:     "Trending products updated based on today's weather forecast",
};

/* ── Trending — weather-aware, per store type ─────────────────── */
const TRENDING_BY_TYPE = {
  grocery: [
    {name:'Cold Drinks & Juices',     cat:'Beverages',     icon:'🥤', delta:'+142%'},
    {name:'Ice Cream Tubs',           cat:'Frozen Foods',  icon:'🍦', delta:'+118%'},
    {name:'Sunscreen SPF 50',         cat:'Personal Care', icon:'☀️', delta:'+96%'},
    {name:'Electrolyte Sachets',      cat:'Health',        icon:'💊', delta:'+74%'},
    {name:'Mineral Water 2L',         cat:'Beverages',     icon:'💧', delta:'+61%'},
    {name:'Cucumber & Mint Cooler',   cat:'Fresh Produce', icon:'🥒', delta:'+48%'},
    {name:'Aloe Vera Gel',            cat:'Personal Care', icon:'🌿', delta:'+39%'},
  ],
  clothing: [
    {name:'Summer Dresses',           cat:"Women's Wear",  icon:'👗', delta:'+156%'},
    {name:'Cotton Linen Shirts',      cat:"Men's Wear",    icon:'👕', delta:'+128%'},
    {name:'Wide-Brim Sun Hats',       cat:'Accessories',   icon:'👒', delta:'+105%'},
    {name:'UV-Protection Sunglasses', cat:'Eyewear',       icon:'🕶️', delta:'+91%'},
    {name:'Breathable Sports Shorts', cat:'Activewear',    icon:'🩳', delta:'+77%'},
    {name:'Flip Flops & Sandals',     cat:'Footwear',      icon:'🩴', delta:'+64%'},
    {name:'Light Linen Trousers',     cat:"Men's Wear",    icon:'👖', delta:'+49%'},
  ],
  snacks: [
    {name:'Frozen Yogurt Bites',      cat:'Frozen Snacks', icon:'🍧', delta:'+138%'},
    {name:'Cold Brew Coffee Cans',    cat:'Beverages',     icon:'☕', delta:'+112%'},
    {name:'Mango Flavour Chips',      cat:'Crisps',        icon:'🥭', delta:'+89%'},
    {name:'Iced Lemon Tea Packs',     cat:'Beverages',     icon:'🍋', delta:'+76%'},
    {name:'Protein Bars (Choco)',     cat:'Health Snacks', icon:'🍫', delta:'+62%'},
    {name:'Sparkling Water Variety',  cat:'Beverages',     icon:'🫧', delta:'+54%'},
    {name:'Salted Caramel Popcorn',   cat:'Crisps',        icon:'🍿', delta:'+41%'},
  ],
  electronics: [
    {name:'Portable Air Cooler',      cat:'Cooling',           icon:'❄️', delta:'+201%'},
    {name:'USB-C Desk Fan',           cat:'Cooling',           icon:'🌀', delta:'+167%'},
    {name:'Smart Water Bottle (temp)',cat:'Gadgets',           icon:'🧴', delta:'+134%'},
    {name:'Window AC Unit (1.5T)',    cat:'Air Conditioning',  icon:'🏠', delta:'+118%'},
    {name:'Solar Power Bank 20000mAh',cat:'Charging',          icon:'☀️', delta:'+94%'},
    {name:'Noise-Cancelling Earbuds', cat:'Audio',             icon:'🎧', delta:'+71%'},
    {name:'Smart Ceiling Fan',        cat:'Cooling',           icon:'💨', delta:'+58%'},
  ],
};

/* ── Inventory — per store type ───────────────────────────────── */
const INVENTORY_BY_TYPE = {
  grocery: [
    {name:'Sunscreen SPF 50',     cat:'Personal Care', stock:12,  reorder:20, status:'low', updated:'2h ago'},
    {name:'Cold Brew Coffee',     cat:'Beverages',     stock:0,   reorder:30, status:'out', updated:'4h ago'},
    {name:'Mineral Water 2L',     cat:'Beverages',     stock:85,  reorder:40, status:'ok',  updated:'1d ago'},
    {name:'Aloe Vera Gel',        cat:'Personal Care', stock:7,   reorder:25, status:'low', updated:'3h ago'},
    {name:'Electrolyte Sachets',  cat:'Health',        stock:34,  reorder:20, status:'ok',  updated:'6h ago'},
    {name:'Ice Cream Tubs',       cat:'Frozen Foods',  stock:4,   reorder:15, status:'low', updated:'1h ago'},
    {name:'Chilled Juice 1L',     cat:'Beverages',     stock:120, reorder:50, status:'ok',  updated:'5h ago'},
    {name:'Fresh Cucumber',       cat:'Produce',       stock:52,  reorder:30, status:'ok',  updated:'1d ago'},
  ],
  clothing: [
    {name:'Summer Dress (M)',       cat:"Women's Wear", stock:8,  reorder:15, status:'low', updated:'2h ago'},
    {name:'Cotton Linen Shirt (L)', cat:"Men's Wear",   stock:0,  reorder:20, status:'out', updated:'5h ago'},
    {name:'Wide-Brim Hat',          cat:'Accessories',  stock:62, reorder:10, status:'ok',  updated:'1d ago'},
    {name:'UV Sunglasses',          cat:'Eyewear',      stock:6,  reorder:12, status:'low', updated:'3h ago'},
    {name:'Sports Shorts (M)',      cat:'Activewear',   stock:41, reorder:20, status:'ok',  updated:'8h ago'},
    {name:'Sandals Size 8',         cat:'Footwear',     stock:3,  reorder:10, status:'low', updated:'1h ago'},
    {name:'Linen Trousers (32)',    cat:"Men's Wear",   stock:90, reorder:25, status:'ok',  updated:'6h ago'},
    {name:'Summer Tote Bag',        cat:'Accessories',  stock:55, reorder:30, status:'ok',  updated:'2d ago'},
  ],
  snacks: [
    {name:'Cold Brew Coffee Cans',  cat:'Beverages',     stock:5,   reorder:20, status:'low', updated:'2h ago'},
    {name:'Mango Chips 150g',       cat:'Crisps',        stock:0,   reorder:30, status:'out', updated:'3h ago'},
    {name:'Frozen Yogurt Bites',    cat:'Frozen Snacks', stock:88,  reorder:25, status:'ok',  updated:'1d ago'},
    {name:'Protein Bar Choco',      cat:'Health Snacks', stock:9,   reorder:20, status:'low', updated:'4h ago'},
    {name:'Iced Lemon Tea Pack',    cat:'Beverages',     stock:32,  reorder:15, status:'ok',  updated:'7h ago'},
    {name:'Sparkling Water',        cat:'Beverages',     stock:2,   reorder:20, status:'low', updated:'1h ago'},
    {name:'Salted Caramel Popcorn', cat:'Crisps',        stock:110, reorder:40, status:'ok',  updated:'5h ago'},
    {name:'Coconut Water 500ml',    cat:'Beverages',     stock:67,  reorder:30, status:'ok',  updated:'1d ago'},
  ],
  electronics: [
    {name:'Portable Air Cooler', cat:'Cooling',          stock:3,  reorder:10, status:'low', updated:'1h ago'},
    {name:'USB-C Desk Fan',      cat:'Cooling',          stock:0,  reorder:15, status:'out', updated:'30m ago'},
    {name:'Smart Water Bottle',  cat:'Gadgets',          stock:74, reorder:20, status:'ok',  updated:'1d ago'},
    {name:'Window AC 1.5T',      cat:'Air Conditioning', stock:2,  reorder:5,  status:'low', updated:'3h ago'},
    {name:'Solar Power Bank',    cat:'Charging',         stock:28, reorder:15, status:'ok',  updated:'6h ago'},
    {name:'Noise-Cancel Earbuds',cat:'Audio',            stock:7,  reorder:12, status:'low', updated:'2h ago'},
    {name:'Smart Ceiling Fan',   cat:'Cooling',          stock:11, reorder:8,  status:'ok',  updated:'4h ago'},
    {name:'UV Phone Case',       cat:'Accessories',      stock:55, reorder:20, status:'ok',  updated:'1d ago'},
  ],
};

/* ── Stock bars — per store type ─────────────────────────────── */
const STOCK_BARS_BY_TYPE = {
  grocery:     [{name:'Beverages',pct:72,cls:'bf-green'},{name:'Personal Care',pct:45,cls:'bf-orange'},{name:'Frozen Foods',pct:88,cls:'bf-purple'},{name:'Health',pct:60,cls:'bf-yellow'},{name:'Produce',pct:30,cls:'bf-red'}],
  clothing:    [{name:"Women's Wear",pct:55,cls:'bf-orange'},{name:"Men's Wear",pct:78,cls:'bf-green'},{name:'Accessories',pct:90,cls:'bf-purple'},{name:'Footwear',pct:38,cls:'bf-red'},{name:'Activewear',pct:68,cls:'bf-yellow'}],
  snacks:      [{name:'Beverages',pct:25,cls:'bf-red'},{name:'Crisps',pct:80,cls:'bf-green'},{name:'Frozen Snacks',pct:65,cls:'bf-purple'},{name:'Health Snacks',pct:50,cls:'bf-yellow'},{name:'Confectionery',pct:85,cls:'bf-orange'}],
  electronics: [{name:'Cooling',pct:18,cls:'bf-red'},{name:'Air Conditioning',pct:28,cls:'bf-orange'},{name:'Gadgets',pct:74,cls:'bf-green'},{name:'Charging',pct:62,cls:'bf-yellow'},{name:'Audio',pct:55,cls:'bf-purple'}],
};

/* ── Activity feed — per store type ──────────────────────────── */
const ACTIVITY_BY_TYPE = {
  grocery: [
    {color:'#00e5a0',text:'<span class="act-bold">Restock completed</span> — Mineral Water 2L (+120 units)',time:'10 min ago'},
    {color:'#ff4d6d',text:'<span class="act-bold">Alert triggered</span> — Cold Brew went out of stock',time:'41 min ago'},
    {color:'#ffb347',text:'<span class="act-bold">Price updated</span> — Sunscreen SPF 50 → ₹299',time:'1h ago'},
    {color:'#7c6cfc',text:'<span class="act-bold">Trend detected</span> — Ice Cream Tubs +118% demand spike',time:'2h ago'},
    {color:'#ff6b35',text:'<span class="act-bold">Low stock</span> — Aloe Vera Gel at 7 units',time:'3h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">Order placed</span> — 50 units of Electrolyte Sachets',time:'5h ago'},
  ],
  clothing: [
    {color:'#ff4d6d',text:'<span class="act-bold">Out of stock</span> — Cotton Linen Shirt (L) sold out',time:'20 min ago'},
    {color:'#ffb347',text:'<span class="act-bold">Low stock alert</span> — Summer Dress (M) only 8 left',time:'1h ago'},
    {color:'#7c6cfc',text:'<span class="act-bold">Trend spike</span> — Summer Dresses +156% this week',time:'2h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">Restock arrived</span> — Wide-Brim Hats +62 units',time:'3h ago'},
    {color:'#ff6b35',text:'<span class="act-bold">Low stock</span> — Sandals Size 8 at 3 pairs',time:'4h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">New order</span> — 40x UV Sunglasses placed',time:'6h ago'},
  ],
  snacks: [
    {color:'#ff4d6d',text:'<span class="act-bold">Out of stock</span> — Mango Chips 150g sold out',time:'15 min ago'},
    {color:'#ffb347',text:'<span class="act-bold">Low stock</span> — Cold Brew Coffee Cans at 5 units',time:'1h ago'},
    {color:'#7c6cfc',text:'<span class="act-bold">Trend spike</span> — Frozen Yogurt Bites +138% today',time:'2h ago'},
    {color:'#ff6b35',text:'<span class="act-bold">Flash sale</span> — Salted Caramel Popcorn, 30% off',time:'3h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">Restock</span> — Sparkling Water 48 units incoming',time:'4h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">New SKU</span> — Coconut Water 500ml added',time:'6h ago'},
  ],
  electronics: [
    {color:'#ff4d6d',text:'<span class="act-bold">CRITICAL</span> — USB-C Desk Fan completely out of stock',time:'30 min ago'},
    {color:'#ff4d6d',text:'<span class="act-bold">Critical low</span> — Portable Air Cooler at 3 units',time:'1h ago'},
    {color:'#7c6cfc',text:'<span class="act-bold">Surge detected</span> — AC units +201% search volume',time:'2h ago'},
    {color:'#ffb347',text:'<span class="act-bold">Low stock</span> — Window AC 1.5T only 2 left',time:'3h ago'},
    {color:'#00e5a0',text:'<span class="act-bold">Restock ordered</span> — 25x USB-C Fans en route',time:'4h ago'},
    {color:'#ff6b35',text:'<span class="act-bold">Price alert</span> — Solar Power Bank → ₹2,499',time:'5h ago'},
  ],
};

/* ── Alerts — per store type ─────────────────────────────────── */
const ALERTS_BY_TYPE = {
  grocery: [
    {type:'red',   icon:'🚨',title:'Cold Brew Coffee — OUT OF STOCK',   sub:'0 units remaining. 18 customers waiting. Reorder immediately.'},
    {type:'red',   icon:'⚠️',title:'Sunscreen SPF 50 — Critical Low',   sub:'12 units left. Predicted demand: 80 units this week (heatwave).'},
    {type:'yellow',icon:'📉',title:'Ice Cream Tubs — Low Stock Warning', sub:'4 units. Heat forecast next 5 days — expect surge.'},
    {type:'green', icon:'✅',title:'Mineral Water restock arrived',       sub:'120 units logged in. Shelf space updated.'},
  ],
  clothing: [
    {type:'red',   icon:'🚨',title:'Cotton Linen Shirt (L) — OUT OF STOCK',sub:'0 units. Top seller this heatwave. Reorder urgently.'},
    {type:'red',   icon:'⚠️',title:'Summer Dress (M) — Critical Low',      sub:'8 units left. Social trending +156%. 3 days stock left.'},
    {type:'yellow',icon:'📉',title:'Sandals Size 8 — Low Stock Warning',    sub:'3 pairs. Summer demand spike expected this week.'},
    {type:'green', icon:'✅',title:'Wide-Brim Hat restock completed',        sub:'62 units received. Display updated.'},
  ],
  snacks: [
    {type:'red',   icon:'🚨',title:'Mango Chips 150g — OUT OF STOCK',     sub:'0 units. Trending #2. Reorder 200 units minimum.'},
    {type:'red',   icon:'⚠️',title:'Cold Brew Coffee Cans — Critical Low', sub:'5 units left. Daily sales: 25 cans. 2h stock left.'},
    {type:'yellow',icon:'📉',title:'Sparkling Water — Low Stock Warning',   sub:'2 units. 33°C heat — summer beverage surge active.'},
    {type:'green', icon:'✅',title:'Coconut Water 500ml added to inventory',sub:'67 units live. Expected to trend this week.'},
  ],
  electronics: [
    {type:'red',   icon:'🚨',title:'USB-C Desk Fan — OUT OF STOCK',       sub:'0 units. #1 trending item. Reorder 50 units immediately.'},
    {type:'red',   icon:'⚠️',title:'Portable Air Cooler — Critical Low',  sub:'3 units left. Demand surging with 33°C heat in Pune.'},
    {type:'red',   icon:'⚠️',title:'Window AC 1.5T — Critically Low',     sub:'2 units. AC searches up +201% in last 48h.'},
    {type:'yellow',icon:'📉',title:'Noise-Cancelling Earbuds — Low Stock',sub:'7 units. Social spike +71%. Reorder recommended.'},
  ],
};

/* ── Dead stock (common across all store types) ───────────────── */
const MOCK_DEAD = [
  {name:'Winter Gloves Leather', units:23, days:54, loss:'₹4,600'},
  {name:'Floral Notebook A5',    units:41, days:47, loss:'₹2,050'},
  {name:'AA Battery 8-pack',     units:16, days:38, loss:'₹1,280'},
  {name:'Decorative Candle Set', units:9,  days:35, loss:'₹3,150'},
  {name:'Instant Noodle Cup',    units:60, days:31, loss:'₹1,800'},
];
