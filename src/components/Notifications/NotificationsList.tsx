'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';
import NotificationCard from './NotificationCard';
import { BaseEmptyState } from '@/components/Common';

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
      <BaseEmptyState
        icon={<Bell className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />}
        title="No notifications found"
        description="You're all caught up!"
        searchQuery={searchQuery}
        action={
          activeFilter !== 'all'
            ? {
                label: 'View all notifications',
                onClick: onResetFilterToAll,
                variant: 'gradient-primary',
              }
            : undefined
        }
      />
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
