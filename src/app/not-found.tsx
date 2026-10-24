import React from 'react';
import Link from 'next/link';
import { Compass, MapPinOff, ArrowLeft } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <AppLogo size="lg" />
        </div>

        <div className="w-20 h-20 rounded-3xl bg-forest-50 border border-forest-100 text-forest-800 flex items-center justify-center mx-auto shadow-sm">
          <MapPinOff className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
            404 — Off The Map
          </span>
          <h1 className="text-3xl font-black text-forest-950 tracking-tight mb-2">
            This trail leads nowhere
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            The secret destination or page you are looking for has either moved, vanished like morning valley mist, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/search-destination-screen"
            className="w-full sm:w-auto px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Discover Hidden Gems</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
