import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Mic,
  ChevronDown,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  LayoutList,
  LayoutGrid,
  CheckCircle2,
  GraduationCap,
  HardHat,
  Laptop,
  Tv,
  Calculator,
  Coins,
  CandlestickChart,
  PlusCircle,
  Menu,
} from 'lucide-react';
import { BusinessCard } from '../components/business/BusinessCard';
import { Business } from '../types/business';
import { Category } from '../types/category';
import { categoryService } from '../services/categoryService';
import { businessService } from '../services/businessService';
import {
  quickCategoryIcons,
} from '../data/portalData';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Trichy');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [homeViewLayout, setHomeViewLayout] = useState<'list' | 'grid'>('list');
  const [loading, setLoading] = useState(true);

  // Quick Enquiry Modal state
  const [enquiryModalTitle, setEnquiryModalTitle] = useState<string | null>(null);
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [cats, bizResult] = await Promise.all([
          categoryService.getCategories(),
          businessService.getBusinesses({ limit: 16, city: 'Trichy' }),
        ]);
        setCategories(cats);
        setFeaturedBusinesses(bizResult.businesses);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&city=${encodeURIComponent(city)}`);
    } else {
      navigate(`/search?city=${encodeURIComponent(city)}`);
    }
  };

  const handleOpenEnquiry = (title: string) => {
    setEnquiryModalTitle(title);
    setEnquirySubmitted(false);
    setEnquiryPhone('');
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  const filteredBusinesses = selectedCategoryFilter === 'all'
    ? featuredBusinesses
    : featuredBusinesses.filter((b) => b.category_id === selectedCategoryFilter);

  // Icon mapping helper
  const renderQuickIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Coins': return <Coins className="w-5 h-5" />;
      case 'CandlestickChart': return <CandlestickChart className="w-5 h-5" />;
      case 'Menu': return <Menu className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div id="home-portal-root" className="bg-[#f8f9fa] min-h-screen text-neutral-900 pb-20 space-y-8">
      
      {/* 1. TOP HEADER SEARCH & BRAND BANNER */}
      <section className="bg-white border-b border-neutral-200 pt-5 pb-6 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Sub-header navigation links */}
          <div className="hidden lg:flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-6">
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Trichy’s Verified Business & Professional Directory
              </span>
            </div>
            <div className="flex items-center gap-5 font-medium">
              <Link to="/categories" className="hover:text-emerald-600 transition-colors">Explore Categories</Link>
              <Link to="/search" className="hover:text-emerald-600 transition-colors">Search Businesses</Link>
              <Link to="/list-business" className="hover:text-emerald-600 transition-colors text-emerald-700 font-semibold">Advertise Free</Link>
              <Link to="/list-business" className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold hover:bg-emerald-100">
                + List Your Business
              </Link>
            </div>
          </div>

          {/* Unified Location + Search Bar Row */}
          <form onSubmit={handleMainSearch} className="flex flex-col sm:flex-row items-center gap-2 max-w-5xl mx-auto">
            {/* City Selector */}
            <div className="relative w-full sm:w-60 shrink-0">
              <div className="flex items-center h-13 px-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-2xl sm:rounded-r-none transition-colors">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mr-2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-neutral-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="Trichy">Trichy (All Areas)</option>
                  <option value="Thillai Nagar">Thillai Nagar</option>
                  <option value="Cantonment">Cantonment</option>
                  <option value="Srirangam">Srirangam</option>
                  <option value="KK Nagar">KK Nagar</option>
                  <option value="Ramalingam Nagar">Ramalingam Nagar</option>
                  <option value="Jenne Plaza">Jenne Plaza Area</option>
                  <option value="Lalgudi">Lalgudi</option>
                  <option value="Jeeyapuram">Jeeyapuram</option>
                  <option value="Kalaignar Arivalayam">Near Kalaignar Arivalayam</option>
                  <option value="Central Bus Stand">Central Bus Stand</option>
                  <option value="Chatram">Chatram Bus Stand</option>
                  <option value="Ponmalai">Ponmalai / Golden Rock</option>
                  <option value="Samayapuram">Samayapuram</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-1 pointer-events-none" />
              </div>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1 w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across verified businesses & services in Trichy..."
                className="w-full h-13 pl-4 pr-24 sm:pr-28 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-2xl sm:rounded-l-none text-sm font-semibold placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  title="Voice Search"
                  onClick={() => setSearchQuery('Mutual Fund Distributor')}
                  className="p-2 rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-neutral-100 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </form>

        </div>
      </section>

      {/* 2. PROMOTIONAL HERO BANNER & QUICK ACTION TILES */}
      {/* 2. COMMUNITY HERO PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-gradient-to-r from-emerald-950 via-neutral-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-neutral-800 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 bg-emerald-600/30 px-2.5 py-1 rounded-md border border-emerald-500/30">
              Trichy Community • Verified Experts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Find & Hire Trusted Local Pros Across Trichy
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
              Connect directly with certified mutual fund distributors, leading schools, distance learning academies, audio-visual providers, GST tax auditors, building contractors, business loan advisors, and share brokers.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Categories</span>
              </Link>
              <Link
                to="/list-business"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Business Free</span>
              </Link>
            </div>
          </div>

          <div className="w-36 sm:w-44 shrink-0 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80"
              alt="Verified Trichy businesses"
              referrerPolicy="no-referrer"
              className="w-full h-32 sm:h-36 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CATEGORY ICON MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-y-6 gap-x-2">
            {quickCategoryIcons.map((item) => (
              <Link
                key={item.id}
                to={item.slug === 'categories' ? '/categories' : `/category/${item.slug}`}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative">
                  <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    {renderQuickIcon(item.icon)}
                  </div>
                  {item.tag && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold px-1 rounded-full uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>
                <span className="mt-2 text-xs font-semibold text-neutral-800 group-hover:text-emerald-600 transition-colors line-clamp-1 max-w-[90px]">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSINESS DIRECTORY SHOWCASE (WITH LIST / GRID SWITCHER) */}
      <section id="business-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Verified Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
                Featured Businesses & Verified Services
              </h3>
              <p className="text-xs text-neutral-500">
                Browse real local service providers, view photos, verify trust badges, and connect directly.
              </p>
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setHomeViewLayout('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  homeViewLayout === 'list'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <LayoutList className="w-4 h-4 text-emerald-600" />
                <span>List View</span>
              </button>
              <button
                type="button"
                onClick={() => setHomeViewLayout('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  homeViewLayout === 'grid'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-emerald-600" />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategoryFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              All Categories ({featuredBusinesses.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Business Listings */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-neutral-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className={homeViewLayout === 'list' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
              {filteredBusinesses.map((biz) => (
                <BusinessCard key={biz.id} business={biz} layout={homeViewLayout} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Enquiry Popup Modal */}
      {enquiryModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                Enquire for {enquiryModalTitle}
              </h3>
              <button
                type="button"
                onClick={() => setEnquiryModalTitle(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {enquirySubmitted ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-neutral-900">Enquiry Sent!</h4>
                <p className="text-xs text-neutral-500">
                  Top verified vendors for {enquiryModalTitle} in {city} will contact you shortly with competitive quotes.
                </p>
                <button
                  type="button"
                  onClick={() => setEnquiryModalTitle(null)}
                  className="mt-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-3">
                <p className="text-xs text-neutral-500">
                  Get free instant quotes and contact details from the nearest verified service providers.
                </p>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Your Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Request Instant Free Quotes
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

