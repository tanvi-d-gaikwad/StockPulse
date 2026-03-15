/* ═══════════════════════════════════════════════════════════════════
   api.js — Backend integration for StockPulse
   ─────────────────────────────────────────────────────────────────
   HOW TO USE:
   1. Start your backend:  node backend/server.js
   2. Seed the database:   node backend/seed.js
   3. Set USE_BACKEND = true below
   4. Open index.html — dashboard will use live MongoDB data
═══════════════════════════════════════════════════════════════════ */

const USE_BACKEND = false; // ← flip to true when server.js is running
const API_BASE    = 'http://localhost:5000';

async function fetchDashboardData(shopId) {
  if (!USE_BACKEND) return null;
  try {
    const r = await fetch(`${API_BASE}/api/dashboard/stats`);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    console.warn('[StockPulse] Backend unreachable — using mock data:', e.message);
    return null;
  }
}
