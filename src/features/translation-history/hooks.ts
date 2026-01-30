/**
 * Translation History Feature - React Query Hooks
 *
 * Custom hooks for data fetching and mutations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHistory,
  getHistoryItem,
  getHistoryStats,
  deleteHistoryItem,
  batchDeleteHistoryItems,
  getDownloadUrl,
  batchDownload,
  downloadFile,
} from './api';
import {
  historyQueryKeys,
  type GetHistoryParams,
  type TranslationItem,
  type GetHistoryResponse,
  type TranslationHistoryStats,
  type BatchDownloadResponse,
} from './types';

// ============================================================================
// Query Hooks
// ============================================================================

/**
 * Fetch translation history list with pagination and filters
 */
export function useTranslationHistory(params: GetHistoryParams = {}) {
  return useQuery({
    queryKey: historyQueryKeys.list(params),
    queryFn: () => getHistory(params),
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Fetch single translation history item
 */
export function useTranslationHistoryItem(id: string | null) {
  return useQuery({
    queryKey: historyQueryKeys.detail(id || ''),
    queryFn: () => getHistoryItem(id!),
    enabled: !!id,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Fetch translation history statistics
 */
export function useTranslationHistoryStats() {
  return useQuery({
    queryKey: historyQueryKeys.stats(),
    queryFn: getHistoryStats,
    staleTime: 60 * 1000, // 1 minute
  });
}

// ============================================================================
// Mutation Hooks
// ============================================================================

/**
 * Delete single history item
 */
export function useDeleteHistoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHistoryItem,
    onSuccess: () => {
      // Invalidate all history queries
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
    },
  });
}

/**
 * Batch delete history items
 */
export function useBatchDeleteHistoryItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchDeleteHistoryItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
    },
  });
}

/**
 * Download single file
 */
export function useDownloadFile() {
  return useMutation({
    mutationFn: async ({
      id,
      type = 'translated',
      fileName,
    }: {
      id: string;
      type?: 'original' | 'translated';
      fileName?: string;
    }) => {
      const url = await getDownloadUrl(id, type);
      downloadFile(url, fileName);
      return url;
    },
  });
}

/**
 * Batch download files
 */
export function useBatchDownload() {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await batchDownload(ids);
      downloadFile(response.downloadUrl, 'translations.zip');
      return response;
    },
  });
}

// ============================================================================
// Optimistic Update Hooks
// ============================================================================

/**
 * Delete with optimistic update
 */
export function useOptimisticDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHistoryItem,
    onMutate: async (id: string) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: historyQueryKeys.all });

      // Snapshot previous value
      const previousData = queryClient.getQueriesData({
        queryKey: historyQueryKeys.all,
      });

      // Optimistically update - remove item from all cached queries
      queryClient.setQueriesData(
        { queryKey: historyQueryKeys.list() },
        (old: GetHistoryResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((item) => item.id !== id),
            pagination: {
              ...old.pagination,
              total: old.pagination.total - 1,
            },
          };
        }
      );

      return { previousData };
    },
    onError: (_err, _id, context) => {
      // Rollback on error
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
    },
  });
}

/**
 * Batch delete with optimistic update
 */
export function useOptimisticBatchDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchDeleteHistoryItems,
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({ queryKey: historyQueryKeys.all });

      const previousData = queryClient.getQueriesData({
        queryKey: historyQueryKeys.all,
      });

      const idSet = new Set(ids);
      queryClient.setQueriesData(
        { queryKey: historyQueryKeys.list() },
        (old: GetHistoryResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((item) => !idSet.has(item.id)),
            pagination: {
              ...old.pagination,
              total: old.pagination.total - ids.length,
            },
          };
        }
      );

      return { previousData };
    },
    onError: (_err, _ids, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
    },
  });
}

// ============================================================================
// Prefetch Hooks
// ============================================================================

/**
 * Prefetch history data
 */
export function usePrefetchHistory() {
  const queryClient = useQueryClient();

  return (params: GetHistoryParams = {}) => {
    queryClient.prefetchQuery({
      queryKey: historyQueryKeys.list(params),
      queryFn: () => getHistory(params),
      staleTime: 30 * 1000,
    });
  };
}

/**
 * Prefetch history item
 */
export function usePrefetchHistoryItem() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: historyQueryKeys.detail(id),
      queryFn: () => getHistoryItem(id),
      staleTime: 60 * 1000,
    });
  };
}
