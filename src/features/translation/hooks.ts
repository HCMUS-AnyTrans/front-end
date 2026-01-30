/**
 * Translation React Query hooks
 *
 * Provides data fetching hooks with caching, loading states, and error handling.
 * Uses TanStack Query (React Query) for server state management.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as translationApi from './api';
import { TRANSLATION_QUERY_KEYS } from './types';
import type {
  DocumentFile,
  DocumentTranslationRequest,
  DocumentTranslationResponse,
  DocumentUploadResponse,
  SubtitleFile,
  SubtitleTranslationRequest,
  SubtitleTranslationResponse,
  SubtitleUploadResponse,
  MovieContext,
  LanguageCode,
  FileStatus,
} from './types';

// ============================================================================
// Document Translation Hooks
// ============================================================================

/**
 * Hook to upload a document
 *
 * @example
 * ```tsx
 * const { mutate: upload, isPending } = useDocumentUpload();
 *
 * const handleUpload = (file: File) => {
 *   upload(file, {
 *     onSuccess: (data) => {
 *       console.log('Uploaded:', data.file);
 *     },
 *   });
 * };
 * ```
 */
export function useDocumentUpload() {
  const queryClient = useQueryClient();

  return useMutation<DocumentUploadResponse, Error, File>({
    mutationFn: translationApi.uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.documents(),
      });
    },
  });
}

/**
 * Hook to translate a document
 */
export function useDocumentTranslation() {
  const queryClient = useQueryClient();

  return useMutation<
    DocumentTranslationResponse,
    Error,
    DocumentTranslationRequest
  >({
    mutationFn: translationApi.translateDocument,
    onSuccess: (data) => {
      // Invalidate the specific document query
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.document(data.translationId),
      });
    },
  });
}

/**
 * Hook to get document translation status
 *
 * @param translationId - Translation ID to check
 * @param enabled - Whether to enable polling
 */
export function useDocumentStatus(
  translationId: string | null,
  enabled = true
) {
  return useQuery<DocumentTranslationResponse, Error>({
    queryKey: TRANSLATION_QUERY_KEYS.document(translationId || ''),
    queryFn: () => translationApi.getDocumentStatus(translationId!),
    enabled: enabled && !!translationId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Stop polling when completed or failed
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
  });
}

/**
 * Hook to download translated document
 */
export function useDocumentDownload() {
  return useMutation<Blob, Error, string>({
    mutationFn: translationApi.downloadDocument,
  });
}

// ============================================================================
// Subtitle Translation Hooks
// ============================================================================

/**
 * Hook to upload a subtitle file
 *
 * @example
 * ```tsx
 * const { mutate: upload, isPending } = useSubtitleUpload();
 *
 * const handleUpload = (file: File) => {
 *   upload(file, {
 *     onSuccess: (data) => {
 *       setMovieContext(data.detectedContext);
 *       setSubtitles(data.subtitles);
 *     },
 *   });
 * };
 * ```
 */
export function useSubtitleUpload() {
  const queryClient = useQueryClient();

  return useMutation<SubtitleUploadResponse, Error, File>({
    mutationFn: translationApi.uploadSubtitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.subtitles(),
      });
    },
  });
}

/**
 * Hook to detect movie context from subtitle
 */
export function useDetectSubtitleContext() {
  return useMutation<MovieContext, Error, { fileId: string; fileName: string }>(
    {
      mutationFn: ({ fileId, fileName }) =>
        translationApi.detectSubtitleContext(fileId, fileName),
    }
  );
}

/**
 * Hook to translate subtitles
 */
export function useSubtitleTranslation() {
  const queryClient = useQueryClient();

  return useMutation<
    SubtitleTranslationResponse,
    Error,
    SubtitleTranslationRequest
  >({
    mutationFn: translationApi.translateSubtitle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.subtitle(data.translationId),
      });
    },
  });
}

/**
 * Hook to get subtitle translation status
 *
 * @param translationId - Translation ID to check
 * @param enabled - Whether to enable polling
 */
export function useSubtitleStatus(
  translationId: string | null,
  enabled = true
) {
  return useQuery<SubtitleTranslationResponse, Error>({
    queryKey: TRANSLATION_QUERY_KEYS.subtitle(translationId || ''),
    queryFn: () => translationApi.getSubtitleStatus(translationId!),
    enabled: enabled && !!translationId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 2000;
    },
  });
}

/**
 * Hook to export translated subtitles
 */
export function useSubtitleExport() {
  return useMutation<
    Blob,
    Error,
    { translationId: string; format?: 'srt' | 'vtt' | 'ass' }
  >({
    mutationFn: ({ translationId, format }) =>
      translationApi.exportSubtitle(translationId, format),
  });
}

// ============================================================================
// Common Translation Hooks
// ============================================================================

/**
 * Hook to get supported languages
 */
export function useSupportedLanguages() {
  return useQuery<LanguageCode[], Error>({
    queryKey: TRANSLATION_QUERY_KEYS.languages(),
    queryFn: translationApi.getSupportedLanguages,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
}

/**
 * Hook to estimate translation credits
 */
export function useEstimateCredits() {
  return useMutation<
    { credits: number; estimatedTime: string },
    Error,
    { wordCount: number; translationMode: string }
  >({
    mutationFn: ({ wordCount, translationMode }) =>
      translationApi.estimateCredits(wordCount, translationMode),
  });
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook to invalidate all translation queries
 */
export function useTranslationInvalidation() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.all,
      }),
    invalidateDocuments: () =>
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.documents(),
      }),
    invalidateSubtitles: () =>
      queryClient.invalidateQueries({
        queryKey: TRANSLATION_QUERY_KEYS.subtitles(),
      }),
  };
}

/**
 * Hook to prefetch translation data
 */
export function useTranslationPrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchLanguages: () =>
      queryClient.prefetchQuery({
        queryKey: TRANSLATION_QUERY_KEYS.languages(),
        queryFn: translationApi.getSupportedLanguages,
        staleTime: 24 * 60 * 60 * 1000,
      }),
  };
}
