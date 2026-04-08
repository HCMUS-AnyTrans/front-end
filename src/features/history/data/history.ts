import {
  HISTORY_DOMAIN_FILTER_OPTIONS,
  type HistoryDomainFilterValue,
} from '@/shared/constants/domains';
import { JOB_STATUS_VALUES } from '@/shared/data';

// ============================================================================
// History Page Constants
// ============================================================================

export const ITEMS_PER_PAGE = 10;

export const STATUS_OPTIONS = ['all', ...JOB_STATUS_VALUES] as const;

export type StatusFilterValue = (typeof STATUS_OPTIONS)[number];

/** History domain filter options (includes "auto"). Re-export from shared. */
export const DOMAIN_OPTIONS = HISTORY_DOMAIN_FILTER_OPTIONS;
export type DomainFilterValue = HistoryDomainFilterValue;

// ============================================================================
// Helpers
// ============================================================================

export { formatHistoryFileSize as formatFileSize } from '../utils/history-display';
