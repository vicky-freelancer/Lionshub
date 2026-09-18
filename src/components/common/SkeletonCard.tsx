import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div
      id="skeleton-card"
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs animate-pulse flex flex-col"
    >
      <div className="h-48 bg-neutral-200 w-full" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-4 bg-neutral-200 rounded-sm w-1/4 mb-3" />
          <div className="h-6 bg-neutral-200 rounded-sm w-3/4 mb-2" />
          <div className="h-4 bg-neutral-200 rounded-sm w-full mb-1" />
          <div className="h-4 bg-neutral-200 rounded-sm w-2/3 mb-4" />
        </div>
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="h-4 bg-neutral-200 rounded-sm w-1/3" />
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-neutral-200 rounded-lg" />
            <div className="h-9 w-9 bg-neutral-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
