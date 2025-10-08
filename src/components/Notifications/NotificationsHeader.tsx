'use client';

import React from 'react';
import { CheckCheck, Filter } from 'lucide-react';

type Props = {
  unreadCount: number;
  onMarkAllRead: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
};

export default function NotificationsHeader({
  unreadCount,
  onMarkAllRead,
  showFilters,
  onToggleFilters,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-sm text-gray-600">
          Stay updated on translations, system alerts, and account activity
        </p>
      </div>

      <div className="flex items-center gap-3">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 rounded-xl font-semibold transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}

        <button
          onClick={onToggleFilters}
          aria-pressed={showFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>
    </div>
  );
}
