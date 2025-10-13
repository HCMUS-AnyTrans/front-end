'use client';

import React from 'react';
import { CheckCheck, Filter, ChevronDown } from 'lucide-react';

type Props = {
  unreadCount: number;
  onMarkAllRead: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  filterType: string;
  onFilterTypeChange: (type: string) => void;
  notificationCounts: {
    all: number;
    unread: number;
    translations: number;
    billing: number;
    system: number;
  };
};

export default function NotificationsHeader({
  unreadCount,
  onMarkAllRead,
  showFilters,
  onToggleFilters,
  filterType,
  onFilterTypeChange,
  notificationCounts = {
    all: 0,
    unread: 0,
    translations: 0,
    billing: 0,
    system: 0,
  },
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Stay updated on translations, system alerts, and account activity
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Mark all read</span>
            <span className="sm:hidden">Mark read</span>
          </button>
        )}

        <div className="relative flex-1 sm:flex-initial">
          <button
            onClick={onToggleFilters}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterType !== 'all'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {filterType !== 'all' && (
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            )}
            <ChevronDown className="w-4 h-4" />
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
              {[
                {
                  id: 'all',
                  label: 'All Notifications',
                  count: notificationCounts.all,
                },
                {
                  id: 'unread',
                  label: 'Unread',
                  count: notificationCounts.unread,
                },
                {
                  id: 'translations',
                  label: 'Translations',
                  count: notificationCounts.translations,
                },
                {
                  id: 'billing',
                  label: 'Billing',
                  count: notificationCounts.billing,
                },
                {
                  id: 'system',
                  label: 'System',
                  count: notificationCounts.system,
                },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    onFilterTypeChange(type.id);
                    onToggleFilters();
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    filterType === type.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{type.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      filterType === type.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
