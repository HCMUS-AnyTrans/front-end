/**
 * Translation History Feature - Type Definitions
 *
 * Domain types for translation history management.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Translation category
 */
export type TranslationCategory = 'document' | 'subtitle';

/**
 * Translation status
 */
export type TranslationStatus =
  | 'completed'
  | 'processing'
  | 'failed'
  | 'cancelled';

/**
 * Document file types supported
 */
export type DocumentFileType =
  | 'pdf'
  | 'PDF'
  | 'docx'
  | 'DOCX'
  | 'doc'
  | 'DOC'
  | 'txt'
  | 'TXT'
  | 'xlsx'
  | 'XLSX'
  | 'xls'
  | 'XLS'
  | 'pptx'
  | 'PPTX'
  | 'ppt'
  | 'PPT';

/**
 * Subtitle file types supported
 */
export type SubtitleFileType =
  | 'srt'
  | 'SRT'
  | 'vtt'
  | 'VTT'
  | 'ass'
  | 'ASS'
  | 'ssa'
  | 'SSA'
  | 'sub'
  | 'SUB';

/**
 * All supported file types
 */
export type FileType = DocumentFileType | SubtitleFileType;

// ============================================================================
// Main Entities
// ============================================================================

/**
 * Translation history item
 */
export interface TranslationItem {
  /** Unique identifier */
  id: string;

  /** Original file name */
  fileName: string;

  /** File extension/type */
  fileType: FileType;

  /** Translation category */
  category: TranslationCategory;

  /** Source language code (e.g., 'en', 'vi') */
  sourceLanguage: string;

  /** Target language code */
  targetLanguage: string;

  /** Translation status */
  status: TranslationStatus;

  /** ISO timestamp when translation was completed */
  translatedAt: string;

  /** Human-readable file size (e.g., '2.5 MB') */
  fileSize: string;

  /** File size in bytes */
  fileSizeBytes?: number;

  /** Word count of source document */
  wordCount: number;

  /** Credits used for this translation */
  credits: number;

  /** Download URL for translated file */
  downloadUrl?: string;

  /** Original file download URL */
  originalFileUrl?: string;

  /** Error message if status is 'failed' */
  errorMessage?: string;

  /** Additional metadata */
  metadata?: {
    /** Duration for subtitles */
    duration?: string;
    /** Page count for documents */
    pageCount?: number;
    /** Character count */
    characterCount?: number;
  };
}

/**
 * Translation history statistics
 */
export interface TranslationHistoryStats {
  /** Total number of translation projects */
  totalProjects: number;

  /** Number of completed translations */
  totalCompleted: number;

  /** Number of failed translations */
  totalFailed?: number;

  /** Number of processing translations */
  totalProcessing?: number;

  /** Total words translated */
  totalWords: number;

  /** Total credits used */
  totalCredits: number;

  /** Statistics by category */
  byCategory?: {
    document: number;
    subtitle: number;
  };
}

// ============================================================================
// Filter & Sort Types
// ============================================================================

/**
 * Filter status options
 */
export type FilterStatus = 'all' | TranslationStatus;

/**
 * Filter category options
 */
export type FilterCategory = 'all' | TranslationCategory;

/**
 * Sort field options
 */
export type SortField =
  | 'translatedAt'
  | 'fileName'
  | 'fileSize'
  | 'wordCount'
  | 'credits';

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * History filters
 */
export interface HistoryFilters {
  /** Search query for file name or language */
  search: string;

  /** Status filter */
  status: FilterStatus;

  /** Category filter */
  category: FilterCategory;

  /** Date range start */
  dateFrom?: string;

  /** Date range end */
  dateTo?: string;

  /** Source language filter */
  sourceLanguage?: string;

  /** Target language filter */
  targetLanguage?: string;
}

/**
 * Sort options
 */
export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

// ============================================================================
// Pagination Types
// ============================================================================

/**
 * Pagination info
 */
export interface PaginationInfo {
  /** Current page (1-indexed) */
  page: number;

  /** Items per page */
  limit: number;

  /** Total number of items */
  total: number;

  /** Total number of pages */
  totalPages: number;

  /** Has next page */
  hasNext: boolean;

  /** Has previous page */
  hasPrevious: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// ============================================================================
// API Types
// ============================================================================

/**
 * Get history request params
 */
export interface GetHistoryParams {
  /** Page number (1-indexed) */
  page?: number;

  /** Items per page */
  limit?: number;

  /** Filters */
  filters?: Partial<HistoryFilters>;

  /** Sort options */
  sort?: SortOptions;
}

/**
 * Get history response
 */
export interface GetHistoryResponse {
  items: TranslationItem[];
  pagination: PaginationInfo;
  stats: TranslationHistoryStats;
}

/**
 * Delete history item request
 */
export interface DeleteHistoryItemRequest {
  id: string;
}

/**
 * Batch delete request
 */
export interface BatchDeleteRequest {
  ids: string[];
}

/**
 * Download request
 */
export interface DownloadRequest {
  id: string;
  /** Download original or translated file */
  type: 'original' | 'translated';
}

/**
 * Batch download request
 */
export interface BatchDownloadRequest {
  ids: string[];
}

/**
 * Batch download response
 */
export interface BatchDownloadResponse {
  /** URL to download zip file */
  downloadUrl: string;
  /** Expiration time */
  expiresAt: string;
}

// ============================================================================
// UI State Types
// ============================================================================

/**
 * Status display configuration
 */
export interface StatusConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  label: string;
}

/**
 * Translation history store state
 */
export interface TranslationHistoryState {
  /** Currently selected item IDs */
  selectedIds: Set<string>;

  /** Current filters */
  filters: HistoryFilters;

  /** Sort options */
  sort: SortOptions;

  /** Current page */
  page: number;

  /** Items per page */
  limit: number;

  /** Whether filter menu is open */
  isFilterMenuOpen: boolean;

  /** ID of item with open action menu */
  activeActionMenuId: string | null;
}

/**
 * Translation history store actions
 */
export interface TranslationHistoryActions {
  // Selection
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  selectAll: (ids: string[]) => void;
  deselectAll: () => void;
  toggleSelection: (id: string) => void;

  // Filters
  setSearch: (search: string) => void;
  setStatusFilter: (status: FilterStatus) => void;
  setCategoryFilter: (category: FilterCategory) => void;
  setDateRange: (from?: string, to?: string) => void;
  resetFilters: () => void;

  // Sort
  setSort: (field: SortField, direction?: SortDirection) => void;

  // Pagination
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  // UI state
  toggleFilterMenu: () => void;
  setActiveActionMenu: (id: string | null) => void;

  // Reset
  reset: () => void;
}

// ============================================================================
// React Query Keys
// ============================================================================

export const historyQueryKeys = {
  all: ['translation-history'] as const,
  list: (params?: GetHistoryParams) =>
    [...historyQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...historyQueryKeys.all, 'detail', id] as const,
  stats: () => [...historyQueryKeys.all, 'stats'] as const,
};

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_FILTERS: HistoryFilters = {
  search: '',
  status: 'all',
  category: 'all',
};

export const DEFAULT_SORT: SortOptions = {
  field: 'translatedAt',
  direction: 'desc',
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;
