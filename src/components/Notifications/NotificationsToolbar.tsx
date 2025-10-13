'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { NotificationFilter } from '@/types/notifications';

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: NotificationFilter[]; // first 3 filters
  activeFilter: NotificationFilter['id'];
  onSelectFilter: (id: NotificationFilter['id']) => void;
};

export default function NotificationsToolbar({
  searchQuery,
  onSearchChange,
  filters,
  activeFilter,
  onSelectFilter,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter.id)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === filter.id
                ? 'bg-blue-100 text-[#1e3a8a]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-bold">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
