/**
 * Translation API layer
 *
 * Provides strongly-typed functions for document and subtitle translation endpoints.
 * All functions use the central HTTP client and return typed data.
 */

import { api } from '@/lib/api-client';
import { TRANSLATION_ENDPOINTS } from '@/config/api';
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
  SubtitleEntry,
  LanguageCode,
  FileStatus,
} from './types';

// ============================================================================
// Document Translation API
// ============================================================================

/**
 * Upload a document for translation
 *
 * @param file - File to upload
 * @returns Document file info and detected language
 * @throws ApiErrorException on failure
 */
export async function uploadDocument(
  file: File
): Promise<DocumentUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  // Note: For file uploads, we need to handle this differently
  // The api client expects JSON, so we'd need to extend it or use fetch directly
  return api.post<DocumentUploadResponse>(
    TRANSLATION_ENDPOINTS.DOCUMENT.UPLOAD,
    formData,
    true
  );
}

/**
 * Start document translation
 *
 * @param request - Translation request with file ID and settings
 * @returns Translation response with status
 * @throws ApiErrorException on failure
 */
export async function translateDocument(
  request: DocumentTranslationRequest
): Promise<DocumentTranslationResponse> {
  return api.post<DocumentTranslationResponse>(
    TRANSLATION_ENDPOINTS.DOCUMENT.TRANSLATE,
    request,
    true
  );
}

/**
 * Get document translation status
 *
 * @param translationId - Translation ID to check
 * @returns Current translation status and result
 * @throws ApiErrorException on failure
 */
export async function getDocumentStatus(
  translationId: string
): Promise<DocumentTranslationResponse> {
  return api.get<DocumentTranslationResponse>(
    `${TRANSLATION_ENDPOINTS.DOCUMENT.STATUS}/${translationId}`,
    true
  );
}

/**
 * Download translated document
 *
 * @param translationId - Translation ID to download
 * @returns Blob URL for download
 * @throws ApiErrorException on failure
 */
export async function downloadDocument(translationId: string): Promise<Blob> {
  const response = await fetch(
    `${TRANSLATION_ENDPOINTS.DOCUMENT.DOWNLOAD}/${translationId}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to download document');
  }

  return response.blob();
}

// ============================================================================
// Subtitle Translation API
// ============================================================================

/**
 * Upload a subtitle file for translation
 *
 * @param file - Subtitle file to upload
 * @returns Subtitle file info, detected context, and parsed subtitles
 * @throws ApiErrorException on failure
 */
export async function uploadSubtitle(
  file: File
): Promise<SubtitleUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return api.post<SubtitleUploadResponse>(
    TRANSLATION_ENDPOINTS.SUBTITLE.UPLOAD,
    formData,
    true
  );
}

/**
 * Detect movie/video context from subtitle content
 *
 * @param fileId - Uploaded file ID
 * @param fileName - Original file name for context hints
 * @returns Detected movie context
 * @throws ApiErrorException on failure
 */
export async function detectSubtitleContext(
  fileId: string,
  fileName: string
): Promise<MovieContext> {
  return api.post<MovieContext>(
    TRANSLATION_ENDPOINTS.SUBTITLE.DETECT_CONTEXT,
    { fileId, fileName },
    true
  );
}

/**
 * Start subtitle translation
 *
 * @param request - Translation request with file ID and settings
 * @returns Translation response with status and translated subtitles
 * @throws ApiErrorException on failure
 */
export async function translateSubtitle(
  request: SubtitleTranslationRequest
): Promise<SubtitleTranslationResponse> {
  return api.post<SubtitleTranslationResponse>(
    TRANSLATION_ENDPOINTS.SUBTITLE.TRANSLATE,
    request,
    true
  );
}

/**
 * Get subtitle translation status
 *
 * @param translationId - Translation ID to check
 * @returns Current translation status and result
 * @throws ApiErrorException on failure
 */
export async function getSubtitleStatus(
  translationId: string
): Promise<SubtitleTranslationResponse> {
  return api.get<SubtitleTranslationResponse>(
    `${TRANSLATION_ENDPOINTS.SUBTITLE.STATUS}/${translationId}`,
    true
  );
}

/**
 * Export translated subtitles
 *
 * @param translationId - Translation ID to export
 * @param format - Export format (srt, vtt, ass)
 * @returns Blob URL for download
 * @throws ApiErrorException on failure
 */
export async function exportSubtitle(
  translationId: string,
  format: 'srt' | 'vtt' | 'ass' = 'srt'
): Promise<Blob> {
  const response = await fetch(
    `${TRANSLATION_ENDPOINTS.SUBTITLE.EXPORT}/${translationId}?format=${format}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to export subtitle');
  }

  return response.blob();
}

// ============================================================================
// Common Translation API
// ============================================================================

/**
 * Get supported languages for translation
 *
 * @returns List of supported language codes
 * @throws ApiErrorException on failure
 */
export async function getSupportedLanguages(): Promise<LanguageCode[]> {
  return api.get<LanguageCode[]>(TRANSLATION_ENDPOINTS.LANGUAGES, false);
}

/**
 * Estimate translation credits
 *
 * @param wordCount - Number of words to translate
 * @param translationMode - Selected translation mode
 * @returns Estimated credits needed
 * @throws ApiErrorException on failure
 */
export async function estimateCredits(
  wordCount: number,
  translationMode: string
): Promise<{ credits: number; estimatedTime: string }> {
  return api.post<{ credits: number; estimatedTime: string }>(
    TRANSLATION_ENDPOINTS.ESTIMATE,
    { wordCount, translationMode },
    true
  );
}

// ============================================================================
// Polling Helpers
// ============================================================================

/**
 * Poll for document translation completion
 *
 * @param translationId - Translation ID to poll
 * @param onProgress - Callback for progress updates
 * @param interval - Polling interval in ms (default: 2000)
 * @param maxAttempts - Maximum polling attempts (default: 60)
 * @returns Final translation response
 */
export async function pollDocumentTranslation(
  translationId: string,
  onProgress?: (status: FileStatus) => void,
  interval = 2000,
  maxAttempts = 60
): Promise<DocumentTranslationResponse> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await getDocumentStatus(translationId);

    if (onProgress) {
      onProgress(response.status);
    }

    if (response.status === 'completed' || response.status === 'failed') {
      return response;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Translation timed out');
}

/**
 * Poll for subtitle translation completion
 *
 * @param translationId - Translation ID to poll
 * @param onProgress - Callback for progress updates
 * @param interval - Polling interval in ms (default: 2000)
 * @param maxAttempts - Maximum polling attempts (default: 60)
 * @returns Final translation response
 */
export async function pollSubtitleTranslation(
  translationId: string,
  onProgress?: (status: FileStatus) => void,
  interval = 2000,
  maxAttempts = 60
): Promise<SubtitleTranslationResponse> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await getSubtitleStatus(translationId);

    if (onProgress) {
      onProgress(response.status);
    }

    if (response.status === 'completed' || response.status === 'failed') {
      return response;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Translation timed out');
}
