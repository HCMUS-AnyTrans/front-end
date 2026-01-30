/**
 * Translation Zustand stores
 *
 * Manages local state for document and subtitle translation workflows.
 * Uses Zustand for lightweight, performant state management.
 */

import { create } from 'zustand';
import type {
  TranslationStep,
  TranslationMode,
  LanguageCode,
  DocumentFile,
  SubtitleFile,
  MovieContext,
  SubtitleEntry,
  DocumentTranslationState,
  SubtitleTranslationState,
} from './types';
import {
  DEFAULT_SOURCE_LANGUAGE,
  DEFAULT_TARGET_LANGUAGE,
  DEFAULT_TRANSLATION_MODE,
} from './types';

// ============================================================================
// Document Translation Store
// ============================================================================

interface DocumentTranslationActions {
  // Step navigation
  setStep: (step: TranslationStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // File management
  setUploadedFile: (file: DocumentFile | null) => void;
  clearFile: () => void;

  // Settings
  setSourceLanguage: (lang: LanguageCode) => void;
  setTargetLanguage: (lang: LanguageCode) => void;
  setTranslationMode: (mode: TranslationMode) => void;

  // Translation
  setProcessing: (processing: boolean) => void;
  setTranslationResult: (original: string, translated: string) => void;
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

type DocumentTranslationStore = DocumentTranslationState &
  DocumentTranslationActions;

const initialDocumentState: DocumentTranslationState = {
  currentStep: 'upload',
  uploadedFile: null,
  sourceLanguage: DEFAULT_SOURCE_LANGUAGE,
  targetLanguage: DEFAULT_TARGET_LANGUAGE,
  translationMode: DEFAULT_TRANSLATION_MODE,
  isProcessing: false,
  originalText: '',
  translatedText: '',
  error: null,
};

export const useDocumentTranslationStore = create<DocumentTranslationStore>(
  (set, get) => ({
    ...initialDocumentState,

    // Step navigation
    setStep: (step) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep } = get();
      const steps: TranslationStep[] = ['upload', 'configure', 'review'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        set({ currentStep: steps[currentIndex + 1] });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      const steps: TranslationStep[] = ['upload', 'configure', 'review'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        set({ currentStep: steps[currentIndex - 1] });
      }
    },

    // File management
    setUploadedFile: (file) => set({ uploadedFile: file }),
    clearFile: () => set({ uploadedFile: null }),

    // Settings
    setSourceLanguage: (lang) => set({ sourceLanguage: lang }),
    setTargetLanguage: (lang) => set({ targetLanguage: lang }),
    setTranslationMode: (mode) => set({ translationMode: mode }),

    // Translation
    setProcessing: (processing) => set({ isProcessing: processing }),
    setTranslationResult: (original, translated) =>
      set({ originalText: original, translatedText: translated }),
    setError: (error) => set({ error }),

    // Reset
    reset: () => set(initialDocumentState),
  })
);

// ============================================================================
// Subtitle Translation Store
// ============================================================================

interface SubtitleTranslationActions {
  // Step navigation
  setStep: (step: TranslationStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // File management
  addUploadedFile: (file: SubtitleFile) => void;
  removeUploadedFile: (fileId: string) => void;
  setSelectedFile: (file: SubtitleFile | null) => void;
  clearFiles: () => void;

  // Context
  setMovieContext: (context: MovieContext | null) => void;

  // Settings
  setSourceLanguage: (lang: LanguageCode) => void;
  setTargetLanguage: (lang: LanguageCode) => void;
  setTranslationMode: (mode: TranslationMode) => void;

  // Subtitles
  setOriginalSubtitles: (subtitles: SubtitleEntry[]) => void;
  setTranslatedSubtitles: (subtitles: SubtitleEntry[]) => void;
  updateSubtitleEntry: (id: string, translatedText: string) => void;

  // Translation
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

type SubtitleTranslationStore = SubtitleTranslationState &
  SubtitleTranslationActions;

const initialSubtitleState: SubtitleTranslationState = {
  currentStep: 'upload',
  uploadedFiles: [],
  selectedFile: null,
  movieContext: null,
  sourceLanguage: DEFAULT_SOURCE_LANGUAGE,
  targetLanguage: DEFAULT_TARGET_LANGUAGE,
  translationMode: DEFAULT_TRANSLATION_MODE,
  isProcessing: false,
  originalSubtitles: [],
  translatedSubtitles: [],
  error: null,
};

export const useSubtitleTranslationStore = create<SubtitleTranslationStore>(
  (set, get) => ({
    ...initialSubtitleState,

    // Step navigation
    setStep: (step) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep } = get();
      const steps: TranslationStep[] = ['upload', 'configure', 'review'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        set({ currentStep: steps[currentIndex + 1] });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      const steps: TranslationStep[] = ['upload', 'configure', 'review'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        set({ currentStep: steps[currentIndex - 1] });
      }
    },

    // File management
    addUploadedFile: (file) =>
      set((state) => ({
        uploadedFiles: [...state.uploadedFiles, file],
      })),

    removeUploadedFile: (fileId) =>
      set((state) => ({
        uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileId),
        selectedFile:
          state.selectedFile?.id === fileId ? null : state.selectedFile,
      })),

    setSelectedFile: (file) => set({ selectedFile: file }),
    clearFiles: () => set({ uploadedFiles: [], selectedFile: null }),

    // Context
    setMovieContext: (context) => set({ movieContext: context }),

    // Settings
    setSourceLanguage: (lang) => set({ sourceLanguage: lang }),
    setTargetLanguage: (lang) => set({ targetLanguage: lang }),
    setTranslationMode: (mode) => set({ translationMode: mode }),

    // Subtitles
    setOriginalSubtitles: (subtitles) => set({ originalSubtitles: subtitles }),
    setTranslatedSubtitles: (subtitles) =>
      set({ translatedSubtitles: subtitles }),

    updateSubtitleEntry: (id, translatedText) =>
      set((state) => ({
        translatedSubtitles: state.translatedSubtitles.map((sub) =>
          sub.id === id ? { ...sub, translatedText, isEdited: true } : sub
        ),
      })),

    // Translation
    setProcessing: (processing) => set({ isProcessing: processing }),
    setError: (error) => set({ error }),

    // Reset
    reset: () => set(initialSubtitleState),
  })
);

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

// Document selectors
export const selectDocumentStep = (state: DocumentTranslationStore) =>
  state.currentStep;
export const selectDocumentFile = (state: DocumentTranslationStore) =>
  state.uploadedFile;
export const selectDocumentSettings = (state: DocumentTranslationStore) => ({
  sourceLanguage: state.sourceLanguage,
  targetLanguage: state.targetLanguage,
  translationMode: state.translationMode,
});
export const selectDocumentProcessing = (state: DocumentTranslationStore) =>
  state.isProcessing;
export const selectDocumentResult = (state: DocumentTranslationStore) => ({
  originalText: state.originalText,
  translatedText: state.translatedText,
});

// Subtitle selectors
export const selectSubtitleStep = (state: SubtitleTranslationStore) =>
  state.currentStep;
export const selectSubtitleFiles = (state: SubtitleTranslationStore) =>
  state.uploadedFiles;
export const selectSelectedSubtitleFile = (state: SubtitleTranslationStore) =>
  state.selectedFile;
export const selectMovieContext = (state: SubtitleTranslationStore) =>
  state.movieContext;
export const selectSubtitleSettings = (state: SubtitleTranslationStore) => ({
  sourceLanguage: state.sourceLanguage,
  targetLanguage: state.targetLanguage,
  translationMode: state.translationMode,
});
export const selectSubtitleProcessing = (state: SubtitleTranslationStore) =>
  state.isProcessing;
export const selectSubtitles = (state: SubtitleTranslationStore) => ({
  original: state.originalSubtitles,
  translated: state.translatedSubtitles,
});
