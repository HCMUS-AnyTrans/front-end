/**
 * Notifications feature exports
 *
 * Central export point for all notification-related modules.
 *
 * @example
 * ```tsx
 * import {
 *   useNotifications,
 *   useNotificationsStore,
 *   type NotificationItem,
 *   notificationsApi,
 * } from '@/features/notifications';
 * ```
 */

// ============================================================================
// Types
// ============================================================================

export type {
  NotificationType,
  NotificationCategory,
  NotificationMetadata,
  NotificationItem,
  NotificationsStats,
  NotificationFilter,
  GetNotificationsParams,
  GetNotificationsResponse,
  MarkReadRequest,
  MarkReadResponse,
  DeleteNotificationsRequest,
  DeleteNotificationsResponse,
  PinNotificationRequest,
  NotificationsState,
  NotificationsActions,
} from './types';

export {
  NOTIFICATION_QUERY_KEYS,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_TYPES,
  DEFAULT_NOTIFICATIONS_LIMIT,
} from './types';

// ============================================================================
// API Functions
// ============================================================================

export * as notificationsApi from './api';

export {
  getNotifications,
  getStats,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotifications,
  pinNotification,
  markAsReadAndRefresh,
  deleteAndRefresh,
} from './api';

// ============================================================================
// Hooks
// ============================================================================

export {
  // Query hooks
  useNotifications,
  useNotificationStats,
  useUnreadCount,
  // Mutation hooks
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotifications,
  usePinNotification,
  // Utility hooks
  useNotificationInvalidation,
  useNotificationPrefetch,
} from './hooks';

// ============================================================================
// Store
// ============================================================================

export {
  useNotificationsStore,
  // Selectors
  selectFilteredNotifications,
  selectPinnedNotifications,
  selectSelectedNotifications,
  selectIsAllSelected,
  selectIsSomeSelected,
  selectFilterOptions,
} from './store';
