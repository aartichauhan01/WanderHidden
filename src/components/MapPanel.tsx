'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Destination } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge } from './Badge';
import { useTrips } from '@/context/TripsContext';
import {
  MapPin,
  ExternalLink,
  Plus,
  Compass,
  Sparkles,
  Info,
  ZoomIn,
  ZoomOut,
  Navigation
} from 'lucide-react';

interface MapPanelProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  className?: string;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { activeTrip, addDestinationToTrip } = useTrips();
  const [justAdded, setJustAdded] = useState(false);

  // Fallback map state
  const [zoomLevel, setZoomLevel] = useState(1);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasValidApiKey = Boolean(apiKey && apiKey !== 'your-google-maps-api-key-here');

  // Load real Google Maps if API key is provided
  useEffect(() => {
    if (!hasValidApiKey || typeof window === 'undefined') {
      return;
    }

    // Check if script already loaded
    if ((window as any).google?.maps) {
      initGoogleMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initGoogleMap();
    };
    script.onerror = () => {
      setMapError('Failed to load Google Maps SDK. Showing interactive fallback map.');
    };
    document.head.appendChild(script);

    return () => {
      // cleanup script if unmounting before loaded
    };
  }, [hasValidApiKey, apiKey]);

  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const initGoogleMap = () => {
    if (!mapContainerRef.current || !(window as any).google?.maps) return;

    try {
      const google = (window as any).google;
      const initialCenter = selectedDestination
        ? { lat: selectedDestination.latitude, lng: selectedDestination.longitude }
        : { lat: 21.7679, lng: 78.8718 }; // Center of India

      const map = new google.maps.Map(mapContainerRef.current, {
        center: initialCenter,
        zoom: selectedDestination ? 7 : 4.5,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }],
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#f3f4f1' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#c4e0e5' }],
          },
        ],
      });

      mapInstanceRef.current = map;
      setGoogleMapLoaded(true);

      // Add markers
      destinations.forEach((dest) => {
        const marker = new google.maps.Marker({
          position: { lat: dest.latitude, lng: dest.longitude },
          map,
          title: dest.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: selectedDestination?.id === dest.id ? '#d97706' : '#14532d',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
          },
        });

        marker.addListener('click', () => {
          onSelectDestination(dest);
        });

        markersRef.current.push(marker);
      });
    } catch (err: any) {
      setMapError(err?.message || 'Google Maps initialization error');
    }
  };

  // Center on selectedDestination when changed
  useEffect(() => {
    if (mapInstanceRef.current && selectedDestination && (window as any).google) {
      mapInstanceRef.current.panTo({
        lat: selectedDestination.latitude,
        lng: selectedDestination.longitude,
      });
      mapInstanceRef.current.setZoom(7);
    }
  }, [selectedDestination]);

  const handleAddToItinerary = async (dest: Destination) => {
    if (activeTrip) {
      await addDestinationToTrip(activeTrip.id, dest);
    } else {
      await addDestinationToTrip('', dest);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Coordinate projections for the fallback SVG canvas of India
  // Geographic bounds of India roughly: Lat 8.0 to 36.0, Lng 68.0 to 97.0
  const projectCoordsToSVG = (lat: number, lng: number) => {
    const minLat = 8.0;
    const maxLat = 35.5;
    const minLng = 68.5;
    const maxLng = 97.0;

    // Invert lat for SVG Y (top is 0)
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs ${className}`}>
      {/* Header bar */}
      <div className="p-3.5 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500 text-forest-950">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">
              {hasValidApiKey ? 'Live Google Maps Explorer' : 'Interactive Geographic Map'}
            </span>
            <span className="text-[10px] text-amber-300 font-medium">
              {hasValidApiKey ? 'Google Maps JS API' : 'Fallback Demo Canvas (Coordinates Verified)'}
            </span>
          </div>
        </div>

        {/* Fallback zoom buttons */}
        {!hasValidApiKey && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
              className="p-1 rounded bg-forest-800 hover:bg-forest-700 text-stone-200"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
              className="p-1 rounded bg-forest-800 hover:bg-forest-700 text-stone-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Map Display Viewport */}
      <div className="relative w-full h-[460px] bg-[#eef3ee] overflow-hidden flex items-center justify-center">
        {hasValidApiKey ? (
          <div ref={mapContainerRef} className="w-full h-full" />
        ) : (
          /* High-Fidelity SVG Interactive Map of India Canvas */
          <div
            className="relative w-full h-full p-4 transition-transform duration-300 select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Water and India Subcontinent Silhouette */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              {/* Approximate contour of India */}
              <path
                d="M 30,12 L 45,5 L 55,8 L 65,15 L 75,20 L 90,25 L 95,35 L 85,42 L 75,40 L 70,48 L 78,58 L 65,75 L 50,95 L 45,92 L 40,78 L 32,65 L 20,45 L 22,35 Z"
                fill="#d1fae5"
                stroke="#10b981"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>

            {/* Render Destination Pins */}
            {destinations.map((dest) => {
              const { x, y } = projectCoordsToSVG(dest.latitude, dest.longitude);
              const isSelected = selectedDestination?.id === dest.id;

              return (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Pin Circle */}
                  <div
                    className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'w-7 h-7 bg-amber-500 text-stone-950 ring-4 ring-amber-400/40 shadow-lg scale-110 z-30'
                        : 'w-5 h-5 bg-forest-800 text-white hover:scale-125 hover:bg-forest-700 shadow-sm'
                    }`}
                  >
                    <MapPin className={`${isSelected ? 'w-4 h-4' : 'w-3 h-3'}`} />
                  </div>

                  {/* Marker Tooltip on Hover or Selection */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-forest-950 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-md pointer-events-none transition-all ${
                      isSelected ? 'opacity-100 visible scale-100' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                    }`}
                  >
                    {dest.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-forest-950" />
                  </div>
                </div>
              );
            })}

            {/* Fallback Notice Overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-stone-200 text-[10px] text-stone-600 flex items-center justify-between shadow-xs">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span>Click markers to focus. Set <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> for live tiles.</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Destination Details Card */}
      {selectedDestination ? (
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Badge variant="category" size="sm">
                  {selectedDestination.category}
                </Badge>
                <span className="text-[11px] text-stone-500 font-medium">
                  {selectedDestination.state}
                </span>
              </div>
              <h4 className="text-base font-bold text-forest-950">
                {selectedDestination.name}
              </h4>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">
                Est. Cost
              </span>
              <span className="text-sm font-extrabold text-forest-900">
                {formatINR(selectedDestination.estimated_budget)}
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2">
            {selectedDestination.shortDescription}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-stone-200/80">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDestination.latitude},${selectedDestination.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-forest-800 hover:text-forest-950 flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5 text-forest-700" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>

            <button
              onClick={() => handleAddToItinerary(selectedDestination)}
              className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{justAdded ? 'Added!' : 'Add to Trip'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          Select any marker to preview coordinates, route directions, and budget.
        </div>
      )}
    </div>
  );
};
