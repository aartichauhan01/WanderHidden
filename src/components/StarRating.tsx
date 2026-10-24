import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  reviewsCount?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 4.8,
  reviewsCount,
  size = 'sm',
  showCount = true,
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="inline-flex items-center gap-1.5" title={`Curated community score: ${rating.toFixed(1)} / 5.0`}>
      <div className="flex items-center text-amber-500">
        <Star className={`${iconSize} fill-amber-400 text-amber-500`} />
      </div>
      <span className={`font-semibold text-slate-800 ${textSize}`}>{rating.toFixed(1)}</span>
      {showCount && reviewsCount !== undefined && (
        <span className={`text-slate-500 ${textSize}`}>({reviewsCount})</span>
      )}
    </div>
  );
};
