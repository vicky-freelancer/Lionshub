import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Layers, ArrowRight, X } from 'lucide-react';
import { Category } from '../../types/category';
import { categoryService } from '../../services/categoryService';

interface SearchBarProps {
  initialQuery?: string;
  initialCategory?: string;
  initialCity?: string;
  variant?: 'hero' | 'compact';
  onSearch?: (query: string, category: string, city: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  initialCategory = '',
  initialCity = 'Trichy',
  variant = 'hero',
  onSearch,
  className = '',
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity || 'Trichy');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
    setCategory(initialCategory);
    setCity(initialCity || 'Trichy');
  }, [initialQuery, initialCategory, initialCity]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (onSearch) {
      onSearch(query, category, city);
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (category.trim()) params.set('category', category.trim());
      if (city.trim()) params.set('city', city.trim());

      navigate(`/search?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setCategory('');
    setCity('');
    if (onSearch) {
      onSearch('', '', '');
    }
  };

  if (variant === 'compact') {
    return (
      <form
        id="search-bar-compact"
        onSubmit={handleSubmit}
        className={`bg-white p-2 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-2 ${className}`}
      >
        {/* Search Keyword */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full border-b md:border-b-0 md:border-r border-neutral-100">
          <Search className="w-4 h-4 text-emerald-600 shrink-0" />
          <input
            id="compact-search-keyword"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search business, service, product (e.g. AC repair, cake)..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Select */}
        <div className="flex items-center gap-2 px-3 py-2 w-full md:w-48 border-b md:border-b-0 md:border-r border-neutral-100">
          <Layers className="w-4 h-4 text-neutral-400 shrink-0" />
          <select
            id="compact-search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by Category"
            className="w-full bg-transparent text-sm text-neutral-800 focus:outline-hidden cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Input */}
        <div className="flex items-center gap-2 px-3 py-2 w-full md:w-44">
          <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            id="compact-search-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Trichy / Locality"
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
          />
        </div>

        {/* Search Action Button */}
        <button
          id="compact-search-submit-btn"
          type="submit"
          className="w-full md:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
    );
  }

  // Hero Variant (Spacious, prominent search bar with distinct segments)
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form
        id="search-bar-hero"
        onSubmit={handleSubmit}
        className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-xl shadow-neutral-900/5 flex flex-col md:flex-row items-stretch gap-2.5"
      >
        {/* Keyword Search */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-neutral-50/80 rounded-xl sm:rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors focus-within:border-emerald-500 focus-within:bg-white">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1">
            <label htmlFor="hero-search-keyword" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              What are you looking for?
            </label>
            <input
              id="hero-search-keyword"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Electrician, Cake, AC Repair, Salon..."
              className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
            />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50/80 rounded-xl sm:rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors focus-within:border-emerald-500 focus-within:bg-white md:w-56">
          <Layers className="w-5 h-5 text-neutral-500 shrink-0" />
          <div className="flex-1">
            <label htmlFor="hero-search-category" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Category
            </label>
            <select
              id="hero-search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-neutral-800 focus:outline-hidden cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location / City Input */}
        <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50/80 rounded-xl sm:rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors focus-within:border-emerald-500 focus-within:bg-white md:w-52">
          <MapPin className="w-5 h-5 text-neutral-500 shrink-0" />
          <div className="flex-1">
            <label htmlFor="hero-search-city" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Location
            </label>
            <input
              id="hero-search-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Trichy / Locality"
              className="w-full bg-transparent text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Big Search Submit Button */}
        <button
          id="hero-search-submit-btn"
          type="submit"
          className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 shrink-0"
        >
          <span>Find Businesses</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
