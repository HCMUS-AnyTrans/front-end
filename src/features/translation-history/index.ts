/**
 * Translation History Feature Module
 *
 * Provides comprehensive translation history management functionality.
 *
 * @example
 * ```tsx
 * import {
 *   useTranslationHistory,
 *   useTranslationHistoryStore,
 *   useOptimisticDelete,
 *   type TranslationItem,
 * } from '@/features/translation-history';
 *
 * function HistoryList() {
 *   const { filters, sort, page, limit } = useTranslationHistoryStore();
 *   const { data, isLoading } = useTranslationHistory({ filters, sort, page, limit });
 *   const deleteItem = useOptimisticDelete();
 *
 *   return (
 *     <ul>
 *       {data?.items.map(item => (
 *         <li key={item.id}>
 *           {item.fileName}
 *           <button onClick={() => deleteItem.mutate(item.id)}>Delete</button>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */

// Types
export type {
  // Core types
  TranslationCategory,
  TranslationStatus,
  DocumentFileType,
  SubtitleFileType,
  FileType,
  // Main entities
  TranslationItem,
  TranslationHistoryStats,
  // Filter & sort
  FilterStatus,
  FilterCategory,
  SortField,
  SortDirection,
  HistoryFilters,
  SortOptions,
  // Pagination
  PaginationInfo,
  PaginatedResponse,
  // API types
  GetHistoryParams,
  GetHistoryResponse,
  DeleteHistoryItemRequest,
  BatchDeleteRequest,
  DownloadRequest,
  BatchDownloadRequest,
  BatchDownloadResponse,
  // UI state
  StatusConfig,
  TranslationHistoryState,
  TranslationHistoryActions,
} from './types';

// Constants
export {
  historyQueryKeys,
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  DEFAULT_PAGINATION,
  ITEMS_PER_PAGE_OPTIONS,
} from './types';

// API functions
export {
  getHistory,
  getHistoryItem,
  getHistoryStats,
  deleteHistoryItem,
  batchDeleteHistoryItems,
  getDownloadUrl,
  batchDownload,
  downloadFile,
  // Helpers
  getDefaultFilters,
  getDefaultSort,
  hasActiveFilters,
  countActiveFilters,
  formatFileSize,
  formatRelativeTime,
} from './api';

// Hooks
export {
  // Query hooks
  useTranslationHistory,
  useTranslationHistoryItem,
  useTranslationHistoryStats,
  // Mutation hooks
  useDeleteHistoryItem,
  useBatchDeleteHistoryItems,
  useDownloadFile,
  useBatchDownload,
  // Optimistic hooks
  useOptimisticDelete,
  useOptimisticBatchDelete,
  // Prefetch hooks
  usePrefetchHistory,
  usePrefetchHistoryItem,
} from './hooks';

// Store
export {
  useTranslationHistoryStore,
  // Selectors
  selectSelectedCount,
  selectIsSelected,
  selectSelectedIdsArray,
  selectAllSelected,
  selectSomeSelected,
  selectQueryParams,
  selectHasActiveFilters,
  // Hook selectors
  useHistorySelection,
  useHistoryFilters,
  useHistorySort,
  useHistoryPagination,
} from './store';
