/**
 * Dashboard feature types
 *
 * Contains all TypeScript definitions for the dashboard domain.
 */

// ============================================================================
// Activity Types
// ============================================================================

export type ActivityStatus = 'completed' | 'processing' | 'failed';

export interface RecentActivityItem {
  id: number;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  status: ActivityStatus;
  time: string;
  wordCount: number;
}

// ============================================================================
// Language Statistics Types
// ============================================================================

export interface TopLanguageItem {
  lang: string;
  count: number;
  percentage: number;
}

// ============================================================================
// Weekly Statistics Types
// ============================================================================

export interface WeeklyDocumentStat {
  day: string;
  documents: number;
}

export interface WeeklySubtitleStat {
  day: string;
  subtitles: number;
}

// ============================================================================
// Quick Stats Types
// ============================================================================

export interface QuickStatsData {
  totalDocuments: number;
  totalSubtitles: number;
  totalWords: number;
  creditsRemaining: number;
  documentsChange?: number;
  subtitlesChange?: number;
  wordsChange?: number;
}

// ============================================================================
// Dashboard Data Types
// ============================================================================

export interface DashboardData {
  recentActivity: RecentActivityItem[];
  topLanguages: TopLanguageItem[];
  weeklyDocuments: WeeklyDocumentStat[];
  weeklySubtitles: WeeklySubtitleStat[];
  quickStats: QuickStatsData;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface DashboardStatsResponse {
  quickStats: QuickStatsData;
  topLanguages: TopLanguageItem[];
}

export interface DashboardActivityResponse {
  recentActivity: RecentActivityItem[];
  weeklyDocuments: WeeklyDocumentStat[];
  weeklySubtitles: WeeklySubtitleStat[];
}

// ============================================================================
// Component Props Types (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use DashboardData instead. This type is kept for backward compatibility.
 */
export interface DashboardClientProps {
  recentActivity: RecentActivityItem[];
  topLanguages: TopLanguageItem[];
  weeklyStatsDocuments: WeeklyDocumentStat[];
  weeklyStatsSubtitles: WeeklySubtitleStat[];
}

// ============================================================================
// Query Keys
// ============================================================================

export const DASHBOARD_QUERY_KEYS = {
  all: ['dashboard'] as const,
  stats: () => [...DASHBOARD_QUERY_KEYS.all, 'stats'] as const,
  activity: () => [...DASHBOARD_QUERY_KEYS.all, 'activity'] as const,
  weeklyStats: () => [...DASHBOARD_QUERY_KEYS.all, 'weekly'] as const,
} as const;
