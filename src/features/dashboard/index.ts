/**
 * Dashboard feature exports
 *
 * Central export point for all dashboard-related modules.
 * Import from this file for a clean API:
 *
 * @example
 * ```tsx
 * import {
 *   useDashboardData,
 *   type DashboardData,
 *   dashboardApi,
 * } from '@/features/dashboard';
 * ```
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // Activity types
  ActivityStatus,
  RecentActivityItem,
  // Language types
  TopLanguageItem,
  // Weekly stats types
  WeeklyDocumentStat,
  WeeklySubtitleStat,
  // Quick stats types
  QuickStatsData,
  // Dashboard data types
  DashboardData,
  DashboardStatsResponse,
  DashboardActivityResponse,
  // Component props (deprecated)
  DashboardClientProps,
} from './types';

export { DASHBOARD_QUERY_KEYS } from './types';

// ============================================================================
// API Functions
// ============================================================================

export * as dashboardApi from './api';

// Also export individual functions for convenience
export {
  getStats,
  getQuickStats,
  getTopLanguages,
  getActivity,
  getRecentActivity,
  getWeeklyDocuments,
  getWeeklySubtitles,
  getOverview,
  getDashboardData,
} from './api';

// ============================================================================
// Hooks
// ============================================================================

export {
  // Stats hooks
  useDashboardStats,
  useQuickStats,
  useTopLanguages,
  // Activity hooks
  useDashboardActivity,
  useRecentActivity,
  // Weekly stats hooks
  useWeeklyDocuments,
  useWeeklySubtitles,
  // Combined hooks
  useDashboardData,
  useDashboardOverview,
  // Utility hooks
  useDashboardInvalidation,
  useDashboardPrefetch,
} from './hooks';
