'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('notifications.header');

  const filterOptions = [
    {
      id: 'all',
      label: t('filters.all'),
      count: notificationCounts.all,
    },
    {
      id: 'unread',
      label: t('filters.unread'),
      count: notificationCounts.unread,
    },
    {
      id: 'translations',
      label: t('filters.translations'),
      count: notificationCounts.translations,
    },
    {
      id: 'billing',
      label: t('filters.billing'),
      count: notificationCounts.billing,
    },
    {
      id: 'system',
      label: t('filters.system'),
      count: notificationCounts.system,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {t('title')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Stay updated on translations, system alerts, and account activity
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-[#4169E1] text-[#1e3a8a] hover:bg-blue-50 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{t('markAllRead')}</span>
            <span className="sm:hidden">{t('markAllRead')}</span>
          </button>
        )}

        <div className="relative flex-1 sm:flex-initial">
          <button
            onClick={onToggleFilters}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterType !== 'all'
                ? 'bg-blue-50 border-blue-200 text-[#1e3a8a]'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {filterType !== 'all' && (
              <span className="w-2 h-2 rounded-full bg-[#4169E1]"></span>
            )}
            <ChevronDown className="w-4 h-4" />
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    onFilterTypeChange(filter.id);
                    onToggleFilters();
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    filterType === filter.id
                      ? 'bg-blue-50 text-[#1e3a8a] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      filterType === filter.id
                        ? 'bg-blue-100 text-[#1e3a8a]'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {filter.count}
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
