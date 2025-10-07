'use client';

import React, { ReactNode } from 'react';

export type StatCardProps = {
  icon: ReactNode;
  iconWrapperClass: string;
  trend?: ReactNode;
  trendClass?: string;
  title: string;
  value: string;
  subtitle: string;
};

export default function StatCard({
  icon,
  iconWrapperClass,
  trend,
  trendClass,
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 ${trendClass} text-sm font-medium`}
          >
            {trend}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
}
