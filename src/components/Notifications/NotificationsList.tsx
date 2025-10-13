'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';
import NotificationCard from './NotificationCard';
import { Button } from '@/components/ui/button';

type Props = {
  notifications: NotificationItem[];
  activeFilter: 'all' | 'unread' | 'translation' | 'billing' | 'system';
  searchQuery: string;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleRead: (id: string) => void;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
  onResetFilterToAll: () => void;
  formatTimestamp: (date: Date) => string;
};

export default function NotificationsList({
  notifications,
  activeFilter,
  searchQuery,
  selectedIds,
  onToggleSelect,
  onToggleRead,
  onTogglePin,
  onDelete,
  onResetFilterToAll,
  formatTimestamp,
}: Props) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          No notifications found
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          {searchQuery
            ? 'Try adjusting your search or filters'
            : "You're all caught up!"}
        </p>
        {activeFilter !== 'all' && (
          <Button
            onClick={onResetFilterToAll}
            variant="gradient-primary"
            size="default"
            className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
          >
            View all notifications
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          isSelected={selectedIds.includes(n.id)}
          onToggleSelect={() => onToggleSelect(n.id)}
          onToggleRead={() => onToggleRead(n.id)}
          onTogglePin={() => onTogglePin(n.id)}
          onDelete={() => onDelete(n.id)}
          formatTimestamp={formatTimestamp}
        />
      ))}
    </div>
  );
}
