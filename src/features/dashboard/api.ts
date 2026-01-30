/**
 * Dashboard API layer
 *
 * Provides strongly-typed functions for all dashboard endpoints.
 * All functions use the central HTTP client and return typed data.
 */

import { api } from '@/lib/api-client';
import { DASHBOARD_ENDPOINTS } from '@/config/api';
import type {
  DashboardStatsResponse,
  DashboardActivityResponse,
  DashboardData,
  QuickStatsData,
  RecentActivityItem,
  TopLanguageItem,
  WeeklyDocumentStat,
  WeeklySubtitleStat,
} from './types';

// ============================================================================
// Dashboard Stats
// ============================================================================

/**
 * Get dashboard quick stats and top languages
 *
 * @returns Dashboard stats with quick stats and top languages
 * @throws ApiErrorException on failure
 */
export async function getStats(): Promise<DashboardStatsResponse> {
  return api.get<DashboardStatsResponse>(DASHBOARD_ENDPOINTS.STATS, true);
}

/**
 * Get only quick stats
 *
 * @returns Quick stats data
 * @throws ApiErrorException on failure
 */
export async function getQuickStats(): Promise<QuickStatsData> {
  const response = await getStats();
  return response.quickStats;
}

/**
 * Get top languages statistics
 *
 * @returns Array of top language items
 * @throws ApiErrorException on failure
 */
export async function getTopLanguages(): Promise<TopLanguageItem[]> {
  const response = await getStats();
  return response.topLanguages;
}

// ============================================================================
// Dashboard Activity
// ============================================================================

/**
 * Get dashboard activity data
 *
 * @returns Dashboard activity with recent activity and weekly stats
 * @throws ApiErrorException on failure
 */
export async function getActivity(): Promise<DashboardActivityResponse> {
  return api.get<DashboardActivityResponse>(DASHBOARD_ENDPOINTS.ACTIVITY, true);
}

/**
 * Get recent activity list
 *
 * @param limit - Optional limit for number of items
 * @returns Array of recent activity items
 * @throws ApiErrorException on failure
 */
export async function getRecentActivity(
  limit?: number
): Promise<RecentActivityItem[]> {
  const endpoint = limit
    ? `${DASHBOARD_ENDPOINTS.ACTIVITY}?limit=${limit}`
    : DASHBOARD_ENDPOINTS.ACTIVITY;
  const response = await api.get<DashboardActivityResponse>(endpoint, true);
  return response.recentActivity;
}

// ============================================================================
// Weekly Statistics
// ============================================================================

/**
 * Get weekly document statistics
 *
 * @returns Array of weekly document stats
 * @throws ApiErrorException on failure
 */
export async function getWeeklyDocuments(): Promise<WeeklyDocumentStat[]> {
  const response = await getActivity();
  return response.weeklyDocuments;
}

/**
 * Get weekly subtitle statistics
 *
 * @returns Array of weekly subtitle stats
 * @throws ApiErrorException on failure
 */
export async function getWeeklySubtitles(): Promise<WeeklySubtitleStat[]> {
  const response = await getActivity();
  return response.weeklySubtitles;
}

// ============================================================================
// Full Dashboard Data
// ============================================================================

/**
 * Get complete dashboard overview data
 *
 * This combines stats and activity into a single response.
 * Use this when you need all dashboard data at once.
 *
 * @returns Complete dashboard data
 * @throws ApiErrorException on failure
 */
export async function getOverview(): Promise<DashboardData> {
  return api.get<DashboardData>(DASHBOARD_ENDPOINTS.OVERVIEW, true);
}

/**
 * Get complete dashboard data by fetching both stats and activity
 *
 * Use this as an alternative to getOverview when the backend
 * doesn't have a combined endpoint.
 *
 * @returns Complete dashboard data
 * @throws ApiErrorException on failure
 */
export async function getDashboardData(): Promise<DashboardData> {
  const [statsResponse, activityResponse] = await Promise.all([
    getStats(),
    getActivity(),
  ]);

  return {
    quickStats: statsResponse.quickStats,
    topLanguages: statsResponse.topLanguages,
    recentActivity: activityResponse.recentActivity,
    weeklyDocuments: activityResponse.weeklyDocuments,
    weeklySubtitles: activityResponse.weeklySubtitles,
  };
}
