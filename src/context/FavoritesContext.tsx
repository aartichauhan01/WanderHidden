'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from './AuthContext';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { Destination } from '@/types';

interface FavoritesContextType {
  favorites: string[]; // destination slugs
  favoriteDestinations: Destination[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => Promise<void>;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(['ziro-valley', 'dzukou-valley', 'gandikota']);

  useEffect(() => {
    // If user is logged in and Supabase is configured, fetch from Supabase
    const supabase = getSupabaseClient();
    if (supabase && user) {
      supabase
        .from('favorites')
        .select('destination_slug')
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (!error && data) {
            setFavorites(data.map((row) => row.destination_slug));
          }
        });
    } else {
      // In local/demo mode, read from localStorage
      const saved = localStorage.getItem('wanderhidden_favorites');
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch {
          // ignore error
        }
      }
    }
  }, [user]);

  const isFavorite = (slug: string) => favorites.includes(slug);

  const toggleFavorite = async (slug: string) => {
    const isCurrentlyFav = favorites.includes(slug);
    const updated = isCurrentlyFav
      ? favorites.filter((s) => s !== slug)
      : [...favorites, slug];

    setFavorites(updated);

    const supabase = getSupabaseClient();
    if (supabase && user) {
      if (isCurrentlyFav) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('destination_slug', slug);
      } else {
        await supabase.from('favorites').insert({
          user_id: user.id,
          destination_slug: slug,
        });
      }
    } else {
      localStorage.setItem('wanderhidden_favorites', JSON.stringify(updated));
    }
  };

  const favoriteDestinations = INITIAL_DESTINATIONS.filter((d) =>
    favorites.includes(d.slug)
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteDestinations,
        isFavorite,
        toggleFavorite,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
