/**
 * Notifications feature types
 *
 * Contains all TypeScript definitions for the notifications domain.
 */

// ============================================================================
// Notification Types
// ============================================================================

/**
 * Notification severity/type
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification category for filtering
 */
export type NotificationCategory = 'translation' | 'billing' | 'system';

/**
 * Additional metadata for notifications
 */
export interface NotificationMetadata {
  /** Related file name */
  fileName?: string;
  /** Number of words translated */
  wordsTranslated?: number;
  /** Credits used for the action */
  creditsUsed?: number;
  /** Remaining credits */
  creditsRemaining?: number;
  /** Total credits in account */
  totalCredits?: number;
  /** Related translation ID */
  translationId?: string;
  /** Action URL for the notification */
  actionUrl?: string;
}

/**
 * Individual notification item
 */
export interface NotificationItem {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  isPinned: boolean;
  metadata?: NotificationMetadata;
}

/**
 * Notification statistics
 */
export interface NotificationsStats {
  total: number;
  unread: number;
  translation: number;
  billing: number;
  system: number;
}

/**
 * Notification filter option
 */
export interface NotificationFilter {
  id: 'all' | 'unread' | NotificationCategory;
  label: string;
  count: number;
}

// ============================================================================
// API Types
// ============================================================================

/**
 * Get notifications request params
 */
export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  category?: NotificationCategory;
  unreadOnly?: boolean;
}

/**
 * Get notifications response
 */
export interface GetNotificationsResponse {
  notifications: NotificationItem[];
  stats: NotificationsStats;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Mark notification as read request
 */
export interface MarkReadRequest {
  notificationIds: string[];
}

/**
 * Mark notification as read response
 */
export interface MarkReadResponse {
  success: boolean;
  updatedCount: number;
}

/**
 * Delete notifications request
 */
export interface DeleteNotificationsRequest {
  notificationIds: string[];
}

/**
 * Delete notifications response
 */
export interface DeleteNotificationsResponse {
  success: boolean;
  deletedCount: number;
}

/**
 * Pin/Unpin notification request
 */
export interface PinNotificationRequest {
  notificationId: string;
  isPinned: boolean;
}

// ============================================================================
// State Types
// ============================================================================

/**
 * Notifications state for Zustand store
 */
export interface NotificationsState {
  notifications: NotificationItem[];
  stats: NotificationsStats;
  selectedIds: string[];
  activeFilter: NotificationFilter['id'];
  isLoading: boolean;
  error: string | null;
}

/**
 * Notifications actions
 */
export interface NotificationsActions {
  setNotifications: (notifications: NotificationItem[]) => void;
  setStats: (stats: NotificationsStats) => void;
  setActiveFilter: (filter: NotificationFilter['id']) => void;
  selectNotification: (id: string) => void;
  deselectNotification: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  deleteNotifications: (ids: string[]) => void;
  pinNotification: (id: string) => void;
  unpinNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// ============================================================================
// Query Keys
// ============================================================================

export const NOTIFICATION_QUERY_KEYS = {
  all: ['notifications'] as const,
  list: (params?: GetNotificationsParams) =>
    [...NOTIFICATION_QUERY_KEYS.all, 'list', params] as const,
  stats: () => [...NOTIFICATION_QUERY_KEYS.all, 'stats'] as const,
  detail: (id: string) =>
    [...NOTIFICATION_QUERY_KEYS.all, 'detail', id] as const,
  unreadCount: () => [...NOTIFICATION_QUERY_KEYS.all, 'unread-count'] as const,
} as const;

// ============================================================================
// Constants
// ============================================================================

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  'translation',
  'billing',
  'system',
];

export const NOTIFICATION_TYPES: NotificationType[] = [
  'success',
  'error',
  'warning',
  'info',
];

export const DEFAULT_NOTIFICATIONS_LIMIT = 20;
