/**
 * Translation feature types
 *
 * Contains all TypeScript definitions for document and subtitle translation.
 * Consolidates types from src/types/translation.ts and components/Translation/shared/types.ts
 */

import type { ComponentType } from 'react';

// ============================================================================
// Common Translation Types
// ============================================================================

/**
 * Translation workflow steps
 */
export type TranslationStep = 'upload' | 'configure' | 'review';

/**
 * Step definition for UI rendering
 */
export interface StepDef {
  number: number;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * File processing status
 */
export type FileStatus = 'uploaded' | 'processing' | 'completed' | 'failed';

/**
 * Translation modes available
 */
export type TranslationMode =
  | 'context-aware'
  | 'literal'
  | 'creative'
  | 'formal';

/**
 * Supported language codes
 */
export type LanguageCode =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Japanese'
  | 'Chinese'
  | 'Korean'
  | 'Vietnamese'
  | 'Thai'
  | 'Indonesian'
  | 'Portuguese'
  | 'Russian'
  | 'Arabic'
  | 'Hindi';

// ============================================================================
// Document Translation Types
// ============================================================================

/**
 * Uploaded document file information
 */
export interface DocumentFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  wordCount: number;
  pageCount: number;
  status: FileStatus;
}

/**
 * Document translation request payload
 */
export interface DocumentTranslationRequest {
  fileId: string;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  translationMode: TranslationMode;
  preserveFormatting?: boolean;
  glossaryId?: string;
}

/**
 * Document translation response
 */
export interface DocumentTranslationResponse {
  translationId: string;
  status: FileStatus;
  originalText?: string;
  translatedText?: string;
  wordCount: number;
  estimatedCredits: number;
  completedAt?: string;
}

/**
 * Document upload response
 */
export interface DocumentUploadResponse {
  file: DocumentFile;
  detectedLanguage?: LanguageCode;
}

// ============================================================================
// Subtitle Translation Types
// ============================================================================

/**
 * Uploaded subtitle file information
 */
export interface SubtitleFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  duration: string;
  language: string;
  subtitleCount: number;
  status: FileStatus;
}

/**
 * Movie/Video context detected from subtitle
 */
export interface MovieContext {
  title: string;
  year: string;
  season?: string;
  episode?: string;
  genre: string[];
  director?: string;
  cast: string[];
  plot: string;
  confidence: number;
  sourceType: 'movie' | 'tv_show' | 'documentary' | 'other';
}

/**
 * Individual subtitle entry
 */
export interface SubtitleEntry {
  id: string;
  startTime: string;
  endTime: string;
  originalText: string;
  translatedText: string;
  speaker?: string;
  context?: string;
  isEdited: boolean;
}

/**
 * Subtitle translation request payload
 */
export interface SubtitleTranslationRequest {
  fileId: string;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  translationMode: TranslationMode;
  movieContext?: MovieContext;
  preserveTiming?: boolean;
}

/**
 * Subtitle translation response
 */
export interface SubtitleTranslationResponse {
  translationId: string;
  status: FileStatus;
  subtitles: SubtitleEntry[];
  estimatedCredits: number;
  completedAt?: string;
}

/**
 * Subtitle upload response
 */
export interface SubtitleUploadResponse {
  file: SubtitleFile;
  detectedContext?: MovieContext;
  subtitles: SubtitleEntry[];
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Translation settings card props
 */
export interface TranslationSettingsProps {
  sourceLanguage: string;
  targetLanguage: string;
  translationMode: string;
  onChangeSource: (value: string) => void;
  onChangeTarget: (value: string) => void;
  onChangeMode: (value: string) => void;
  sourceLanguageOptions?: LanguageCode[];
  targetLanguageOptions?: LanguageCode[];
}

/**
 * Configure action buttons props
 */
export interface ConfigureActionButtonsProps {
  onBack: () => void;
  onTranslate: () => void;
  isProcessing: boolean;
  disabled?: boolean;
  translateButtonText?: string;
  processingText?: string;
  backButtonText?: string;
}

// ============================================================================
// Translation State Types
// ============================================================================

/**
 * Document translation state
 */
export interface DocumentTranslationState {
  currentStep: TranslationStep;
  uploadedFile: DocumentFile | null;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  translationMode: TranslationMode;
  isProcessing: boolean;
  originalText: string;
  translatedText: string;
  error: string | null;
}

/**
 * Subtitle translation state
 */
export interface SubtitleTranslationState {
  currentStep: TranslationStep;
  uploadedFiles: SubtitleFile[];
  selectedFile: SubtitleFile | null;
  movieContext: MovieContext | null;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  translationMode: TranslationMode;
  isProcessing: boolean;
  originalSubtitles: SubtitleEntry[];
  translatedSubtitles: SubtitleEntry[];
  error: string | null;
}

// ============================================================================
// Query Keys
// ============================================================================

export const TRANSLATION_QUERY_KEYS = {
  all: ['translation'] as const,
  documents: () => [...TRANSLATION_QUERY_KEYS.all, 'documents'] as const,
  document: (id: string) =>
    [...TRANSLATION_QUERY_KEYS.documents(), id] as const,
  subtitles: () => [...TRANSLATION_QUERY_KEYS.all, 'subtitles'] as const,
  subtitle: (id: string) =>
    [...TRANSLATION_QUERY_KEYS.subtitles(), id] as const,
  languages: () => [...TRANSLATION_QUERY_KEYS.all, 'languages'] as const,
} as const;

// ============================================================================
// Constants
// ============================================================================

export const SUPPORTED_DOCUMENT_FORMATS = [
  'docx',
  'doc',
  'pdf',
  'txt',
  'rtf',
  'odt',
  'xlsx',
  'pptx',
] as const;

export const SUPPORTED_SUBTITLE_FORMATS = [
  'srt',
  'vtt',
  'ass',
  'ssa',
  'sub',
] as const;

export const TRANSLATION_MODES: {
  value: TranslationMode;
  labelKey: string;
  descriptionKey: string;
}[] = [
  {
    value: 'context-aware',
    labelKey: 'modes.contextAware.label',
    descriptionKey: 'modes.contextAware.description',
  },
  {
    value: 'literal',
    labelKey: 'modes.literal.label',
    descriptionKey: 'modes.literal.description',
  },
  {
    value: 'creative',
    labelKey: 'modes.creative.label',
    descriptionKey: 'modes.creative.description',
  },
  {
    value: 'formal',
    labelKey: 'modes.formal.label',
    descriptionKey: 'modes.formal.description',
  },
];

export const DEFAULT_SOURCE_LANGUAGE: LanguageCode = 'English';
export const DEFAULT_TARGET_LANGUAGE: LanguageCode = 'Vietnamese';
export const DEFAULT_TRANSLATION_MODE: TranslationMode = 'context-aware';
