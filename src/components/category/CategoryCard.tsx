import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Category } from '../../types/category';
import { CategoryIcon } from '../common/CategoryIcon';

interface CategoryCardProps {
  category: Category;
  variant?: 'card' | 'pill' | 'featured';
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = 'card',
  className = '',
}) => {
  if (variant === 'pill') {
    return (
      <Link
        id={`category-pill-${category.slug}`}
        to={`/category/${category.slug}`}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 text-neutral-800 hover:text-emerald-800 transition-all text-xs font-semibold shadow-2xs group shrink-0 ${className}`}
      >
        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <CategoryIcon name={category.icon || category.name} className="w-3.5 h-3.5" />
        </div>
        <span>{category.name}</span>
        {category.business_count !== undefined && category.business_count > 0 && (
          <span className="text-[10px] text-neutral-400 font-normal">({category.business_count})</span>
        )}
      </Link>
    );
  }

  // Card Variant
  return (
    <Link
      id={`category-card-${category.slug}`}
      to={`/category/${category.slug}`}
      className={`group relative rounded-2xl border border-neutral-200/90 bg-white p-5 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
            <CategoryIcon name={category.icon || category.name} className="w-6 h-6" />
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-50 group-hover:bg-emerald-50 flex items-center justify-center text-neutral-400 group-hover:text-emerald-600 transition-colors">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <h3 className="font-bold text-base text-neutral-900 group-hover:text-emerald-700 transition-colors mb-1.5">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
            {category.description}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
        <span>{category.business_count !== undefined ? `${category.business_count} Listings` : 'Explore'}</span>
        <span className="text-emerald-600 font-semibold group-hover:underline flex items-center gap-0.5">
          Browse
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
};
