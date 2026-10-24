'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogo } from './AppLogo';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import {
  Compass,
  MapPin,
  Heart,
  Luggage,
  User,
  Menu,
  X,
  Sparkles,
  LogOut,
  Info
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const { user, profile, isDemoMode, signOut } = useAuth();
  const { count: favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoBannerOpen, setDemoBannerOpen] = useState(false);

  const navLinks = [
    { href: '/search-destination-screen', label: 'Discover', icon: Compass },
    { href: '/hidden-places-screen', label: 'Explorer & Map', icon: MapPin },
    { href: '/my-trips', label: 'My Trips', icon: Luggage },
    {
      href: '/favorites',
      label: 'Favorites',
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
  ];

  return (
    <>
      {/* Optional demo mode banner notice */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 text-xs px-4 py-1.5 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>
              <strong>Demo & Local Mode:</strong> Supabase credentials unconfigured. Sample destinations, offline trips, and local favorites active.
            </span>
            <button
              onClick={() => setDemoBannerOpen(!demoBannerOpen)}
              className="underline text-amber-100 hover:text-white font-medium ml-1 cursor-pointer"
            >
              {demoBannerOpen ? 'Hide Info' : 'Setup Details'}
            </button>
          </div>
        </div>
      )}

      {demoBannerOpen && (
        <div className="bg-forest-900 text-stone-200 text-xs p-4 border-b border-forest-800 animate-in fade-in">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-0.5">Connecting to Live Supabase & Google Maps</p>
                <p className="text-stone-300">
                  To sync data with your own cloud database, copy <code className="bg-forest-950 px-1 py-0.5 rounded text-amber-300">.env.example</code> to <code className="bg-forest-950 px-1 py-0.5 rounded text-amber-300">.env.local</code> and provide your Supabase URL, anon key, and optional Google Maps key. All SQL schema files are ready in <code className="bg-forest-950 px-1 py-0.5 rounded text-amber-300">supabase/migrations/</code>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDemoBannerOpen(false)}
              className="px-3 py-1 bg-forest-800 hover:bg-forest-700 rounded text-stone-100 font-medium self-end md:self-auto cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <AppLogo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-forest-50 text-forest-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-white text-[11px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user || profile ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                    pathname === '/profile'
                      ? 'border-forest-600 bg-forest-50/60 ring-2 ring-forest-600/10'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-forest-800 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {profile?.displayName ? profile.displayName.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-stone-800 max-w-[110px] truncate">
                    {profile?.displayName || 'Explorer'}
                  </span>
                </Link>

                <button
                  onClick={signOut}
                  title="Sign Out"
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="px-4 py-2 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive ? 'bg-forest-50 text-forest-800' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-forest-700" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
              {user || profile ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 text-sm font-semibold text-stone-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center font-bold text-xs uppercase">
                      {profile?.displayName ? profile.displayName.charAt(0) : 'U'}
                    </div>
                    <span>{profile?.displayName || 'My Profile'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 p-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-forest-800 text-white rounded-xl text-sm font-semibold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
