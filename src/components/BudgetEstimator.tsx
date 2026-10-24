'use client';

import React, { useState, useEffect } from 'react';
import { TripBudget } from '@/types';
import { calculateBudget, formatINR } from '@/lib/utils';
import { BudgetChart } from './BudgetChart';
import {
  Wallet,
  Users,
  Calendar,
  Hotel,
  Utensils,
  Car,
  Ticket,
  Package,
  Target,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface BudgetEstimatorProps {
  initialBudget?: Partial<TripBudget>;
  onBudgetChange?: (budget: TripBudget) => void;
  className?: string;
  compact?: boolean;
}

const DEFAULT_BUDGET: TripBudget = {
  travelers: 2,
  days: 4,
  nightlyAccommodation: 3000,
  dailyFoodPerPerson: 1000,
  transportation: 4500,
  activities: 2500,
  miscellaneous: 1500,
  spendingTarget: 30000,
};

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({
  initialBudget,
  onBudgetChange,
  className = '',
  compact = false,
}) => {
  const [budget, setBudget] = useState<TripBudget>({
    ...DEFAULT_BUDGET,
    ...initialBudget,
  });

  useEffect(() => {
    if (initialBudget) {
      setBudget((prev) => ({ ...prev, ...initialBudget }));
    }
  }, [initialBudget]);

  const updateField = (field: keyof TripBudget, value: number) => {
    const updated = {
      ...budget,
      [field]: isNaN(value) ? 0 : Math.max(0, value),
    };
    setBudget(updated);
    if (onBudgetChange) {
      onBudgetChange(updated);
    }
  };

  const handleReset = () => {
    setBudget(DEFAULT_BUDGET);
    if (onBudgetChange) {
      onBudgetChange(DEFAULT_BUDGET);
    }
  };

  const calculated = calculateBudget(budget);
  const spendingTarget = budget.spendingTarget || 0;
  const targetDiff = spendingTarget > 0 ? calculated.totalCost - spendingTarget : 0;
  const isOverBudget = targetDiff > 0;

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs ${className}`}>
      {/* Header */}
      <div className="p-4 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500 text-forest-950">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Smart Budget Estimator</h3>
            <span className="text-[10px] text-amber-300 font-medium">
              Real-time calculations in Indian Rupees (₹ INR)
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
          title="Reset to default estimates"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Top Summary Banner */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-forest-50 border border-forest-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-forest-700 tracking-wider block">
              Total Trip Cost
            </span>
            <span className="text-xl sm:text-2xl font-black text-forest-950">
              {formatINR(calculated.totalCost)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-forest-700 tracking-wider block">
              Per Traveler ({calculated.travelers})
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-amber-700">
              {formatINR(calculated.perPersonCost)}
            </span>
          </div>
        </div>

        {/* Target comparison alert if target is set */}
        {spendingTarget > 0 && (
          <div
            className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between border ${
              isOverBudget
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Target: {formatINR(spendingTarget)}</span>
            </span>
            <span className="font-bold">
              {isOverBudget
                ? `+${formatINR(targetDiff)} over budget`
                : `${formatINR(Math.abs(targetDiff))} under budget`}
            </span>
          </div>
        )}

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Travelers */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Users className="w-3.5 h-3.5 text-forest-700" />
              <span>Travelers</span>
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={budget.travelers}
              onChange={(e) => updateField('travelers', parseInt(e.target.value) || 1)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
            />
          </div>

          {/* Days */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Calendar className="w-3.5 h-3.5 text-forest-700" />
              <span>Trip Duration (Days)</span>
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={budget.days}
              onChange={(e) => updateField('days', parseInt(e.target.value) || 1)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
            />
          </div>

          {/* Accommodation per night */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-forest-700" />
                <span>Stay / Night</span>
              </span>
              <span className="text-[10px] text-stone-400 font-normal">
                {calculated.nights} {calculated.nights === 1 ? 'night' : 'nights'}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={250}
                min={0}
                value={budget.nightlyAccommodation}
                onChange={(e) => updateField('nightlyAccommodation', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
            <span className="text-[10px] text-stone-500 block mt-0.5">
              Subtotal: {formatINR(calculated.accommodationCost)}
            </span>
          </div>

          {/* Daily food per person */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-forest-700" />
                <span>Food / Person / Day</span>
              </span>
              <span className="text-[10px] text-stone-400 font-normal">
                {budget.travelers} pax × {budget.days} days
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={100}
                min={0}
                value={budget.dailyFoodPerPerson}
                onChange={(e) => updateField('dailyFoodPerPerson', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
            <span className="text-[10px] text-stone-500 block mt-0.5">
              Subtotal: {formatINR(calculated.foodCost)}
            </span>
          </div>

          {/* Transportation */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Car className="w-3.5 h-3.5 text-forest-700" />
              <span>Transportation Total</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={500}
                min={0}
                value={budget.transportation}
                onChange={(e) => updateField('transportation', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          {/* Activities / Entry Fees */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Ticket className="w-3.5 h-3.5 text-forest-700" />
              <span>Activities & Permits</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={250}
                min={0}
                value={budget.activities}
                onChange={(e) => updateField('activities', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          {/* Miscellaneous */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Package className="w-3.5 h-3.5 text-forest-700" />
              <span>Miscellaneous Expenses</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={250}
                min={0}
                value={budget.miscellaneous}
                onChange={(e) => updateField('miscellaneous', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          {/* Target spending budget */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
              <Target className="w-3.5 h-3.5 text-forest-700" />
              <span>Target Budget Cap (Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">₹</span>
              <input
                type="number"
                step={1000}
                min={0}
                value={budget.spendingTarget || ''}
                placeholder="e.g. 35000"
                onChange={(e) => updateField('spendingTarget', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>
        </div>

        {/* Visual Chart */}
        {!compact && (
          <div className="pt-4 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 text-center">
              Expense Distribution Breakdown
            </h4>
            <BudgetChart data={calculated.chartData} totalCost={calculated.totalCost} />
          </div>
        )}

        <div className="text-[10px] text-stone-400 flex items-center justify-between pt-2 border-t border-stone-100">
          <span>* All estimates are user-configurable.</span>
          <span>INR (₹) Standard</span>
        </div>
      </div>
    </div>
  );
};
