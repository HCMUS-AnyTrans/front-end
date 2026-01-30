'use client';

import React, { ReactNode } from 'react';

interface ContactCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  color?: string;
  title: string;
  description?: string;
  contact?: string;
  className?: string;
}

export function ContactCard({
  icon,
  iconWrapperClass = 'bg-brand-100',
  color = 'blue',
  title,
  description,
  contact,
  className = '',
}: ContactCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-brand-50 text-brand-primary',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-accent/50 text-accent-foreground',
    pink: 'bg-pink-50 text-pink-600',
  };

  const colorClasses = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all ${className}`}
    >
      {icon && (
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colorClasses}`}
        >
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <p className="text-base font-semibold text-foreground">{contact}</p>
    </div>
  );
}
