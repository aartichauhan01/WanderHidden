'use client';

import React from 'react';
import Image from 'next/image';
import { Destination } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge } from './Badge';
import { StarRating } from './StarRating';
import { useFavorites } from '@/context/FavoritesContext';
import { useTrips } from '@/context/TripsContext';
import {
  Heart,
  MapPin,
  Calendar,
  Plus,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';

interface PlaceCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  compact?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  destination,
  onSelect,
  compact = false,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { activeTrip, addDestinationToTrip } = useTrips();
  const [justAdded, setJustAdded] = React.useState(false);

  const fav = isFavorite(destination.slug);

  const handleAddToTrip = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTrip) {
      await addDestinationToTrip(activeTrip.id, destination);
    } else {
      await addDestinationToTrip('', destination);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-0.5"
    >
      {/* Top Media */}
      <div className={`relative w-full overflow-hidden bg-stone-100 ${compact ? 'h-40' : 'h-52'}`}>
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="category" size="sm">
            {destination.category}
          </Badge>
          {destination.verifiedStatus === 'verified_local' && (
            <Badge variant="verified" size="sm">
              Local Guide
            </Badge>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(destination.slug);
          }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-150 active:scale-90 z-20 ${
            fav
              ? 'bg-red-500 text-white shadow-sm'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
        </button>

        {/* Title & Location on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10">
          <div className="flex items-center gap-1 text-xs text-amber-300 font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{destination.state} • {destination.region}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight drop-shadow-xs truncate">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Highlights Chips */}
        {!compact && destination.highlights && destination.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {destination.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="text-[11px] bg-stone-50 text-stone-600 border border-stone-200/80 px-2 py-0.5 rounded-md truncate max-w-full"
              >
                • {h}
              </span>
            ))}
          </div>
        )}

        {/* Details row: Best Season & Rating */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-stone-600">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium text-[11px] truncate max-w-[130px]">
              {destination.best_season.split('&')[0]}
            </span>
          </div>
          <StarRating rating={destination.rating || 4.8} reviewsCount={destination.reviewsCount} />
        </div>

        {/* Footer Actions: Budget & Add to Itinerary */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-stone-400">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Est. Per Person</span>
            </div>
            <span className="text-base font-extrabold text-forest-950">
              {formatINR(destination.estimated_budget)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleAddToTrip}
              title="Add to Itinerary"
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-stone-50 hover:bg-forest-50 text-forest-800 border-stone-200 hover:border-forest-300'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add to Trip</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelect(destination)}
              className="px-3 py-2 bg-forest-850 hover:bg-forest-950 bg-forest-900 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
