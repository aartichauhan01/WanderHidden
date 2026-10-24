'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatINR } from '@/lib/utils';

interface BudgetChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  totalCost: number;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ data, totalCost }) => {
  if (!data || data.length === 0 || totalCost === 0) {
    return (
      <div className="h-56 flex flex-col items-center justify-center text-center p-4 bg-stone-50 rounded-xl border border-stone-200 text-stone-400 text-xs">
        <span>Enter your travel expenses to visualize breakdown</span>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = totalCost > 0 ? ((item.value / totalCost) * 100).toFixed(1) : 0;
      return (
        <div className="bg-forest-950 text-white p-2.5 rounded-xl shadow-lg border border-forest-800 text-xs">
          <p className="font-bold flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.payload.color }}
            />
            {item.name}
          </p>
          <p className="text-amber-300 font-extrabold mt-0.5">{formatINR(item.value)}</p>
          <p className="text-[10px] text-stone-400">{percentage}% of total budget</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-xs text-stone-700 font-medium ml-1">
                {value} ({formatINR(entry.payload.value)})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Total in Donut */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
          Total
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-forest-950 leading-tight">
          {formatINR(totalCost)}
        </span>
      </div>
    </div>
  );
};
