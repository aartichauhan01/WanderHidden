'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Destination } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge } from './Badge';
import { StarRating } from './StarRating';
import { useFavorites } from '@/context/FavoritesContext';
import { useTrips } from '@/context/TripsContext';
import {
  X,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Plane,
  Train,
  Car,
  ShieldAlert,
  Leaf,
  Lightbulb,
  ExternalLink,
  Plus,
  Check,
  Compass,
  Sparkles
} from 'lucide-react';

interface PlaceDetailsModalProps {
  destination: Destination | null;
  onClose: () => void;
  onOpenInMap?: (dest: Destination) => void;
}

export const PlaceDetailsModal: React.FC<PlaceDetailsModalProps> = ({
  destination,
  onClose,
  onOpenInMap,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { activeTrip, addDestinationToTrip } = useTrips();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  if (!destination) return null;

  const fav = isFavorite(destination.slug);
  const currentImg = selectedImage || destination.image_url;
  const gallery = [destination.image_url, ...(destination.gallery || [])].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  const handleAddToTrip = async () => {
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Main Hero Image */}
        <div className="relative h-72 sm:h-96 w-full bg-stone-900">
          <Image
            src={currentImg}
            alt={destination.name}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <Badge variant="category" size="md">
              {destination.category}
            </Badge>
            <Badge variant="verified" size="md">
              Verified Heritage / Nature Spot
            </Badge>
          </div>

          {/* Title, Location & Quick Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <div className="flex items-center gap-1.5 text-sm text-amber-300 font-semibold mb-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.state} • {destination.region} India</span>
              <span className="text-stone-300 ml-2 font-mono text-xs">
                [{destination.latitude.toFixed(2)}°N, {destination.longitude.toFixed(2)}°E]
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm mb-2">
              {destination.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Suggested: {destination.suggested_duration_days} Days
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Best: {destination.best_season}
              </span>
              <span>•</span>
              <StarRating rating={destination.rating || 4.8} reviewsCount={destination.reviewsCount} />
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {gallery.length > 1 && (
          <div className="flex gap-2 p-4 bg-stone-100 overflow-x-auto border-b border-stone-200">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  currentImg === img ? 'border-forest-700 ring-2 ring-forest-700/30' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-forest-50 border border-forest-100">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-forest-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Estimated Trip Budget</span>
              </div>
              <div className="text-2xl font-black text-forest-950">
                {formatINR(destination.estimated_budget)}
                <span className="text-xs font-normal text-stone-500 ml-1.5">
                  / person ({destination.suggested_duration_days} days)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleFavorite(destination.slug)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  fav
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${fav ? 'fill-current text-red-500' : ''}`} />
                <span>{fav ? 'Saved in Favorites' : 'Save Gem'}</span>
              </button>

              <button
                type="button"
                onClick={handleAddToTrip}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-forest-800 hover:bg-forest-900 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Itinerary!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Itinerary</span>
                  </>
                )}
              </button>

              {onOpenInMap && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInMap(destination);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-forest-700" />
                  <span>Locate on Map</span>
                </button>
              )}
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <h3 className="text-lg font-bold text-forest-950 mb-3">Overview & Essence</h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-forest-950 mb-3">Signature Experiences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800 font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Reach & Transport */}
          {destination.travelOptions && (
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-lg font-bold text-forest-950 mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-forest-700" />
                <span>How to Reach & Local Transport</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-500">
                    <Plane className="w-4 h-4 text-forest-700" />
                    <span>Nearest Airport</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    {destination.travelOptions.nearestAirport}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-500">
                    <Train className="w-4 h-4 text-forest-700" />
                    <span>Nearest Railway Station</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    {destination.travelOptions.nearestRailwayStation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-500">
                    <Car className="w-4 h-4 text-forest-700" />
                    <span>Road Route</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    {destination.travelOptions.roadRoute}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-500">
                    <Compass className="w-4 h-4 text-forest-700" />
                    <span>Local Commute</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    {destination.travelOptions.localTransport}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Practical Tips & Responsible Tourism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-stone-100 pt-6">
            {/* Practical Travel Tips */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Field Travel Tips</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                {destination.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ethical Tourism & Safety */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
              <h4 className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>Responsible Tourism & Safety</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                {destination.safetyAndResponsibleTourism.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* External Map Directions link */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
            <span>Coordinates: {destination.latitude}, {destination.longitude}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-forest-700 hover:text-forest-900 font-semibold"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
