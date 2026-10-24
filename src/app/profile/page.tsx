'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { DestinationCategory, TravelStyle } from '@/types';
import {
  User,
  Mail,
  MapPin,
  Wallet,
  Compass,
  CheckCircle2,
  LogOut,
  Save,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, updateProfile, signOut, isDemoMode } = useAuth();

  const [displayName, setDisplayName] = useState(profile?.displayName || 'Explorer');
  const [homeCity, setHomeCity] = useState(profile?.homeCity || 'Bengaluru, Karnataka');
  const [bio, setBio] = useState(
    profile?.bio || 'Seeking silence among misty valleys, ancient village traditions, and remote trails.'
  );
  const [preferredBudget, setPreferredBudget] = useState(
    profile?.preferredBudget || 'Moderate (₹10k - ₹25k)'
  );
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(
    profile?.preferredTravelStyle || 'Slow Travel'
  );
  const [travelPreferences, setTravelPreferences] = useState<DestinationCategory[]>(
    profile?.travelPreferences || ['Mountains', 'Villages', 'Offbeat']
  );

  const [isSaved, setIsSaved] = useState(false);

  const allCategories: DestinationCategory[] = [
    'Mountains',
    'Waterfalls',
    'Beaches',
    'Villages',
    'Forests',
    'Heritage',
    'Lakes',
    'Offbeat',
  ];

  const travelStyles: TravelStyle[] = [
    'Slow Travel',
    'Adventure',
    'Solo',
    'Couples',
    'Backpacker',
    'Family',
  ];

  const handleTogglePref = (cat: DestinationCategory) => {
    if (travelPreferences.includes(cat)) {
      setTravelPreferences(travelPreferences.filter((c) => c !== cat));
    } else {
      setTravelPreferences([...travelPreferences, cat]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      displayName,
      homeCity,
      bio,
      preferredBudget: preferredBudget as any,
      preferredTravelStyle: travelStyle,
      travelPreferences,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>Account</span>
              <span>/</span>
              <span className="text-forest-800">Profile & Preferences</span>
            </div>
            <h1 className="text-3xl font-black text-forest-950 tracking-tight">
              Traveler Profile
            </h1>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Top Identity Row */}
            <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
              <div className="w-16 h-16 rounded-2xl bg-forest-900 text-amber-400 flex items-center justify-center font-black text-2xl uppercase shadow-md border border-forest-800">
                {displayName.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-950">{displayName}</h3>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{profile?.email || 'explorer@wanderhidden.in'}</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-forest-50 text-forest-700 border border-forest-200">
                    {isDemoMode ? 'Demo Traveler' : 'Verified Supabase User'}
                  </span>
                </div>
              </div>
            </div>

            {/* Basic Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Home City & State
                </label>
                <input
                  type="text"
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Traveler Bio & Mindset
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="What drives your offbeat journeys?"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>

            {/* Travel Preferences: Preferred Budget & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-forest-700" />
                  <span>Preferred Budget Range</span>
                </label>
                <select
                  value={preferredBudget}
                  onChange={(e) => setPreferredBudget(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="Budget (< ₹10k)">Budget (&lt; ₹10k)</option>
                  <option value="Moderate (₹10k - ₹25k)">Moderate (₹10k - ₹25k)</option>
                  <option value="Luxury (> ₹25k)">Luxury (&gt; ₹25k)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-forest-700" />
                  <span>Preferred Travel Style</span>
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  {travelStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categories of Interest (Multi-select Chips) */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700 mb-2">
                Terrain & Experience Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const isSelected = travelPreferences.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleTogglePref(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-forest-800 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100">
              {isSaved ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile and travel preferences saved!</span>
                </div>
              ) : (
                <span className="text-[11px] text-stone-400">
                  {isDemoMode ? 'Saved to local browser storage' : 'Synced with Supabase profile'}
                </span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
