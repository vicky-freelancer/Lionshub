import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Building2 } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div id="not-found-page" className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
        <Building2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">404 - Page Not Found</h1>
      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
        The community page or business directory record you requested does not exist or may have been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          Back to Directory
        </Link>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-colors"
        >
          <Search className="w-4 h-4" />
          Search Listings
        </Link>
      </div>
    </div>
  );
};
