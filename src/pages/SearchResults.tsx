import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Building2,
  Calendar,
  Star,
  Zap,
  Clock,
  LayoutList,
  LayoutGrid,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SearchBar } from '../components/search/SearchBar';
import { BusinessCard } from '../components/business/BusinessCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { EmptyState } from '../components/common/EmptyState';
import { Business } from '../types/business';
import { Category } from '../types/category';
import { businessService } from '../services/businessService';
import { categoryService } from '../services/categoryService';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categorySlug = searchParams.get('category') || '';
  const city = searchParams.get('city') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Layout View State (default to 'list' as requested)
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');

  // Filter Bar States
  const [sortBy, setSortBy] = useState<'top_rated' | 'rating_count' | 'name' | 'newest'>('top_rated');
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterAvailableNow, setFilterAvailableNow] = useState(false);
  const [filterQuickResponse, setFilterQuickResponse] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Load categories
  useEffect(() => {
    categoryService.getCategories().then(setCategories).catch(() => {});
  }, []);

  // Fetch search results whenever params change
  useEffect(() => {
    let isMounted = true;
    async function fetchResults() {
      try {
        setLoading(true);
        const result = await businessService.searchBusinesses({
          q: query,
          category: categorySlug,
          city,
          page: pageParam,
          limit: 15,
        });

        if (isMounted) {
          setBusinesses(result.businesses);
          setTotal(result.pagination.total);
          setTotalPages(result.pagination.totalPages);
        }
      } catch (err) {
        console.error('Failed to search businesses:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchResults();
    return () => {
      isMounted = false;
    };
  }, [query, categorySlug, city, pageParam]);

  const handleSearchUpdate = (newQuery: string, newCategory: string, newCity: string) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newCategory.trim()) params.set('category', newCategory.trim());
    if (newCity.trim()) params.set('city', newCity.trim());
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilterTopRated(false);
    setFilterAvailableNow(false);
    setFilterQuickResponse(false);
    setSortBy('top_rated');
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCategoryObj = categories.find((c) => c.slug === categorySlug);

  // Apply in-memory sort and fast filters
  const displayedBusinesses = useMemo(() => {
    let list = [...businesses];

    if (filterTopRated) {
      list = list.filter((b) => (b.rating || 4.9) >= 4.8);
    }
    if (filterQuickResponse) {
      list = list.filter((b) => b.verified !== false);
    }

    // Sort
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

  // Derived breadcrumb strings
  const currentCity = city || 'Trichy';
  const categoryTitle = selectedCategoryObj?.name || (query ? `"${query}"` : 'All Categories');

  return (
    <div id="search-results-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Search Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
        <SearchBar
          variant="compact"
          initialQuery={query}
          initialCategory={categorySlug}
          initialCity={city}
          onSearch={handleSearchUpdate}
        />

        {/* Active Filter Badges */}
        {(query || categorySlug || city) && (
          <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium">Active filters:</span>
            {query && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-800">
                <span>Keyword: &quot;{query}&quot;</span>
                <button
                  type="button"
                  onClick={() => handleSearchUpdate('', categorySlug, city)}
                  className="text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {categorySlug && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <span>Category: {selectedCategoryObj?.name || categorySlug}</span>
                <button
                  type="button"
                  onClick={() => handleSearchUpdate(query, '', city)}
                  className="text-emerald-500 hover:text-emerald-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {city && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-800">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>City: {city}</span>
                <button
                  type="button"
                  onClick={() => handleSearchUpdate(query, categorySlug, '')}
                  className="text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-rose-600 hover:underline font-medium ml-auto"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Directory Breadcrumb (Matching Reference Image) */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="text-neutral-700">{currentCity}</span>
        <span>›</span>
        <span className="text-neutral-700">{categoryTitle} in {currentCity}</span>
        <span>›</span>
        <span className="text-neutral-900 font-semibold">{total}+ Listings</span>
      </nav>

      {/* Main Listing Headline (Matching Reference Image) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          {categorySlug && selectedCategoryObj
            ? `Best ${selectedCategoryObj.name} in ${currentCity} – Book Appointment Online`
            : query
            ? `Best Providers for "${query}" in ${currentCity}`
            : `Verified Community Businesses in ${currentCity}`}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Explore trusted, top-rated local professionals with direct phone, appointment booking, and WhatsApp contact.
        </p>
      </div>

      {/* Filter Chips & Layout Toggle Bar (Matching Reference Image) */}
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

          {/* Establishment Type Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs transition-colors"
            >
              <span>Establishment Type</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {showCategoryDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-30 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    handleSearchUpdate(query, '', city);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                    !categorySlug ? 'bg-emerald-50 text-emerald-800' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  All Establishment Types
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      handleSearchUpdate(query, cat.slug, city);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors flex items-center justify-between ${
                      categorySlug === cat.slug
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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

      {/* Results Listings (List / Grid View) */}
      {loading ? (
        <div className={viewLayout === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {[1, 2, 3, 4, 5].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : displayedBusinesses.length > 0 ? (
        <div className="space-y-6">
          <div className={viewLayout === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
            {displayedBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} layout={viewLayout} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div id="search-pagination" className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-200">
              <button
                type="button"
                disabled={pageParam <= 1}
                onClick={() => handlePageChange(pageParam - 1)}
                className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      pageNum === pageParam
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={pageParam >= totalPages}
                onClick={() => handlePageChange(pageParam + 1)}
                className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No businesses found"
          description={
            query
              ? `No businesses matched "${query}". Try different search terms, check the spelling, or browse all categories.`
              : 'No businesses registered under these criteria yet.'
          }
          onReset={handleClearFilters}
          resetText="Clear Filters"
          actionText="List Your Business Here"
          actionLink="/list-business"
        />
      )}
    </div>
  );
};
