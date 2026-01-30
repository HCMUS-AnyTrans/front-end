/**
 * Dashboard React Query hooks
 *
 * Provides data fetching hooks with caching, loading states, and error handling.
 * Uses TanStack Query (React Query) for server state management.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as dashboardApi from './api';
import { DASHBOARD_QUERY_KEYS } from './types';
import type {
  DashboardData,
  DashboardStatsResponse,
  DashboardActivityResponse,
  QuickStatsData,
  RecentActivityItem,
  TopLanguageItem,
  WeeklyDocumentStat,
  WeeklySubtitleStat,
} from './types';

// ============================================================================
// Stats Hooks
// ============================================================================

/**
 * Hook to fetch dashboard stats (quick stats + top languages)
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useDashboardStats();
 * ```
 */
export function useDashboardStats() {
  return useQuery<DashboardStatsResponse, Error>({
    queryKey: DASHBOARD_QUERY_KEYS.stats(),
    queryFn: dashboardApi.getStats,
  });
}

/**
 * Hook to fetch only quick stats
 */
export function useQuickStats() {
  return useQuery<QuickStatsData, Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.stats(), 'quick'] as const,
    queryFn: dashboardApi.getQuickStats,
  });
}

/**
 * Hook to fetch top languages
 */
export function useTopLanguages() {
  return useQuery<TopLanguageItem[], Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.stats(), 'languages'] as const,
    queryFn: dashboardApi.getTopLanguages,
  });
}

// ============================================================================
// Activity Hooks
// ============================================================================

/**
 * Hook to fetch dashboard activity data
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useDashboardActivity();
 * ```
 */
export function useDashboardActivity() {
  return useQuery<DashboardActivityResponse, Error>({
    queryKey: DASHBOARD_QUERY_KEYS.activity(),
    queryFn: dashboardApi.getActivity,
  });
}

/**
 * Hook to fetch recent activity list
 *
 * @param limit - Optional limit for number of items
 */
export function useRecentActivity(limit?: number) {
  return useQuery<RecentActivityItem[], Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.activity(), 'recent', limit] as const,
    queryFn: () => dashboardApi.getRecentActivity(limit),
  });
}

// ============================================================================
// Weekly Stats Hooks
// ============================================================================

/**
 * Hook to fetch weekly document statistics
 */
export function useWeeklyDocuments() {
  return useQuery<WeeklyDocumentStat[], Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.weeklyStats(), 'documents'] as const,
    queryFn: dashboardApi.getWeeklyDocuments,
  });
}

/**
 * Hook to fetch weekly subtitle statistics
 */
export function useWeeklySubtitles() {
  return useQuery<WeeklySubtitleStat[], Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.weeklyStats(), 'subtitles'] as const,
    queryFn: dashboardApi.getWeeklySubtitles,
  });
}

// ============================================================================
// Combined Dashboard Hooks
// ============================================================================

/**
 * Hook to fetch complete dashboard data
 *
 * This is the primary hook for the dashboard page.
 * It fetches all data needed to render the complete dashboard.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useDashboardData();
 *
 * if (isLoading) return <DashboardSkeleton />;
 * if (error) return <ErrorState error={error} />;
 *
 * return <DashboardContent data={data} />;
 * ```
 */
export function useDashboardData() {
  return useQuery<DashboardData, Error>({
    queryKey: DASHBOARD_QUERY_KEYS.all,
    queryFn: dashboardApi.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch dashboard overview (single endpoint)
 *
 * Use this when the backend provides a combined overview endpoint.
 */
export function useDashboardOverview() {
  return useQuery<DashboardData, Error>({
    queryKey: [...DASHBOARD_QUERY_KEYS.all, 'overview'] as const,
    queryFn: dashboardApi.getOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook to invalidate all dashboard queries
 *
 * Useful after mutations that affect dashboard data.
 *
 * @example
 * ```tsx
 * const { invalidateDashboard } = useDashboardInvalidation();
 *
 * // After completing a translation
 * await invalidateDashboard();
 * ```
 */
export function useDashboardInvalidation() {
  const queryClient = useQueryClient();

  return {
    invalidateDashboard: () =>
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.all }),
    invalidateStats: () =>
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.stats() }),
    invalidateActivity: () =>
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.activity(),
      }),
  };
}

/**
 * Hook to prefetch dashboard data
 *
 * Use this to prefetch dashboard data before navigation.
 *
 * @example
 * ```tsx
 * const { prefetchDashboard } = useDashboardPrefetch();
 *
 * // On hover over dashboard link
 * onMouseEnter={() => prefetchDashboard()}
 * ```
 */
export function useDashboardPrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchDashboard: () =>
      queryClient.prefetchQuery({
        queryKey: DASHBOARD_QUERY_KEYS.all,
        queryFn: dashboardApi.getDashboardData,
        staleTime: 5 * 60 * 1000,
      }),
  };
}
