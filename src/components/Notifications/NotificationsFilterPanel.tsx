'use client';

import React from 'react';
import { X } from 'lucide-react';
import { NotificationFilter } from '@/src/types/notifications';

type Props = {
  filters: NotificationFilter[];
  activeFilter: NotificationFilter['id'];
  onSelectFilter: (id: NotificationFilter['id']) => void;
  onClose: () => void;
};

export default function NotificationsFilterPanel({
  filters,
  activeFilter,
  onSelectFilter,
  onClose,
}: Props) {
  return (
    <div className="bg-blue-50 border-b border-blue-100 px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Filter by Category
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-75">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
