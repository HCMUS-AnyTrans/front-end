'use client';

import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  title: string;
  description?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  iconWrapperClass = 'bg-brand-100',
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {icon && (
        <div
          className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
