'use client';

import React, { useState } from 'react';
import { Search, X, MapPin, Sparkles } from 'lucide-react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  totalGemsCount?: number;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  onSearch,
  initialQuery = '',
  totalGemsCount = 22,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const suggestions = [
    'Ziro Valley',
    'Dzukou Valley',
    'Chopta',
    'Gandikota',
    'Anegundi',
    'Mawlynnong',
    'Himachal Pradesh',
    'Meghalaya',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-800 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800/80">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-600/50 text-xs font-semibold text-amber-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Discover {totalGemsCount}+ Curated Offbeat Indian Sanctuaries</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Your Next Adventure <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
            Is Hidden Here.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Escape the crowds. Uncover misty alpine bugyals, ancient tribal villages, living root bridges, and secluded coastal coves across India.
        </p>

        {/* Search Bar Form */}
        <form
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-5 h-5 text-stone-300 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by valley, waterfall, state (e.g. Arunachal, Chopta, Spiti)..."
              className="w-full bg-white/95 text-stone-900 placeholder-stone-500 rounded-xl pl-12 pr-10 py-3.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 border border-transparent shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 rounded-full transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find Gems</span>
          </button>
        </form>

        {/* Suggestions Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-stone-400 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" /> Popular searches:
          </span>
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => handleSuggestionClick(item)}
              className="px-2.5 py-1 rounded-full bg-forest-800/60 hover:bg-forest-700/80 text-stone-200 border border-forest-700/60 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
