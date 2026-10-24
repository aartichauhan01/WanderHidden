'use client';

import React, { useState } from 'react';
import { Destination } from '@/types';
import { PlaceCard } from './PlaceCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { Sparkles, ChevronDown } from 'lucide-react';

interface DestinationsGridProps {
  destinations: Destination[];
  isLoading?: boolean;
  onSelectDestination: (dest: Destination) => void;
  onResetFilters?: () => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  destinations,
  isLoading = false,
  onSelectDestination,
  onResetFilters,
}) => {
  const [visibleCount, setVisibleCount] = useState(9);

  if (isLoading) {
    return <LoadingSkeleton type="grid" count={6} />;
  }

  if (destinations.length === 0) {
    return (
      <EmptyState
        title="No offbeat gems match your criteria"
        description="We couldn't find any places matching your current filter combination. Try clearing some filters or searching for another region."
        actionLabel="Reset All Filters"
        onAction={onResetFilters}
        icon="search"
      />
    );
  }

  const visibleDestinations = destinations.slice(0, visibleCount);
  const hasMore = visibleCount < destinations.length;

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleDestinations.map((dest) => (
          <PlaceCard
            key={dest.id}
            destination={dest}
            onSelect={onSelectDestination}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4 pb-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-forest-900 border border-stone-200 font-bold rounded-xl text-sm transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            <span>Load More Secret Gems ({destinations.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4 text-forest-700" />
          </button>
        </div>
      )}

      {/* Dataset disclaimer */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Authenticity Guarantee:</strong> Curated from verified travelers, state tourism archives, and indigenous homestays. Budgets are estimates in INR.
          </span>
        </div>
        <span className="text-[11px] text-stone-500 whitespace-nowrap">
          Showing {visibleDestinations.length} of {destinations.length} gems
        </span>
      </div>
    </div>
  );
};
