'use client';

import React from 'react';
import { DestinationCategory } from '@/types';
import {
  Mountain,
  Waves,
  Sun,
  Home,
  Trees,
  Castle,
  Droplets,
  Compass,
  Sparkles
} from 'lucide-react';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}) => {
  const categories: { label: string; value: string; icon: any }[] = [
    { label: 'All Places', value: 'all', icon: Sparkles },
    { label: 'Mountains', value: 'Mountains', icon: Mountain },
    { label: 'Waterfalls', value: 'Waterfalls', icon: Droplets },
    { label: 'Beaches', value: 'Beaches', icon: Waves },
    { label: 'Villages', value: 'Villages', icon: Home },
    { label: 'Forests', value: 'Forests', icon: Trees },
    { label: 'Heritage', value: 'Heritage', icon: Castle },
    { label: 'Lakes', value: 'Lakes', icon: Sun },
    { label: 'Offbeat', value: 'Offbeat', icon: Compass },
  ];

  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected =
            selectedCategory === cat.value ||
            (cat.value === 'all' && (!selectedCategory || selectedCategory === 'all'));
          const count = cat.value === 'all' ? undefined : categoryCounts[cat.value];

          return (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-forest-800 text-white shadow-sm ring-2 ring-forest-800/20'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-2xs'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`}
              />
              <span>{cat.label}</span>
              {count !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-forest-900 text-amber-300' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
