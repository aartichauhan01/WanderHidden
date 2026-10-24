'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { SearchHero } from '@/components/SearchHero';
import { CategoryFilters } from '@/components/CategoryFilters';
import { TrendingDestinations } from '@/components/TrendingDestinations';
import { PlaceFilters } from '@/components/PlaceFilters';
import { DestinationsGrid } from '@/components/DestinationsGrid';
import { PlaceDetailsModal } from '@/components/PlaceDetailsModal';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { Destination, FilterOptions } from '@/types';
import { useRouter } from 'next/navigation';
import { Sparkles, MapPin } from 'lucide-react';

export default function SearchDestinationScreen() {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    query: '',
    category: 'all',
    state: '',
    region: 'All Regions',
    season: 'All Seasons',
    travelStyle: '',
    maxBudget: 25000,
    minDuration: 1,
    maxDuration: 14,
    sortBy: 'popularity',
  });

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    INITIAL_DESTINATIONS.forEach((dest) => {
      counts[dest.category] = (counts[dest.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and sorted destinations
  const filteredDestinations = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((item) => {
      // Query filter: name, state, region, description, tags
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Region filter
      if (filters.region && filters.region !== 'All Regions') {
        if (item.region !== filters.region) return false;
      }

      // Season filter
      if (filters.season && filters.season !== 'All Seasons') {
        const hasSeason =
          item.idealSeasons.includes(filters.season as any) ||
          item.best_season.toLowerCase().includes(filters.season.toLowerCase());
        if (!hasSeason) return false;
      }

      // Budget filter
      if (item.estimated_budget > filters.maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'budget_asc') {
        return a.estimated_budget - b.estimated_budget;
      }
      if (filters.sortBy === 'budget_desc') {
        return b.estimated_budget - a.estimated_budget;
      }
      if (filters.sortBy === 'duration') {
        return a.suggested_duration_days - b.suggested_duration_days;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: popularity / rating
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [filters]);

  const handleFilterChange = (updated: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      state: '',
      region: 'All Regions',
      season: 'All Seasons',
      travelStyle: '',
      maxBudget: 25000,
      minDuration: 1,
      maxDuration: 14,
      sortBy: 'popularity',
    });
  };

  const handleOpenInMap = (dest: Destination) => {
    router.push(`/hidden-places-screen?selected=${dest.slug}`);
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <SearchHero
        initialQuery={filters.query}
        onSearch={(query) => handleFilterChange({ query })}
        totalGemsCount={INITIAL_DESTINATIONS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Category Horizontal Filter Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Browse By Terrain & Experience
            </h2>
            <span className="text-xs text-stone-400">
              Showing {filteredDestinations.length} destinations
            </span>
          </div>
          <CategoryFilters
            selectedCategory={filters.category}
            onSelectCategory={(category) => handleFilterChange({ category })}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Trending Destinations Section (shown when no narrow search is active) */}
        {!filters.query && filters.category === 'all' && (
          <TrendingDestinations
            destinations={INITIAL_DESTINATIONS}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
          />
        )}

        {/* Section Heading & Interactive Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl font-black text-forest-950 tracking-tight flex items-center gap-2">
                <span>All Curated Hidden Gems</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 font-bold">
                  India
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Lesser-known villages, silent valleys, and hidden geological wonders
              </p>
            </div>
          </div>

          <PlaceFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredDestinations.length}
          />
        </div>

        {/* Destinations Grid */}
        <DestinationsGrid
          destinations={filteredDestinations}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Destination Details Modal */}
      <PlaceDetailsModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onOpenInMap={handleOpenInMap}
      />
    </AppLayout>
  );
}
