'use client';

import React from 'react';
import Image from 'next/image';
import { Destination } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge } from './Badge';
import { StarRating } from './StarRating';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, MapPin, ArrowRight, Flame } from 'lucide-react';

interface TrendingDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
}

export const TrendingDestinations: React.FC<TrendingDestinationsProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const trending = destinations.filter((d) => d.isTrending).slice(0, 4);

  if (trending.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-forest-950 tracking-tight">
              Trending Hidden Escapes
            </h2>
            <p className="text-sm text-stone-600">
              Captivating travelers seeking authentic journeys off the tourist circuit
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trending.map((place) => {
          const fav = isFavorite(place.slug);

          return (
            <div
              key={place.id}
              onClick={() => onSelectDestination(place)}
              className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <Image
                  src={place.image_url}
                  alt={place.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <Badge variant="category" size="sm">
                    {place.category}
                  </Badge>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-xs">
                    {place.suggested_duration_days} Days
                  </span>
                </div>

                {/* Favorite Heart */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place.slug);
                  }}
                  aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform duration-150 active:scale-90 z-20 ${
                    fav
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                </button>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-medium mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{place.state}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug drop-shadow-xs truncate">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {place.shortDescription}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                      Estimated Cost
                    </span>
                    <span className="text-sm font-extrabold text-forest-900">
                      {formatINR(place.estimated_budget)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-forest-700 font-semibold group-hover:text-amber-600 transition-colors">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
