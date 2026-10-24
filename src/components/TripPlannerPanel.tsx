'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTrips } from '@/context/TripsContext';
import { TripStop } from '@/types';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Luggage,
  Calendar,
  Users,
  MapPin,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  ExternalLink,
  Edit2,
  Check,
  Sparkles
} from 'lucide-react';

interface TripPlannerPanelProps {
  className?: string;
  onOpenDetailsModal?: (dest: any) => void;
}

export const TripPlannerPanel: React.FC<TripPlannerPanelProps> = ({
  className = '',
  onOpenDetailsModal,
}) => {
  const {
    trips,
    activeTrip,
    setActiveTripId,
    createTrip,
    updateTrip,
    removeStopFromTrip,
    reorderStop,
    moveStopToDay,
    updateStopNotes,
  } = useTrips();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  if (!activeTrip) {
    return (
      <div className={`bg-white rounded-2xl border border-stone-200/90 p-6 text-center ${className}`}>
        <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mx-auto mb-3">
          <Luggage className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-forest-950 mb-1">No Active Trip Selected</h3>
        <p className="text-xs text-stone-500 mb-4">
          Create an itinerary to group secret gems into days.
        </p>
        <button
          onClick={() =>
            createTrip({
              title: 'My Indian Secret Trail',
              startDate: new Date().toISOString().split('T')[0],
              endDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
              travelerCount: 2,
              budget: {
                travelers: 2,
                days: 5,
                nightlyAccommodation: 3000,
                dailyFoodPerPerson: 1000,
                transportation: 5000,
                activities: 3000,
                miscellaneous: 1500,
              },
            })
          }
          className="px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold hover:bg-forest-900 transition-colors cursor-pointer"
        >
          Create New Trip
        </button>
      </div>
    );
  }

  // Group stops by day
  const maxDay = Math.max(
    activeTrip.budget.days || 3,
    ...activeTrip.stops.map((s) => s.day),
    1
  );
  const daysArray = Array.from({ length: maxDay }, (_, i) => i + 1);

  const handleTitleSave = () => {
    if (editedTitle.trim()) {
      updateTrip(activeTrip.id, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleNotesSave = (stopId: string) => {
    updateStopNotes(activeTrip.id, stopId, noteDraft);
    setEditingNotesId(null);
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500 text-forest-950">
            <Luggage className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Smart Trip Planner</h3>
            <span className="text-[10px] text-amber-300 font-medium">
              Multi-day itinerary & stop scheduling
            </span>
          </div>
        </div>

        <Link
          href="/my-trips"
          className="text-xs text-stone-200 hover:text-white flex items-center gap-1 font-semibold"
        >
          <span>Manage All</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Active Trip Info Box */}
      <div className="p-4 bg-stone-50 border-b border-stone-200 space-y-2">
        {/* Title editing */}
        <div className="flex items-center justify-between gap-2">
          {isEditingTitle ? (
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                className="p-1 bg-forest-800 text-white rounded-lg hover:bg-forest-900"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-forest-950 text-sm">{activeTrip.title}</h4>
              <button
                onClick={() => {
                  setEditedTitle(activeTrip.title);
                  setIsEditingTitle(true);
                }}
                className="text-stone-400 hover:text-stone-700 p-0.5"
                title="Edit trip title"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}

          {trips.length > 1 && (
            <select
              value={activeTrip.id}
              onChange={(e) => setActiveTripId(e.target.value)}
              className="text-[11px] bg-white border border-stone-200 rounded-lg px-2 py-1 font-semibold text-stone-700 focus:outline-none"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Date and details metadata */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            {formatDate(activeTrip.startDate)} - {formatDate(activeTrip.endDate)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-forest-700" />
            {activeTrip.travelerCount} {activeTrip.travelerCount === 1 ? 'traveler' : 'travelers'}
          </span>
          <span>•</span>
          <span className="font-bold text-forest-900">
            {activeTrip.stops.length} {activeTrip.stops.length === 1 ? 'stop' : 'stops'}
          </span>
        </div>
      </div>

      {/* Itinerary Stops grouped by day */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[380px] space-y-4">
        {activeTrip.stops.length === 0 ? (
          <div className="p-6 text-center text-xs text-stone-500">
            <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
            <p className="font-medium text-stone-700">Your itinerary is empty</p>
            <p className="text-stone-500 mt-0.5">Click "Add to Trip" on any destination to organize your days.</p>
          </div>
        ) : (
          daysArray.map((dayNum) => {
            const dayStops = activeTrip.stops.filter((s) => s.day === dayNum);
            if (dayStops.length === 0) return null;

            return (
              <div key={dayNum} className="space-y-2">
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-forest-900">
                    Day {dayNum}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {dayStops.length} {dayStops.length === 1 ? 'place' : 'places'}
                  </span>
                </div>

                <div className="space-y-2">
                  {dayStops.map((stop, index) => {
                    const dest = stop.destination;
                    return (
                      <div
                        key={stop.id}
                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/90 text-xs space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            onClick={() => dest && onOpenDetailsModal && onOpenDetailsModal(dest)}
                            className="flex items-start gap-1.5 cursor-pointer flex-1"
                          >
                            <MapPin className="w-3.5 h-3.5 text-forest-700 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 hover:text-forest-700 block leading-tight">
                                {dest?.name || stop.destinationId}
                              </span>
                              <span className="text-[10px] text-stone-500 block">
                                {dest?.state || 'India'}
                              </span>
                            </div>
                          </div>

                          {/* Stop actions: Reorder & Remove */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => reorderStop(activeTrip.id, stop.id, 'up')}
                              disabled={index === 0}
                              className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                              title="Move Stop Up"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => reorderStop(activeTrip.id, stop.id, 'down')}
                              disabled={index === dayStops.length - 1}
                              className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                              title="Move Stop Down"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeStopFromTrip(activeTrip.id, stop.id)}
                              className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Remove Stop"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Notes editor */}
                        {editingNotesId === stop.id ? (
                          <div className="flex items-center gap-1 mt-1">
                            <input
                              type="text"
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Add notes for this stop..."
                              className="w-full bg-white border border-stone-300 rounded px-2 py-0.5 text-[11px] text-stone-800 focus:outline-none"
                            />
                            <button
                              onClick={() => handleNotesSave(stop.id)}
                              className="p-1 bg-forest-800 text-white rounded text-[10px]"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-[11px] text-stone-500">
                            <span className="italic truncate pr-2">
                              {stop.notes || 'No notes added'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingNotesId(stop.id);
                                setNoteDraft(stop.notes || '');
                              }}
                              className="text-[10px] text-forest-700 hover:underline flex-shrink-0"
                            >
                              Edit Note
                            </button>
                          </div>
                        )}

                        {/* Move to another day selector */}
                        <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 text-[10px] text-stone-500">
                          <span>Assigned Day:</span>
                          <select
                            value={stop.day}
                            onChange={(e) =>
                              moveStopToDay(activeTrip.id, stop.id, parseInt(e.target.value))
                            }
                            className="bg-white border border-stone-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-stone-700"
                          >
                            {daysArray.map((d) => (
                              <option key={d} value={d}>
                                Day {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer quick action */}
      <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
        <Link
          href="/my-trips"
          className="text-xs font-bold text-forest-800 hover:text-forest-950 flex items-center justify-center gap-1.5"
        >
          <span>Open Full Interactive Itinerary</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
