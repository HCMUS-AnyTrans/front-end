import type { PaginationMeta } from '@/types';
import type { LanguageCreditUsage } from './dashboard.types';
import type { TranslationJobResponse } from '@/types';

/**
 * A single point in the jobs activity chart response.
 */
export interface JobChartDataPoint {
  date: string;
  day: string;
  jobs: number;
}

/**
 * Summary metadata returned with the translation jobs list.
 */
export interface TranslationSummary {
  totalJobs: number;
  completedJobs: number;
  credits: number;
}

/**
 * A paginated response for recent translation jobs.
 */
export interface TranslationJobsListResponse {
  data: TranslationJobResponse[];
  meta: PaginationMeta;
  summary: TranslationSummary;
}

/**
 * A top source language credit usage response for the dashboard chart.
 */
export interface CreditsChartResponse {
  totalCredits: number;
  languages: LanguageCreditUsage[];
}

/**
 * A storage usage response for dashboard storage cards.
 */
export interface StorageResponse {
  used: number;
  total: number;
  unit: string;
  percentage: number;
  fileCount: number;
}

/**
 * A wallet balance response for the dashboard header and billing summary.
 */
export interface WalletResponse {
  id: string;
  balance: number;
  updatedAt: string;
}
