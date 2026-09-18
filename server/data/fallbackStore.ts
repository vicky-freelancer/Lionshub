import { Category } from '../../src/types/category';
import { Business, BusinessService, BusinessProduct, BusinessImage } from '../../src/types/business';
import { Enquiry } from '../../src/types/enquiry';

export interface FallbackDatabase {
  categories: Category[];
  businesses: Business[];
  enquiries: Enquiry[];
}

export const fallbackCategories: Category[] = [
  {
    id: 'cat-mutual-fund-distributor',
    name: 'MUTUAL FUND DISTRIBUTOR',
    slug: 'mutual-fund-distributor',
    description: 'Systematic Investment Plans (SIP), Equity & Debt Mutual Funds, Tax-Saving ELSS & Wealth Advisory in Trichy',
    icon: 'TrendingUp',
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-education-school',
    name: 'EDUCATION – SCHOOL',
    slug: 'education-school',
    description: 'Matriculation, CBSE, Primary & Higher Secondary Schools, Academic Foundations & Character Building in Trichy',
    icon: 'School',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-education-distance',
    name: 'EDUCATION – DISTANCE EDUCATION',
    slug: 'education-distance-education',
    description: 'Open University Admissions, UG/PG Degree Programs, Correspondence Courses & Career Counseling in Trichy',
    icon: 'Laptop',
    image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-audio-visual',
    name: 'AUDIO – VISUAL EQUIPMENTS',
    slug: 'audio-visual-equipments',
    description: 'Interactive Panels, Digital Projectors, PA Sound Systems, Office Automation & Boardroom Setups in Trichy',
    icon: 'Tv',
    image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-auditor-tax',
    name: 'AUDITOR – GST & TAX FILLING',
    slug: 'auditor-gst-tax-filling',
    description: 'Income Tax Return (ITR) Filing, GST Returns & Registration, Balance Sheets, Audit & Accounting Services in Trichy',
    icon: 'Calculator',
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-building-contractor',
    name: 'BUILDING CONTRACTOR',
    slug: 'building-contractor',
    description: 'Residential & Commercial Construction, Civil Works, Architectural Elevations & Turnkey Projects in Trichy',
    icon: 'HardHat',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-business-loan',
    name: 'BUSINESS LOAN',
    slug: 'business-loan',
    description: 'MSME Loans, Working Capital (CC/OD), Machinery Financing, Project Funding & Bank Loan Advisory in Trichy',
    icon: 'HandCoins',
    image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-share-investment',
    name: 'SHARE INVESTMENT',
    slug: 'share-investment',
    description: 'Stock Market Trading, Equity Advisory, Demat Services, Technical Analysis & Derivatives Guidance in Trichy',
    icon: 'CandlestickChart',
    image_url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
  },
];

export const fallbackBusinesses: Business[] = [
  // 1. MUTUAL FUND DISTRIBUTOR - A. SURABHI INVESTMENT
  {
    id: 'biz-surabhi-investment',
    name: 'SURABHI INVESTMENT',
    description: 'Trusted Mutual Fund Distributor located at Jenne Plaza, Trichy. Specializing in Systematic Investment Plans (SIP), high-growth equity funds, tax-saving ELSS schemes, retirement planning, and personalized wealth portfolio management.',
    category_id: 'cat-mutual-fund-distributor',
    category: fallbackCategories[0],
    address: 'Jenne Plaza, Trichy',
    city: 'Trichy',
    latitude: 10.8035,
    longitude: 78.6876,
    phone: '+91 98424 55120',
    whatsapp: '+919842455120',
    opening_hours: 'Mon - Sat: 9:30 AM - 7:00 PM (Sunday Closed)',
    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-15T09:00:00Z',
    services: [
      { id: 'srv-surabhi-1', name: 'Systematic Investment Plan (SIP) Setup', description: 'Personalized goal-oriented SIP structuring for education, marriage, and retirement.' },
      { id: 'srv-surabhi-2', name: 'Tax-Saving ELSS Fund Advisory', description: 'Section 80C tax deduction optimization with 3-year lock-in high performance equity schemes.' },
      { id: 'srv-surabhi-3', name: 'Portfolio Rebalancing & Health Check', description: 'Comprehensive annual portfolio review and asset allocation alignment.' },
    ],
    products: [
      { id: 'prd-surabhi-1', name: 'Comprehensive Wealth Creation Plan', description: 'Structured multi-asset mutual fund portfolio tailored for 5-15 year horizons.', price: 0, image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=500&q=80' },
      { id: 'prd-surabhi-2', name: 'Retirement Freedom Corpus Blueprint', description: 'Systematic withdrawal and monthly income generation roadmap for seniors.', price: 0, image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-surabhi-1', image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80' },
      { id: 'img-surabhi-2', image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 1. MUTUAL FUND DISTRIBUTOR - B. SAMPATH
  {
    id: 'biz-sampath-mutual-funds',
    name: 'SAMPATH',
    description: 'Experienced Mutual Fund Distributor based in Srirangam, Trichy. Providing trusted financial guidance, lumpsum and SIP investments, hybrid mutual funds, and long-term capital appreciation strategies.',
    category_id: 'cat-mutual-fund-distributor',
    category: fallbackCategories[0],
    address: 'Srirangam, Trichy',
    city: 'Trichy',
    latitude: 10.8622,
    longitude: 78.6946,
    phone: '+91 94431 22890',
    whatsapp: '+919443122890',
    opening_hours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    cover_image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-14T10:30:00Z',
    services: [
      { id: 'srv-sampath-1', name: 'Mutual Fund Distribution & Advisory', description: 'Selection of top AMFI-registered mutual fund schemes across debt, hybrid, and equity.' },
      { id: 'srv-sampath-2', name: 'Child Higher Education Fund Planning', description: 'Calculated target corpus creation with inflation-adjusted investment roadmaps.' },
      { id: 'srv-sampath-3', name: 'Lumpsum & Liquid Fund Solutions', description: 'Short-term and liquid mutual fund parking for surplus business and personal cash.' },
    ],
    products: [
      { id: 'prd-sampath-1', name: 'Balanced Advantage Dynamic Portfolio', description: 'Automatic equity-debt allocation management for volatile market phases.', price: 0, image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-sampath-1', image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 1. MUTUAL FUND DISTRIBUTOR - C. ANNAMALAI
  {
    id: 'biz-annamalai-investments',
    name: 'ANNAMALAI',
    description: 'Professional Mutual Fund Consultant in Ramalingam Nagar, Trichy. Helping salaried individuals, NRIs, and business owners navigate mutual fund investments, risk profiling, and high-yield asset diversification.',
    category_id: 'cat-mutual-fund-distributor',
    category: fallbackCategories[0],
    address: 'Ramalingam Nagar, Trichy',
    city: 'Trichy',
    latitude: 10.8245,
    longitude: 78.6792,
    phone: '+91 98424 88310',
    whatsapp: '+919842488310',
    opening_hours: 'Mon - Sat: 10:00 AM - 7:30 PM',
    cover_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-13T11:15:00Z',
    services: [
      { id: 'srv-annamalai-1', name: 'Goal-Based Financial Planning', description: 'Aligning mutual fund schemes directly with milestone time horizons.' },
      { id: 'srv-annamalai-2', name: 'NRI Investment & KYC Assistance', description: 'Assisting non-resident Indians with NRE/NRO mutual fund accounts and tax compliance.' },
      { id: 'srv-annamalai-3', name: 'Fund Switching & Systematic Transfer (STP)', description: 'Strategic phased transfer from liquid funds into high-potential equity schemes.' },
    ],
    products: [
      { id: 'prd-annamalai-1', name: 'Flexi-Cap & Large Cap Growth Basket', description: 'Diversified equity basket focusing on top Indian blue-chip corporations.', price: 0, image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-annamalai-1', image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 2. EDUCATION SCHOOL - A. SRI VIVEKANANDA MATRICULATION SCHOOL
  {
    id: 'biz-sri-vivekananda-school',
    name: 'SRI VIVEKANANDA MATRICULATION SCHOOL',
    description: 'Renowned educational institution located in Lalgudi, Trichy. Providing top-tier matriculation education from kindergarten through higher secondary, with modern science laboratories, digital smart classrooms, sports training, and moral character development.',
    category_id: 'cat-education-school',
    category: fallbackCategories[1],
    address: 'Lalgudi, Trichy',
    city: 'Trichy',
    latitude: 10.8718,
    longitude: 78.8183,
    phone: '+91 94433 67120',
    whatsapp: '+919443367120',
    opening_hours: 'Mon - Fri: 8:30 AM - 4:30 PM, Sat: 8:30 AM - 1:00 PM',
    cover_image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-12T08:00:00Z',
    services: [
      { id: 'srv-school-1', name: 'Matriculation Curriculum (Pre-KG to 12th Std)', description: 'Rigorous academic coaching with state board excellence and competitive exam preparation.' },
      { id: 'srv-school-2', name: 'Smart Classroom & Practical Science Labs', description: 'Fully equipped physics, chemistry, biology, and computerized STEM labs.' },
      { id: 'srv-school-3', name: 'Sports Academy & Cultural Enrichment', description: 'Cricket, athletics, yoga, and classical arts coaching with inter-school participation.' },
    ],
    products: [
      { id: 'prd-school-1', name: 'Academic Admission Kit & Prospectus', description: 'Complete curriculum handbook, scholarship criteria, and application package.', price: 250, image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-school-1', image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 3. EDUCATION – DISTANCE EDUCATION - A. LEARNERS ACADEMY
  {
    id: 'biz-learners-academy',
    name: 'LEARNERS ACADEMY',
    description: 'Premier distance education guidance and admission center located at Jenne Plaza, Trichy. Authorized admission center for leading UGC & DEB recognized open universities offering BA, B.Sc, B.Com, MBA, MCA, M.Sc, and professional diploma programs for working executives and students.',
    category_id: 'cat-education-distance',
    category: fallbackCategories[2],
    address: 'Jenne Plaza, Trichy',
    city: 'Trichy',
    latitude: 10.8035,
    longitude: 78.6876,
    phone: '+91 98424 99180',
    whatsapp: '+919842499180',
    opening_hours: 'Mon - Sat: 9:30 AM - 7:30 PM',
    cover_image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-11T09:00:00Z',
    services: [
      { id: 'srv-learners-1', name: 'UGC-Approved Degree Admissions', description: 'Direct enrollment support for recognized undergraduate and postgraduate degrees.' },
      { id: 'srv-learners-2', name: 'Executive MBA & PG Program Counseling', description: 'Guidance on career-advancing specializations in Finance, HR, Marketing, and Operations.' },
      { id: 'srv-learners-3', name: 'Study Kits & Assignment Mentorship', description: 'Comprehensive study materials, project guidance, and exam registration support.' },
    ],
    products: [
      { id: 'prd-learners-1', name: 'Executive MBA Admission & Material Kit', description: 'Curriculum syllabus, question banks, and complete degree roadmap.', price: 1500, image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-learners-1', image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 4. AUDIO – VISUAL EQUIPMENTS - A. FOCUS OFFICE
  {
    id: 'biz-focus-office',
    name: 'FOCUS OFFICE',
    description: 'Premier Audio-Visual equipment provider and office automation specialists at MM Lotus, Ramalingam Nagar, Trichy. Providing 4K interactive touch panels, high-lumen projectors, boardroom video conferencing, motorized screens, and PA sound systems.',
    category_id: 'cat-audio-visual',
    category: fallbackCategories[3],
    address: 'MM Lotus, Ramalingam Nagar, Trichy',
    city: 'Trichy',
    latitude: 10.8245,
    longitude: 78.6792,
    phone: '+91 94431 55670',
    whatsapp: '+919443155670',
    opening_hours: 'Mon - Sat: 9:30 AM - 8:00 PM',
    cover_image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-10T10:00:00Z',
    services: [
      { id: 'srv-focus-1', name: 'Interactive Flat Panel (IFPD) Installation', description: 'Smart touch panels (65", 75", 86") for schools, colleges, and training institutes.' },
      { id: 'srv-focus-2', name: 'Digital Projector & Screen Setup', description: 'Full HD & 4K laser projectors with motorized drop-down projection screens.' },
      { id: 'srv-focus-3', name: 'Boardroom Video Conferencing Integration', description: 'AI camera tracking, beamforming microphone arrays, and wireless presentation systems.' },
    ],
    products: [
      { id: 'prd-focus-1', name: '75-Inch 4K UHD Interactive Flat Panel', description: 'Ultra-responsive touch display with dual OS (Android & Windows) support.', price: 125000, image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=500&q=80' },
      { id: 'prd-focus-2', name: 'Laser Projector 4500 Lumens Full HD', description: 'Long-life solid-state laser light source for crystal clear corporate presentations.', price: 62000, image_url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-focus-1', image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 5. AUDITOR – GST & TAX FILLING - A. MURUGANANTHAM
  {
    id: 'biz-muruganantham-auditor',
    name: 'MURUGANANTHAM',
    description: 'Senior Tax Consultant & Auditor located opposite Aruna Theatre, Ramalinga Nagar, Trichy. Providing comprehensive GST registration, monthly GSTR 1/3B filing, Income Tax Return (ITR) preparation, business audits, and financial accounting.',
    category_id: 'cat-auditor-tax',
    category: fallbackCategories[4],
    address: 'OPP Aruna Theatre, Ramalinga Nagar,, Trichy',
    city: 'Trichy',
    latitude: 10.8245,
    longitude: 78.6792,
    phone: '+91 94432 44100',
    whatsapp: '+919443244100',
    opening_hours: 'Mon - Sat: 9:30 AM - 7:30 PM',
    cover_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-08T09:00:00Z',
    services: [
      { id: 'srv-muru-1', name: 'Income Tax Return (ITR) Filing', description: 'Expert return filing for salaried individuals, professionals, and proprietorships.' },
      { id: 'srv-muru-2', name: 'GST Registration & Monthly Compliance', description: 'GSTR-1, GSTR-3B filings, ITC reconciliation, and departmental notices handling.' },
      { id: 'srv-muru-3', name: 'Business Accounting & Balance Sheet Finalization', description: 'P&L accounts, book-keeping, and audit readiness.' },
    ],
    products: [
      { id: 'prd-muru-1', name: 'Annual Individual & Business Tax Package', description: 'Complete year-round tax calculation, advance tax advice, and ITR e-filing.', price: 4500, image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-muru-1', image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 5. AUDITOR – GST & TAX FILLING - B. SUNDARARAJAN
  {
    id: 'biz-sundararajan-auditor',
    name: 'SUNDARARAJAN',
    description: 'Trusted Chartered Accountant & Tax Advisor situated near Kalaignar Arivalayam, Trichy. Specializing in corporate tax planning, GST audit, company registration (Pvt Ltd / LLP), TDS returns, and statutory representations.',
    category_id: 'cat-auditor-tax',
    category: fallbackCategories[4],
    address: 'Near Kalaignar Arivalayam, Trichy',
    city: 'Trichy',
    latitude: 10.8285,
    longitude: 78.6820,
    phone: '+91 94433 11880',
    whatsapp: '+919443311880',
    opening_hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    cover_image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-07T10:00:00Z',
    services: [
      { id: 'srv-sundar-1', name: 'Corporate Tax & Statutory Audits', description: 'Auditing of financial statements for companies, partnerships, and trusts.' },
      { id: 'srv-sundar-2', name: 'GST Audit & Annual Return (GSTR-9/9C)', description: 'Detailed scrutiny and reconciliation for GST compliant enterprises.' },
      { id: 'srv-sundar-3', name: 'Company Incorporation & ROC Filings', description: 'Fast company registration, DIN/DSC allotment, and annual ROC filings.' },
    ],
    products: [
      { id: 'prd-sundar-1', name: 'Corporate Retainership & Tax Package', description: 'Monthly GST, quarterly TDS, payroll tax deductions, and annual audit.', price: 18000, image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-sundar-1', image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 6. BUILDING CONTRACTOR - A. PAKKRISAMY
  {
    id: 'biz-pakkrisamy-contractor',
    name: 'PAKKRISAMY',
    description: 'Reputed Building Contractor based in Jeeyapuram, Trichy. Providing top-quality residential house construction, commercial building contracts, architectural elevation, foundation civil works, and timely project delivery.',
    category_id: 'cat-building-contractor',
    category: fallbackCategories[5],
    address: 'Jeeyapuram, Trichy',
    city: 'Trichy',
    latitude: 10.8580,
    longitude: 78.6010,
    phone: '+91 98424 11200',
    whatsapp: '+919443411200',
    opening_hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-06T10:00:00Z',
    services: [
      { id: 'srv-pak-1', name: 'Turnkey Residential Construction', description: 'Complete structural construction, brickwork, plastering, plumbing, and electrical finishes.' },
      { id: 'srv-pak-2', name: 'Commercial Building Civil Contracts', description: 'RCC frameworks, industrial sheds, and multi-storey commercial complexes.' },
      { id: 'srv-pak-3', name: 'Renovation, Remodeling & Elevation', description: 'Modern front elevations, roof waterproofing, and structural reinforcement.' },
    ],
    products: [
      { id: 'prd-pak-1', name: 'Custom Villa Construction Package (Per Sq. Ft.)', description: 'Comprehensive material + labor package with grade-A cement and TMT steel.', price: 2150, image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-pak-1', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 7. BUSINESS LOAN - A. MUTHUKUMAR
  {
    id: 'biz-muthukumar-loans',
    name: 'MUTHUKUMAR',
    description: 'Expert Business Loan Advisor based in Trichy. Assisting MSMEs, traders, manufacturers, and service enterprises in securing fast business loans, working capital overdrafts (CC/OD), machinery financing, and loan against property (LAP) through top banks and NBFCs.',
    category_id: 'cat-business-loan',
    category: fallbackCategories[6],
    address: 'Advisor, Trichy',
    city: 'Trichy',
    latitude: 10.8210,
    longitude: 78.6750,
    phone: '+91 94432 77890',
    whatsapp: '+919443277890',
    opening_hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
    cover_image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-03T11:00:00Z',
    services: [
      { id: 'srv-muthu-1', name: 'Unsecured MSME Business Loans', description: 'Collateral-free business expansion loans from ₹5 Lakhs to ₹75 Lakhs with swift approval.' },
      { id: 'srv-muthu-2', name: 'Working Capital & Cash Credit (CC / OD)', description: 'Flexible overdraft limits against stock and book debts at competitive interest rates.' },
      { id: 'srv-muthu-3', name: 'Machinery & Equipment Term Loans', description: 'Financing for new manufacturing machinery with government subsidy coordination.' },
    ],
    products: [
      { id: 'prd-muthu-1', name: 'Business Loan Assessment & Bank Syndication', description: 'Project report preparation, balance sheet appraisal, and rapid sanctioning.', price: 0, image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-muthu-1', image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  // 8. SHARE INVESTMENT - A. RAJU
  {
    id: 'biz-raju-share-advisor',
    name: 'RAJU',
    description: 'Professional Share Investment Advisor in Trichy. Providing Demat and trading account setup, equity research calls, portfolio diversification, technical chart analysis, and wealth advisory for stock market investors.',
    category_id: 'cat-share-investment',
    category: fallbackCategories[7],
    address: 'Share Investment Advisor, Trichy',
    city: 'Trichy',
    latitude: 10.8285,
    longitude: 78.6820,
    phone: '+91 98424 33100',
    whatsapp: '+919842433100',
    opening_hours: 'Mon - Fri: 8:45 AM - 6:00 PM (Market Hours)',
    cover_image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-01T08:30:00Z',
    services: [
      { id: 'srv-raju-1', name: 'Demat & Online Trading Account Opening', description: 'Hassle-free digital onboarding with leading broking platforms.' },
      { id: 'srv-raju-2', name: 'Stock Recommendations & Portfolio Advisory', description: 'Fundamental blue-chip and growth stock picks aligned with your investment goals.' },
      { id: 'srv-raju-3', name: 'Technical Analysis & Risk Management', description: 'Support and resistance level identification, stop-loss guidance, and swing trade ideas.' },
    ],
    products: [
      { id: 'prd-raju-1', name: 'Investor Growth Portfolio Blueprint', description: 'Curated list of multi-cap equities for 3-5 year compounding wealth.', price: 0, image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80' },
    ],
    images: [
      { id: 'img-raju-1', image_url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80' },
    ],
  },
];

class MemoryDatabase {
  private categories: Category[] = [...fallbackCategories];
  private businesses: Business[] = [...fallbackBusinesses];
  private enquiries: Enquiry[] = [];

  getCategories(): Category[] {
    return this.categories.map(c => ({
      ...c,
      business_count: this.businesses.filter(b => b.category_id === c.id).length,
    }));
  }

  getCategoryBySlug(slug: string): Category | undefined {
    const cat = this.categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
    if (!cat) return undefined;
    return {
      ...cat,
      business_count: this.businesses.filter(b => b.category_id === cat.id).length,
    };
  }

  getBusinesses(options: {
    categorySlug?: string;
    categoryId?: string;
    city?: string;
    page?: number;
    limit?: number;
  }) {
    const { categorySlug, categoryId, city, page = 1, limit = 20 } = options;

    let filtered = [...this.businesses];

    if (categorySlug) {
      const cat = this.categories.find(c => c.slug.toLowerCase() === categorySlug.toLowerCase());
      if (cat) {
        filtered = filtered.filter(b => b.category_id === cat.id);
      } else {
        filtered = [];
      }
    } else if (categoryId) {
      filtered = filtered.filter(b => b.category_id === categoryId);
    }

    if (city && city.trim() !== '') {
      const cityLower = city.toLowerCase().trim();
      filtered = filtered.filter(b => b.city.toLowerCase().includes(cityLower));
    }

    // Sort newest first
    filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      businesses: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  searchBusinesses(options: {
    query?: string;
    categorySlug?: string;
    categoryId?: string;
    city?: string;
    page?: number;
    limit?: number;
  }) {
    const { query = '', categorySlug, categoryId, city, page = 1, limit = 20 } = options;
    const q = query.toLowerCase().trim();
    const cityFilter = city?.toLowerCase().trim();

    let targetCategoryId = categoryId;
    if (!targetCategoryId && categorySlug) {
      const cat = this.categories.find(c => c.slug.toLowerCase() === categorySlug.toLowerCase());
      if (cat) targetCategoryId = cat.id;
    }

    let filtered = this.businesses.filter(b => {
      // Category filter
      if (targetCategoryId && b.category_id !== targetCategoryId) {
        return false;
      }

      // City filter
      if (cityFilter && !b.city.toLowerCase().includes(cityFilter)) {
        return false;
      }

      // Keyword query search across name, description, services, products, category name, city, address
      if (q) {
        const nameMatch = b.name.toLowerCase().includes(q);
        const descMatch = b.description ? b.description.toLowerCase().includes(q) : false;
        const categoryMatch = b.category?.name.toLowerCase().includes(q) || false;
        const addressMatch = b.address ? b.address.toLowerCase().includes(q) : false;
        const cityMatch = b.city.toLowerCase().includes(q);
        const serviceMatch = b.services?.some(s => s.name.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q))) || false;
        const productMatch = b.products?.some(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))) || false;

        return nameMatch || descMatch || categoryMatch || addressMatch || cityMatch || serviceMatch || productMatch;
      }

      return true;
    });

    filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      businesses: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  getBusinessById(id: string): Business | undefined {
    return this.businesses.find(b => b.id === id);
  }

  addBusiness(business: Business): Business {
    // Fill category object if missing
    if (business.category_id && !business.category) {
      business.category = this.categories.find(c => c.id === business.category_id);
    }
    this.businesses.unshift(business);
    return business;
  }

  addEnquiry(enquiry: Enquiry): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
    };
    this.enquiries.push(newEnquiry);
    return newEnquiry;
  }

  getEnquiriesForBusiness(businessId: string): Enquiry[] {
    return this.enquiries.filter(e => e.business_id === businessId);
  }
}

export const memoryDb = new MemoryDatabase();
