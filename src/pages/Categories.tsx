import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Search,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';
import { CategoryCard } from '../components/category/CategoryCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Category } from '../types/category';
import { Business } from '../types/business';
import { categoryService } from '../services/categoryService';
import { businessService } from '../services/businessService';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  useEffect(() => {
    async function loadDirectoryData() {
      try {
        setLoading(true);
        const [cats, bizResult] = await Promise.all([
          categoryService.getCategories(),
          businessService.getBusinesses({ limit: 100 }),
        ]);
        setCategories(cats);
        setAllBusinesses(bizResult.businesses);
      } catch (err) {
        console.error('Error loading categories and businesses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDirectoryData();
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  // Group businesses strictly by category
  const getBusinessesForCategory = (catId: string, catSlug: string) => {
    return allBusinesses.filter(
      (b) => b.category_id === catId || b.category?.slug === catSlug || b.category?.id === catId
    );
  };

  const displayedCategories =
    selectedCategoryTab === 'all'
      ? filteredCategories
      : filteredCategories.filter((c) => c.id === selectedCategoryTab);

  return (
    <div id="categories-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Trichy Verified Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Browse Categories & Verified Businesses
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Find each respected business specifically organized under its dedicated category.
        </p>

        {/* Search & Quick Filter */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="category-filter-input"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search category or service..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
          />
        </div>
      </div>

      {/* Category Quick Filter Pills */}
      {!loading && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          <button
            type="button"
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategoryTab === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            All Categories ({categories.length})
          </button>
          {categories.map((cat) => {
            const count = getBusinessesForCategory(cat.id, cat.slug).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCategoryTab === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategoryTab === cat.id ? 'bg-emerald-700 text-emerald-100' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Structured Category Sections with ONLY their respective businesses */}
      {loading ? (
        <LoadingSpinner message="Loading categories and verified listings..." />
      ) : displayedCategories.length > 0 ? (
        <div className="space-y-12">
          {displayedCategories.map((cat) => {
            const catBusinesses = getBusinessesForCategory(cat.id, cat.slug);

            return (
              <section
                key={cat.id}
                id={`category-section-${cat.slug}`}
                className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                      <CategoryIcon name={cat.icon || cat.name} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                          {cat.name}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                          {catBusinesses.length} {catBusinesses.length === 1 ? 'Business' : 'Businesses'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors self-start sm:self-auto shrink-0"
                  >
                    <span>View Category Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Respected Category Businesses Grid */}
                {catBusinesses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catBusinesses.map((biz) => (
                      <div
                        key={biz.id}
                        className="rounded-2xl border border-neutral-200/90 bg-neutral-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
                      >
                        <div className="space-y-2.5">
                          {/* Business Title & Verified Badge */}
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/business/${biz.id}`}
                              className="font-extrabold text-base text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-1"
                            >
                              {biz.name}
                            </Link>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified
                            </span>
                          </div>

                          {/* Address / Location */}
                          {biz.address && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <span className="line-clamp-1">{biz.address}</span>
                            </div>
                          )}

                          {/* Business Description */}
                          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                            {biz.description}
                          </p>

                          {/* Services / Tags preview */}
                          {biz.services && biz.services.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {biz.services.slice(0, 2).map((srv) => (
                                <span
                                  key={srv.id}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-600"
                                >
                                  {srv.name}
                                </span>
                              ))}
                              {biz.services.length > 2 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-400">
                                  +{biz.services.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions Row */}
                        <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between gap-2">
                          <Link
                            to={`/business/${biz.id}`}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                          >
                            View Details
                            <ArrowRight className="w-3 h-3" />
                          </Link>

                          <div className="flex items-center gap-1.5">
                            {biz.phone && (
                              <a
                                href={`tel:${biz.phone}`}
                                title={`Call ${biz.name}`}
                                className="p-2 rounded-xl bg-white border border-neutral-200 hover:border-emerald-300 text-neutral-700 hover:text-emerald-700 transition-colors shadow-2xs"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {biz.whatsapp && (
                              <a
                                href={`https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`WhatsApp ${biz.name}`}
                                className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 transition-colors shadow-2xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      No businesses listed yet in {cat.name}.
                    </p>
                    <Link
                      to="/list-business"
                      className="inline-block mt-2 text-xs font-bold text-emerald-600 hover:underline"
                    >
                      + List a business in this category
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <p className="text-neutral-500 text-sm">No categories matched &quot;{filterText}&quot;.</p>
        </div>
      )}
    </div>
  );
};
