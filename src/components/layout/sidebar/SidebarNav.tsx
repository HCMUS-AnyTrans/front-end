'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarNavProps } from '@types/sidebar';

export default function SidebarNav({ items, isActive }: SidebarNavProps) {
  return (
    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
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
    </nav>
  );
}
