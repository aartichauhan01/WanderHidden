'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { PlaceCard } from '@/components/PlaceCard';
import { MapPanel } from '@/components/MapPanel';
import { TripPlannerPanel } from '@/components/TripPlannerPanel';
import { BudgetEstimator } from '@/components/BudgetEstimator';
import { PlaceDetailsModal } from '@/components/PlaceDetailsModal';
import { CategoryFilters } from '@/components/CategoryFilters';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { Destination, FilterOptions } from '@/types';
import {
  Compass,
  MapPin,
  Luggage,
  Wallet,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from 'lucide-react';

function HiddenPlacesContent() {
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get('selected');

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(() => {
    if (selectedSlug) {
      return INITIAL_DESTINATIONS.find((d) => d.slug === selectedSlug) || INITIAL_DESTINATIONS[0];
    }
    return INITIAL_DESTINATIONS[0];
  });

  const [detailsModalDest, setDetailsModalDest] = useState<Destination | null>(null);

  // Mobile active tab: 'places' | 'map' | 'planner' | 'budget'
  const [mobileTab, setMobileTab] = useState<'places' | 'map' | 'planner' | 'budget'>('places');

  // Secondary panel tab for desktop: 'map' | 'planner' | 'budget'
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<'map' | 'planner' | 'budget'>('map');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Update selected if query param changes
  useEffect(() => {
    if (selectedSlug) {
      const match = INITIAL_DESTINATIONS.find((d) => d.slug === selectedSlug);
      if (match) {
        setSelectedDestination(match);
      }
    }
  }, [selectedSlug]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    INITIAL_DESTINATIONS.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredPlaces = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((item) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      {/* Top Breadcrumb & Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
            <span>Explore</span>
            <span>/</span>
            <span className="text-forest-800">Hidden Places Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-forest-950 tracking-tight flex items-center gap-2.5">
            <span>The Explorer Suite</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
              Live Coordinate Sync
            </span>
          </h1>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex rounded-xl bg-stone-200/80 p-1">
          <button
            onClick={() => setMobileTab('places')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'places' ? 'bg-white text-forest-950 shadow-xs' : 'text-stone-600'
            }`}
          >
            Places ({filteredPlaces.length})
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'map' ? 'bg-white text-forest-950 shadow-xs' : 'text-stone-600'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setMobileTab('planner')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'planner' ? 'bg-white text-forest-950 shadow-xs' : 'text-stone-600'
            }`}
          >
            Planner
          </button>
          <button
            onClick={() => setMobileTab('budget')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'budget' ? 'bg-white text-forest-950 shadow-xs' : 'text-stone-600'
            }`}
          >
            Budget
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Place Browser (7 cols on lg, 6 on 2xl) */}
        <div
          className={`lg:col-span-7 xl:col-span-7 2xl:col-span-6 space-y-5 ${
            mobileTab !== 'places' ? 'hidden lg:block' : ''
          }`}
        >
          {/* Quick Search & Region bar */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by valley, state, or keywords..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>

            {/* Category horizontal scroll */}
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />

            {/* Region pills */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-stone-500 uppercase mr-1">Region:</span>
                {['All', 'North', 'South', 'East', 'West', 'North-East', 'Central'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                      selectedRegion === r
                        ? 'bg-forest-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {(searchQuery || selectedCategory !== 'all' || selectedRegion !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRegion('All');
                  }}
                  className="text-stone-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Places Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>
                Showing <strong>{filteredPlaces.length}</strong> secret destinations
              </span>
              <span>Click any card to sync map marker</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPlaces.map((place) => {
                const isSelected = selectedDestination?.id === place.id;
                return (
                  <div
                    key={place.id}
                    className={`transition-all duration-200 rounded-2xl ${
                      isSelected ? 'ring-2 ring-forest-700 shadow-md' : ''
                    }`}
                  >
                    <PlaceCard
                      destination={place}
                      onSelect={(dest) => {
                        setSelectedDestination(dest);
                        setDetailsModalDest(dest);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Secondary Suite (Map, Planner, Budget) (5 cols on lg, 6 on 2xl) */}
        <div
          className={`lg:col-span-5 xl:col-span-5 2xl:col-span-6 space-y-6 lg:sticky lg:top-20 ${
            mobileTab === 'places' ? 'hidden lg:block' : ''
          }`}
        >
          {/* Secondary Suite Desktop Tab Switcher */}
          <div className="hidden lg:flex items-center justify-between p-1.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <button
              onClick={() => setActiveSecondaryTab('map')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeSecondaryTab === 'map'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setActiveSecondaryTab('planner')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeSecondaryTab === 'planner'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Luggage className="w-3.5 h-3.5" />
              <span>Trip Itinerary</span>
            </button>
            <button
              onClick={() => setActiveSecondaryTab('budget')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeSecondaryTab === 'budget'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Budget Calculator</span>
            </button>
          </div>

          {/* Tab 1: Map */}
          <div
            className={`${
              (activeSecondaryTab === 'map' && mobileTab !== 'planner' && mobileTab !== 'budget') ||
              mobileTab === 'map'
                ? 'block'
                : 'hidden'
            }`}
          >
            <MapPanel
              destinations={filteredPlaces}
              selectedDestination={selectedDestination}
              onSelectDestination={(dest) => {
                setSelectedDestination(dest);
              }}
            />
          </div>

          {/* Tab 2: Trip Planner */}
          <div
            className={`${
              (activeSecondaryTab === 'planner' && mobileTab !== 'map' && mobileTab !== 'budget') ||
              mobileTab === 'planner'
                ? 'block'
                : 'hidden'
            }`}
          >
            <TripPlannerPanel
              onOpenDetailsModal={(dest) => setDetailsModalDest(dest)}
            />
          </div>

          {/* Tab 3: Budget Estimator */}
          <div
            className={`${
              (activeSecondaryTab === 'budget' && mobileTab !== 'map' && mobileTab !== 'planner') ||
              mobileTab === 'budget'
                ? 'block'
                : 'hidden'
            }`}
          >
            <BudgetEstimator />
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <PlaceDetailsModal
        destination={detailsModalDest}
        onClose={() => setDetailsModalDest(null)}
        onOpenInMap={(dest) => {
          setSelectedDestination(dest);
          setActiveSecondaryTab('map');
          setMobileTab('map');
        }}
      />
    </div>
  );
}

export default function HiddenPlacesScreen() {
  return (
    <AppLayout hideFooter>
      <Suspense fallback={<div className="p-10 text-center">Loading Explorer Suite...</div>}>
        <HiddenPlacesContent />
      </Suspense>
    </AppLayout>
  );
}
