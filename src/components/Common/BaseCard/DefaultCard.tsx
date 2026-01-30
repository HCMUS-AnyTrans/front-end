'use client';

import React, { ReactNode } from 'react';

interface DefaultCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  title: string;
  content?: ReactNode;
  className?: string;
}

export function DefaultCard({
  icon,
  iconWrapperClass = 'bg-brand-100',
  title,
  content,
  className = '',
}: DefaultCardProps) {
  return (
    <div className={`bg-card rounded-xl border border-border ${className}`}>
      {icon && (
        <div
          className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-foreground">{title}</h3>
      {content}
    </div>
  );
}
