import { apiClient } from '@/lib/api-client';
import type {
  DashboardStats,
  DashboardStatsQuery,
  JobChartDataPoint,
  JobsChartQuery,
  CreditsChartResponse,
  CreditsChartQuery,
  StorageResponse,
  WalletResponse,
  TranslationJobResponse,
  TranslationJobsListResponse,
  RecentJobsQuery,
} from '../types';

// ============================================================================
// Dashboard API Functions
// ============================================================================

/**
 * Get dashboard statistics overview
 * GET /dashboard/stats
 */
export async function getDashboardStatsApi(
  query?: DashboardStatsQuery,
): Promise<DashboardStats> {
  const response = await apiClient.get<DashboardStats>('/dashboard/stats', {
    params: query,
  });
  return response.data;
}

/**
 * Get jobs chart data grouped by day
 * GET /dashboard/charts/jobs
 */
export async function getJobsChartApi(
  query?: JobsChartQuery,
): Promise<JobChartDataPoint[]> {
  const response = await apiClient.get<JobChartDataPoint[]>(
    '/dashboard/charts/jobs',
    { params: query },
  );
  return response.data;
}

/**
 * Get credit usage breakdown by category
 * GET /dashboard/charts/credits
 */
export async function getCreditsChartApi(
  query?: CreditsChartQuery,
): Promise<CreditsChartResponse> {
  const response = await apiClient.get<CreditsChartResponse>(
    '/dashboard/charts/credits',
    { params: query },
  );
  return response.data;
}

/**
 * Get storage usage information
 * GET /dashboard/storage
 */
export async function getStorageApi(): Promise<StorageResponse> {
  const response = await apiClient.get<StorageResponse>('/dashboard/storage');
  return response.data;
}

/**
 * Get current user wallet balance
 * GET /wallet
 */
export async function getWalletApi(): Promise<WalletResponse> {
  const response = await apiClient.get<WalletResponse>('/wallet');
  return response.data;
}

interface TranslationJobResponseDto extends Omit<
  TranslationJobResponse,
  'domainId'
> {
  domain_id?: string;
}

/**
 * Get translation jobs with pagination
 * GET /translations
 */
export async function getRecentJobsApi(
  params?: RecentJobsQuery,
): Promise<TranslationJobsListResponse> {
  const response = await apiClient.get<{
    data: TranslationJobResponseDto[];
    meta: TranslationJobsListResponse['meta'];
  }>('/translations', { params });

  return {
    ...response.data,
    data: response.data.data.map((job) => ({
      ...job,
      domainId: job.domain_id,
    })),
  };
}
