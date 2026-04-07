/**
 * Query parameters for loading dashboard overview statistics.
 */
export interface DashboardStatsQuery {
  period?: 'week' | 'month' | 'quarter' | 'year';
  timezone?: string;
}

/**
 * Query parameters for the jobs activity chart.
 */
export interface JobsChartQuery {
  days?: 7 | 14 | 30;
  timezone?: string;
}

/**
 * Query parameters for the credits allocation chart.
 */
export interface CreditsChartQuery {
  period?: 'week' | 'month' | 'quarter' | 'year';
}

/**
 * Query parameters for listing recent translation jobs.
 */
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
