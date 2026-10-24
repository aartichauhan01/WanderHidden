import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { AppLayout } from '@/components/AppLayout';
import { Badge } from '@/components/Badge';
import { StarRating } from '@/components/StarRating';
import { formatINR } from '@/lib/utils';
import {
  MapPin,
  Calendar,
  Clock,
  Plane,
  Train,
  Car,
  Compass,
  Lightbulb,
  Leaf,
  ExternalLink,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import type { Metadata } from 'next';

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = INITIAL_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) {
    return { title: 'Destination Not Found — WanderHidden' };
  }
  return {
    title: `${dest.name}, ${dest.state} — WanderHidden`,
    description: dest.shortDescription,
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = INITIAL_DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  const gallery = [destination.image_url, ...(destination.gallery || [])].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/search-destination-screen"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-forest-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </Link>

        {/* Hero Gallery */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-lg">
          <div className="relative h-80 sm:h-[450px] w-full">
            <Image
              src={destination.image_url}
              alt={destination.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Badges on hero */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
              <Badge variant="category" size="md">
                {destination.category}
              </Badge>
              <Badge variant="verified" size="md">
                Curated Secret Gem
              </Badge>
            </div>

            {/* Title & Metadata */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <div className="flex items-center gap-2 text-sm text-amber-300 font-semibold mb-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.state} • {destination.region} India</span>
                <span className="text-stone-300 ml-2 font-mono text-xs">
                  [{destination.latitude.toFixed(2)}°N, {destination.longitude.toFixed(2)}°E]
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-sm mb-2">
                {destination.name}
              </h1>
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

          {/* Additional Gallery Photos */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-2 p-3 bg-forest-950">
              {gallery.slice(0, 3).map((img, i) => (
                <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Budget and Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-forest-50 border border-forest-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-forest-700 tracking-wider block">
              Estimated Trip Cost
            </span>
            <div className="text-2xl sm:text-3xl font-black text-forest-950">
              {formatINR(destination.estimated_budget)}
              <span className="text-xs font-normal text-stone-500 ml-1.5">
                / person ({destination.suggested_duration_days} days)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/hidden-places-screen?selected=${destination.slug}`}
              className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore on Map & Add to Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Overview & Detailed Content */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-forest-950 mb-3">About {destination.name}</h2>
            <p className="text-stone-700 leading-relaxed text-base">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          {destination.highlights && (
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-lg font-bold text-forest-950 mb-3">Must-Experience Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transport Info */}
          {destination.travelOptions && (
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
                <Plane className="w-5 h-5 text-forest-700" />
                <span>How to Reach</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold uppercase text-stone-500 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-forest-700" /> Nearest Airport
                  </span>
                  <p className="text-stone-800 font-medium">{destination.travelOptions.nearestAirport}</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold uppercase text-stone-500 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-forest-700" /> Nearest Railway
                  </span>
                  <p className="text-stone-800 font-medium">{destination.travelOptions.nearestRailwayStation}</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold uppercase text-stone-500 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-forest-700" /> Road Connectivity
                  </span>
                  <p className="text-stone-800 font-medium">{destination.travelOptions.roadRoute}</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold uppercase text-stone-500 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-forest-700" /> Local Transit
                  </span>
                  <p className="text-stone-800 font-medium">{destination.travelOptions.localTransport}</p>
                </div>
              </div>
            </div>
          )}

          {/* Practical Tips & Responsible Tourism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Field Travel Tips</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {destination.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>Responsible Tourism</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {destination.safetyAndResponsibleTourism.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* External Directions Link */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Coordinates: {destination.latitude}, {destination.longitude}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-forest-800 hover:text-forest-950 font-bold"
            >
              <span>View Location in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
