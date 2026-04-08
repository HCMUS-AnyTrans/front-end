import { apiClient } from '@/lib/api-client';
import type {
  Notification,
  NotificationPreference,
  NotificationsQuery,
  PaginatedResponse,
  UpdateNotificationPreferencesDto,
} from '../types';
import { normalizeNotifField } from '../utils/notification';

export async function getNotificationsApi(
  query?: NotificationsQuery,
): Promise<PaginatedResponse<Notification> & { unreadCount: number }> {
  const response = await apiClient.get<
    PaginatedResponse<Notification> & { unreadCount: number }
  >('/notifications', { params: query });

  return {
    ...response.data,
    items: response.data.items.map((item) => ({
      ...item,
      title: normalizeNotifField(item.title) as Notification['title'],
      message: normalizeNotifField(item.message) as Notification['message'],
    })),
  };
}

export async function markNotificationReadApi(
  id: string,
): Promise<{ id: string; isRead: boolean; readAt: string }> {
  const response = await apiClient.patch<{
    id: string;
    isRead: boolean;
    readAt: string;
  }>(`/notifications/${id}/read`);
  return response.data;
}

export async function markAllNotificationsReadApi(): Promise<{
  updatedCount: number;
}> {
  const response = await apiClient.patch<{ updatedCount: number }>(
    '/notifications/read-all',
  );
  return response.data;
}

export async function deleteNotificationApi(id: string): Promise<void> {
  await apiClient.delete(`/notifications/${id}`);
}

export async function getNotificationPreferencesApi(): Promise<
  NotificationPreference[]
> {
  const response = await apiClient.get<NotificationPreference[]>(
    '/settings/notification-preferences',
  );
  return response.data;
}

export async function updateNotificationPreferencesApi(
  dto: UpdateNotificationPreferencesDto,
): Promise<void> {
  await apiClient.patch('/settings/notification-preferences', dto);
}
