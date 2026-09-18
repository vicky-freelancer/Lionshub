import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading local listings...',
  size = 'md',
  fullHeight = false,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      id="loading-spinner-container"
      className={`flex flex-col items-center justify-center p-8 text-neutral-500 ${
        fullHeight ? 'min-h-[50vh]' : ''
      }`}
    >
      <Loader2 className={`animate-spin text-emerald-600 ${sizeClasses[size]}`} />
      {message && <p className="mt-3 text-sm font-medium text-neutral-600">{message}</p>}
    </div>
  );
};
