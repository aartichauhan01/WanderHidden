'use client';

import React from 'react';
import { Topbar } from './Topbar';
import Link from 'next/link';
import { Compass, Heart, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-stone-900 font-sans selection:bg-amber-200 selection:text-forest-950">
      <Topbar />

      <main className="flex-1 w-full flex flex-col">{children}</main>

      {!hideFooter && (
        <footer className="bg-forest-950 text-stone-300 border-t border-forest-900 pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-800/80">
              {/* Brand Col */}
              <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-forest-950">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    Wander<span className="text-amber-400">Hidden</span>
                  </span>
                </div>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Dedicated to unveiling India’s untouched valleys, serene village trails, sacred waterfalls, and offbeat wonders.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/80 border border-forest-700/50 text-xs text-amber-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  "Find the Places Others Miss."
                </div>
              </div>

              {/* Exploration */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-4">
                  Curated Escapes
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-300">
                  <li>
                    <Link href="/search-destination-screen?category=Mountains" className="hover:text-amber-300 transition-colors">
                      High Himalayan Meadows
                    </Link>
                  </li>
                  <li>
                    <Link href="/search-destination-screen?category=Waterfalls" className="hover:text-amber-300 transition-colors">
                      Secret Sahyadri Cascades
                    </Link>
                  </li>
                  <li>
                    <Link href="/search-destination-screen?category=Villages" className="hover:text-amber-300 transition-colors">
                      Indigenous Tribal Hamlets
                    </Link>
                  </li>
                  <li>
                    <Link href="/search-destination-screen?category=Heritage" className="hover:text-amber-300 transition-colors">
                      Ancient Rock-cut Relics
                    </Link>
                  </li>
                  <li>
                    <Link href="/search-destination-screen?category=Offbeat" className="hover:text-amber-300 transition-colors">
                      Extraterrestrial Craters & Canyons
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Responsible Tourism */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-4">
                  Ethical Travel
                </h4>
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed text-stone-300">
                      Leave No Trace: Carry back plastics & respect fragile ecologies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed text-stone-300">
                      Direct Village Impact: Stay at family-run homestays and cooperatives.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed text-stone-300">
                      Respect Local Traditions: Honor sacred groves & request portrait consent.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quick Navigation */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-4">
                  Platform
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-300">
                  <li>
                    <Link href="/hidden-places-screen" className="hover:text-amber-300 transition-colors">
                      Interactive Map Explorer
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-trips" className="hover:text-amber-300 transition-colors">
                      Multi-day Itinerary Planner
                    </Link>
                  </li>
                  <li>
                    <Link href="/favorites" className="hover:text-amber-300 transition-colors">
                      Saved Gems
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:text-amber-300 transition-colors">
                      Traveler Profile & Budget
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
              <p>© {new Date().getFullYear()} WanderHidden Technologies. Handcrafted with reverence for India’s natural & cultural tapestry.</p>
              <div className="flex items-center gap-6">
                <span>All prices in Indian Rupees (₹ INR)</span>
                <span>•</span>
                <span className="text-stone-400">Curated & Verified by Local Travelers</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
