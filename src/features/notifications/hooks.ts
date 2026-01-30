/**
 * Notifications React Query hooks
 *
 * Provides data fetching hooks with caching, loading states, and error handling.
 * Uses TanStack Query (React Query) for server state management.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as notificationsApi from './api';
import { NOTIFICATION_QUERY_KEYS } from './types';
import type {
  NotificationItem,
  NotificationsStats,
  GetNotificationsParams,
  GetNotificationsResponse,
  MarkReadResponse,
  DeleteNotificationsResponse,
} from './types';

// ============================================================================
// Query Hooks
// ============================================================================

/**
 * Hook to fetch notifications list
 *
 * @param params - Filter and pagination params
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useNotifications({ unreadOnly: true });
 * ```
 */
export function useNotifications(params?: GetNotificationsParams) {
  return useQuery<GetNotificationsResponse, Error>({
    queryKey: NOTIFICATION_QUERY_KEYS.list(params),
    queryFn: () => notificationsApi.getNotifications(params),
  });
}

/**
 * Hook to fetch notification statistics
 */
export function useNotificationStats() {
  return useQuery<NotificationsStats, Error>({
    queryKey: NOTIFICATION_QUERY_KEYS.stats(),
    queryFn: notificationsApi.getStats,
  });
}

/**
 * Hook to fetch unread notification count
 *
 * Useful for showing badge counts in header/sidebar
 */
export function useUnreadCount() {
  return useQuery<number, Error>({
    queryKey: NOTIFICATION_QUERY_KEYS.unreadCount(),
    queryFn: notificationsApi.getUnreadCount,
    refetchInterval: 60000, // Refetch every minute
  });
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * Hook to mark notifications as read
 *
 * @example
 * ```tsx
 * const { mutate: markRead, isPending } = useMarkAsRead();
 *
 * const handleMarkRead = (ids: string[]) => {
 *   markRead(ids, {
 *     onSuccess: () => toast.success('Marked as read'),
 *   });
 * };
 * ```
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation<MarkReadResponse, Error, string[]>({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      // Invalidate all notification queries
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.all,
      });
    },
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation<MarkReadResponse, Error, void>({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.all,
      });
    },
  });
}

/**
 * Hook to delete notifications
 */
export function useDeleteNotifications() {
  const queryClient = useQueryClient();

  return useMutation<DeleteNotificationsResponse, Error, string[]>({
    mutationFn: notificationsApi.deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.all,
      });
    },
  });
}

/**
 * Hook to pin/unpin a notification
 */
export function usePinNotification() {
  const queryClient = useQueryClient();

  return useMutation<
    NotificationItem,
    Error,
    { notificationId: string; isPinned: boolean }
  >({
    mutationFn: ({ notificationId, isPinned }) =>
      notificationsApi.pinNotification(notificationId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.all,
      });
    },
  });
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook to invalidate all notification queries
 */
export function useNotificationInvalidation() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.all,
      }),
    invalidateList: () =>
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.list(),
      }),
    invalidateStats: () =>
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.stats(),
      }),
    invalidateUnreadCount: () =>
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.unreadCount(),
      }),
  };
}

/**
 * Hook to prefetch notifications
 */
export function useNotificationPrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchNotifications: (params?: GetNotificationsParams) =>
      queryClient.prefetchQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.list(params),
        queryFn: () => notificationsApi.getNotifications(params),
      }),
    prefetchStats: () =>
      queryClient.prefetchQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.stats(),
        queryFn: notificationsApi.getStats,
      }),
  };
}
