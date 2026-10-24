'use client';

import React from 'react';
import { FilterOptions } from '@/types';
import { formatINR } from '@/lib/utils';
import {
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';

interface PlaceFiltersProps {
  filters: FilterOptions;
  onChange: (updated: Partial<FilterOptions>) => void;
  onReset: () => void;
  totalResults: number;
}

export const PlaceFilters: React.FC<PlaceFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const regions = ['All Regions', 'North', 'South', 'East', 'West', 'North-East', 'Central'];
  const seasons = ['All Seasons', 'Summer', 'Monsoon', 'Autumn', 'Winter', 'Spring'];
  const sortOptions = [
    { label: 'Popularity & Rating', value: 'popularity' },
    { label: 'Budget: Low to High', value: 'budget_asc' },
    { label: 'Budget: High to Low', value: 'budget_desc' },
    { label: 'Duration: Short to Long', value: 'duration' },
    { label: 'Name (A to Z)', value: 'name' },
  ];

  const hasActiveFilters = Boolean(
    filters.query ||
    (filters.category && filters.category !== 'all') ||
    (filters.region && filters.region !== 'All Regions') ||
    (filters.season && filters.season !== 'All Seasons') ||
    filters.maxBudget < 25000
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-forest-50 text-forest-800">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-forest-950">
            Refine Offbeat Results
          </span>
          <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded-full">
            {totalResults} {totalResults === 1 ? 'place' : 'places'} found
          </span>
        </div>

        {/* Sort and Reset */}
        <div className="flex items-center gap-3 self-end lg:self-auto">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => onChange({ sortBy: e.target.value as any })}
                className="appearance-none bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg pl-2.5 pr-7 py-1.5 font-semibold text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-forest-700 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Row Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* Region */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
            Region of India
          </label>
          <div className="relative">
            <select
              value={filters.region}
              onChange={(e) => onChange({ region: e.target.value })}
              className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-forest-700 cursor-pointer"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Season */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
            Best Season
          </label>
          <div className="relative">
            <select
              value={filters.season}
              onChange={(e) => onChange({ season: e.target.value })}
              className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-forest-700 cursor-pointer"
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Max Budget Slider */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Max Estimated Budget
            </label>
            <span className="text-xs font-extrabold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-md border border-forest-100">
              Up to {formatINR(filters.maxBudget)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={5000}
              max={25000}
              step={1000}
              value={filters.maxBudget}
              onChange={(e) => onChange({ maxBudget: Number(e.target.value) })}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-forest-700"
            />
            <span className="text-[10px] text-stone-400 font-bold whitespace-nowrap">
              ₹25k+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
