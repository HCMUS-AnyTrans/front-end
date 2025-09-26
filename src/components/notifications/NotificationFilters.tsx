"use client";

import React from "react";
import { NotificationType } from "./NotificationCard";

interface FilterTab {
  id: string;
  label: string;
  count: number;
  type?: NotificationType;
}

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  filters: FilterTab[];
}

export function NotificationFilters({ activeFilter, onFilterChange, filters }: NotificationFiltersProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              relative py-4 px-1 border-b-2 font-medium text-sm font-nunito transition-colors
              ${activeFilter === filter.id
                ? 'border-[#19398f] text-[#19398f]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className={`
                ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${activeFilter === filter.id
                  ? 'bg-[#19398f] text-white'
                  : 'bg-gray-100 text-gray-900'
                }
              `}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
