/* ═══════════════════════════════════════════════════════════════════
   server.js — StockPulse Express + MongoDB backend
   ─────────────────────────────────────────────────────────────────
   SETUP:
     1.  npm install          (installs express, mongoose, cors)
     2.  node seed.js         (populates MongoDB with sample products)
     3.  node server.js       (starts API on http://localhost:5000)
     4.  In frontend/js/api.js set USE_BACKEND = true
═══════════════════════════════════════════════════════════════════ */

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* ── MongoDB connection ────────────────────────────────────────── */
mongoose.connect('mongodb://127.0.0.1:27017/SmartRetail')
  .then(() => console.log('✅  StockPulse Backend Connected to MongoDB'))
  .catch(err => console.error('❌  Connection error:', err));

/* ── Product Schema ────────────────────────────────────────────── */
const Product = mongoose.model('Product', new mongoose.Schema({
  name:         String,
  category:     String,
  currentStock: Number,
  avgDailySales:Number,
  isTrending:   { type: Boolean, default: false },
  lastMovement: { type: Date,    default: Date.now },
}));

/* ── GET /api/dashboard/stats ──────────────────────────────────── */
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const products = await Product.find();

    const lowStockCount  = products.filter(p => p.currentStock < p.avgDailySales * 3).length;
    const trendingCount  = products.filter(p => p.isTrending).length;

    // Calculate stock health score (0–100)
    const totalProducts  = products.length;
    const healthyCount   = products.filter(p => p.currentStock >= p.avgDailySales * 3).length;
    const retailScore    = totalProducts > 0
      ? Math.round((healthyCount / totalProducts) * 100)
      : 64;

    const inventory = products.map(p => {
      const multiplier = p.isTrending ? 1.8 : 1.0;
      const forecast   = Math.ceil(p.avgDailySales * 7 * multiplier);
      return {
        ...p._doc,
        forecast,
        status:      forecast > p.currentStock ? 'LOW STOCK' : 'HEALTHY',
        socialSpike: p.isTrending ? '+89%' : 'Stable',
      };
    });

    res.json({
      summary: {
        totalProducts,
        trendingNow:      trendingCount,
        lowStockAlerts:   lowStockCount,
        dead:             0,           // extend schema to track dead stock
        retailScore,
      },
      inventory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── GET /api/products ─────────────────────────────────────────── */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /api/products ────────────────────────────────────────── */
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ── PATCH /api/products/:id ───────────────────────────────────── */
app.patch('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastMovement: Date.now() },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ── Start server ──────────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  StockPulse backend running on http://localhost:${PORT}`);
  console.log(`    Dashboard API: http://localhost:${PORT}/api/dashboard/stats`);
});
