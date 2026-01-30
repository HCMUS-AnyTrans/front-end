/**
 * Translation feature exports
 *
 * Central export point for all translation-related modules.
 * Import from this file for a clean API:
 *
 * @example
 * ```tsx
 * import {
 *   useDocumentTranslation,
 *   useDocumentTranslationStore,
 *   type DocumentFile,
 *   translationApi,
 * } from '@/features/translation';
 * ```
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // Common types
  TranslationStep,
  StepDef,
  FileStatus,
  TranslationMode,
  LanguageCode,
  // Document types
  DocumentFile,
  DocumentTranslationRequest,
  DocumentTranslationResponse,
  DocumentUploadResponse,
  DocumentTranslationState,
  // Subtitle types
  SubtitleFile,
  SubtitleTranslationRequest,
  SubtitleTranslationResponse,
  SubtitleUploadResponse,
  SubtitleTranslationState,
  MovieContext,
  SubtitleEntry,
  // Component props
  TranslationSettingsProps,
  ConfigureActionButtonsProps,
} from './types';

export {
  // Query keys
  TRANSLATION_QUERY_KEYS,
  // Constants
  SUPPORTED_DOCUMENT_FORMATS,
  SUPPORTED_SUBTITLE_FORMATS,
  TRANSLATION_MODES,
  DEFAULT_SOURCE_LANGUAGE,
  DEFAULT_TARGET_LANGUAGE,
  DEFAULT_TRANSLATION_MODE,
} from './types';

// ============================================================================
// API Functions
// ============================================================================

export * as translationApi from './api';

// Document API
export {
  uploadDocument,
  translateDocument,
  getDocumentStatus,
  downloadDocument,
  pollDocumentTranslation,
} from './api';

// Subtitle API
export {
  uploadSubtitle,
  detectSubtitleContext,
  translateSubtitle,
  getSubtitleStatus,
  exportSubtitle,
  pollSubtitleTranslation,
} from './api';

// Common API
export { getSupportedLanguages, estimateCredits } from './api';

// ============================================================================
// Hooks
// ============================================================================

// Document hooks
export {
  useDocumentUpload,
  useDocumentTranslation,
  useDocumentStatus,
  useDocumentDownload,
} from './hooks';

// Subtitle hooks
export {
  useSubtitleUpload,
  useDetectSubtitleContext,
  useSubtitleTranslation,
  useSubtitleStatus,
  useSubtitleExport,
} from './hooks';

// Common hooks
export {
  useSupportedLanguages,
  useEstimateCredits,
  useTranslationInvalidation,
  useTranslationPrefetch,
} from './hooks';

// ============================================================================
// Stores
// ============================================================================

export {
  // Document store
  useDocumentTranslationStore,
  // Subtitle store
  useSubtitleTranslationStore,
  // Selectors
  selectDocumentStep,
  selectDocumentFile,
  selectDocumentSettings,
  selectDocumentProcessing,
  selectDocumentResult,
  selectSubtitleStep,
  selectSubtitleFiles,
  selectSelectedSubtitleFile,
  selectMovieContext,
  selectSubtitleSettings,
  selectSubtitleProcessing,
  selectSubtitles,
} from './store';
