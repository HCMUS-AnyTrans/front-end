'use client';

import React from 'react';

interface FloatingCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  bgColor: string;
  delay: number;
}

export function FloatingCard({
  icon,
  category,
  title,
  bgColor,
  delay,
}: FloatingCardProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:scale-105 will-change-transform"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className={`rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 ${bgColor}`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-sm font-medium text-muted-foreground">
          {category}
        </div>
        <div className="font-medium text-[15px] leading-tight text-foreground">
          {title}
        </div>
      </div>
    </div>
  );
}
