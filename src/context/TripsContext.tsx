'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from './AuthContext';
import { Trip, TripBudget, TripStop, Destination } from '@/types';
import { INITIAL_DESTINATIONS } from '@/data/destinations';

interface TripsContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  setActiveTripId: (id: string | null) => void;
  createTrip: (tripData: Omit<Trip, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'stops'>) => Promise<string>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  addDestinationToTrip: (tripId: string, destination: Destination, day?: number, notes?: string) => Promise<void>;
  removeStopFromTrip: (tripId: string, stopId: string) => Promise<void>;
  reorderStop: (tripId: string, stopId: string, direction: 'up' | 'down') => Promise<void>;
  moveStopToDay: (tripId: string, stopId: string, newDay: number) => Promise<void>;
  updateStopNotes: (tripId: string, stopId: string, notes: string) => Promise<void>;
  updateTripBudget: (tripId: string, newBudget: Partial<TripBudget>) => Promise<void>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

const SEED_TRIPS: Trip[] = [
  {
    id: 'trip-himalayan-silence',
    userId: 'demo-user-wanderer',
    title: 'Himalayan High Passes & Secret Valleys',
    startDate: '2026-11-10',
    endDate: '2026-11-16',
    travelerCount: 2,
    budget: {
      travelers: 2,
      days: 6,
      nightlyAccommodation: 3500,
      dailyFoodPerPerson: 1200,
      transportation: 8000,
      activities: 3000,
      miscellaneous: 2000,
      spendingTarget: 45000,
    },
    stops: [
      {
        id: 'stop-1',
        tripId: 'trip-himalayan-silence',
        destinationId: 'dest-tirthan-valley',
        destination: INITIAL_DESTINATIONS.find((d) => d.slug === 'tirthan-valley'),
        day: 1,
        order: 0,
        notes: 'Arrive via Aut tunnel, check into riverfront wood homestay in Gushaini.',
        plannedActivities: ['Riverside tea', 'Evening walk by Tirthan river'],
      },
      {
        id: 'stop-2',
        tripId: 'trip-himalayan-silence',
        destinationId: 'dest-tirthan-valley',
        destination: INITIAL_DESTINATIONS.find((d) => d.slug === 'tirthan-valley'),
        day: 2,
        order: 1,
        notes: 'Day hike to the gate of Great Himalayan National Park.',
        plannedActivities: ['Cedar forest trek', 'Local trout tasting'],
      },
      {
        id: 'stop-3',
        tripId: 'trip-himalayan-silence',
        destinationId: 'dest-chopta',
        destination: INITIAL_DESTINATIONS.find((d) => d.slug === 'chopta'),
        day: 4,
        order: 2,
        notes: 'Summit Chandrashila at 4,000m for golden sunrise over Chaukhamba.',
        plannedActivities: ['Tungnath temple visit', 'Alpine ridge photography'],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>(SEED_TRIPS);
  const [activeTripId, setActiveTripId] = useState<string | null>(SEED_TRIPS[0]?.id || null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (supabase && user) {
      // Load trips from Supabase
      supabase
        .from('trips')
        .select(`
          id,
          user_id,
          title,
          start_date,
          end_date,
          traveler_count,
          budget,
          created_at,
          updated_at,
          trip_stops (
            id,
            destination_slug,
            itinerary_day,
            position,
            notes,
            planned_activities
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mappedTrips: Trip[] = data.map((t) => {
              const stops: TripStop[] = ((t.trip_stops as any[]) || []).map((s) => {
                const dest = INITIAL_DESTINATIONS.find((d) => d.slug === s.destination_slug);
                return {
                  id: s.id,
                  tripId: t.id,
                  destinationId: dest?.id || s.destination_slug,
                  destination: dest,
                  day: s.itinerary_day,
                  order: s.position,
                  notes: s.notes,
                  plannedActivities: s.planned_activities || [],
                };
              });

              return {
                id: t.id,
                userId: t.user_id,
                title: t.title,
                startDate: t.start_date,
                endDate: t.end_date,
                travelerCount: t.traveler_count,
                budget: t.budget as TripBudget,
                stops: stops.sort((a, b) => a.day - b.day || a.order - b.order),
                createdAt: t.created_at,
                updatedAt: t.updated_at,
              };
            });
            setTrips(mappedTrips);
            if (!activeTripId && mappedTrips.length > 0) {
              setActiveTripId(mappedTrips[0].id);
            }
          }
        });
    } else {
      // In local/demo mode: read from localStorage
      const saved = localStorage.getItem('wanderhidden_trips');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // enrich stops with destination objects
            const enriched = parsed.map((t: Trip) => ({
              ...t,
              stops: t.stops.map((s) => ({
                ...s,
                destination: s.destination || INITIAL_DESTINATIONS.find((d) => d.id === s.destinationId || d.slug === s.destinationId),
              })),
            }));
            setTrips(enriched);
            setActiveTripId(enriched[0].id);
          }
        } catch {
          // ignore
        }
      }
    }
  }, [user]);

  const saveTripsState = (updatedTrips: Trip[]) => {
    setTrips(updatedTrips);
    if (!getSupabaseClient()) {
      localStorage.setItem('wanderhidden_trips', JSON.stringify(updatedTrips));
    }
  };

  const createTrip = async (
    tripData: Omit<Trip, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'stops'>
  ): Promise<string> => {
    const newId = 'trip-' + Date.now();
    const newTrip: Trip = {
      ...tripData,
      id: newId,
      userId: user?.id || 'demo-user-wanderer',
      stops: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const supabase = getSupabaseClient();
    if (supabase && user) {
      const { data, error } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          title: newTrip.title,
          start_date: newTrip.startDate,
          end_date: newTrip.endDate,
          traveler_count: newTrip.travelerCount,
          budget: newTrip.budget,
        })
        .select()
        .single();

      if (!error && data) {
        newTrip.id = data.id;
      }
    }

    const updated = [newTrip, ...trips];
    saveTripsState(updated);
    setActiveTripId(newTrip.id);
    return newTrip.id;
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    const updated = trips.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
    saveTripsState(updated);

    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase
        .from('trips')
        .update({
          title: updates.title,
          start_date: updates.startDate,
          end_date: updates.endDate,
          traveler_count: updates.travelerCount,
          budget: updates.budget,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    }
  };

  const deleteTrip = async (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    saveTripsState(updated);
    if (activeTripId === id) {
      setActiveTripId(updated[0]?.id || null);
    }

    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase.from('trips').delete().eq('id', id);
    }
  };

  const addDestinationToTrip = async (
    tripId: string,
    destination: Destination,
    day = 1,
    notes = ''
  ) => {
    let targetTripId = tripId;
    if (!targetTripId && trips.length > 0) {
      targetTripId = trips[0].id;
    }

    let trip = trips.find((t) => t.id === targetTripId);
    if (!trip) {
      // Auto-create a trip if none exists
      targetTripId = await createTrip({
        title: `Trip to ${destination.name}`,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        travelerCount: 2,
        budget: {
          travelers: 2,
          days: 3,
          nightlyAccommodation: 3000,
          dailyFoodPerPerson: 1000,
          transportation: 4000,
          activities: 2000,
          miscellaneous: 1000,
        },
      });
      trip = trips.find((t) => t.id === targetTripId);
    }

    const stopId = 'stop-' + Date.now();
    const newStop: TripStop = {
      id: stopId,
      tripId: targetTripId,
      destinationId: destination.id,
      destination,
      day,
      order: trip ? trip.stops.filter((s) => s.day === day).length : 0,
      notes: notes || `Explore ${destination.name} and local surroundings.`,
      plannedActivities: destination.highlights.slice(0, 2),
    };

    const updated = trips.map((t) => {
      if (t.id === targetTripId) {
        return {
          ...t,
          stops: [...t.stops, newStop],
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveTripsState(updated);

    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase.from('trip_stops').insert({
        trip_id: targetTripId,
        destination_slug: destination.slug,
        itinerary_day: day,
        position: newStop.order,
        notes: newStop.notes,
        planned_activities: newStop.plannedActivities,
      });
    }
  };

  const removeStopFromTrip = async (tripId: string, stopId: string) => {
    const updated = trips.map((t) => {
      if (t.id === tripId) {
        return {
          ...t,
          stops: t.stops.filter((s) => s.id !== stopId),
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveTripsState(updated);

    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase.from('trip_stops').delete().eq('id', stopId);
    }
  };

  const reorderStop = async (tripId: string, stopId: string, direction: 'up' | 'down') => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return;

    const stopIndex = trip.stops.findIndex((s) => s.id === stopId);
    if (stopIndex === -1) return;

    const targetIndex = direction === 'up' ? stopIndex - 1 : stopIndex + 1;
    if (targetIndex < 0 || targetIndex >= trip.stops.length) return;

    const newStops = [...trip.stops];
    const [moved] = newStops.splice(stopIndex, 1);
    newStops.splice(targetIndex, 0, moved);

    // update orders
    newStops.forEach((s, idx) => {
      s.order = idx;
    });

    const updated = trips.map((t) => (t.id === tripId ? { ...t, stops: newStops } : t));
    saveTripsState(updated);
  };

  const moveStopToDay = async (tripId: string, stopId: string, newDay: number) => {
    const updated = trips.map((t) => {
      if (t.id === tripId) {
        return {
          ...t,
          stops: t.stops.map((s) => (s.id === stopId ? { ...s, day: newDay } : s)),
        };
      }
      return t;
    });
    saveTripsState(updated);
  };

  const updateStopNotes = async (tripId: string, stopId: string, notes: string) => {
    const updated = trips.map((t) => {
      if (t.id === tripId) {
        return {
          ...t,
          stops: t.stops.map((s) => (s.id === stopId ? { ...s, notes } : s)),
        };
      }
      return t;
    });
    saveTripsState(updated);
  };

  const updateTripBudget = async (tripId: string, newBudget: Partial<TripBudget>) => {
    const updated = trips.map((t) => {
      if (t.id === tripId) {
        const fullBudget: TripBudget = { ...t.budget, ...newBudget };
        return {
          ...t,
          budget: fullBudget,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });
    saveTripsState(updated);
  };

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0] || null;

  return (
    <TripsContext.Provider
      value={{
        trips,
        activeTrip,
        setActiveTripId,
        createTrip,
        updateTrip,
        deleteTrip,
        addDestinationToTrip,
        removeStopFromTrip,
        reorderStop,
        moveStopToDay,
        updateStopNotes,
        updateTripBudget,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};
