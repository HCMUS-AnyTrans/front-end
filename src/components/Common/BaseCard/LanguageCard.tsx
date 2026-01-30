'use client';

import React, { ReactNode } from 'react';

interface LanguageCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  content?: ReactNode;
  className?: string;
}

export function LanguageCard({
  icon,
  title,
  description,
  content,
  className = '',
}: LanguageCardProps) {
  return (
    <div
      className={`bg-card rounded-2xl border border-border p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {icon}
      </div>
      {content}
    </div>
  );
}
