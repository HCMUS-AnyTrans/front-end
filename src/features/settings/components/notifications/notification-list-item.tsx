'use client';

import { Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { notificationTypeIcons } from '../../data';
import { formatRelativeNotificationDate } from '../../utils/notification-display';
import { getNotifText } from '../../utils/notification';
import { cn } from '@/lib/utils';
import type { Notification } from '../../types';

interface NotificationListItemProps {
  notif: Notification;
  tCommon: (key: string, values?: Record<string, number>) => string;
  onMarkRead: (id: string) => void;
}

export function NotificationListItem({
  notif,
  tCommon,
  onMarkRead,
}: NotificationListItemProps) {
  const locale = useLocale();
  const t = useTranslations('settings.notifications');

  return (
    <div
      className={cn(
        'flex w-full items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50',
        !notif.isRead && 'bg-primary/5',
      )}
    >
      <span className="mt-0.5 text-lg">
        {notificationTypeIcons[notif.type]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={cn('text-sm', !notif.isRead && 'font-medium')}>
            {getNotifText(notif.title, locale)}
          </p>
          {!notif.isRead && <span className="size-2 rounded-full bg-primary" />}
        </div>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {getNotifText(notif.message, locale)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatRelativeNotificationDate(notif.createdAt, locale, tCommon)}
        </p>
      </div>
      {!notif.isRead && (
        <button
          type="button"
          onClick={() => onMarkRead(notif.id)}
          className="shrink-0 rounded p-1 text-muted-foreground/50 transition-colors hover:text-foreground"
          title={t('markRead')}
        >
          <Check className="size-4" />
        </button>
      )}
    </div>
  );
}
