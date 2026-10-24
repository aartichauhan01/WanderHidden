import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TripBudget } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers into Indian Rupees (INR) format (e.g. ₹14,500)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculate full budget breakdown given user inputs
 */
export function calculateBudget(budget: TripBudget) {
  const travelers = Math.max(1, budget.travelers || 1);
  const days = Math.max(1, budget.days || 1);
  const nights = Math.max(0, days - 1);

  const accommodationRate = Math.max(0, budget.nightlyAccommodation || 0);
  const dailyFoodRate = Math.max(0, budget.dailyFoodPerPerson || 0);
  const transportation = Math.max(0, budget.transportation || 0);
  const activities = Math.max(0, budget.activities || 0);
  const miscellaneous = Math.max(0, budget.miscellaneous || 0);

  // Exact formulas specified in requirements:
  // Accommodation cost = nightly accommodation rate × nights (or 1 night if 1 day)
  const accommodationCost = accommodationRate * (nights === 0 ? 1 : nights);
  // Food cost = per-person daily food budget × travelers × days
  const foodCost = dailyFoodRate * travelers * days;
  const transportCost = transportation;
  const activitiesCost = activities;
  const miscCost = miscellaneous;

  const totalCost = accommodationCost + foodCost + transportCost + activitiesCost + miscCost;
  const perPersonCost = travelers > 0 ? Math.round(totalCost / travelers) : totalCost;

  return {
    travelers,
    days,
    nights: nights === 0 ? 1 : nights,
    accommodationCost,
    foodCost,
    transportCost,
    activitiesCost,
    miscCost,
    totalCost,
    perPersonCost,
    chartData: [
      { name: 'Stay', value: accommodationCost, color: '#064e3b' },
      { name: 'Food', value: foodCost, color: '#d97706' },
      { name: 'Transport', value: transportCost, color: '#2563eb' },
      { name: 'Activities', value: activitiesCost, color: '#9333ea' },
      { name: 'Misc', value: miscCost, color: '#64748b' },
    ].filter(item => item.value > 0),
  };
}

/**
 * Format date string (YYYY-MM-DD) into readable Indian date
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate a slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
