'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Pin, CheckCheck, Trash2 } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';

interface NotificationActionsProps {
  notification: NotificationItem;
  onToggleRead: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
}

export function NotificationActions({
  notification,
  onToggleRead,
  onTogglePin,
  onDelete,
}: NotificationActionsProps) {
  const t = useTranslations('notifications.card');

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
      <button
        onClick={onTogglePin}
        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        title={notification.isPinned ? t('actions.unpin') : t('actions.pin')}
      >
        <Pin
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            notification.isPinned
              ? 'text-amber-500 fill-amber-500'
              : 'text-gray-400'
          }`}
        />
      </button>
      <button
        onClick={onToggleRead}
        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        title={
          notification.isRead ? t('actions.markUnread') : t('actions.markRead')
        }
      >
        <CheckCheck
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            notification.isRead ? 'text-green-600' : 'text-gray-400'
          }`}
        />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
        title={t('actions.delete')}
      >
        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-red-600" />
      </button>
    </div>
  );
}
