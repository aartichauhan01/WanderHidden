-- WanderHidden - Initial Supabase PostgreSQL Schema
-- Supports Profiles, Destinations, Trips, Trip Stops, and Favorites with Row-Level Security (RLS)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  travel_preferences TEXT[] DEFAULT '{}',
  preferred_budget TEXT DEFAULT 'Moderate (₹10k - ₹25k)',
  preferred_travel_style TEXT DEFAULT 'Slow Travel',
  home_city TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('North', 'South', 'East', 'West', 'North-East', 'Central')),
  category TEXT NOT NULL CHECK (category IN ('Mountains', 'Waterfalls', 'Beaches', 'Villages', 'Forests', 'Heritage', 'Lakes', 'Offbeat')),
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  best_season TEXT NOT NULL,
  ideal_seasons TEXT[] DEFAULT '{}',
  suggested_duration_days INT NOT NULL DEFAULT 3,
  estimated_budget NUMERIC(10, 2) NOT NULL DEFAULT 10000,
  image_url TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  travel_options JSONB DEFAULT '{}'::jsonb,
  nearby_attractions TEXT[] DEFAULT '{}',
  travel_tips TEXT[] DEFAULT '{}',
  safety_tips TEXT[] DEFAULT '{}',
  verified_status TEXT NOT NULL DEFAULT 'curated_gem' CHECK (verified_status IN ('curated_gem', 'verified_local', 'community_spot')),
  is_published BOOLEAN DEFAULT true NOT NULL,
  is_trending BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  rating NUMERIC(3, 2) DEFAULT 4.8,
  reviews_count INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_destinations_category ON public.destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_state ON public.destinations(state);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON public.destinations(region);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON public.destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_budget ON public.destinations(estimated_budget);

-- 4. TRIPS TABLE
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  traveler_count INT NOT NULL DEFAULT 1 CHECK (traveler_count >= 1),
  budget JSONB NOT NULL DEFAULT '{
    "travelers": 1,
    "days": 3,
    "nightlyAccommodation": 2500,
    "dailyFoodPerPerson": 1000,
    "transportation": 3000,
    "activities": 1500,
    "miscellaneous": 1000
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);

-- 5. TRIP STOPS TABLE
CREATE TABLE IF NOT EXISTS public.trip_stops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  destination_slug TEXT,
  itinerary_day INT NOT NULL DEFAULT 1 CHECK (itinerary_day >= 1),
  position INT NOT NULL DEFAULT 0,
  notes TEXT,
  planned_activities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trip_stops_trip_id ON public.trip_stops(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_stops_destination_id ON public.trip_stops(destination_id);

-- 6. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  destination_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_destination_favorite UNIQUE (user_id, destination_slug)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read basic profile info, user can update only own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Destinations: Anyone can read published destinations. Admin/Service Role can write
CREATE POLICY "Published destinations are viewable by everyone" ON public.destinations
  FOR SELECT USING (is_published = true);

-- Trips: Users can only see and manage their own trips
CREATE POLICY "Users can view their own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" ON public.trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" ON public.trips
  FOR DELETE USING (auth.uid() = user_id);

-- Trip Stops: Users can only manage stops belonging to their own trips
CREATE POLICY "Users can view their own trip stops" ON public.trip_stops
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE public.trips.id = public.trip_stops.trip_id
      AND public.trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert stops into their own trips" ON public.trip_stops
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE public.trips.id = public.trip_stops.trip_id
      AND public.trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update stops in their own trips" ON public.trip_stops
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE public.trips.id = public.trip_stops.trip_id
      AND public.trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete stops from their own trips" ON public.trip_stops
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE public.trips.id = public.trip_stops.trip_id
      AND public.trips.user_id = auth.uid()
    )
  );

-- Favorites: Users can only view and modify their own favorites
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile trigger on auth.users sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
