'use client';

import React, { ReactNode } from 'react';
import { BaseCard } from '@/src/components/Common';

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
    <BaseCard
      icon={icon}
      iconWrapperClass={iconWrapperClass}
      title={title}
      value={value}
      subtitle={subtitle}
      variant="stat"
      trend={trend}
      trendClass={trendClass}
    />
  );
}
