'use client';

import React, { ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  title: string;
  value?: string;
  subtitle?: string;
  trend?: ReactNode;
  trendClass?: string;
  className?: string;
}

export function StatCard({
  icon,
  iconWrapperClass = 'bg-brand-100',
  title,
  value,
  subtitle,
  trend,
  trendClass,
  className = '',
}: StatCardProps) {
  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div
            className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
        {trend && (
          <div
            className={`flex items-center gap-1 ${trendClass} text-sm font-medium`}
          >
            {trend}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
}
