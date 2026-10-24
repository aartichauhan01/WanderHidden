import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle, Compass } from 'lucide-react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'verified' | 'estimated' | 'category' | 'region' | 'warning' | 'default' | 'amber';
  size?: 'sm' | 'md';
  icon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 font-medium gap-1',
    md: 'text-sm px-3 py-1 font-medium gap-1.5',
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'verified':
        return {
          classes: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
          IconComponent: CheckCircle2,
          defaultText: 'Verified Data',
        };
      case 'estimated':
        return {
          classes: 'bg-amber-50 text-amber-800 border border-amber-200/80',
          IconComponent: Sparkles,
          defaultText: 'Estimated Budget',
        };
      case 'category':
        return {
          classes: 'bg-forest-50 text-forest-800 border border-forest-200/60 font-semibold',
          IconComponent: Compass,
          defaultText: 'Category',
        };
      case 'region':
        return {
          classes: 'bg-stone-100 text-stone-700 border border-stone-200',
          IconComponent: null,
          defaultText: 'Region',
        };
      case 'warning':
        return {
          classes: 'bg-red-50 text-red-700 border border-red-200',
          IconComponent: AlertCircle,
          defaultText: 'Note',
        };
      case 'amber':
        return {
          classes: 'bg-amber-500 text-white font-semibold shadow-sm',
          IconComponent: Sparkles,
          defaultText: 'Featured',
        };
      default:
        return {
          classes: 'bg-gray-100 text-gray-700 border border-gray-200',
          IconComponent: null,
          defaultText: '',
        };
    }
  };

  const { classes, IconComponent, defaultText } = getVariantStyles();

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide transition-colors ${sizeClasses[size]} ${classes} ${className}`}
    >
      {icon && IconComponent && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      {children || defaultText}
    </span>
  );
};
