'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationItem } from '@/src/types/notifications';
import NotificationCard from './NotificationCard';

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
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No notifications found
        </h3>
        <p className="text-gray-600 mb-6">
          {searchQuery
            ? 'Try adjusting your search or filters'
            : "You're all caught up!"}
        </p>
        {activeFilter !== 'all' && (
          <button
            onClick={onResetFilterToAll}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all cursor-pointer"
          >
            View all notifications
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
