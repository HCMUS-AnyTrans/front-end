// ============================================================================
// Dashboard Types - Matching Backend Prisma Schema
// ============================================================================

/**
 * Job status matching TranslationJob.status in backend
 */
export type JobStatus = 'pending' | 'processing' | 'succeeded' | 'failed';

/**
 * Job type matching TranslationJob.jobType in backend
 */
export type JobType = 'document';

/**
 * Supported language codes (ISO 639-1)
 */
export type LanguageCode = 'vi' | 'en' | 'ja' | 'ko' | 'zh' | 'fr' | 'de';

/**
 * Activity/notification types
 */
export type ActivityType =
  | 'job_complete'
  | 'job_failed'
  | 'payment'
  | 'warning';

/**
 * Trend direction for stats
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

// ============================================================================
// Dashboard Stats
// ============================================================================

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

// ============================================================================
// Recent Job - Matches TranslationJob + File from backend
// ============================================================================

export interface RecentJob {
  id: string;
  fileName: string;
  jobType: JobType;
  srcLang: string;
  tgtLang: string;
  status: JobStatus;
  costCredits: number;
  createdAt: string;
}

export interface TranslationJobFile {
  id: string;
  name: string;
  mime: string;
  size_bytes: number;
  sha256: string | null;
  status: string;
  type: string;
  created_at: string;
  store_until: string;
  is_expired: boolean;
}

export interface PricingBreakdownItem {
  code: string;
  name: string;
  unit: string;
  price: number;
  credits: number;
  quantity: number;
}

export interface TranslationJobResponse {
  job_id: string;
  job_type: string;
  status: string;
  src_lang: string;
  tgt_lang: string;
  input_file?: TranslationJobFile;
  output_file?: TranslationJobFile;
  error?: string;
  created_at: string;
  completed_at?: string;
  cost_credits?: number;
  pricing_breakdown?: PricingBreakdownItem[];
  domainId?: string;
  domain?: string;
  customized_domain?: string;
}

export interface TranslationJobsListResponse {
  data: TranslationJobResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface RecentJobsQuery {
  page?: number;
  limit?: number;
  job_type?: 'document' | 'subtitle';
  status?: string;
  domain_id?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// ============================================================================
// Activity Item - Matches Notification + WalletLedger from backend
// ============================================================================

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
}

// ============================================================================
// Query Params - Matching Backend query.dto.ts
// ============================================================================

export interface DashboardStatsQuery {
  period?: 'week' | 'month' | 'quarter' | 'year';
  timezone?: string;
}

export interface JobsChartQuery {
  days?: 7 | 14 | 30;
  timezone?: string;
}

export interface CreditsChartQuery {
  period?: 'week' | 'month' | 'quarter' | 'year';
}

// ============================================================================
// Chart Data - Matching Backend Response DTOs
// ============================================================================

export interface JobsChartDataPoint {
  day: string;
  document: number;
}

/**
 * Extended chart data point with date from backend
 */
export interface JobChartDataPoint {
  date: string;
  day: string;
  document: number;
}

export interface CreditUsageDataPoint {
  name: string;
  value: number;
  fill: string;
}

/**
 * Credit breakdown from backend CreditsChartDto
 */
export interface CreditBreakdown {
  name: string;
  value: number;
  percentage: number;
}

export interface CreditUsage {
  documentsUsed: number;
}

export interface CreditsChartResponse {
  totalCredits: number;
  breakdown: CreditBreakdown[];
  usage: CreditUsage;
}

// ============================================================================
// Storage - Matching Backend StorageDto
// ============================================================================

export interface StorageInfo {
  used: number; // in MB
  total: number; // in MB
}

export interface StorageBreakdownItem {
  count: number;
  size: number;
}

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

// ============================================================================
// Wallet - Matching Backend WalletResponseDto
// ============================================================================

export interface WalletResponse {
  id: string;
  balance: number;
  updatedAt: string;
}

// ============================================================================
// User Context (for sidebar/header)
// ============================================================================

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
}

export interface WalletInfo {
  balance: number;
}
