/* ═══════════════════════════════════════════════════════════════════
   seed.js — Populate MongoDB with sample products
   Run:  node seed.js
═══════════════════════════════════════════════════════════════════ */

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SmartRetail')
  .then(() => console.log('Connected to MongoDB for seeding...'))
  .catch(err => { console.error(err); process.exit(1); });

const Product = mongoose.model('Product', new mongoose.Schema({
  name:         String,
  category:     String,
  currentStock: Number,
  avgDailySales:Number,
  isTrending:   { type: Boolean, default: false },
  lastMovement: { type: Date,    default: Date.now },
}));

const seedData = [
  // Grocery
  { name: 'Sunscreen SPF 50',     category: 'Personal Care', currentStock: 12,  avgDailySales: 12, isTrending: true  },
  { name: 'Cold Brew Coffee',     category: 'Beverages',     currentStock: 0,   avgDailySales: 25, isTrending: true  },
  { name: 'Mineral Water 2L',     category: 'Beverages',     currentStock: 85,  avgDailySales: 40, isTrending: false },
  { name: 'Aloe Vera Gel',        category: 'Personal Care', currentStock: 7,   avgDailySales: 8,  isTrending: true  },
  { name: 'Electrolyte Sachets',  category: 'Health',        currentStock: 34,  avgDailySales: 10, isTrending: true  },
  { name: 'Ice Cream Tubs',       category: 'Frozen Foods',  currentStock: 4,   avgDailySales: 15, isTrending: true  },
  { name: 'Chilled Juice 1L',     category: 'Beverages',     currentStock: 120, avgDailySales: 30, isTrending: false },

  // Clothing
  { name: 'Summer Dress (M)',       category: "Women's Wear", currentStock: 8,  avgDailySales: 6,  isTrending: true  },
  { name: 'Cotton Linen Shirt (L)', category: "Men's Wear",   currentStock: 0,  avgDailySales: 10, isTrending: true  },
  { name: 'Wide-Brim Hat',          category: 'Accessories',  currentStock: 62, avgDailySales: 8,  isTrending: true  },
  { name: 'UV Sunglasses',          category: 'Eyewear',      currentStock: 6,  avgDailySales: 5,  isTrending: true  },
  { name: 'Sports Shorts (M)',      category: 'Activewear',   currentStock: 41, avgDailySales: 12, isTrending: false },
  { name: 'Sandals Size 8',         category: 'Footwear',     currentStock: 3,  avgDailySales: 4,  isTrending: false },

  // Snacks
  { name: 'Cold Brew Coffee Cans',  category: 'Beverages',     currentStock: 5,   avgDailySales: 25, isTrending: true  },
  { name: 'Mango Chips 150g',       category: 'Crisps',        currentStock: 0,   avgDailySales: 30, isTrending: true  },
  { name: 'Frozen Yogurt Bites',    category: 'Frozen Snacks', currentStock: 88,  avgDailySales: 20, isTrending: true  },
  { name: 'Protein Bar Choco',      category: 'Health Snacks', currentStock: 9,   avgDailySales: 10, isTrending: false },
  { name: 'Sparkling Water',        category: 'Beverages',     currentStock: 2,   avgDailySales: 20, isTrending: false },
  { name: 'Salted Caramel Popcorn', category: 'Crisps',        currentStock: 110, avgDailySales: 15, isTrending: false },

  // Electronics
  { name: 'Portable Air Cooler', category: 'Cooling',          currentStock: 3,  avgDailySales: 5,  isTrending: true  },
  { name: 'USB-C Desk Fan',      category: 'Cooling',          currentStock: 0,  avgDailySales: 8,  isTrending: true  },
  { name: 'Smart Water Bottle',  category: 'Gadgets',          currentStock: 74, avgDailySales: 6,  isTrending: false },
  { name: 'Window AC 1.5T',      category: 'Air Conditioning', currentStock: 2,  avgDailySales: 2,  isTrending: true  },
  { name: 'Solar Power Bank',    category: 'Charging',         currentStock: 28, avgDailySales: 4,  isTrending: false },
  { name: 'Smart Ceiling Fan',   category: 'Cooling',          currentStock: 11, avgDailySales: 3,  isTrending: true  },
];

async function seed() {
  try {
    await Product.deleteMany({});
    console.log('🗑️   Cleared existing products');
    const inserted = await Product.insertMany(seedData);
    console.log(`✅  Seeded ${inserted.length} products into SmartRetail DB`);
  } catch (err) {
    console.error('❌  Seed error:', err);
  } finally {
    mongoose.disconnect();
    console.log('🔌  Disconnected from MongoDB');
  }
}

seed();
