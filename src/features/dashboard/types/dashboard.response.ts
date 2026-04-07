import type { PaginationMeta } from '@/types';
import type {
  CreditBreakdown,
  CreditUsage,
  StorageBreakdownItem,
} from './dashboard.types';
import type { TranslationJobResponse } from '@/types';

/**
 * A single point in the jobs activity chart response.
 */
export interface JobChartDataPoint {
  date: string;
  day: string;
  document: number;
}

/**
 * A paginated response for recent translation jobs.
 */
export interface TranslationJobsListResponse {
  data: TranslationJobResponse[];
  meta: PaginationMeta;
}

/**
 * A credit allocation response for the dashboard pie chart.
 */
export interface CreditsChartResponse {
  totalCredits: number;
  breakdown: CreditBreakdown[];
  usage: CreditUsage;
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
  breakdown: {
    documents: StorageBreakdownItem;
  };
}

/**
 * A wallet balance response for the dashboard header and billing summary.
 */
export interface WalletResponse {
  id: string;
  balance: number;
  updatedAt: string;
}
