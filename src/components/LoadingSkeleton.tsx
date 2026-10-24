import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'grid' | 'details' | 'map';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
}) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: count || 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="h-52 bg-stone-200 w-full" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-stone-200 rounded w-1/3" />
              <div className="h-6 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-full" />
              <div className="h-3 bg-stone-200 rounded w-4/5" />
              <div className="pt-3 border-t border-stone-100 flex justify-between">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="h-4 bg-stone-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'map') {
    return (
      <div className="w-full h-full min-h-[400px] bg-stone-100 rounded-2xl border border-stone-200 flex flex-col items-center justify-center p-8 animate-pulse text-stone-400">
        <div className="w-12 h-12 bg-stone-200 rounded-full mb-3" />
        <div className="h-4 bg-stone-200 rounded w-48 mb-2" />
        <div className="h-3 bg-stone-200 rounded w-32" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-stone-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-stone-200 rounded w-1/3" />
        <div className="h-6 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-full" />
      </div>
    </div>
  );
};
