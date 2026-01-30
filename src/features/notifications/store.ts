/**
 * Notifications Zustand store
 *
 * Manages local state for notifications UI (selection, filters, etc.)
 * Server state is managed by React Query hooks.
 */

import { create } from 'zustand';
import type {
  NotificationItem,
  NotificationsStats,
  NotificationsState,
  NotificationsActions,
  NotificationFilter,
} from './types';

// ============================================================================
// Initial State
// ============================================================================

const initialState: NotificationsState = {
  notifications: [],
  stats: {
    total: 0,
    unread: 0,
    translation: 0,
    billing: 0,
    system: 0,
  },
  selectedIds: [],
  activeFilter: 'all',
  isLoading: false,
  error: null,
};

// ============================================================================
// Store
// ============================================================================

type NotificationsStore = NotificationsState & NotificationsActions;

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  ...initialState,

  // Data setters
  setNotifications: (notifications) => set({ notifications }),
  setStats: (stats) => set({ stats }),

  // Filter
  setActiveFilter: (filter) =>
    set({
      activeFilter: filter,
      selectedIds: [], // Clear selection when filter changes
    }),

  // Selection
  selectNotification: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds
        : [...state.selectedIds, id],
    })),

  deselectNotification: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
    })),

  selectAll: () =>
    set((state) => ({
      selectedIds: state.notifications.map((n) => n.id),
    })),

  deselectAll: () => set({ selectedIds: [] }),

  // Optimistic updates
  markAsRead: (ids) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        ids.includes(n.id) ? { ...n, isRead: true } : n
      ),
      stats: {
        ...state.stats,
        unread: Math.max(0, state.stats.unread - ids.length),
      },
    })),

  markAsUnread: (ids) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        ids.includes(n.id) ? { ...n, isRead: false } : n
      ),
      stats: {
        ...state.stats,
        unread: state.stats.unread + ids.length,
      },
    })),

  deleteNotifications: (ids) =>
    set((state) => {
      const deletedNotifications = state.notifications.filter((n) =>
        ids.includes(n.id)
      );
      const unreadDeleted = deletedNotifications.filter(
        (n) => !n.isRead
      ).length;

      return {
        notifications: state.notifications.filter((n) => !ids.includes(n.id)),
        selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
        stats: {
          ...state.stats,
          total: Math.max(0, state.stats.total - ids.length),
          unread: Math.max(0, state.stats.unread - unreadDeleted),
        },
      };
    }),

  pinNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isPinned: true } : n
      ),
    })),

  unpinNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isPinned: false } : n
      ),
    })),

  // Loading & Error
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Reset
  reset: () => set(initialState),
}));

// ============================================================================
// Selectors
// ============================================================================

/**
 * Get filtered notifications based on active filter
 */
export const selectFilteredNotifications = (state: NotificationsStore) => {
  const { notifications, activeFilter } = state;

  switch (activeFilter) {
    case 'all':
      return notifications;
    case 'unread':
      return notifications.filter((n) => !n.isRead);
    case 'translation':
    case 'billing':
    case 'system':
      return notifications.filter((n) => n.category === activeFilter);
    default:
      return notifications;
  }
};

/**
 * Get pinned notifications (always show at top)
 */
export const selectPinnedNotifications = (state: NotificationsStore) =>
  state.notifications.filter((n) => n.isPinned);

/**
 * Get selected notifications
 */
export const selectSelectedNotifications = (state: NotificationsStore) =>
  state.notifications.filter((n) => state.selectedIds.includes(n.id));

/**
 * Check if all filtered notifications are selected
 */
export const selectIsAllSelected = (state: NotificationsStore) => {
  const filtered = selectFilteredNotifications(state);
  return (
    filtered.length > 0 &&
    filtered.every((n) => state.selectedIds.includes(n.id))
  );
};

/**
 * Check if some filtered notifications are selected (for indeterminate checkbox)
 */
export const selectIsSomeSelected = (state: NotificationsStore) => {
  const filtered = selectFilteredNotifications(state);
  const selectedCount = filtered.filter((n) =>
    state.selectedIds.includes(n.id)
  ).length;
  return selectedCount > 0 && selectedCount < filtered.length;
};

/**
 * Get filter options with counts
 */
export const selectFilterOptions = (
  state: NotificationsStore
): NotificationFilter[] => [
  { id: 'all', label: 'All', count: state.stats.total },
  { id: 'unread', label: 'Unread', count: state.stats.unread },
  { id: 'translation', label: 'Translation', count: state.stats.translation },
  { id: 'billing', label: 'Billing', count: state.stats.billing },
  { id: 'system', label: 'System', count: state.stats.system },
];
