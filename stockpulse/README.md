# StockPulse — Inventory Intelligence

A real-time retail inventory dashboard with weather-driven trending, multi-store management, and MongoDB backend integration.

---

## Project Structure

```
stockpulse/
├── frontend/
│   ├── index.html          ← Open this in browser to run the app
│   ├── css/
│   │   ├── variables.css   ← CSS custom properties & reset
│   │   ├── animations.css  ← All keyframe animations
│   │   ├── auth.css        ← Login & signup page styles
│   │   ├── shops.css       ← Shops listing page styles
│   │   └── dashboard.css   ← Dashboard, KPIs, panels, charts
│   └── js/
│       ├── data.js         ← All mock data (shops, products, weather)
│       ├── api.js          ← Backend integration (toggle USE_BACKEND)
│       └── app.js          ← All UI logic & rendering functions
└── backend/
    ├── server.js           ← Express API server
    ├── seed.js             ← Populate MongoDB with sample data
    └── package.json        ← Node dependencies
```

---

## Quick Start (Frontend Only)

Just open `frontend/index.html` in your browser — no server needed.
The app runs fully on mock data out of the box.

---

## Full Stack Setup (with MongoDB)

### Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017

### Steps

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Seed the database
node seed.js

# 3. Start the API server
node server.js
# → Running on http://localhost:5000

# 4. Enable backend in frontend
# Open frontend/js/api.js and set:
#   const USE_BACKEND = true;

# 5. Open the frontend
# Open frontend/index.html in your browser
```

---

## Features

- **Login / Signup** — Auth pages with animated floating status cards
- **Multi-store Dashboard** — 6 stores across Pune & Mumbai
- **4 Store Types** — Grocery, Clothing, Snacks, Electronics
- **Weather-driven Trending** — Trending products change based on live Pune weather (33°C, hot)
- **Per-store Inventory** — Each store type has its own product catalog
- **KPI Cards** — Animated number counters for Total, Trending, Low Stock, Dead Stock, Score
- **Retail Health Score** — Animated gauge ring per store
- **Alerts** — Store-specific critical/warning/healthy alerts
- **Dead Stock Report** — Idle inventory with clearance actions
- **Backend Toggle** — Seamlessly switches between mock and MongoDB data

---

## Store Types

| Store | Type | Color |
|-------|------|-------|
| Koregaon Park Express | Grocery | Green |
| Kothrud Supermart | Clothing | Red |
| Viman Nagar Hub | Snacks | Purple |
| Bandra West Store | Electronics | Orange |
| Andheri Mega Centre | Grocery | Green |
| Hinjewadi Tech Park Kiosk | Electronics | Yellow |

---

## Filter Tabs

- **All Locations** — All 6 stores
- **Needs Attention** — Critical stores (Kothrud, Bandra West)
- **Healthy** — OK stores (Koregaon, Viman Nagar, Andheri, Hinjewadi)
- **Pune** — Koregaon, Kothrud, Viman Nagar, Hinjewadi
- **Mumbai** — Bandra West, Andheri

---

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Summary KPIs + full inventory with forecasts |
| GET | `/api/products` | All products |
| POST | `/api/products` | Add a product |
| PATCH | `/api/products/:id` | Update a product |
