'use client';

import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { NotificationListItem } from './notification-list-item';
import type { Notification } from '../../types';

interface NotificationsListSectionProps {
  description: string;
  tCommon: (key: string, values?: Record<string, number>) => string;
  unreadCount: number;
  notifications: Notification[];
  pagination?: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  isMarkingAll: boolean;
  isFetchingNotifs: boolean;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onPageChange: (page: number) => void;
}

export function NotificationsListSection({
  description,
  tCommon,
  unreadCount,
  notifications,
  pagination,
  isMarkingAll,
  isFetchingNotifs,
  onMarkAllRead,
  onMarkRead,
  onPageChange,
}: NotificationsListSectionProps) {
  const t = useTranslations('settings.notifications');

  return (
    <SettingsSection
      title={t('recentNotifications')}
      description={description}
      action={
        unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            disabled={isMarkingAll}
          >
            {isMarkingAll ? (
              <Loader2 className="mr-1 size-4 animate-spin" />
            ) : (
              <CheckCheck className="size-4" />
            )}
            {t('markAllRead')}
          </Button>
        )
      }
    >
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Bell className="mb-2 size-8" />
          <p>{t('noNotifications')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifications.map((notif, idx) => (
            <div key={notif.id}>
              {idx > 0 && <SettingsDivider />}
              <NotificationListItem
                notif={notif}
                tCommon={tCommon}
                onMarkRead={onMarkRead}
              />
            </div>
          ))}
        </div>
      )}

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          onPageChange={onPageChange}
          isFetching={isFetchingNotifs}
        />
      )}
    </SettingsSection>
  );
}
