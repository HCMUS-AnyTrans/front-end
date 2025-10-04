'use client';

import React, { useState, useMemo } from 'react';
import { Search, Settings, CheckCheck, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/src/components/Sidebar';
import {
  NotificationCard,
  NotificationData,
  NotificationType,
} from '@/src/components/notifications/NotificationCard';
import { NotificationFilters } from '@/src/components/notifications/NotificationFilters';
import { BulkActions } from '@/src/components/notifications/BulkActions';
import { NotificationPreferences } from '@/src/components/notifications/NotificationPreferences';

// Mock notification data
const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'project',
    title: 'Translation completed',
    description:
      'Your business proposal document has been successfully translated from English to Vietnamese.',
    timestamp: '5m ago',
    source: 'Document Translator',
    isRead: false,
    isPinned: true,
    tags: ['auto-translation'],
  },
  {
    id: '2',
    type: 'system',
    title: 'System maintenance scheduled',
    description:
      "We'll be performing scheduled maintenance on our servers this Sunday from 2-4 AM EST. No action required.",
    timestamp: '2h ago',
    source: 'System',
    isRead: false,
    tags: ['maintenance'],
  },
  {
    id: '3',
    type: 'billing',
    title: 'Credits running low',
    description:
      'You have 45 translation credits remaining. Consider upgrading your plan to avoid interruption.',
    timestamp: '1d ago',
    source: 'Billing',
    isRead: true,
    tags: ['credits', 'upgrade'],
  },
  {
    id: '4',
    type: 'error',
    title: 'Translation failed',
    description:
      'Unable to process technical_manual.pdf due to unsupported formatting. Please try a different file format.',
    timestamp: '2d ago',
    source: 'Document Translator',
    isRead: false,
    tags: ['error', 'pdf'],
  },
  {
    id: '5',
    type: 'project',
    title: 'Subtitle translation ready',
    description:
      'Your movie_subtitles.srt file has been translated to 5 languages and is ready for download.',
    timestamp: '3d ago',
    source: 'Subtitle Translator',
    isRead: true,
    tags: ['subtitles', 'batch'],
  },
  {
    id: '6',
    type: 'billing',
    title: 'Payment successful',
    description:
      'Your subscription has been renewed for another month. 500 new credits have been added to your account.',
    timestamp: '1w ago',
    source: 'Billing',
    isRead: true,
  },
];

export function NotificationsInterface() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setSelectedNotification] = useState<NotificationData | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);

  // Filter notifications based on active filter and search
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply type filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'unread') {
        filtered = filtered.filter((n) => !n.isRead);
      } else {
        filtered = filtered.filter((n) => n.type === activeFilter);
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.source.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [notifications, activeFilter, searchQuery]);

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: NotificationData[] } = {};

    filteredNotifications.forEach((notification) => {
      let group = 'Older';

      if (
        notification.timestamp.includes('m ago') ||
        notification.timestamp.includes('h ago')
      ) {
        group = 'Today';
      } else if (notification.timestamp.includes('1d ago')) {
        group = 'Yesterday';
      } else if (
        notification.timestamp.includes('d ago') &&
        !notification.timestamp.includes('1w')
      ) {
        group = 'This week';
      }

      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(notification);
    });

    return groups;
  }, [filteredNotifications]);

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const systemCount = notifications.filter((n) => n.type === 'system').length;
    const billingCount = notifications.filter(
      (n) => n.type === 'billing'
    ).length;
    const projectCount = notifications.filter(
      (n) => n.type === 'project'
    ).length;
    const errorCount = notifications.filter((n) => n.type === 'error').length;

    return {
      all: notifications.length,
      unread: unreadCount,
      system: systemCount,
      billing: billingCount,
      project: projectCount,
      error: errorCount,
    };
  }, [notifications]);

  const filters = [
    { id: 'all', label: 'All', count: filterCounts.all },
    { id: 'unread', label: 'Unread', count: filterCounts.unread },
    {
      id: 'system',
      label: 'System',
      count: filterCounts.system,
      type: 'system' as NotificationType,
    },
    {
      id: 'billing',
      label: 'Billing',
      count: filterCounts.billing,
      type: 'billing' as NotificationType,
    },
    {
      id: 'project',
      label: 'Projects',
      count: filterCounts.project,
      type: 'project' as NotificationType,
    },
    {
      id: 'error',
      label: 'Errors',
      count: filterCounts.error,
      type: 'error' as NotificationType,
    },
  ];

  const handleSelectNotification = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredNotifications.map((n) => n.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handlePin = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (selectedIds.includes(n.id) ? { ...n, isRead: true } : n))
    );
    setSelectedIds([]);
  };

  const handleArchiveSelected = () => {
    // In a real app, this would archive the notifications
    console.log('Archiving notifications:', selectedIds);
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const allSelected =
    selectedIds.length === filteredNotifications.length &&
    filteredNotifications.length > 0;
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col max-w-none overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
                  Notifications
                </h1>
                <p className="text-sm text-[#717680] font-nunito">
                  Stay on top of translation events, system alerts, and billing
                  updates.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {hasUnread && (
                  <Button
                    variant="outline"
                    onClick={handleMarkAllAsRead}
                    className="text-[#19398f] border-[#19398f] hover:bg-[#19398f] hover:text-white font-nunito"
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark all as read
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="h-10 w-10 p-0"
                  title="Notification preferences"
                >
                  <Settings className="w-5 h-5" />
                </Button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent w-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <NotificationFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              filters={filters}
            />

            {/* Bulk Actions */}
            {filteredNotifications.length > 0 && (
              <BulkActions
                selectedCount={selectedIds.length}
                totalCount={filteredNotifications.length}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onMarkAllRead={handleMarkAllRead}
                onArchiveSelected={handleArchiveSelected}
                onDeleteSelected={handleDeleteSelected}
                allSelected={allSelected}
              />
            )}

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 font-nunito mb-2">
                  You&apos;re all caught up!
                </h3>
                <p className="text-gray-600 font-nunito mb-6">
                  No notifications match your current filter.
                </p>
                <Button
                  onClick={() => setActiveFilter('all')}
                  className="bg-[#19398f] hover:bg-[#142457] text-white font-nunito"
                >
                  View all notifications
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedNotifications).map(
                  ([group, groupNotifications]) => (
                    <div key={group}>
                      <div className="sticky top-0 bg-white py-2 mb-4">
                        <h3 className="text-sm font-semibold text-gray-500 font-nunito uppercase tracking-wide">
                          {group}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {groupNotifications.map((notification) => (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            isSelected={selectedIds.includes(notification.id)}
                            onSelect={handleSelectNotification}
                            onMarkRead={handleMarkRead}
                            onPin={handlePin}
                            onDelete={handleDelete}
                            onClick={setSelectedNotification}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Notification Preferences Modal */}
        <NotificationPreferences
          isOpen={showPreferences}
          onClose={() => setShowPreferences(false)}
        />
      </div>
    </div>
  );
}
