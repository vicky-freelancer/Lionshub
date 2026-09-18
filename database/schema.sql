-- ==============================================================================
-- COMMUNITY BUSINESS DISCOVERY DIRECTORY - SUPABASE SQL SCHEMA & SEED DATA
-- Copy and paste this entire script directly into the Supabase SQL Editor and click Run.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fast fuzzy and text search

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Businesses Table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    address TEXT,
    city TEXT NOT NULL DEFAULT 'Trichy',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone TEXT NOT NULL,
    whatsapp TEXT,
    opening_hours TEXT,
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Services Table
CREATE TABLE IF NOT EXISTS public.business_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Products Table
CREATE TABLE IF NOT EXISTS public.business_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Images (Gallery) Table
CREATE TABLE IF NOT EXISTS public.business_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Customer Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_category_id ON public.businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON public.businesses(LOWER(city));
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON public.businesses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_business_id ON public.business_services(business_id);
CREATE INDEX IF NOT EXISTS idx_products_business_id ON public.business_products(business_id);
CREATE INDEX IF NOT EXISTS idx_images_business_id ON public.business_images(business_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_business_id ON public.enquiries(business_id);

-- Trigram index for fuzzy text search on business names & descriptions
CREATE INDEX IF NOT EXISTS idx_businesses_name_trgm ON public.businesses USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_businesses_desc_trgm ON public.businesses USING gin (description gin_trgm_ops);

-- ==============================================================================
-- 4. AUTOMATIC TIMESTAMP TRIGGER (updated_at)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_businesses_updated_at ON public.businesses;
CREATE TRIGGER set_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5.1 Public Read (SELECT) Policies
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view businesses" ON public.businesses;
CREATE POLICY "Public can view businesses" ON public.businesses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view business services" ON public.business_services;
CREATE POLICY "Public can view business services" ON public.business_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view business products" ON public.business_products;
CREATE POLICY "Public can view business products" ON public.business_products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view business images" ON public.business_images;
CREATE POLICY "Public can view business images" ON public.business_images FOR SELECT USING (true);

-- 5.2 Public Insert Policies (For listing new businesses & submitting enquiries)
DROP POLICY IF EXISTS "Public can insert businesses" ON public.businesses;
CREATE POLICY "Public can insert businesses" ON public.businesses FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert business services" ON public.business_services;
CREATE POLICY "Public can insert business services" ON public.business_services FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert business products" ON public.business_products;
CREATE POLICY "Public can insert business products" ON public.business_products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert business images" ON public.business_images;
CREATE POLICY "Public can insert business images" ON public.business_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- 6. SUPABASE STORAGE SETUP (business-images bucket)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('business-images', 'business-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read business images" ON storage.objects;
CREATE POLICY "Public can read business images" ON storage.objects 
FOR SELECT USING (bucket_id = 'business-images');

DROP POLICY IF EXISTS "Public can upload business images" ON storage.objects;
CREATE POLICY "Public can upload business images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'business-images');

-- ==============================================================================
-- 7. SEED DATA - CATEGORIES
-- ==============================================================================

INSERT INTO public.categories (id, name, slug, description, icon, image_url) VALUES
('c0101010-0001-0001-0001-000000000001', 'MUTUAL FUND DISTRIBUTOR', 'mutual-fund-distributor', 'Systematic Investment Plans (SIP), Equity & Debt Mutual Funds, Tax-Saving ELSS & Wealth Advisory', 'TrendingUp', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000002', 'EDUCATION – SCHOOL', 'education-school', 'Matriculation, CBSE, Primary & Higher Secondary Schools, Academic Foundations & Character Building', 'School', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000003', 'EDUCATION – DISTANCE EDUCATION', 'education-distance-education', 'Open University Admissions, UG/PG Degree Programs, Correspondence Courses & Career Counseling', 'Laptop', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000004', 'AUDIO – VISUAL EQUIPMENTS', 'audio-visual-equipments', 'Interactive Panels, Digital Projectors, PA Sound Systems, Office Automation & Boardroom Setups', 'Tv', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000005', 'AUDITOR – GST & TAX FILLING', 'auditor-gst-tax-filling', 'Income Tax Return (ITR) Filing, GST Returns & Registration, Balance Sheets, Audit & Accounting Services', 'Calculator', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000006', 'BUILDING CONTRACTOR', 'building-contractor', 'Residential & Commercial Construction, Civil Works, Architectural Elevations & Turnkey Projects', 'HardHat', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000007', 'BUSINESS LOAN', 'business-loan', 'MSME Loans, Working Capital (CC/OD), Machinery Financing, Project Funding & Bank Loan Advisory', 'HandCoins', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80'),
('c0101010-0001-0001-0001-000000000008', 'SHARE INVESTMENT', 'share-investment', 'Stock Market Trading, Equity Advisory, Demat Services, Technical Analysis & Derivatives Guidance', 'CandlestickChart', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80'),
('c1111111-1111-1111-1111-111111111111', 'Home Services', 'home-services', 'Plumbing, Electrical, Carpentry, AC Repair, Cleaning & Painting', 'Wrench', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'),
('c2222222-2222-2222-2222-222222222222', 'Restaurants & Food', 'restaurants-food', 'Cafes, Bakeries, Family Restaurants, Catering & Sweets', 'UtensilsCrossed', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'),
('c3333333-3333-3333-3333-333333333333', 'Health & Medical', 'health-medical', 'Clinics, Pharmacies, Diagnostic Centers, Dental & Physio', 'Stethoscope', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80'),
('c4444444-4444-4444-4444-444444444444', 'Automotive', 'automotive', 'Car Repair, Bike Service, Tire Shop, Car Wash & Accessories', 'Car', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'),
('c5555555-5555-5555-5555-555555555555', 'Beauty & Wellness', 'beauty-wellness', 'Salons, Spas, Barbers, Skincare & Wellness centers', 'Sparkles', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'),
('c6666666-6666-6666-6666-666666666666', 'Education & Coaching', 'education-coaching', 'Tutors, Driving Schools, Music Classes & Skill Academies', 'GraduationCap', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'),
('c7777777-7777-7777-7777-777777777777', 'Shopping & Retail', 'shopping-retail', 'Clothing, Electronics, Grocery, Hardware & Gifts', 'ShoppingBag', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'),
('c8888888-8888-8888-8888-888888888888', 'Professional Services', 'professional-services', 'Accounting, Legal, Printing, Photography & Real Estate', 'Briefcase', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url;

-- ==============================================================================
-- 8. SEED DATA - BUSINESSES
-- ==============================================================================

INSERT INTO public.businesses (id, name, description, category_id, address, city, latitude, longitude, phone, whatsapp, opening_hours, cover_image) VALUES
-- 1. MUTUAL FUND DISTRIBUTORS
('b0101010-0001-0001-0001-000000000001', 'SURABHI INVESTMENT', 'Trusted Mutual Fund Distributor located at Jenne Plaza, Trichy. Specializing in Systematic Investment Plans (SIP), high-growth equity funds, tax-saving ELSS schemes, retirement planning, and personalized wealth portfolio management.', 'c0101010-0001-0001-0001-000000000001', 'Jenne Plaza, Trichy', 'Trichy', 10.8035, 78.6876, '+91 98424 55120', '+919842455120', 'Mon - Sat: 9:30 AM - 7:00 PM (Sunday Closed)', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'),
('b0101010-0001-0001-0001-000000000002', 'SAMPATH', 'Experienced Mutual Fund Distributor based in Srirangam, Trichy. Providing trusted financial guidance, lumpsum and SIP investments, hybrid mutual funds, and long-term capital appreciation strategies.', 'c0101010-0001-0001-0001-000000000001', 'Srirangam, Trichy', 'Trichy', 10.8622, 78.6946, '+91 94431 22890', '+919443122890', 'Mon - Sat: 9:00 AM - 6:30 PM', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'),
('b0101010-0001-0001-0001-000000000003', 'ANNAMALAI', 'Professional Mutual Fund Consultant in Ramalingam Nagar, Trichy. Helping salaried individuals, NRIs, and business owners navigate mutual fund investments, risk profiling, and high-yield asset diversification.', 'c0101010-0001-0001-0001-000000000001', 'Ramalingam Nagar, Trichy', 'Trichy', 10.8245, 78.6792, '+91 98424 88310', '+919842488310', 'Mon - Sat: 10:00 AM - 7:30 PM', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'),

-- 2. EDUCATION SCHOOL
('b0101010-0001-0001-0001-000000000004', 'SRI VIVEKANANDA MATRICULATION SCHOOL', 'Renowned educational institution located in Lalgudi, Trichy. Providing top-tier matriculation education from kindergarten through higher secondary, with modern science laboratories, digital smart classrooms, sports training, and moral character development.', 'c0101010-0001-0001-0001-000000000002', 'Lalgudi, Trichy', 'Trichy', 10.8718, 78.8183, '+91 94433 67120', '+919443367120', 'Mon - Fri: 8:30 AM - 4:30 PM, Sat: 8:30 AM - 1:00 PM', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'),

-- 3. EDUCATION – DISTANCE EDUCATION
('b0101010-0001-0001-0001-000000000005', 'LEARNERS ACADEMY', 'Premier Distance Education and Open University Guidance Center at Jenne Plaza, Trichy. Guiding students, working professionals, and career seekers with UGC-recognized undergraduate (BA, B.Com, B.Sc, BBA, BCA) and postgraduate (MBA, MCA, M.Com, MA) admissions, study materials, and examination guidance.', 'c0101010-0001-0001-0001-000000000003', 'Jenne Plaza, Trichy', 'Trichy', 10.8035, 78.6876, '+91 98424 33650', '+919842433650', 'Mon - Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 1:00 PM', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'),

-- 4. AUDIO – VISUAL EQUIPMENTS
('b0101010-0001-0001-0001-000000000006', 'FOCUS OFFICE', 'Leading Audio-Visual, Commercial Display, and Smart Classroom solutions provider at MM Lotus, Ramalingam Nagar, Trichy. Specializing in Interactive Flat Panels, 4K Projectors, Boardroom Video Conferencing, PA Sound Systems, and Office Automation hardware.', 'c0101010-0001-0001-0001-000000000004', 'MM Lotus, Ramalingam Nagar, Trichy', 'Trichy', 10.8245, 78.6792, '+91 98430 77410', '+919843077410', 'Mon - Sat: 9:30 AM - 8:00 PM', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'),

-- 5. AUDITOR – GST & TAX FILLING
('b0101010-0001-0001-0001-000000000007', 'MURUGANANTHAM', 'Expert Tax Practitioner and Auditor situated opposite Aruna Theatre, Ramalinga Nagar, Trichy. Providing professional GST registration, monthly GST returns, Income Tax (ITR) filing, TDS statements, book-keeping, and business financial compliance.', 'c0101010-0001-0001-0001-000000000005', 'OPP Aruna Theatre, Ramalinga Nagar, Trichy', 'Trichy', 10.8250, 78.6800, '+91 94431 88520', '+919443188520', 'Mon - Sat: 9:30 AM - 8:00 PM', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'),
('b0101010-0001-0001-0001-000000000008', 'SUNDARARAJAN', 'Senior Auditor and Tax Consultant located Near Kalaignar Arivalayam, Trichy. Specializing in statutory company audits, partnership firm accounting, GST annual returns (GSTR-9/9C), PAN/MSME registration, and commercial financial statements.', 'c0101010-0001-0001-0001-000000000005', 'Near Kalaignar Arivalayam, Trichy', 'Trichy', 10.8170, 78.6920, '+91 98424 99180', '+919842499180', 'Mon - Sat: 9:00 AM - 7:30 PM', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'),

-- 6. BUILDING CONTRACTOR
('b0101010-0001-0001-0001-000000000009', 'PAKKRISAMY', 'Reputed Building Contractor based in Jeeyapuram, Trichy. Providing quality turnkey residential house construction, commercial buildings, structural foundation works, elevation design, renovation, and civil contracting with on-time delivery.', 'c0101010-0001-0001-0001-000000000006', 'Jeeyapuram, Trichy', 'Trichy', 10.8520, 78.6180, '+91 98432 11470', '+919843211470', 'Mon - Sat: 8:00 AM - 7:00 PM', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'),

-- 7. BUSINESS LOAN
('b0101010-0001-0001-0001-000000000010', 'MUTHUKUMAR', 'Senior Business Loan Advisor operating across Trichy and Tamil Nadu. Specializing in MSME business loans, collateral-free CGTMSE loans, Cash Credit (CC) & Overdraft (OD) limits, machinery loans, and bank project report preparation.', 'c0101010-0001-0001-0001-000000000007', 'Advisor, Trichy', 'Trichy', 10.8050, 78.6850, '+91 94437 55820', '+919443755820', 'Mon - Sat: 9:30 AM - 7:00 PM', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80'),

-- 8. SHARE INVESTMENT
('b0101010-0001-0001-0001-000000000011', 'RAJU', 'Expert Share Investment Advisor in Trichy. Offering equity market advisory, stock research, Demat and trading account opening, long-term multi-bagger stock selection, technical swing trading strategies, and options hedging.', 'c0101010-0001-0001-0001-000000000008', 'Share Investment Advisor, Trichy', 'Trichy', 10.8080, 78.6890, '+91 98424 66290', '+919842466290', 'Mon - Fri: 8:45 AM - 6:00 PM (Market Hours & Evening Review)', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  opening_hours = EXCLUDED.opening_hours,
  cover_image = EXCLUDED.cover_image;

-- ==============================================================================
-- 9. SEED DATA - SERVICES
-- ==============================================================================

INSERT INTO public.business_services (id, business_id, name, description) VALUES
-- SURABHI INVESTMENT
('s0101010-0001-0001-0001-000000000001', 'b0101010-0001-0001-0001-000000000001', 'Systematic Investment Plan (SIP) Setup', 'Personalized goal-oriented SIP structuring for education, marriage, and retirement.'),
('s0101010-0001-0001-0001-000000000002', 'b0101010-0001-0001-0001-000000000001', 'Tax-Saving ELSS Fund Advisory', 'Section 80C tax deduction optimization with 3-year lock-in high performance equity schemes.'),
('s0101010-0001-0001-0001-000000000003', 'b0101010-0001-0001-0001-000000000001', 'Portfolio Rebalancing & Health Check', 'Comprehensive annual portfolio review and asset allocation alignment.'),

-- SAMPATH
('s0101010-0001-0001-0001-000000000004', 'b0101010-0001-0001-0001-000000000002', 'Mutual Fund Distribution & Advisory', 'Selection of top AMFI-registered mutual fund schemes across debt, hybrid, and equity.'),
('s0101010-0001-0001-0001-000000000005', 'b0101010-0001-0001-0001-000000000002', 'Child Higher Education Fund Planning', 'Calculated target corpus creation with inflation-adjusted investment roadmaps.'),

-- ANNAMALAI
('s0101010-0001-0001-0001-000000000006', 'b0101010-0001-0001-0001-000000000003', 'Goal-Based Financial Planning', 'Aligning mutual fund schemes directly with milestone time horizons.'),
('s0101010-0001-0001-0001-000000000007', 'b0101010-0001-0001-0001-000000000003', 'NRI Investment & KYC Assistance', 'Assisting non-resident Indians with NRE/NRO mutual fund accounts and tax compliance.'),

-- SRI VIVEKANANDA MATRICULATION SCHOOL
('s0101010-0001-0001-0001-000000000008', 'b0101010-0001-0001-000000000004', 'Matriculation Curriculum (Pre-KG to 12th Std)', 'Rigorous academic coaching with state board excellence and competitive exam preparation.'),
('s0101010-0001-0001-0001-000000000009', 'b0101010-0001-0001-000000000004', 'Smart Classroom & Practical Science Labs', 'Fully equipped physics, chemistry, biology, and computerized STEM labs.'),

-- LEARNERS ACADEMY
('s0101010-0001-0001-0001-000000000010', 'b0101010-0001-0001-000000000005', 'Open University Admissions (UG / PG / Diploma)', 'Direct enrollment in top accredited state and central distance universities.'),
('s0101010-0001-0001-0001-000000000011', 'b0101010-0001-0001-000000000005', 'Executive MBA & Fast-Track Degree Guidance', 'Flexible weekend and online degree pathways tailored for working corporate professionals.'),

-- FOCUS OFFICE
('s0101010-0001-0001-0001-000000000012', 'b0101010-0001-0001-000000000006', 'Boardroom & Conference AV Integration', 'End-to-end multi-mic audio conferencing, 4K PTZ cameras, and wireless display integration.'),
('s0101010-0001-0001-0001-000000000013', 'b0101010-0001-0001-000000000006', 'Smart Classroom & Interactive Panel Setup', 'Supply, wall-mounting, software installation, and teacher training for interactive flat panels.'),

-- MURUGANANTHAM
('s0101010-0001-0001-0001-000000000014', 'b0101010-0001-0001-000000000007', 'GST Monthly Return Filing (GSTR-1 & 3B)', 'Timely input tax credit (ITC) reconciliation, invoice matching, and return submissions.'),
('s0101010-0001-0001-0001-000000000015', 'b0101010-0001-0001-000000000007', 'Individual & Corporate Income Tax (ITR) Filing', 'ITR-1 to ITR-7 filings with maximal legal deductions, capital gains, and refund processing.'),

-- SUNDARARAJAN
('s0101010-0001-0001-0001-000000000016', 'b0101010-0001-0001-000000000008', 'Statutory Audit & Balance Sheet Finalization', 'Comprehensive audit reports, profit & loss statements, and depreciation scheduling.'),
('s0101010-0001-0001-0001-000000000017', 'b0101010-0001-0001-000000000008', 'GST Annual Audit & Reconciliation (GSTR-9/9C)', 'Auditor verification, difference tax resolution, and departmental notice compliance.'),

-- PAKKRISAMY
('s0101010-0001-0001-0001-000000000018', 'b0101010-0001-0001-000000000009', 'Turnkey Residential Villa Construction', 'Complete structural construction with quality cement, steel, bricks, plumbing, and electrical works.'),
('s0101010-0001-0001-0001-000000000019', 'b0101010-0001-0001-000000000009', 'RCC Foundation & Structural Civil Works', 'Soil testing, pillar foundation, beam reinforcement, and multi-storey framing.'),

-- MUTHUKUMAR
('s0101010-0001-0001-0001-000000000020', 'b0101010-0001-0001-000000000010', 'MSME & Unsecured Business Loans', 'Fast processing unsecured business funding from top nationalized and private banks.'),
('s0101010-0001-0001-0001-000000000021', 'b0101010-0001-0001-000000000010', 'Working Capital (CC / OD Limits)', 'Working capital enhancement based on business turnover and GST filings.'),

-- RAJU
('s0101010-0001-0001-0001-000000000022', 'b0101010-0001-0001-000000000011', 'Direct Equity Investment Advisory', 'Fundamental analysis and high-growth Indian stock picks for capital appreciation.'),
('s0101010-0001-0001-0001-000000000023', 'b0101010-0001-0001-000000000011', 'Demat & Online Trading Account Opening', 'Instant paperless Demat account onboarding with zero account opening fee.')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 10. SEED DATA - PRODUCTS
-- ==============================================================================

INSERT INTO public.business_products (id, business_id, name, description, price, image_url) VALUES
('p0101010-0001-0001-0001-000000000001', 'b0101010-0001-0001-0001-000000000001', 'Comprehensive Wealth Creation Plan', 'Structured multi-asset mutual fund portfolio tailored for 5-15 year horizons.', 0, 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000002', 'b0101010-0001-0001-000000000004', 'Academic Admission & Prospectus Kit', 'Complete application packet, syllabus guides, and campus orientation kit.', 500, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000003', 'b0101010-0001-0001-000000000005', 'Distance Degree Enrollment Package', 'Includes registration, university verification, textbook kits, and exam notifications.', 2500, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000004', 'b0101010-0001-0001-000000000006', '65-Inch 4K UHD Interactive Flat Panel (IFP)', 'Multi-touch Android 13 smart panel with anti-glare toughened glass and dual stylus.', 85000, 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000005', 'b0101010-0001-0001-000000000007', 'Annual Business GST & Accounting Retainer', 'End-to-end 12-month book-keeping, monthly GST returns, and annual tax finalization.', 15000, 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000006', 'b0101010-0001-0001-000000000009', 'Standard Turnkey Construction (Per Sq.Ft)', 'Includes materials, labor, foundation, tiling, painting, and ISI electrical fittings.', 2150, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000007', 'b0101010-0001-0001-000000000010', 'Bank Project Report & CMA Data Preparation', 'Comprehensive financial projections, debt service coverage ratio (DSCR), and balance sheet models for bank sanction.', 5000, 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80'),
('p0101010-0001-0001-0001-000000000008', 'b0101010-0001-0001-000000000011', 'Bluechip Long-Term Equity Portfolio Plan', 'Curated 15-stock wealth portfolio focused on resilient dividend and compounding companies.', 0, 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 11. SEED DATA - GALLERY IMAGES
-- ==============================================================================

INSERT INTO public.business_images (id, business_id, image_url) VALUES
('i0101010-0001-0001-0001-000000000001', 'b0101010-0001-0001-0001-000000000001', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000002', 'b0101010-0001-0001-000000000004', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000003', 'b0101010-0001-0001-000000000005', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000004', 'b0101010-0001-0001-000000000006', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000005', 'b0101010-0001-0001-000000000007', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000006', 'b0101010-0001-0001-000000000009', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000007', 'b0101010-0001-0001-000000000010', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80'),
('i0101010-0001-0001-0001-000000000008', 'b0101010-0001-0001-000000000011', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 12. HELPER VIEW FOR CATEGORIES WITH BUSINESS COUNT
-- ==============================================================================

CREATE OR REPLACE VIEW public.categories_with_count AS
SELECT 
    c.id,
    c.name,
    c.slug,
    c.description,
    c.icon,
    c.image_url,
    c.created_at,
    COUNT(b.id)::INTEGER AS business_count
FROM public.categories c
LEFT JOIN public.businesses b ON b.category_id = c.id
GROUP BY c.id, c.name, c.slug, c.description, c.icon, c.image_url, c.created_at;
