import React from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const isLight = variant === 'light';

  return (
    <Link
      href="/search-destination-screen"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      <div
        className={`flex items-center justify-center rounded-xl p-2 shadow-sm ${
          isLight
            ? 'bg-amber-400 text-forest-900'
            : 'bg-gradient-to-br from-forest-800 to-forest-900 text-amber-400 border border-forest-700/60'
        }`}
      >
        <Compass className={`${iconSizes[size]} transition-transform duration-500 hover:rotate-45`} />
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight ${textSizes[size]} ${isLight ? 'text-white' : 'text-forest-950'}`}>
          Wander<span className="text-amber-500">Hidden</span>
        </span>
        {size === 'lg' && (
          <span className={`text-[10px] uppercase tracking-widest font-semibold ${isLight ? 'text-forest-200' : 'text-forest-600'}`}>
            Find the places others miss
          </span>
        )}
      </div>
    </Link>
  );
};
