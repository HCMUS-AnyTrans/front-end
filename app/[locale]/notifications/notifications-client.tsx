'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Sidebar } from '@/components/Layout';
import {
  NotificationItem,
  NotificationFilter,
  NotificationsStats,
} from '@/types/notifications';
import {
  NotificationsHeader,
  NotificationsToolbar,
  NotificationsList,
  NotificationsBulkActionsBar,
} from '@/components/Notifications';

// Mock data moved from original file
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    category: 'translation',
    title: 'Document translation completed',
    description:
      'Business_Proposal_2024.docx has been successfully translated from English to Vietnamese.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    isPinned: true,
    metadata: {
      fileName: 'Business_Proposal_2024.docx',
      wordsTranslated: 2847,
      creditsUsed: 28,
    },
  },
  {
    id: '2',
    type: 'info',
    category: 'system',
    title: 'System maintenance scheduled',
    description:
      "We'll be performing scheduled maintenance this Sunday from 2-4 AM EST.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    isPinned: false,
  },
  {
    id: '3',
    type: 'warning',
    category: 'billing',
    title: 'Credits running low',
    description:
      'You have 45 translation credits remaining. Upgrade your plan to continue.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
    metadata: {
      creditsRemaining: 45,
      totalCredits: 100,
    },
  },
  {
    id: '4',
    type: 'error',
    category: 'translation',
    title: 'Translation failed',
    description:
      'Unable to process technical_manual.pdf due to unsupported formatting.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: false,
    isPinned: false,
  },
  {
    id: '5',
    type: 'success',
    category: 'translation',
    title: 'Subtitle translation ready',
    description: 'Movie_subtitles.srt has been translated to 5 languages.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
  },
  {
    id: '6',
    type: 'success',
    category: 'billing',
    title: 'Payment successful',
    description: '500 new credits have been added to your account.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
  },
];

export default function NotificationsClient() {
  const t = useTranslations('notifications');
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilter['id']>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<NotificationFilter['id']>('all');

  const formatTimestamp = (date: Date): string => {
    const now = Date.now();
    const diff = now - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return t('time.minutesAgo', { minutes });
    if (hours < 24) return t('time.hoursAgo', { hours });
    if (days < 7) return t('time.daysAgo', { days });
    return t('time.weeksAgo', { weeks: Math.floor(days / 7) });
  };

  const stats: NotificationsStats = useMemo(() => {
    return {
      total: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      translation: notifications.filter((n) => n.category === 'translation')
        .length,
      billing: notifications.filter((n) => n.category === 'billing').length,
      system: notifications.filter((n) => n.category === 'system').length,
    };
  }, [notifications]);

  const filters: NotificationFilter[] = useMemo(() => {
    return [
      { id: 'all', label: t('toolbar.filters.all'), count: stats.total },
      { id: 'unread', label: t('toolbar.filters.unread'), count: stats.unread },
      {
        id: 'translation',
        label: t('toolbar.filters.translations'),
        count: stats.translation,
      },
      {
        id: 'billing',
        label: t('toolbar.filters.billing'),
        count: stats.billing,
      },
      { id: 'system', label: t('toolbar.filters.system'), count: stats.system },
    ];
  }, [stats, t]);

  const filteredNotifications: NotificationItem[] = useMemo(() => {
    let filtered = notifications;

    if (filterType === 'unread') {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (filterType !== 'all') {
      filtered = filtered.filter((n) => n.category === filterType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
      );
    }

    return filtered.slice().sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [notifications, filterType, searchQuery]);

  // Handlers (kept same behavior)
  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleTogglePin = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Bulk actions (UI existed; wire minimal actions)
  const handleMarkSelectedRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (selectedIds.includes(n.id) ? { ...n, isRead: true } : n))
    );
  };
  const handleArchiveSelected = () => {
    // Placeholder: no archive state in original; keep UI only
  };
  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <NotificationsHeader
              unreadCount={stats.unread}
              onMarkAllRead={handleMarkAllRead}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters((v) => !v)}
              filterType={filterType}
              onFilterTypeChange={(type) => setFilterType(type as NotificationFilter['id'])}
              notificationCounts={{
                all: stats.total,
                unread: stats.unread,
                translations: stats.translation,
                billing: stats.billing,
                system: stats.system,
              }}
            />

            <NotificationsToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters.slice(0, 3)}
              activeFilter={filterType}
              onSelectFilter={setFilterType}
            />
          </div>
        </div>

        {selectedIds.length > 0 && (
          <NotificationsBulkActionsBar
            selectedCount={selectedIds.length}
            onMarkSelectedRead={handleMarkSelectedRead}
            onArchiveSelected={handleArchiveSelected}
            onDeleteSelected={handleDeleteSelected}
          />
        )}

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <NotificationsList
              notifications={filteredNotifications}
              activeFilter={filterType}
              searchQuery={searchQuery}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleRead={handleToggleRead}
              onTogglePin={handleTogglePin}
              onDelete={handleDelete}
              onResetFilterToAll={() => setFilterType('all')}
              formatTimestamp={formatTimestamp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
