import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Star,
  Zap,
  Clock,
  LayoutList,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';
import { BusinessCard } from '../components/business/BusinessCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { EmptyState } from '../components/common/EmptyState';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Category } from '../types/category';
import { Business } from '../types/business';
import { categoryService } from '../services/categoryService';
import { businessService } from '../services/businessService';

export const CategoryBusinesses: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Layout View State (default: 'list')
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');

  // Fast Filter Bar States
  const [sortBy, setSortBy] = useState<'top_rated' | 'rating_count' | 'name'>('top_rated');
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterAvailableNow, setFilterAvailableNow] = useState(false);
  const [filterQuickResponse, setFilterQuickResponse] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const cat = await categoryService.getCategoryBySlug(slug!);
        if (isMounted) setCategory(cat);

        const bizResult = await businessService.getBusinesses({
          categorySlug: slug,
          city: cityFilter,
          limit: 30,
        });

        if (isMounted) setBusinesses(bizResult.businesses);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Category not found');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug, cityFilter]);

  const displayedBusinesses = useMemo(() => {
    let list = [...businesses];

    if (filterTopRated) {
      list = list.filter((b) => (b.rating || 4.9) >= 4.8);
    }
    if (filterQuickResponse) {
      list = list.filter((b) => b.verified !== false);
    }

    list.sort((a, b) => {
      if (sortBy === 'top_rated') {
        return (b.rating || 4.9) - (a.rating || 4.9);
      }
      if (sortBy === 'rating_count') {
        const countA = a.rating_count || (a.id.length * 137) % 2000;
        const countB = b.rating_count || (b.id.length * 137) % 2000;
        return countB - countA;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return list;
  }, [businesses, filterTopRated, filterQuickResponse, sortBy]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Category Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6">{error}</p>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
      </div>
    );
  }

  const currentCity = cityFilter || 'Trichy';

  return (
    <div id="category-businesses-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Navigation (Reference Layout) */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link to="/categories" className="hover:text-emerald-700 transition-colors">
          Categories
        </Link>
        <span>›</span>
        <span className="text-neutral-700">{category?.name || slug} in {currentCity}</span>
        <span>›</span>
        <span className="text-neutral-900 font-semibold">{businesses.length}+ Listings</span>
      </nav>

      {/* Main Category Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CategoryIcon name={category?.icon || category?.name} className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Best {category?.name || 'Category'} in {currentCity} – Book Appointment Online
            </h1>
            <p className="mt-1.5 text-neutral-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              {category?.description || 'Explore top-rated verified community providers in this category.'}
            </p>
          </div>
        </div>

        {/* City Filter */}
        <div className="shrink-0 bg-white/10 backdrop-blur-md p-2.5 px-3 rounded-2xl border border-white/15 flex items-center gap-2 w-full md:w-60">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder="Filter by location/city..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Filter Chips & View Mode Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 no-scrollbar flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-xs font-semibold px-3.5 py-2 pr-8 rounded-xl shadow-2xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="top_rated">Sort by: Top Rated</option>
              <option value="rating_count">Sort by: Most Reviews</option>
              <option value="name">Sort by: Name (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Book Appointment Chip */}
          <button
            type="button"
            onClick={() => {
              if (displayedBusinesses.length > 0) {
                const bookBtn = document.getElementById(`book-btn-${displayedBusinesses[0].id}`);
                bookBtn?.click();
              }
            }}
            className="inline-flex items-center gap-1.5 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0066c0]" />
            <span>Book Appointment</span>
          </button>

          {/* Available Now Filter Pill */}
          <button
            type="button"
            onClick={() => setFilterAvailableNow(!filterAvailableNow)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs border transition-colors ${
              filterAvailableNow
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white border-neutral-300 hover:border-neutral-400 text-neutral-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Available Now</span>
          </button>

          {/* Top Rated Filter Pill */}
          <button
            type="button"
            onClick={() => setFilterTopRated(!filterTopRated)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs border transition-colors ${
              filterTopRated
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white border-neutral-300 hover:border-neutral-400 text-neutral-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterTopRated ? 'fill-white' : 'text-amber-500 fill-amber-500'}`} />
            <span>Top Rated</span>
          </button>

          {/* Quick Response Filter Pill */}
          <button
            type="button"
            onClick={() => setFilterQuickResponse(!filterQuickResponse)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs border transition-colors ${
              filterQuickResponse
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white border-neutral-300 hover:border-neutral-400 text-neutral-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Response</span>
          </button>
        </div>

        {/* View Layout Switcher (List vs Grid) */}
        <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200 ml-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewLayout('list')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewLayout === 'list'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="List View (Recommended)"
          >
            <LayoutList className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewLayout('grid')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewLayout === 'grid'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* Businesses Listings (List / Grid View) */}
      {loading ? (
        <div className={viewLayout === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {[1, 2, 3, 4, 5].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : displayedBusinesses.length > 0 ? (
        <div className={viewLayout === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
          {displayedBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} layout={viewLayout} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No businesses in ${category?.name || 'this category'} yet`}
          description="Be the first to list a business or service in this category to help neighbors discover your work."
          actionText="List Your Business"
          actionLink="/list-business"
        />
      )}
    </div>
  );
};
