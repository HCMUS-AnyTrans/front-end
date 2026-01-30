/**
 * Translation History Feature - Zustand Store
 *
 * UI state management for translation history.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  type TranslationHistoryState,
  type TranslationHistoryActions,
  type HistoryFilters,
  type SortOptions,
  type FilterStatus,
  type FilterCategory,
  type SortField,
  type SortDirection,
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  DEFAULT_PAGINATION,
} from './types';

// ============================================================================
// Store Types
// ============================================================================

type TranslationHistoryStore = TranslationHistoryState &
  TranslationHistoryActions;

// ============================================================================
// Initial State
// ============================================================================

const initialState: TranslationHistoryState = {
  selectedIds: new Set(),
  filters: { ...DEFAULT_FILTERS },
  sort: { ...DEFAULT_SORT },
  page: DEFAULT_PAGINATION.page,
  limit: DEFAULT_PAGINATION.limit,
  isFilterMenuOpen: false,
  activeActionMenuId: null,
};

// ============================================================================
// Store
// ============================================================================

export const useTranslationHistoryStore = create<TranslationHistoryStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Selection actions
      selectItem: (id: string) => {
        set((state) => ({
          selectedIds: new Set(state.selectedIds).add(id),
        }));
      },

      deselectItem: (id: string) => {
        set((state) => {
          const newSet = new Set(state.selectedIds);
          newSet.delete(id);
          return { selectedIds: newSet };
        });
      },

      selectAll: (ids: string[]) => {
        set({ selectedIds: new Set(ids) });
      },

      deselectAll: () => {
        set({ selectedIds: new Set() });
      },

      toggleSelection: (id: string) => {
        const { selectedIds } = get();
        if (selectedIds.has(id)) {
          const newSet = new Set(selectedIds);
          newSet.delete(id);
          set({ selectedIds: newSet });
        } else {
          set({ selectedIds: new Set(selectedIds).add(id) });
        }
      },

      // Filter actions
      setSearch: (search: string) => {
        set((state) => ({
          filters: { ...state.filters, search },
          page: 1, // Reset to first page on filter change
        }));
      },

      setStatusFilter: (status: FilterStatus) => {
        set((state) => ({
          filters: { ...state.filters, status },
          page: 1,
        }));
      },

      setCategoryFilter: (category: FilterCategory) => {
        set((state) => ({
          filters: { ...state.filters, category },
          page: 1,
        }));
      },

      setDateRange: (from?: string, to?: string) => {
        set((state) => ({
          filters: { ...state.filters, dateFrom: from, dateTo: to },
          page: 1,
        }));
      },

      resetFilters: () => {
        set({
          filters: { ...DEFAULT_FILTERS },
          page: 1,
        });
      },

      // Sort actions
      setSort: (field: SortField, direction?: SortDirection) => {
        set((state) => {
          // If same field, toggle direction; otherwise use provided or default to desc
          const newDirection =
            direction ??
            (state.sort.field === field
              ? state.sort.direction === 'asc'
                ? 'desc'
                : 'asc'
              : 'desc');

          return {
            sort: { field, direction: newDirection },
            page: 1,
          };
        });
      },

      // Pagination actions
      setPage: (page: number) => {
        set({ page });
      },

      setLimit: (limit: number) => {
        set({ limit, page: 1 }); // Reset to first page when changing page size
      },

      // UI state actions
      toggleFilterMenu: () => {
        set((state) => ({
          isFilterMenuOpen: !state.isFilterMenuOpen,
        }));
      },

      setActiveActionMenu: (id: string | null) => {
        set({ activeActionMenuId: id });
      },

      // Reset
      reset: () => {
        set(initialState);
      },
    }),
    { name: 'translation-history-store' }
  )
);

// ============================================================================
// Selectors
// ============================================================================

/**
 * Get selected count
 */
export const selectSelectedCount = (state: TranslationHistoryState) =>
  state.selectedIds.size;

/**
 * Check if item is selected
 */
export const selectIsSelected = (state: TranslationHistoryState, id: string) =>
  state.selectedIds.has(id);

/**
 * Get selected IDs as array
 */
export const selectSelectedIdsArray = (state: TranslationHistoryState) =>
  Array.from(state.selectedIds);

/**
 * Check if all items are selected
 */
export const selectAllSelected = (
  state: TranslationHistoryState,
  itemIds: string[]
) => {
  if (itemIds.length === 0) return false;
  return itemIds.every((id) => state.selectedIds.has(id));
};

/**
 * Check if some items are selected
 */
export const selectSomeSelected = (
  state: TranslationHistoryState,
  itemIds: string[]
) => {
  if (itemIds.length === 0) return false;
  const selectedCount = itemIds.filter((id) =>
    state.selectedIds.has(id)
  ).length;
  return selectedCount > 0 && selectedCount < itemIds.length;
};

/**
 * Get query params for API call
 */
export const selectQueryParams = (state: TranslationHistoryState) => ({
  page: state.page,
  limit: state.limit,
  filters: state.filters,
  sort: state.sort,
});

/**
 * Check if filters are active
 */
export const selectHasActiveFilters = (state: TranslationHistoryState) => {
  const { filters } = state;
  return (
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.category !== 'all' ||
    !!filters.dateFrom ||
    !!filters.dateTo
  );
};

// ============================================================================
// Hook Selectors
// ============================================================================

/**
 * Use selection state
 */
export function useHistorySelection() {
  return useTranslationHistoryStore((state) => ({
    selectedIds: state.selectedIds,
    selectedCount: state.selectedIds.size,
    selectItem: state.selectItem,
    deselectItem: state.deselectItem,
    selectAll: state.selectAll,
    deselectAll: state.deselectAll,
    toggleSelection: state.toggleSelection,
  }));
}

/**
 * Use filter state
 */
export function useHistoryFilters() {
  return useTranslationHistoryStore((state) => ({
    filters: state.filters,
    setSearch: state.setSearch,
    setStatusFilter: state.setStatusFilter,
    setCategoryFilter: state.setCategoryFilter,
    setDateRange: state.setDateRange,
    resetFilters: state.resetFilters,
    isFilterMenuOpen: state.isFilterMenuOpen,
    toggleFilterMenu: state.toggleFilterMenu,
  }));
}

/**
 * Use sort state
 */
export function useHistorySort() {
  return useTranslationHistoryStore((state) => ({
    sort: state.sort,
    setSort: state.setSort,
  }));
}

/**
 * Use pagination state
 */
export function useHistoryPagination() {
  return useTranslationHistoryStore((state) => ({
    page: state.page,
    limit: state.limit,
    setPage: state.setPage,
    setLimit: state.setLimit,
  }));
}
