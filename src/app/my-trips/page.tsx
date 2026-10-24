'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { useTrips } from '@/context/TripsContext';
import { Trip, TripBudget } from '@/types';
import { formatINR, formatDate, calculateBudget } from '@/lib/utils';
import { EmptyState } from '@/components/EmptyState';
import {
  Luggage,
  Calendar,
  Users,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  Compass,
  ArrowRight,
  Check,
  AlertCircle,
  Wallet
} from 'lucide-react';

export default function MyTripsPage() {
  const {
    trips,
    activeTrip,
    setActiveTripId,
    createTrip,
    updateTrip,
    deleteTrip,
    removeStopFromTrip,
    reorderStop,
    moveStopToDay,
    updateStopNotes,
  } = useTrips();

  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEndDate, setNewEndDate] = useState(
    new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]
  );
  const [newTravelers, setNewTravelers] = useState(2);

  // Delete confirmation modal state
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);

  // Inline editing state for active trip
  const [isEditingActiveTrip, setIsEditingActiveTrip] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editTravelers, setEditTravelers] = useState(2);

  const handleCreateTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTitle.trim()) return;

    const start = new Date(newStartDate);
    const end = new Date(newEndDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1);

    const defaultBudget: TripBudget = {
      travelers: newTravelers,
      days,
      nightlyAccommodation: 3000,
      dailyFoodPerPerson: 1000,
      transportation: 5000,
      activities: 3000,
      miscellaneous: 1500,
    };

    await createTrip({
      title: newTripTitle.trim(),
      startDate: newStartDate,
      endDate: newEndDate,
      travelerCount: newTravelers,
      budget: defaultBudget,
    });

    setIsCreatingTrip(false);
    setNewTripTitle('');
  };

  const handleSaveActiveTripEdit = () => {
    if (!activeTrip) return;
    const start = new Date(editStartDate);
    const end = new Date(editEndDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1);

    updateTrip(activeTrip.id, {
      title: editTitle.trim() || activeTrip.title,
      startDate: editStartDate,
      endDate: editEndDate,
      travelerCount: editTravelers,
      budget: {
        ...activeTrip.budget,
        travelers: editTravelers,
        days,
      },
    });
    setIsEditingActiveTrip(false);
  };

  const currentBudgetCalc = activeTrip ? calculateBudget(activeTrip.budget) : null;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>Account</span>
              <span>/</span>
              <span className="text-forest-800">My Trips</span>
            </div>
            <h1 className="text-3xl font-black text-forest-950 tracking-tight flex items-center gap-2">
              <span>My Itineraries</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 font-bold">
                {trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hidden-places-screen"
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-forest-700" />
              <span>Explore Places</span>
            </Link>

            <button
              onClick={() => setIsCreatingTrip(true)}
              className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Trip</span>
            </button>
          </div>
        </div>

        {/* Create Trip Modal */}
        {isCreatingTrip && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-forest-950">Create a New Trip</h3>
                <button
                  onClick={() => setIsCreatingTrip(false)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTripSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Trip Name</label>
                  <input
                    type="text"
                    value={newTripTitle}
                    onChange={(e) => setNewTripTitle(e.target.value)}
                    placeholder="e.g. Western Ghats Monsoon Escape"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Number of Travelers</label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={newTravelers}
                    onChange={(e) => setNewTravelers(parseInt(e.target.value) || 1)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTrip(false)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {tripToDelete && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Delete Trip?</h3>
              <p className="text-xs text-stone-600">
                Are you sure you want to permanently delete <strong>{tripToDelete.title}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setTripToDelete(null)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTrip(tripToDelete.id);
                    setTripToDelete(null);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Yes, Delete Trip
                </button>
              </div>
            </div>
          </div>
        )}

        {trips.length === 0 ? (
          <EmptyState
            title="You don't have any trips planned yet"
            description="Start building your custom multi-day trail across India. Pick hidden waterfalls, mountain bugyals, and peaceful villages."
            actionLabel="Discover Hidden Gems"
            actionHref="/search-destination-screen"
            icon="compass"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Trip Selector Cards (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Your Saved Trips
              </h3>

              {trips.map((trip) => {
                const isSelected = activeTrip?.id === trip.id;
                const calc = calculateBudget(trip.budget);

                return (
                  <div
                    key={trip.id}
                    onClick={() => setActiveTripId(trip.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-forest-900 text-white border-forest-800 shadow-md ring-2 ring-forest-700'
                        : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-extrabold text-sm line-clamp-1">{trip.title}</h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTripToDelete(trip);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isSelected ? 'text-forest-300 hover:text-red-400' : 'text-stone-400 hover:text-red-600'
                        }`}
                        title="Delete Trip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className={`text-xs space-y-1 mb-3 ${isSelected ? 'text-forest-200' : 'text-stone-500'}`}>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{trip.travelerCount} Travelers • {trip.stops.length} Stops</span>
                      </div>
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                      isSelected ? 'border-forest-800' : 'border-stone-100'
                    }`}>
                      <span className="font-medium">Total Est.</span>
                      <span className="font-black text-sm">{formatINR(calc.totalCost)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Trip Full Itinerary Details (8 cols) */}
            {activeTrip && (
              <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-8">
                {/* Trip Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  {isEditingActiveTrip ? (
                    <div className="space-y-3 w-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-xl font-bold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="date"
                          value={editStartDate}
                          onChange={(e) => setEditStartDate(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-2 py-1 text-xs"
                        />
                        <input
                          type="date"
                          value={editEndDate}
                          onChange={(e) => setEditEndDate(e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-2 py-1 text-xs"
                        />
                        <input
                          type="number"
                          min={1}
                          value={editTravelers}
                          onChange={(e) => setEditTravelers(parseInt(e.target.value) || 1)}
                          className="bg-stone-50 border border-stone-200 rounded-xl px-2 py-1 text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsEditingActiveTrip(false)}
                          className="text-xs font-semibold px-3 py-1 text-stone-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveActiveTripEdit}
                          className="text-xs font-bold px-4 py-1.5 bg-forest-800 text-white rounded-xl"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-black text-forest-950">{activeTrip.title}</h2>
                        <button
                          onClick={() => {
                            setEditTitle(activeTrip.title);
                            setEditStartDate(activeTrip.startDate);
                            setEditEndDate(activeTrip.endDate);
                            setEditTravelers(activeTrip.travelerCount);
                            setIsEditingActiveTrip(true);
                          }}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          title="Edit Trip Info"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          {formatDate(activeTrip.startDate)} to {formatDate(activeTrip.endDate)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-forest-700" />
                          {activeTrip.travelerCount} Travelers
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Summary Cost Pill */}
                  {currentBudgetCalc && (
                    <div className="p-3 rounded-2xl bg-forest-50 border border-forest-100 text-right self-start md:self-auto">
                      <span className="text-[10px] uppercase font-bold text-forest-700 block">
                        Estimated Total Budget
                      </span>
                      <span className="text-xl font-black text-forest-950">
                        {formatINR(currentBudgetCalc.totalCost)}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        ({formatINR(currentBudgetCalc.perPersonCost)} / traveler)
                      </span>
                    </div>
                  )}
                </div>

                {/* Itinerary Stops grouped by Day */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-forest-950 flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-forest-800" />
                      <span>Multi-Day Itinerary ({activeTrip.stops.length} Stops)</span>
                    </h3>

                    <Link
                      href="/hidden-places-screen"
                      className="text-xs font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add More Places</span>
                    </Link>
                  </div>

                  {activeTrip.stops.length === 0 ? (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                      <p className="text-sm font-bold text-stone-700 mb-1">No stops added to this trip yet</p>
                      <p className="text-xs text-stone-500 mb-4">
                        Discover lesser-known destinations and click "Add to Trip" to organize your days.
                      </p>
                      <Link
                        href="/search-destination-screen"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-bold"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Discover Destinations</span>
                      </Link>
                    </div>
                  ) : (
                    Array.from(
                      {
                        length: Math.max(
                          activeTrip.budget.days || 3,
                          ...activeTrip.stops.map((s) => s.day)
                        ),
                      },
                      (_, i) => i + 1
                    ).map((dayNum) => {
                      const dayStops = activeTrip.stops.filter((s) => s.day === dayNum);
                      return (
                        <div key={dayNum} className="space-y-3">
                          <div className="flex items-center justify-between bg-stone-100/70 px-4 py-2 rounded-xl">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-forest-950">
                              Day {dayNum}
                            </span>
                            <span className="text-xs text-stone-500">
                              {dayStops.length} {dayStops.length === 1 ? 'Destination' : 'Destinations'}
                            </span>
                          </div>

                          {dayStops.length === 0 ? (
                            <div className="p-3 text-xs text-stone-400 italic bg-stone-50/50 rounded-xl border border-dashed border-stone-200">
                              Free day for scenic wandering and local rest.
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              {dayStops.map((stop, idx) => {
                                const dest = stop.destination;
                                return (
                                  <div
                                    key={stop.id}
                                    className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center font-bold text-xs mt-0.5">
                                          {idx + 1}
                                        </div>
                                        <div>
                                          <h4 className="font-bold text-sm text-forest-950">
                                            {dest?.name || stop.destinationId}
                                          </h4>
                                          <span className="text-xs text-stone-500">
                                            {dest?.state} • {dest?.category}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Controls */}
                                      <div className="flex items-center gap-1.5">
                                        <button
                                          onClick={() => reorderStop(activeTrip.id, stop.id, 'up')}
                                          disabled={idx === 0}
                                          className="p-1.5 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                                          title="Move Up"
                                        >
                                          <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => reorderStop(activeTrip.id, stop.id, 'down')}
                                          disabled={idx === dayStops.length - 1}
                                          className="p-1.5 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                                          title="Move Down"
                                        >
                                          <ChevronDown className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => removeStopFromTrip(activeTrip.id, stop.id)}
                                          className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                                          title="Remove from Trip"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Stop Notes & Day changer */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                                      <span className="text-stone-600 text-xs italic">
                                        {stop.notes || 'No specific activities recorded yet.'}
                                      </span>

                                      <div className="flex items-center gap-2">
                                        <span className="text-stone-400 text-[11px]">Move Day:</span>
                                        <select
                                          value={stop.day}
                                          onChange={(e) =>
                                            moveStopToDay(activeTrip.id, stop.id, parseInt(e.target.value))
                                          }
                                          className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs font-semibold text-stone-800"
                                        >
                                          {Array.from(
                                            { length: activeTrip.budget.days || 3 },
                                            (_, k) => k + 1
                                          ).map((d) => (
                                            <option key={d} value={d}>
                                              Day {d}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
