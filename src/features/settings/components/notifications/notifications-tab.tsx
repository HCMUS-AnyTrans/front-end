'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from '../../hooks/use-notifications';
import { NotificationsTabFallback } from './notifications-tab.fallback';
import { NotificationsListSection } from './notifications-list-section';
import { NotificationPreferencesSection } from './notification-preferences-section';
import { useNotificationPreferencesForm } from '../../hooks/use-notification-preferences-form';

// ============================================================================
// Main Component
// ============================================================================

export function NotificationsTab() {
  const t = useTranslations('settings.notifications');
  const tCommon = useTranslations('common');

  const [page, setPage] = useState(1);

  const {
    notifications,
    pagination: notifPagination,
    unreadCount,
    isLoading: isLoadingNotifs,
    isFetching: isFetchingNotifs,
  } = useNotifications({ page, limit: 10 });
  const { markRead } = useMarkNotificationRead();
  const { markAllRead, isMarking: isMarkingAll } =
    useMarkAllNotificationsRead();
  const { preferences, isLoading: isLoadingPrefs } =
    useNotificationPreferences();
  const { updatePreferences, isUpdating } = useUpdateNotificationPreferences();
  const prefList = preferences ?? [];
  const { handleUpdatePref } = useNotificationPreferencesForm({
    preferences: prefList,
    updatePreferences,
  });

  const isLoading = isLoadingNotifs || isLoadingPrefs;

  if (isLoading) {
    return <NotificationsTabFallback />;
  }

  const notifList = notifications ?? [];

  return (
    <div className="space-y-6">
      <NotificationsListSection
        description={
          unreadCount > 0
            ? t('unreadCount', { count: unreadCount })
            : t('allRead')
        }
        tCommon={tCommon}
        unreadCount={unreadCount}
        notifications={notifList}
        pagination={notifPagination}
        isMarkingAll={isMarkingAll}
        isFetchingNotifs={isFetchingNotifs}
        onMarkAllRead={markAllRead}
        onMarkRead={markRead}
        onPageChange={setPage}
      />

      <NotificationPreferencesSection
        preferences={prefList}
        isUpdating={isUpdating}
        onUpdatePref={handleUpdatePref}
      />
    </div>
  );
}
