export interface PortalBanner {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  bgGradient: string;
  link: string;
  image?: string;
  iconName?: string;
}

export interface QuickCategoryIcon {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  bg: string;
  tag?: string;
}

export interface CuratedGroup {
  id: string;
  title: string;
  slug: string;
  items: {
    title: string;
    slug: string;
    image: string;
    link: string;
  }[];
}

export interface TravelOption {
  id: string;
  name: string;
  type: 'flight' | 'bus' | 'train' | 'hotel' | 'car-rentals';
  subtext: string;
  icon: string;
  badge?: string;
  image: string;
  description: string;
}

export interface MovieItem {
  id: string;
  title: string;
  subtitle: string;
  ratingPercent: number;
  votes: string;
  language: string;
  dimension: string;
  genre: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  duration: string;
  synopsis: string;
  cast: string[];
  director: string;
  cinemas: {
    name: string;
    location: string;
    showtimes: string[];
    price: string;
  }[];
}

export interface TouristPlace {
  id: string;
  city: string;
  slug: string;
  state: string;
  tagline: string;
  image: string;
  description: string;
  bestTimeToVisit: string;
  topAttractions: {
    name: string;
    image: string;
    desc: string;
  }[];
  popularStays: {
    name: string;
    rating: number;
    price: string;
  }[];
}

export interface GuideArticle {
  id: string;
  slug: string;
  type: 'guide' | 'article';
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string[];
  tips?: string[];
  serviceCategorySlug?: string;
}

export interface RecentReview {
  id: string;
  businessName: string;
  businessId: string;
  location: string;
  rating: number;
  reviewCount: number;
  reviewerName: string;
  reviewerAvatar: string;
  reviewText: string;
  businessImage: string;
  whatsapp: string;
  phone: string;
}

// 1. Icon Categories (Targeted to the 8 core categories)
export const quickCategoryIcons: QuickCategoryIcon[] = [
  { id: '1', name: 'Mutual Funds', slug: 'mutual-fund-distributor', icon: 'TrendingUp', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: '2', name: 'Schools', slug: 'education-school', icon: 'GraduationCap', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: '3', name: 'Distance Edu', slug: 'education-distance-education', icon: 'Laptop', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: '4', name: 'Audio Visual', slug: 'audio-visual-equipments', icon: 'Tv', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: '5', name: 'Auditor & GST', slug: 'auditor-gst-tax-filling', icon: 'Calculator', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: '6', name: 'Contractors', slug: 'building-contractor', icon: 'HardHat', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: '7', name: 'Business Loan', slug: 'business-loan', icon: 'Coins', color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: '8', name: 'Share Invest', slug: 'share-investment', icon: 'CandlestickChart', color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: '9', name: 'All Categories', slug: 'categories', icon: 'Menu', color: 'text-neutral-800', bg: 'bg-neutral-100' },
];

// 2. Curated Visual Showcase Groups
export const curatedGroups: CuratedGroup[] = [
  {
    id: 'finance-investments',
    title: 'Wealth & Tax Advisory',
    slug: 'mutual-fund-distributor',
    items: [
      { title: 'Mutual Funds', slug: 'mutual-fund-distributor', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80', link: '/category/mutual-fund-distributor' },
      { title: 'GST & Tax Filing', slug: 'auditor-gst-tax-filling', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80', link: '/category/auditor-gst-tax-filling' },
      { title: 'Share Investment', slug: 'share-investment', image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=500&q=80', link: '/category/share-investment' },
    ],
  },
  {
    id: 'education-growth',
    title: 'Education & Academics',
    slug: 'education-school',
    items: [
      { title: 'Schools', slug: 'education-school', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80', link: '/category/education-school' },
      { title: 'Distance Education', slug: 'education-distance-education', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=500&q=80', link: '/category/education-distance-education' },
      { title: 'Academy Counseling', slug: 'education-distance-education', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80', link: '/search?q=Academy' },
    ],
  },
  {
    id: 'infra-corporate',
    title: 'Construction & Corporate',
    slug: 'building-contractor',
    items: [
      { title: 'Building Contractors', slug: 'building-contractor', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80', link: '/category/building-contractor' },
      { title: 'AV & Office Setup', slug: 'audio-visual-equipments', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=500&q=80', link: '/category/audio-visual-equipments' },
      { title: 'Business Loans', slug: 'business-loan', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=500&q=80', link: '/category/business-loan' },
    ],
  },
  {
    id: 'business-finance',
    title: 'Business Funding & Loans',
    slug: 'business-loan',
    items: [
      { title: 'MSME Loans', slug: 'business-loan', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=500&q=80', link: '/category/business-loan' },
      { title: 'Project Advisory', slug: 'business-loan', image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=80', link: '/search?category=business-loan' },
      { title: 'Auditing Services', slug: 'auditor-gst-tax-filling', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80', link: '/category/auditor-gst-tax-filling' },
    ],
  },
];

// 3. Travel Options
export const travelOptions: TravelOption[] = [
  {
    id: 'flight',
    name: 'Flight',
    type: 'flight',
    subtext: 'Powered By EaseMyTrip',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description: 'Book domestic & international flights at zero convenience fees with instant e-tickets.',
  },
  {
    id: 'bus',
    name: 'Bus',
    type: 'bus',
    subtext: 'Affordable Rides',
    icon: 'Bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Compare luxury AC sleepers, semi-sleepers and seater buses with live GPS tracking.',
  },
  {
    id: 'train',
    name: 'Train',
    type: 'train',
    subtext: 'IRCTC Authorised',
    icon: 'Train',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    description: 'Check PNR status, seat availability, train schedules and Tatkal reservation assistance.',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    type: 'hotel',
    subtext: 'Budget-Friendly Stay',
    icon: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Verified hygienic stays, couple-friendly rooms, luxury resorts and boutique stays with free cancellation.',
  },
  {
    id: 'car-rentals',
    name: 'Car Rentals',
    type: 'car-rentals',
    subtext: 'Drive Easy Anywhere',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    description: 'Self-drive rentals, outstation chauffeur cabs and airport transfers with 24/7 road assistance.',
  },
];

// 4. Trending Searches Near You
export const trendingSearches = [
  { id: '1', title: 'Schools', query: 'School', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80', link: '/search?category=education-school' },
  { id: '2', title: 'Electricians', query: 'Electrician', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', link: '/search?category=home-services&q=Electrician' },
  { id: '3', title: 'Paying Guest Accommodations', query: 'PG', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80', link: '/search?category=pg-hostels' },
  { id: '4', title: 'Bike On Rent', query: 'Bike Rental', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80', link: '/search?q=Bike+Rental' },
];

// 5. Latest Movies
export const latestMovies: MovieItem[] = [
  {
    id: 'toxic',
    title: 'Toxic: A Fairy Tale For Grown-ups',
    subtitle: 'High Octane Action Drama',
    ratingPercent: 92,
    votes: '48.2k Votes',
    language: 'Hindi / Kannada',
    dimension: '2D / IMAX 3D',
    genre: 'Action, Crime, Thriller',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    releaseDate: 'Coming Soon',
    duration: '2h 45m',
    synopsis: 'A gripping dark fairy tale that traverses through underworld cartels, raw emotions, and unparalleled cinematic vengeance.',
    director: 'Geetu Mohandas',
    cast: ['Yash', 'Kiara Advani', 'Nayanthara', 'Huma Qureshi'],
    cinemas: [
      { name: 'PVR INOX Cinemas', location: 'City Centre Mall', showtimes: ['10:30 AM', '01:45 PM', '05:15 PM', '09:00 PM'], price: '₹220' },
      { name: 'Cinépolis VIP', location: 'Nexus Grand Mall', showtimes: ['11:00 AM', '02:30 PM', '06:00 PM', '09:30 PM'], price: '₹280' },
    ],
  },
  {
    id: 'awarapan-2',
    title: 'Awarapan 2',
    subtitle: 'Redemption & Soulful Melodies',
    ratingPercent: 74,
    votes: '24.1k Votes',
    language: 'Hindi',
    dimension: '2D',
    genre: 'Romantic Drama, Action',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80',
    releaseDate: 'Now Showing',
    duration: '2h 28m',
    synopsis: 'The spiritual successor to the cult classic ballad of love, guilt, courage, and unconditional sacrifice across international borders.',
    director: 'Mohit Suri',
    cast: ['Emraan Hashmi', 'Shriya Saran', 'Mrinal Thakur'],
    cinemas: [
      { name: 'Wave Cinemas', location: 'Silver City Mall', showtimes: ['12:15 PM', '03:45 PM', '07:15 PM'], price: '₹180' },
      { name: 'PVR Select City', location: 'Saket Walk', showtimes: ['10:00 AM', '04:30 PM', '10:15 PM'], price: '₹250' },
    ],
  },
  {
    id: 'hanuman-ansh',
    title: 'Hanuman Ansh',
    subtitle: 'Mythological Action Epic',
    ratingPercent: 100,
    votes: '52.7k Votes',
    language: 'Hindi / Telugu',
    dimension: '2D / 3D',
    genre: 'Mythology, Adventure, Fantasy',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    releaseDate: 'Now Showing',
    duration: '2h 36m',
    synopsis: 'An exhilarating journey awakening ancient sacred virtues in the modern world to combat the ultimate dark eclipse.',
    director: 'Prasanth Varma',
    cast: ['Teja Sajja', 'Amritha Aiyer', 'Varalaxmi Sarathkumar'],
    cinemas: [
      { name: 'PVR Directors Cut', location: 'Ambience Mall', showtimes: ['01:00 PM', '04:45 PM', '08:30 PM'], price: '₹350' },
      { name: 'Miraj Cinemas', location: 'Central Square', showtimes: ['11:30 AM', '03:00 PM', '06:30 PM'], price: '₹160' },
    ],
  },
  {
    id: 'batwara-1947',
    title: 'Batwara 1947',
    subtitle: 'Historical War Epic',
    ratingPercent: 100,
    votes: '19.4k Votes',
    language: 'Hindi / Punjabi',
    dimension: '2D',
    genre: 'Historical, Drama, War',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    releaseDate: 'Now Showing',
    duration: '2h 50m',
    synopsis: 'Heart-wrenching and heroic chronicles of families separated during the historic partition, fighting to preserve honor and love.',
    director: 'Kabir Khan',
    cast: ['Sunny Deol', 'Bobby Deol', 'Tabu'],
    cinemas: [
      { name: 'Carnival Cinemas', location: 'Metro Plaza', showtimes: ['02:00 PM', '05:30 PM', '09:00 PM'], price: '₹170' },
    ],
  },
  {
    id: 'insidious-out-of-the-further',
    title: 'Insidious: Out Of The Further',
    subtitle: 'Supernatural Horror Thriller',
    ratingPercent: 100,
    votes: '33.8k Votes',
    language: 'English / Hindi',
    dimension: '2D / 4DX',
    genre: 'Horror, Mystery, Thriller',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    releaseDate: 'Now Showing',
    duration: '1h 55m',
    synopsis: 'The demonologists venture deeper than ever into the red-door realm where primordial nightmares dwell beyond time.',
    director: 'Patrick Wilson',
    cast: ['Patrick Wilson', 'Rose Byrne', 'Ty Simpkins', 'Lin Shaye'],
    cinemas: [
      { name: 'PVR 4DX', location: 'Pacific Mall', showtimes: ['07:30 PM', '10:45 PM'], price: '₹400' },
      { name: 'Cinépolis Dolby Atmos', location: 'Cross River', showtimes: ['04:00 PM', '09:15 PM'], price: '₹240' },
    ],
  },
];

// 6. Tourist Destinations
export const touristPlaces: TouristPlace[] = [
  {
    id: 'delhi',
    city: 'Delhi',
    slug: 'delhi',
    state: 'National Capital Territory',
    tagline: 'The Heart of Heritage, Food & Monuments',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80',
    description: 'Delhi seamlessly weaves together the ancient magic of Mughal architecture with the sprawling vibrancy of modern cosmopolitan culture.',
    bestTimeToVisit: 'October to March',
    topAttractions: [
      { name: 'Qutub Minar', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80', desc: 'UNESCO World Heritage 73m-tall minaret built in 1192.' },
      { name: 'India Gate & Kartavya Path', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80', desc: 'War memorial arch standing in pride amid lush landscaped lawns.' },
      { name: 'Humayun’s Tomb', image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=500&q=80', desc: 'Magnificent Persian-style garden tomb that inspired the Taj Mahal.' },
    ],
    popularStays: [
      { name: 'The Imperial New Delhi', rating: 4.9, price: '₹14,500/night' },
      { name: 'Taj Palace Diplomatic Enclave', rating: 4.8, price: '₹12,200/night' },
      { name: 'Bloomrooms @ Janpath', rating: 4.6, price: '₹3,800/night' },
    ],
  },
  {
    id: 'haridwar',
    city: 'Haridwar',
    slug: 'haridwar',
    state: 'Uttarakhand',
    tagline: 'Gateway to the Gods & Holy Ganga Aarti',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42e47e3?auto=format&fit=crop&w=600&q=80',
    description: 'One of the seven holiest Hindu pilgrimage cities where the holy river Ganges leaves the Himalayan foothills.',
    bestTimeToVisit: 'September to April',
    topAttractions: [
      { name: 'Har Ki Pauri', image: 'https://images.unsplash.com/photo-1600100397608-f010e42e47e3?auto=format&fit=crop&w=500&q=80', desc: 'Famous ghat where thousands gather every evening for the divine Maha Aarti.' },
      { name: 'Mansa Devi Temple Cable Car', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80', desc: 'Hilltop shrine offering panoramic views of the Ganges valley.' },
      { name: 'Chandi Devi Mandir', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80', desc: 'Ancient temple perched atop the Neel Parvat peak.' },
    ],
    popularStays: [
      { name: 'Haveli Hari Ganga By Leisure Hotels', rating: 4.8, price: '₹6,500/night' },
      { name: 'Radisson Blu Haridwar', rating: 4.7, price: '₹5,200/night' },
    ],
  },
  {
    id: 'agra',
    city: 'Agra',
    slug: 'agra',
    state: 'Uttar Pradesh',
    tagline: 'Home of the Taj Mahal & Royal Mughal Splendor',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    description: 'World-renowned historic city housing the Taj Mahal, Agra Fort, and Fatehpur Sikri.',
    bestTimeToVisit: 'October to March',
    topAttractions: [
      { name: 'Taj Mahal', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80', desc: 'Ivory-white marble mausoleum on the south bank of the Yamuna river.' },
      { name: 'Agra Fort', image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=500&q=80', desc: 'Massive red sandstone royal fortress of Mughal emperors.' },
    ],
    popularStays: [
      { name: 'The Oberoi Amarvilas Agra', rating: 5.0, price: '₹35,000/night' },
      { name: 'ITC Mughal, a Luxury Collection', rating: 4.8, price: '₹8,500/night' },
    ],
  },
  {
    id: 'rishikesh',
    city: 'Rishikesh',
    slug: 'rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga Capital of the World & River Rafting Haven',
    image: 'https://images.unsplash.com/photo-1598890777032-bde17b5f540c?auto=format&fit=crop&w=600&q=80',
    description: 'Nestled on the banks of the emerald Ganga, Rishikesh is world-famous for spiritual ashrams, bungee jumping, and whitewater rafting.',
    bestTimeToVisit: 'September to May',
    topAttractions: [
      { name: 'Ram Jhula & Laxman Jhula', image: 'https://images.unsplash.com/photo-1598890777032-bde17b5f540c?auto=format&fit=crop&w=500&q=80', desc: 'Iconic suspension iron bridges over the emerald Ganges.' },
      { name: 'Triveni Ghat Evening Aarti', image: 'https://images.unsplash.com/photo-1600100397608-f010e42e47e3?auto=format&fit=crop&w=500&q=80', desc: 'Sacred confluence with chanting priests and floating diyas.' },
    ],
    popularStays: [
      { name: 'Aloha On The Ganges Resort', rating: 4.9, price: '₹9,800/night' },
      { name: 'Ananda in the Himalayas', rating: 5.0, price: '₹42,000/night' },
    ],
  },
];

// 7. Guides & Articles
export const portalGuides: GuideArticle[] = [
  {
    id: 'fridge-not-cooling',
    slug: 'fridge-not-cooling-causes-fix-cost',
    type: 'guide',
    title: 'Fridge Not Cooling? Causes and Fix Cost (Complete Guide)',
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'LionsHub Appliance Care Team',
    serviceCategorySlug: 'home-services',
    summary: 'Diagnose why your refrigerator is failing to cool, common issues like dirty condenser coils or gas leakage, and estimated repair costs.',
    content: [
      'A refrigerator that stops cooling can rapidly spoil groceries and cause huge inconvenience. Before calling a technician, it helps to understand the underlying root causes.',
      '1. Dirty Condenser Coils: When coils underneath or behind the fridge are clogged with pet hair and dust, heat cannot dissipate properly, forcing the compressor to overheat.',
      '2. Gas Leakage (Refrigerant): If the compressor runs continuously but the freezer is lukewarm, low refrigerant pressure is a prime suspect.',
      '3. Faulty Defrost Thermostat or Timer: Frost build-up on the evaporator coils blocks cold airflow into the fresh food compartment.',
      '4. Evaporator Fan Motor: If the fan fails to blow cold air through the vents, internal temperatures quickly climb.',
    ],
    tips: [
      'Unplug the fridge and vacuum condenser coils every 6 months.',
      'Ensure at least 3 inches of clearance between the back of the fridge and the wall.',
      'Check rubber door gaskets with the dollar bill test to confirm an airtight seal.',
    ],
  },
  {
    id: 'ac-smells-bad',
    slug: 'ac-smells-bad-heres-how-to-fix-it-fast',
    type: 'guide',
    title: "AC Smells Bad? Here's How to Fix It Fast",
    category: 'AC Repair',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    date: 'August 2026',
    author: 'LionsHub HVAC Specialist',
    serviceCategorySlug: 'home-services',
    summary: 'Eliminate moldy, pungent, or musty smells from your split or window AC unit with professional cleaning methods.',
    content: [
      'Turning on your air conditioner only to be greeted by a sour, musty smell is a sign of bacterial or mold build-up inside the indoor cooling coils or drain pan.',
      '1. Standing Water in Drain Tray: Clogged condensation drain lines allow stagnant water to host mildew.',
      '2. Clogged Air Filters: Dust particles trapped in damp filters start decomposing and generating odor.',
      '3. Wet Blower Wheel: Mold spores thrive on the blower barrel when humidity is high and the fan is turned off abruptly.',
    ],
    tips: [
      'Wash mesh air filters with warm soapy water every 15 days.',
      'Run the AC in "Fan Only" mode for 15 minutes before shutting it down to dry interior moisture.',
      'Book a deep jet-pump foaming wash with verified LionsHub technicians before the summer peak.',
    ],
  },
  {
    id: 'air-cooler-not-cooling',
    slug: 'air-cooler-not-cooling-causes-quick-fix-guide',
    type: 'guide',
    title: 'Air Cooler Not Cooling? Causes and Quick Fix Guide',
    category: 'Home Cooling',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    date: 'August 2026',
    author: 'LionsHub Home Services',
    serviceCategorySlug: 'home-services',
    summary: 'Simple steps to restore ice-cold airflow in desert and honeycomb air coolers during hot days.',
    content: [
      'Evaporative air coolers rely on water circulation and proper ventilation to lower room temperatures effectively.',
      '1. Blocked Water Distributing Channels: Mineral scale deposits prevent water from soaking the cooling pads evenly.',
      '2. Inadequate Cross Ventilation: Air coolers need open doors/windows to exhaust humid air; otherwise, humidity hits 100% and cooling stops.',
      '3. Submersible Pump Failure: Test if the pump is actively lifting water to the top headers.',
    ],
    tips: [
      'Replace old wood wool aspen pads with high-density honeycomb pads for 3x cooling efficiency.',
      'Always leave a window opposite to the cooler partially open for continuous dry airflow.',
    ],
  },
];

export const portalArticles: GuideArticle[] = [
  {
    id: 'onam-sadhya-delhi',
    slug: 'authentic-onam-sadhya-top-spots',
    type: 'article',
    title: 'A Festive Feast: Dishing Out Top Spots for Authentic Onam Sadhya in Delhi',
    category: 'Food & Dining',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Culinary Explorers',
    summary: 'From crispy banana chips and Avial to rich Payasam served on fresh banana leaves, explore Delhi’s best traditional culinary feasts.',
    content: [
      'Onam brings the grandeur of Kerala’s legendary 26-dish harvest feast (Sadhya) right to the heart of the capital.',
      'Traditional Sadhya is an art of flavor balance: spicy inji puli, tangy sambar, cooling pachadi, and creamy ada pradhaman layered systematically on a clean plantain leaf.',
      'Top recommended restaurants in the directory offering dine-in and takeaways include Mahabelly (Saket), Kerala House Canteen (Jantar Mantar), and Padmanabham.',
    ],
  },
  {
    id: 'janmashtami-bhog-recipes',
    slug: 'traditional-janmashtami-prasod-bhog-recipes',
    type: 'article',
    title: 'Traditional Janmashtami Prasad: Popular Bhog Recipes for Krishna Celebrations',
    category: 'Festivals & Culture',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'LionsHub Culture Bureau',
    summary: 'Delightful 56-Bhog and panchamrit recipes to prepare pure, sanctified festive offerings for Janmashtami.',
    content: [
      'Makhan Mishri, Dhaniya Panjiri, and Panchamrit form the divine core of midnight Janmashtami celebrations.',
      'Learn how to churn fresh white butter at home and roast fragrant coriander powder with dry fruits and powdered khand.',
    ],
  },
  {
    id: 'peppermint-oil-guide',
    slug: 'ultimate-guide-to-everything-about-peppermint-oil',
    type: 'article',
    title: 'The Ultimate Guide to Everything About Peppermint Oil',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'Wellness & Aroma Insights',
    summary: 'Unlocking therapeutic benefits, headache relief, aromatherapy diffusions, and natural bug repellent qualities.',
    content: [
      'Peppermint essential oil is one of the most versatile natural concentrates in traditional wellness and modern holistic therapy.',
      'Its active menthol component provides cooling stimulation, relaxes tense forehead muscles, and promotes sharp mental clarity when diffused.',
    ],
  },
];

// 8. Recent Community Activity Reviews
export const recentReviews: RecentReview[] = [
  {
    id: 'r1',
    businessName: 'Kaveri Wealth & Mutual Fund Advisors',
    businessId: 'biz-mf-kaveri-trichy',
    location: 'Thillai Nagar - Trichy',
    rating: 5,
    reviewCount: 420,
    reviewerName: 'Senthil Kumaran',
    reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    reviewText: 'Kaveri Wealth stands out as a reliable mutual fund consultancy in Trichy. Mr. Senthil guided our family portfolio into top-performing equity and hybrid SIPs with full transparency.',
    businessImage: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80',
    whatsapp: '919443187654',
    phone: '04312741122',
  },
  {
    id: 'r2',
    businessName: 'Rockfort International Academy',
    businessId: 'biz-school-rockfort-trichy',
    location: 'Cantonment - Trichy',
    rating: 5,
    reviewCount: 312,
    reviewerName: 'Priya Sundaram',
    reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    reviewText: 'Exceptional CBSE curriculum with state-of-the-art sports facilities and robotics labs. Teachers are dedicated and attentive to every child’s individual development.',
    businessImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    whatsapp: '919443298765',
    phone: '04312410099',
  },
  {
    id: 'r3',
    businessName: 'Chola Builders & Architectural Engineers',
    businessId: 'biz-bld-chola-trichy',
    location: 'KK Nagar - Trichy',
    rating: 5,
    reviewCount: 284,
    reviewerName: 'Ramanathan V.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    reviewText: 'Chola Builders completed our duplex villa on Vayalur Road ahead of schedule with top-grade steel and CP fittings. Highly recommend their turnkey construction service.',
    businessImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    whatsapp: '919443412345',
    phone: '04312456789',
  },
  {
    id: 'r4',
    businessName: 'Apex Cooling & AC Service Experts',
    businessId: 'b1010101-0001-0001-0001-000000000001',
    location: 'Thillai Nagar - Trichy',
    rating: 5,
    reviewCount: 367,
    reviewerName: 'Gopinath Krishnan',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    reviewText: 'Prompt response within 45 minutes for AC gas filling and deep foam cleaning. Technicians were courteous, professional, and wore shoe covers.',
    businessImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    whatsapp: '919443299810',
    phone: '04312765432',
  },
  {
    id: 'r5',
    businessName: 'Sri Balaji GST & Corporate Tax Advisory',
    businessId: 'biz-tax-sribalaji-trichy',
    location: 'Srirangam - Trichy',
    rating: 5,
    reviewCount: 219,
    reviewerName: 'Anandhan Murthy',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    reviewText: 'Smooth monthly GST reconciliation and fast income tax filing for our retail business. Very trustworthy and prompt chartered accountant team in Srirangam.',
    businessImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    whatsapp: '919443311223',
    phone: '04312432100',
  },
];
