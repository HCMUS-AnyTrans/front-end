/**
 * Translation History Feature - API Layer
 *
 * API functions for translation history management.
 */

import { api } from '@/lib/api-client';
import { HISTORY_ENDPOINTS } from '@/config/api';
import type {
  TranslationItem,
  TranslationHistoryStats,
  GetHistoryParams,
  GetHistoryResponse,
  BatchDownloadResponse,
  HistoryFilters,
  SortOptions,
} from './types';

// ============================================================================
// API Functions
// ============================================================================

/**
 * Build query string from params
 */
function buildQueryString(params: GetHistoryParams): string {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set('page', params.page.toString());
  }
  if (params.limit) {
    searchParams.set('limit', params.limit.toString());
  }

  // Add filters
  if (params.filters) {
    const {
      search,
      status,
      category,
      dateFrom,
      dateTo,
      sourceLanguage,
      targetLanguage,
    } = params.filters;

    if (search) searchParams.set('search', search);
    if (status && status !== 'all') searchParams.set('status', status);
    if (category && category !== 'all') searchParams.set('category', category);
    if (dateFrom) searchParams.set('dateFrom', dateFrom);
    if (dateTo) searchParams.set('dateTo', dateTo);
    if (sourceLanguage) searchParams.set('sourceLanguage', sourceLanguage);
    if (targetLanguage) searchParams.set('targetLanguage', targetLanguage);
  }

  // Add sort
  if (params.sort) {
    searchParams.set('sortBy', params.sort.field);
    searchParams.set('sortDir', params.sort.direction);
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Get translation history list with pagination
 */
export async function getHistory(
  params: GetHistoryParams = {}
): Promise<GetHistoryResponse> {
  const queryString = buildQueryString(params);
  return api.get<GetHistoryResponse>(
    `${HISTORY_ENDPOINTS.LIST}${queryString}`,
    true // requiresAuth
  );
}

/**
 * Get translation history item by ID
 */
export async function getHistoryItem(id: string): Promise<TranslationItem> {
  return api.get<TranslationItem>(`${HISTORY_ENDPOINTS.DETAIL}/${id}`, true);
}

/**
 * Get translation history statistics
 */
export async function getHistoryStats(): Promise<TranslationHistoryStats> {
  return api.get<TranslationHistoryStats>(HISTORY_ENDPOINTS.STATS, true);
}

/**
 * Delete a translation history item
 */
export async function deleteHistoryItem(id: string): Promise<void> {
  await api.delete<void>(`${HISTORY_ENDPOINTS.DELETE}/${id}`, true);
}

/**
 * Batch delete translation history items
 */
export async function batchDeleteHistoryItems(ids: string[]): Promise<void> {
  await api.post<void>(HISTORY_ENDPOINTS.BATCH_DELETE, { ids }, true);
}

/**
 * Get download URL for a translated file
 */
export async function getDownloadUrl(
  id: string,
  type: 'original' | 'translated' = 'translated'
): Promise<string> {
  const response = await api.get<{ url: string }>(
    `${HISTORY_ENDPOINTS.DOWNLOAD}/${id}?type=${type}`,
    true
  );
  return response.url;
}

/**
 * Batch download translated files as zip
 */
export async function batchDownload(
  ids: string[]
): Promise<BatchDownloadResponse> {
  return api.post<BatchDownloadResponse>(
    HISTORY_ENDPOINTS.BATCH_DOWNLOAD,
    { ids },
    true
  );
}

/**
 * Trigger file download
 */
export function downloadFile(url: string, fileName?: string): void {
  const link = document.createElement('a');
  link.href = url;
  if (fileName) {
    link.download = fileName;
  }
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get default filters
 */
export function getDefaultFilters(): HistoryFilters {
  return {
    search: '',
    status: 'all',
    category: 'all',
  };
}

/**
 * Get default sort options
 */
export function getDefaultSort(): SortOptions {
  return {
    field: 'translatedAt',
    direction: 'desc',
  };
}

/**
 * Check if filters are active (not default)
 */
export function hasActiveFilters(filters: HistoryFilters): boolean {
  const defaults = getDefaultFilters();
  return (
    filters.search !== defaults.search ||
    filters.status !== defaults.status ||
    filters.category !== defaults.category ||
    !!filters.dateFrom ||
    !!filters.dateTo ||
    !!filters.sourceLanguage ||
    !!filters.targetLanguage
  );
}

/**
 * Count active filters
 */
export function countActiveFilters(filters: HistoryFilters): number {
  let count = 0;

  if (filters.search) count++;
  if (filters.status !== 'all') count++;
  if (filters.category !== 'all') count++;
  if (filters.dateFrom || filters.dateTo) count++;
  if (filters.sourceLanguage) count++;
  if (filters.targetLanguage) count++;

  return count;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}
