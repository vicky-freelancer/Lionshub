# LocalHub - Community Business Discovery Platform

A full-stack, production-ready community business directory inspired by a simplified Justdial. LocalHub empowers local communities to discover services, artisans, retailers, and medical providers with instant search, category filtering, direct WhatsApp/phone contact, public enquiries, and zero-friction business listing.

---

## 🚀 Architecture Overview

```text
React 19 + TypeScript (Vite)
            │
            ▼ (REST API /api/*)
Express.js Backend (Node.js / TypeScript)
            │
            ▼
        Supabase
 ┌─────────────────────┐
 │ PostgreSQL Database │
 │ Supabase Storage    │
 └─────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios with unified error interceptors
- **Icons**: Lucide React

### Backend
- **Server**: Express.js with TypeScript (`tsx` in dev, `esbuild` for production `.cjs` bundle)
- **Database Client**: `@supabase/supabase-js` (with automatic in-memory seed fallback for instant local preview)
- **File Uploads**: Multer memory storage & Supabase Storage integration (`business-images` bucket)
- **Configuration**: Dotenv & CORS

### Database & Storage
- **Database**: Supabase PostgreSQL
- **Bucket**: Supabase Storage (`business-images`)

---

## 📂 Project Structure

```text
community-directory/
│
├── src/                               # React Frontend
│   ├── components/
│   │   ├── business/                  # BusinessCard, ServiceList, ProductGrid, EnquiryModal, GalleryModal
│   │   ├── category/                  # CategoryCard
│   │   ├── common/                    # LoadingSpinner, SkeletonCard, EmptyState, CategoryIcon
│   │   ├── layout/                    # Navbar, Footer
│   │   └── search/                    # SearchBar (hero and compact modes)
│   │
│   ├── pages/
│   │   ├── Home.tsx                   # Hero, Popular Categories, Featured Listings, How It Works, CTA
│   │   ├── SearchResults.tsx          # Keyword/Category/City search with active filter badges & pagination
│   │   ├── BusinessDetails.tsx        # Cover, Gallery, Services, Products, Call/WhatsApp/Enquiry
│   │   ├── Categories.tsx             # Directory of categories with live search
│   │   ├── CategoryBusinesses.tsx     # Filtered businesses by category slug & city
│   │   ├── ListBusiness.tsx           # Public business submission with multi-image upload
│   │   └── NotFound.tsx               # 404 page
│   │
│   ├── services/
│   │   ├── api.ts                     # Axios client
│   │   ├── businessService.ts         # Business CRUD & search API
│   │   ├── categoryService.ts         # Category retrieval API
│   │   └── enquiryService.ts          # Enquiry submission API
│   │
│   ├── types/                         # TypeScript interfaces (business, category, enquiry, api)
│   ├── App.tsx                        # Router configuration
│   ├── main.tsx                       # React DOM entry
│   └── index.css                      # Tailwind CSS v4
│
├── server/                            # Express Backend
│   ├── config/
│   │   └── supabase.ts                # Supabase client initializer & connection manager
│   ├── controllers/
│   │   ├── businessController.ts      # Search, getById, create business with images
│   │   ├── categoryController.ts      # Categories listing & slug lookup
│   │   └── enquiryController.ts       # Enquiry storage
│   ├── data/
│   │   └── fallbackStore.ts           # Built-in seed data & in-memory fallback engine
│   ├── middleware/
│   │   └── errorHandler.ts            # Global API error handler
│   ├── routes/
│   │   ├── businessRoutes.ts          # /api/businesses, /api/businesses/search, /api/businesses/:id
│   │   ├── categoryRoutes.ts          # /api/categories, /api/categories/:slug
│   │   └── enquiryRoutes.ts           # /api/enquiries, /api/enquiries/business/:id
│   ├── services/
│   │   └── storageService.ts          # Supabase Storage bucket uploader
│   └── app.ts                         # Express app configurator
│
├── database/
│   └── schema.sql                     # Full PostgreSQL DDL, indexes, RLS policies & seed data
│
├── server.ts                          # Root entry point with Vite middleware
├── metadata.json
├── package.json
└── README.md
```

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Create a new project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `database/schema.sql` and run it. This creates:
   - `categories` table with slug index
   - `businesses` table with foreign keys & search indexes
   - `business_services` table with cascade delete
   - `business_products` table with price & image URLs
   - `business_images` table for business gallery
   - `enquiries` table for customer submissions
   - Public Row Level Security (RLS) policies
   - `business-images` storage bucket configuration
   - Realistic initial seed data

4. In Supabase Project Settings -> API, retrieve:
   - `Project URL`
   - `service_role` secret key (or `anon` public key)

---

## 🔑 Environment Variables Configuration

Create a `.env` file in the root directory:

```env
# Port is 3000 in AI Studio / container runtime
PORT=3000

# Supabase Credentials (optional for live database sync)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ANON_KEY=your-supabase-anon-key
```

*Note: If Supabase credentials are not provided, LocalHub automatically activates an in-memory data store with realistic seed data, allowing complete end-to-end functionality right out of the box.*

---

## 💻 Local Development

Run the full-stack development environment:

```bash
# Install dependencies
npm install

# Start both Express backend and Vite frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🚢 Deployment Guide (Hostinger VPS / Cloud Run / Ubuntu)

### Step 1: Build the Application
```bash
npm run build
```
This builds the client assets into `dist/` and bundles `server.ts` into a standalone, production CommonJS file at `dist/server.cjs`.

### Step 2: Start the Production Server
```bash
npm start
```
(Runs `node dist/server.cjs`, serving the Express REST APIs and static React SPA).

### Step 3: Running with PM2 on VPS (Hostinger)
```bash
# Install PM2 process manager
npm install -g pm2

# Start the application
pm2 start dist/server.cjs --name "localhub"

# Enable auto-start on boot
pm2 startup
pm2 save
```

---

## 🔍 Core Features & User Journeys

1. **Multi-Field Search System**:
   - Searches across business name, category, services, products, description, and city.
   - Case-insensitive search with instant filter updates.
   - City and category dropdown filters.

2. **Direct Contact Without Middlemen**:
   - **Call Button**: Direct `tel:` link to initiate telephone calls.
   - **WhatsApp Button**: Opens chat with prefilled context message (`"Hello, I found your business on LocalHub..."`).
   - **Send Enquiry Modal**: Direct enquiry form saving customer requirements without requiring login.

3. **Public Business Listing (`/list-business`)**:
   - Clean, mobile-first multi-section form.
   - Dynamic service add/remove fields.
   - Dynamic product catalog builder with pricing.
   - Multi-photo gallery upload with local previews.
   - Direct upload to Supabase Storage (`business-images` bucket).
