'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signUp: (email: string, password?: string, fullName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string; message?: string }>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  switchToDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILE: UserProfile = {
  id: 'demo-user-wanderer',
  email: 'explorer@wanderhidden.in',
  displayName: 'Aarav Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  travelPreferences: ['Mountains', 'Villages', 'Offbeat'],
  preferredBudget: 'Moderate (₹10k - ₹25k)',
  preferredTravelStyle: 'Slow Travel',
  homeCity: 'Bengaluru, Karnataka',
  bio: 'Seeking silence among misty valleys, ancient village traditions, and remote trails.',
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      // Supabase is not configured -> load demo profile from localStorage or default
      setIsDemoMode(true);
      const savedProfile = localStorage.getItem('wanderhidden_demo_profile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setProfile(parsed);
          setUser({ id: parsed.id, email: parsed.email });
        } catch {
          setProfile(DEMO_PROFILE);
          setUser({ id: DEMO_PROFILE.id, email: DEMO_PROFILE.email });
        }
      } else {
        setProfile(DEMO_PROFILE);
        setUser({ id: DEMO_PROFILE.id, email: DEMO_PROFILE.email });
      }
      setIsLoading(false);
      return;
    }

    // Supabase is configured -> listen to auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
        fetchSupabaseProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
        fetchSupabaseProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchSupabaseProfile = async (userId: string, email: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (data) {
        setProfile({
          id: data.id,
          email,
          displayName: data.display_name || email.split('@')[0],
          avatarUrl: data.avatar_url,
          travelPreferences: data.travel_preferences || [],
          preferredBudget: data.preferred_budget || 'Moderate (₹10k - ₹25k)',
          preferredTravelStyle: data.preferred_travel_style || 'Slow Travel',
          homeCity: data.home_city,
          bio: data.bio,
          createdAt: data.created_at,
        });
      } else {
        // Fallback default profile if row doesn't exist yet
        setProfile({
          id: userId,
          email,
          displayName: email.split('@')[0],
          travelPreferences: ['Mountains', 'Offbeat'],
          preferredBudget: 'Moderate (₹10k - ₹25k)',
          preferredTravelStyle: 'Slow Travel',
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password?: string): Promise<{ error?: string }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      // In demo mode: create or log in as demo user with that email
      const newProf: UserProfile = {
        ...DEMO_PROFILE,
        email,
        displayName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      };
      setUser({ id: newProf.id, email });
      setProfile(newProf);
      localStorage.setItem('wanderhidden_demo_profile', JSON.stringify(newProf));
      return {};
    }

    if (!password) {
      return { error: 'Password is required' };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
    return {};
  };

  const signUp = async (email: string, password?: string, fullName?: string): Promise<{ error?: string }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const newProf: UserProfile = {
        ...DEMO_PROFILE,
        email,
        displayName: fullName || email.split('@')[0],
      };
      setUser({ id: newProf.id, email });
      setProfile(newProf);
      localStorage.setItem('wanderhidden_demo_profile', JSON.stringify(newProf));
      return {};
    }

    if (!password) {
      return { error: 'Password is required' };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }
    return {};
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('wanderhidden_demo_profile');
  };

  const resetPassword = async (email: string): Promise<{ error?: string; message?: string }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return { message: 'Demo mode active: In production with Supabase, a reset link will be sent to ' + email };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
    });

    if (error) {
      return { error: error.message };
    }
    return { message: 'Password reset link sent to your email.' };
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!profile) return;
    const newProfile: UserProfile = { ...profile, ...updated };
    setProfile(newProfile);

    const supabase = getSupabaseClient();
    if (supabase && user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        display_name: newProfile.displayName,
        avatar_url: newProfile.avatarUrl,
        travel_preferences: newProfile.travelPreferences,
        preferred_budget: newProfile.preferredBudget,
        preferred_travel_style: newProfile.preferredTravelStyle,
        home_city: newProfile.homeCity,
        bio: newProfile.bio,
        updated_at: new Date().toISOString(),
      });
    } else {
      localStorage.setItem('wanderhidden_demo_profile', JSON.stringify(newProfile));
    }
  };

  const switchToDemoMode = () => {
    setIsDemoMode(true);
    setProfile(DEMO_PROFILE);
    setUser({ id: DEMO_PROFILE.id, email: DEMO_PROFILE.email });
    localStorage.setItem('wanderhidden_demo_profile', JSON.stringify(DEMO_PROFILE));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoMode,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        switchToDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
