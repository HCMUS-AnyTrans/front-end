/**
 * Notifications API layer
 *
 * Provides strongly-typed functions for notification endpoints.
 * All functions use the central HTTP client and return typed data.
 */

import { api } from '@/lib/api-client';
import { NOTIFICATION_ENDPOINTS } from '@/config/api';
import type {
  NotificationItem,
  NotificationsStats,
  GetNotificationsParams,
  GetNotificationsResponse,
  MarkReadRequest,
  MarkReadResponse,
  DeleteNotificationsRequest,
  DeleteNotificationsResponse,
  PinNotificationRequest,
} from './types';
import { DEFAULT_NOTIFICATIONS_LIMIT } from './types';

// ============================================================================
// Notification List
// ============================================================================

/**
 * Get notifications list with optional filters
 *
 * @param params - Filter and pagination params
 * @returns Notifications list with stats and pagination
 * @throws ApiErrorException on failure
 */
export async function getNotifications(
  params?: GetNotificationsParams
): Promise<GetNotificationsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  else searchParams.set('limit', DEFAULT_NOTIFICATIONS_LIMIT.toString());
  if (params?.category) searchParams.set('category', params.category);
  if (params?.unreadOnly) searchParams.set('unreadOnly', 'true');

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `${NOTIFICATION_ENDPOINTS.LIST}?${queryString}`
    : NOTIFICATION_ENDPOINTS.LIST;

  return api.get<GetNotificationsResponse>(endpoint, true);
}

/**
 * Get notification statistics
 *
 * @returns Notification stats (total, unread, by category)
 * @throws ApiErrorException on failure
 */
export async function getStats(): Promise<NotificationsStats> {
  return api.get<NotificationsStats>(NOTIFICATION_ENDPOINTS.STATS, true);
}

/**
 * Get unread notification count
 *
 * @returns Number of unread notifications
 * @throws ApiErrorException on failure
 */
export async function getUnreadCount(): Promise<number> {
  const response = await api.get<{ count: number }>(
    NOTIFICATION_ENDPOINTS.UNREAD_COUNT,
    true
  );
  return response.count;
}

// ============================================================================
// Notification Actions
// ============================================================================

/**
 * Mark notifications as read
 *
 * @param notificationIds - Array of notification IDs to mark as read
 * @returns Success status and updated count
 * @throws ApiErrorException on failure
 */
export async function markAsRead(
  notificationIds: string[]
): Promise<MarkReadResponse> {
  return api.post<MarkReadResponse>(
    NOTIFICATION_ENDPOINTS.MARK_READ,
    { notificationIds } as MarkReadRequest,
    true
  );
}

/**
 * Mark all notifications as read
 *
 * @returns Success status and updated count
 * @throws ApiErrorException on failure
 */
export async function markAllAsRead(): Promise<MarkReadResponse> {
  return api.post<MarkReadResponse>(
    NOTIFICATION_ENDPOINTS.MARK_ALL_READ,
    {},
    true
  );
}

/**
 * Delete notifications
 *
 * @param notificationIds - Array of notification IDs to delete
 * @returns Success status and deleted count
 * @throws ApiErrorException on failure
 */
export async function deleteNotifications(
  notificationIds: string[]
): Promise<DeleteNotificationsResponse> {
  return api.post<DeleteNotificationsResponse>(
    NOTIFICATION_ENDPOINTS.DELETE,
    { notificationIds } as DeleteNotificationsRequest,
    true
  );
}

/**
 * Pin or unpin a notification
 *
 * @param notificationId - ID of notification to pin/unpin
 * @param isPinned - Whether to pin or unpin
 * @returns Updated notification
 * @throws ApiErrorException on failure
 */
export async function pinNotification(
  notificationId: string,
  isPinned: boolean
): Promise<NotificationItem> {
  return api.post<NotificationItem>(
    NOTIFICATION_ENDPOINTS.PIN,
    { notificationId, isPinned } as PinNotificationRequest,
    true
  );
}

// ============================================================================
// Batch Operations
// ============================================================================

/**
 * Mark multiple notifications as read and refresh stats
 *
 * @param notificationIds - Array of notification IDs
 * @returns Updated stats
 */
export async function markAsReadAndRefresh(
  notificationIds: string[]
): Promise<{ result: MarkReadResponse; stats: NotificationsStats }> {
  const result = await markAsRead(notificationIds);
  const stats = await getStats();
  return { result, stats };
}

/**
 * Delete multiple notifications and refresh stats
 *
 * @param notificationIds - Array of notification IDs
 * @returns Updated stats
 */
export async function deleteAndRefresh(
  notificationIds: string[]
): Promise<{ result: DeleteNotificationsResponse; stats: NotificationsStats }> {
  const result = await deleteNotifications(notificationIds);
  const stats = await getStats();
  return { result, stats };
}
