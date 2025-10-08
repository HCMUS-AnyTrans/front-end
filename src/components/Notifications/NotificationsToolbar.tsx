'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { NotificationFilter } from '@/src/types/notifications';

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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className="ml-2 text-xs font-bold">{filter.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
