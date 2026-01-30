'use client';

import React, { ReactNode } from 'react';
import { StatCard as BaseStatCard } from '@/components/Common/BaseCard/StatCard';

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
    <BaseStatCard
      icon={icon}
      iconWrapperClass={iconWrapperClass}
      title={title}
      value={value}
      subtitle={subtitle}
      trend={trend}
      trendClass={trendClass}
    />
  );
}
