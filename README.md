# WanderHidden — Find the Places Others Miss

WanderHidden is a travel discovery and trip-planning web application crafted to unveil India's lesser-known destinations: untouched valleys, ancient living root bridges, peaceful village hamlets, sacred waterfalls, high alpine bugyals, and extraterrestrial geological craters.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v3**, **Supabase (PostgreSQL with Row Level Security)**, and **Google Maps API**.

---

## 🌟 Key Features

1. **Curated Hidden Gems across 18+ Indian States**
   - 22+ authentic destinations including Ziro Valley, Tirthan Valley, Chopta & Tungnath, Mawlynnong, Dzukou Valley, Gokarna quiet coves, Anegundi & Sanapur, Gandikota Canyon, Lonar Meteorite Crater, Bhandardara & Sandhan Valley, Sandakphu, Spiti's Langza & Demul, Chembra Heart Lake, and more.
   - High-resolution photography, geo-coordinates, verified highlights, transport details, and local safety tips.

2. **Multi-Faceted Search & Discovery (`/search-destination-screen`)**
   - Live search by valley, state, region, or keywords with suggestion chips.
   - Category filtering: Mountains, Waterfalls, Beaches, Villages, Forests, Heritage, Lakes, and Offbeat.
   - Filters for regions of India, best seasons, and maximum estimated budget in INR.
   - Multi-criteria sorting (Popularity, Budget Low-to-High / High-to-Low, Duration, Name).

3. **Interactive Explorer Suite (`/hidden-places-screen`)**
   - Two-column responsive desktop layout and mobile tab switcher.
   - **Interactive Map**: Live Google Maps JS API integration with coordinate markers and directions. Automatically falls back to an interactive geographic SVG canvas when no API key is supplied.
   - **Smart Trip Planner**: Real-time stop reordering (up/down), day-by-day organization, and notes editing.
   - **Smart Budget Estimator**: Interactive cost calculator in Indian Rupees (₹ INR) with a Recharts category donut chart.

4. **Multi-Day Itinerary Planner (`/my-trips`)**
   - Create, edit, and organize multi-day itineraries.
   - Move destinations between days, reorder stops, and record customized activity notes.
   - Calculate total trip cost and per-person breakdown.
   - Deletion safety with confirmation dialog.

5. **Favorites & User Profile (`/favorites` & `/profile`)**
   - Save favorite hidden gems with one click.
   - Filter and search saved places.
   - Customizable traveler profile: travel style, preferred budget, and terrain interests.

6. **Dual Mode Architecture (Live Supabase + Zero-Config Demo Mode)**
   - Fully wired for **Supabase Auth & PostgreSQL** with Row-Level Security (RLS).
   - If Supabase environment variables are unconfigured, the app seamlessly runs in an interactive **Demo Mode** using persistent browser storage so it is 100% usable immediately out of the box!

---

## 🏗️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.2 (App Router, Server & Client Components) |
| **UI Library** | React 19 |
| **Language** | TypeScript (Strict type checking) |
| **Styling** | Tailwind CSS v3 with Plus Jakarta Sans typography |
| **Database & Auth** | Supabase (PostgreSQL with RLS policies) |
| **Mapping** | Google Maps JavaScript API with interactive SVG fallback |
| **Data Viz** | Recharts Donut & Radial Charts |
| **Icons** | Lucide React |
| **Form & Validation** | React Hook Form & Zod |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials (optional — WanderHidden automatically activates interactive Demo Mode if left blank):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Database Setup (Supabase)

If using live Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Run the schema migration from `supabase/migrations/20240101000000_initial_schema.sql`.
4. (Optional) Run `supabase/seed.sql` to populate sample destinations in PostgreSQL.
5. Copy your Project URL and Anon Key from **Project Settings > API** into `.env.local`.

### Tables Created:
- `profiles`: User information, preferences, budget tiers, and travel styles.
- `destinations`: Curated hidden places with coordinates, seasons, and highlights.
- `trips`: User-created multi-day itineraries and budget parameters.
- `trip_stops`: Individual destination stops mapped to days with sequence order and notes.
- `favorites`: Unique user-destination bookmarks.

---

## 📁 Project Structure

```
travel planner/
├── .env.example               # Template environment configuration
├── next.config.mjs            # Next.js config with remote image patterns
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS plugins
├── tailwind.config.ts         # Nature-inspired color palette & fonts
├── tsconfig.json              # TypeScript configuration
├── supabase/
│   ├── migrations/
│   │   └── 20240101000000_initial_schema.sql  # PostgreSQL tables & RLS policies
│   └── seed.sql               # Seed data for destinations
└── src/
    ├── app/
    │   ├── layout.tsx         # Root layout with font and app providers
    │   ├── globals.css        # Global styles & custom scrollbars
    │   ├── page.tsx           # Authentication & Welcome screen
    │   ├── search-destination-screen/
    │   │   └── page.tsx       # Discover Destinations & Search
    │   ├── hidden-places-screen/
    │   │   └── page.tsx       # Main Explorer Suite (Places, Map, Planner, Budget)
    │   ├── destinations/
    │   │   └── [slug]/
    │   │       └── page.tsx   # Dedicated Destination Details page
    │   ├── my-trips/
    │   │   └── page.tsx       # Multi-day Itinerary Manager
    │   ├── favorites/
    │   │   └── page.tsx       # Saved Favorites
    │   ├── profile/
    │   │   └── page.tsx       # Traveler Profile & Preferences
    │   └── not-found.tsx      # Branded 404 page
    ├── components/
    │   ├── AppLayout.tsx      # Main wrapper with Topbar & Footer
    │   ├── AppLogo.tsx        # Branded logo component
    │   ├── Badge.tsx          # Status, category & verified indicators
    │   ├── BudgetChart.tsx    # Recharts Donut chart
    │   ├── BudgetEstimator.tsx# Interactive INR budget calculator
    │   ├── CategoryFilters.tsx# Horizontal terrain pills
    │   ├── DestinationsGrid.tsx# Responsive card grid with pagination
    │   ├── EmptyState.tsx     # Reusable empty state view
    │   ├── ErrorState.tsx     # Reusable error boundary view
    │   ├── LoadingSkeleton.tsx# Card & map pulsing skeletons
    │   ├── MapPanel.tsx       # Google Maps API + SVG interactive map fallback
    │   ├── PlaceCard.tsx      # Destination card with actions
    │   ├── PlaceDetailsModal.tsx # Full modal with gallery, tips & transport
    │   ├── PlaceFilters.tsx   # Budget, season, region & sort controls
    │   ├── SearchHero.tsx     # Hero banner with search & suggestion chips
    │   ├── StarRating.tsx     # Star ratings display
    │   ├── Topbar.tsx         # Responsive navbar with counter badges
    │   └── TripPlannerPanel.tsx# Day-by-day stop organizer
    ├── context/
    │   ├── AuthContext.tsx    # Supabase Auth + local demo guest mode
    │   ├── FavoritesContext.tsx # Favorites state & persistence
    │   └── TripsContext.tsx   # Itinerary state, reordering & persistence
    ├── data/
    │   └── destinations.ts    # 22+ curated Indian destinations dataset
    ├── lib/
    │   ├── supabase/
    │   │   └── client.ts      # Supabase client factory & detection
    │   └── utils.ts           # INR currency, date formatting, budget math
    └── types/
        └── index.ts           # TypeScript interfaces and types
```
