import React from 'react';
import Link from 'next/link';
import { Compass, Search, MapPinOff } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: 'compass' | 'search' | 'mapPin';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No places found',
  description = 'Try adjusting your filters, budget, or search terms to uncover hidden trails.',
  actionLabel = 'Explore All Hidden Gems',
  actionHref,
  onAction,
  icon = 'compass',
}) => {
  const IconComponent =
    icon === 'search' ? Search : icon === 'mapPin' ? MapPinOff : Compass;

  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl border border-stone-200/80 shadow-sm max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4 border border-forest-100">
        <IconComponent className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="text-xl font-bold text-forest-950 mb-2">{title}</h3>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">{description}</p>
      {actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};
