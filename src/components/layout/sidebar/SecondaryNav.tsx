'use client';

import React from 'react';
import Link from 'next/link';
import { SecondaryNavProps } from '@/src/types/sidebar';

export default function SecondaryNav({ items, isActive }: SecondaryNavProps) {
  return (
    <div className="px-4">
      <div className="h-px bg-gray-200 my-4" />
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
