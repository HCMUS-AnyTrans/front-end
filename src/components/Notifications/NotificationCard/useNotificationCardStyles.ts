'use client';

import { NotificationItem } from '@/types/notifications';

export function useNotificationCardStyles(
  notification: NotificationItem,
  isSelected: boolean
) {
  const cardClassName = `bg-white rounded-xl sm:rounded-2xl border-2 transition-all hover:shadow-md ${
    notification.isRead ? 'border-gray-200' : 'border-blue-200 shadow-sm'
  } ${isSelected ? 'ring-2 ring-blue-400' : ''}`;

  const titleClassName = `text-sm sm:text-base font-semibold ${
    notification.isRead ? 'text-gray-700' : 'text-gray-900'
  }`;

  return { cardClassName, titleClassName };
}
