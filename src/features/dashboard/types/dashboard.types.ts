/**
 * A job status shown in dashboard job views.
 */
export type JobStatus = 'pending' | 'processing' | 'succeeded' | 'failed';

/**
 * A supported translation job type.
 */
export type JobType = 'document';

/**
 * A language code shown in dashboard-related UI.
 */
export type LanguageCode = 'vi' | 'en' | 'ja' | 'ko' | 'zh' | 'fr' | 'de';

/**
 * An activity category shown in dashboard notifications or feeds.
 */
export type ActivityType =
  | 'job_complete'
  | 'job_failed'
  | 'payment'
  | 'warning';

/**
 * A trend direction used by dashboard stat cards.
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Aggregated dashboard statistics for the overview cards.
 */
export interface DashboardStats {
  totalCredits: number;
  creditsChange: string;
  creditsTrend: TrendDirection;

  totalJobs: number;
  documentJobs: number;
  jobsChange: string;
  jobsTrend: TrendDirection;

  processingJobs: number;
  processingChange: string;
  processingTrend: TrendDirection;

  completedThisMonth: number;
  completedChange: string;
  completedTrend: TrendDirection;
  successRate: number;
}

/**
 * An activity item displayed in the dashboard feed.
 */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
}

/**
 * A credit breakdown item returned by the credit allocation endpoint.
 */
export interface CreditBreakdown {
  name: string;
  value: number;
  percentage: number;
}

/**
 * A usage summary for credit consumption.
 */
export interface CreditUsage {
  documentsUsed: number;
}

/**
 * A storage breakdown item grouped by dashboard-supported file categories.
 */
export interface StorageBreakdownItem {
  count: number;
  size: number;
}
