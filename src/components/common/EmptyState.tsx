import React from 'react';
import { SearchX, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No businesses found',
  description = 'We could not find any businesses matching your search criteria. Try different keywords or browse all categories.',
  actionText = 'List Your Business',
  actionLink = '/list-business',
  onReset,
  resetText = 'Clear Filters',
}) => {
  return (
    <div
      id="empty-state-container"
      className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto shadow-xs my-8"
    >
      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <button
            id="empty-state-reset-btn"
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm font-medium transition-colors"
          >
            {resetText}
          </button>
        )}
        {actionLink && (
          <Link
            id="empty-state-action-link"
            to={actionLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            {actionText}
          </Link>
        )}
      </div>
    </div>
  );
};
