'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { useFavorites } from '@/context/FavoritesContext';
import { PlaceCard } from '@/components/PlaceCard';
import { PlaceDetailsModal } from '@/components/PlaceDetailsModal';
import { EmptyState } from '@/components/EmptyState';
import { Destination } from '@/types';
import {
  Heart,
  Search,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function FavoritesPage() {
  const { favoriteDestinations, count } = useFavorites();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = useMemo(() => {
    return favoriteDestinations.filter((d) => {
      if (query) {
        const q = query.toLowerCase();
        const match =
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'all' && d.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [favoriteDestinations, query, selectedCategory]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>Account</span>
              <span>/</span>
              <span className="text-forest-800">Favorites</span>
            </div>
            <h1 className="text-3xl font-black text-forest-950 tracking-tight flex items-center gap-2">
              <span>Saved Hidden Gems</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold">
                {count} {count === 1 ? 'Place' : 'Places'}
              </span>
            </h1>
          </div>

          <Link
            href="/search-destination-screen"
            className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Discover More Gems</span>
          </Link>
        </div>

        {/* Filter Controls (shown if there are favorites) */}
        {favoriteDestinations.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your saved places..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-stone-500 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Mountains">Mountains</option>
                <option value="Waterfalls">Waterfalls</option>
                <option value="Villages">Villages</option>
                <option value="Beaches">Beaches</option>
                <option value="Heritage">Heritage</option>
                <option value="Lakes">Lakes</option>
                <option value="Offbeat">Offbeat</option>
              </select>
            </div>
          </div>
        )}

        {/* Content Grid or Empty State */}
        {favoriteDestinations.length === 0 ? (
          <EmptyState
            title="Your favorites list is empty"
            description="Whenever you find an untouched valley, cave, or peaceful village you love, click the heart icon to save it here."
            actionLabel="Browse Offbeat Gems"
            actionHref="/search-destination-screen"
            icon="compass"
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No matching favorites found"
            description="None of your saved destinations match the query or category filter."
            actionLabel="Reset Search"
            onAction={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            icon="search"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <PlaceCard
                key={dest.id}
                destination={dest}
                onSelect={(d) => setSelectedDestination(d)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <PlaceDetailsModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </AppLayout>
  );
}
