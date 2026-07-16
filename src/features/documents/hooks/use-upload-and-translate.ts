'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import {
  requestDocUploadUrl,
  uploadFileToPresignedUrl,
  confirmFileUpload,
  createTranslationJob,
  getFileAnalysis,
} from '../api/documents.api';
import type {
  TranslationFlowStatus,
  CreateTranslationJobDto,
  TranslationConfig,
  CreditEstimateResponse,
  FileAnalysisEstimateModes,
  FileAnalysisResponse,
  FileResponse,
  FontReplacement,
  ParsedFontsByGroup,
} from '../types';
import { LANGUAGE_CODE_TO_API_NAME } from '../types';
import { extractErrorMessage } from './utils';
import { setActiveJobId } from '../store/translation.store';
import { walletKeys } from '@/lib/query-client';
import { buildUserGlossaryEntries } from '../utils/glossary-mode';

interface UploadAndTranslateState {
  flowStatus: TranslationFlowStatus;
  uploadProgress: number;
  fileId: string | null;
  estimate: CreditEstimateResponse | null;
  estimateModes: FileAnalysisEstimateModes | null;
  analysisFile: FileResponse | null;
  fontsUsedByGroup: ParsedFontsByGroup;
  fontParseSupported: boolean | null;
  fontFlowUnavailable: boolean;
  jobId: string | null;
  error: string | null;
}

interface UseUploadAndTranslateReturn extends UploadAndTranslateState {
  startUpload: (file: File) => Promise<string | null>;
  startTranslation: (
    config: TranslationConfig,
    selectedDomainKey?: string,
    glossaryTerms?: Array<{ srcTerm: string; tgtTerm: string }>,
    fontReplacements?: FontReplacement[],
  ) => Promise<void>;
  reset: () => void;
  /** Restore a previously started job (e.g. after navigating back to the page) */
  restoreJob: (jobId: string) => void;
}

const initialState: UploadAndTranslateState = {
  flowStatus: 'idle',
  uploadProgress: 0,
  fileId: null,
  estimate: null,
  estimateModes: null,
  analysisFile: null,
  fontsUsedByGroup: {},
  fontParseSupported: null,
  fontFlowUnavailable: false,
  jobId: null,
  error: null,
};

const ANALYSIS_POLL_INTERVAL = 5000;
const ANALYSIS_MAX_ATTEMPTS = 20;

function normalizeFontsUsed(value: unknown): ParsedFontsByGroup {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const grouped = value as Record<string, unknown>;
  const normalized: ParsedFontsByGroup = {};

  Object.entries(grouped).forEach(([group, fonts]) => {
    if (!Array.isArray(fonts)) {
      return;
    }

    const cleaned = fonts
      .map((font) => (typeof font === 'string' ? font.trim() : ''))
      .filter((font) => font.length > 0);

    if (cleaned.length > 0) {
      normalized[group] = cleaned;
    }
  });

  return normalized;
}

async function pollFileAnalysis(
  fileId: string,
  abortRef: React.RefObject<boolean>,
): Promise<FileAnalysisResponse> {
  for (let attempt = 0; attempt < ANALYSIS_MAX_ATTEMPTS; attempt++) {
    if (abortRef.current) {
      throw new Error('Aborted');
    }

    let result: FileAnalysisResponse | null = null;

    try {
      result = await getFileAnalysis(fileId);
    } catch (err) {
      if (attempt < ANALYSIS_MAX_ATTEMPTS - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, ANALYSIS_POLL_INTERVAL),
        );
      } else {
        throw err instanceof Error
          ? err
          : new Error(
              'Document analysis timed out. Please try again or upload a different file.',
            );
      }
    }

    if (!result) {
      continue;
    }

    if (result.status === 'pending') {
      if (attempt < ANALYSIS_MAX_ATTEMPTS - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, ANALYSIS_POLL_INTERVAL),
        );
        continue;
      }
      throw new Error(
        'Document analysis timed out. Please try again or upload a different file.',
      );
    }

    if (result.status === 'failed') {
      throw new Error(
        result.error ??
          'Document analysis failed. Please try again or upload a different file.',
      );
    }

    return result;
  }

  throw new Error(
    'Document analysis timed out. Please try again or upload a different file.',
  );
}

function buildJobDto(
  fileId: string,
  config: TranslationConfig,
  selectedDomainKey?: string,
  glossaryTerms: Array<{ srcTerm: string; tgtTerm: string }> = [],
  fontReplacements: FontReplacement[] = [],
): CreateTranslationJobDto {
  const isFontConfigurationApplicable =
    config.pdfTranslationFlow !== 'non_format_preserved';

  const dto: CreateTranslationJobDto = {
    file_id: fileId,
    src_lang: LANGUAGE_CODE_TO_API_NAME[config.srcLang],
    tgt_lang: LANGUAGE_CODE_TO_API_NAME[config.tgtLang],
    doc_tone_id: config.tone || undefined,
    domain_id: config.domainId || undefined,
  };

  if (selectedDomainKey === 'other' && config.customDomain.trim()) {
    dto.customized_domain = config.customDomain.trim();
  }

  const userGlossaryEntries = buildUserGlossaryEntries({
    glossaryInputMode: config.glossaryInputMode,
    manualTerms: config.manualTerms,
    glossaryTerms,
  });

  if (userGlossaryEntries.length > 0) {
    dto.user_glossary = userGlossaryEntries;
  }

  if (isFontConfigurationApplicable && fontReplacements.length > 0) {
    dto.font_replacements = fontReplacements;
  }

  dto.keep_original_font_size = config.keepOriginalFontSize;

  if (config.pdfTranslationFlow) {
    dto.pdf_translation_flow = config.pdfTranslationFlow;
  }

  if (config.pdfOutputFormat) {
    dto.pdf_output_format = config.pdfOutputFormat;
  }

  if (config.templateId) {
    dto.template_id = config.templateId;
  }

  if (config.customInstruction.trim()) {
    dto.custom_instruction = config.customInstruction.trim();
  }

  if (config.globalContext.trim()) {
    dto.global_context = config.globalContext.trim();
  }

  dto.use_system_glossary = config.useSystemGlossary;

  return dto;
}

export function useUploadAndTranslate(): UseUploadAndTranslateReturn {
  const queryClient = useQueryClient();
  const [state, setState] = useState<UploadAndTranslateState>(initialState);
  const abortRef = useRef(false);

  const reset = useCallback(() => {
    abortRef.current = true;
    setState(initialState);
    setActiveJobId(null);
  }, []);

  const restoreJob = useCallback((jobId: string) => {
    setState((prev) => ({
      ...prev,
      flowStatus: 'translating',
      jobId,
    }));
  }, []);

  const startUpload = useCallback(async (file: File) => {
    abortRef.current = false;

    let uploadFileId: string | null = null;

    try {
      setState((prev) => ({
        ...prev,
        flowStatus: 'uploading',
        uploadProgress: 0,
        fileId: null,
        estimate: null,
        estimateModes: null,
        analysisFile: null,
        fontsUsedByGroup: {},
        fontParseSupported: null,
        fontFlowUnavailable: false,
        jobId: null,
        error: null,
      }));

      const uploadResponse = await requestDocUploadUrl({
        file_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        file_type: 'doc',
      });

      uploadFileId = uploadResponse.file_id;

      if (abortRef.current) return null;

      await uploadFileToPresignedUrl(
        uploadResponse.upload_url,
        file,
        (percent) => {
          if (!abortRef.current) {
            setState((prev) => ({ ...prev, uploadProgress: percent }));
          }
        },
      );

      if (abortRef.current) return null;

      setState((prev) => ({ ...prev, flowStatus: 'confirming' }));

      await confirmFileUpload(uploadResponse.file_id, {
        status: 'uploaded',
      });

      if (abortRef.current) return null;

      setState((prev) => ({
        ...prev,
        flowStatus: 'analyzing',
        uploadProgress: 100,
        fileId: uploadResponse.file_id,
      }));

      const analysisResult = await pollFileAnalysis(
        uploadResponse.file_id,
        abortRef,
      );

      if (abortRef.current) return null;

      setState((prev) => ({
        ...prev,
        flowStatus: 'idle',
        estimate: analysisResult.estimate,
        estimateModes: analysisResult.estimate_modes ?? null,
        analysisFile: analysisResult.file,
        fontsUsedByGroup: normalizeFontsUsed(
          analysisResult.file.metadata?.fontsUsed,
        ),
        fontParseSupported:
          typeof analysisResult.file.metadata?.fontParseSupported === 'boolean'
            ? analysisResult.file.metadata.fontParseSupported
            : null,
        fontFlowUnavailable: false,
        error: null,
      }));

      return uploadResponse.file_id;
    } catch (err: unknown) {
      if (abortRef.current) return null;

      if (uploadFileId) {
        try {
          await confirmFileUpload(uploadFileId, { status: 'failed' });
        } catch {
          // Ignore cleanup failure and preserve the original upload error.
        }
      }

      const errorMessage = extractErrorMessage(err);

      setState((prev) => ({
        ...prev,
        flowStatus: 'failed',
        uploadProgress: 0,
        fileId: null,
        estimate: null,
        estimateModes: null,
        analysisFile: null,
        fontsUsedByGroup: {},
        fontParseSupported: null,
        fontFlowUnavailable: true,
        error: errorMessage,
      }));

      throw err;
    }
  }, []);

  const startTranslation = useCallback(
    async (
      config: TranslationConfig,
      selectedDomainKey?: string,
      glossaryTerms: Array<{ srcTerm: string; tgtTerm: string }> = [],
      fontReplacements: FontReplacement[] = [],
    ) => {
      abortRef.current = false;

      if (!state.fileId) {
        const errorMessage =
          'Please upload a document before starting translation';
        setState((prev) => ({
          ...prev,
          flowStatus: 'failed',
          error: errorMessage,
        }));
        throw new Error(errorMessage);
      }

      try {
        setState((prev) => ({ ...prev, flowStatus: 'creating' }));

        const jobDto = buildJobDto(
          state.fileId,
          config,
          selectedDomainKey,
          glossaryTerms,
          fontReplacements,
        );
        const idempotencyKey = `doc-${state.fileId}-${Date.now()}`;
        const jobResponse = await createTranslationJob(jobDto, idempotencyKey);

        if (abortRef.current) return;

        setActiveJobId(jobResponse.job_id);
        await queryClient.refetchQueries({ queryKey: walletKeys.all });
        setState((prev) => ({
          ...prev,
          flowStatus: 'translating',
          jobId: jobResponse.job_id,
          error: null,
        }));
      } catch (err: unknown) {
        if (abortRef.current) return;

        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage);

        setState((prev) => ({
          ...prev,
          flowStatus: 'failed',
          error: errorMessage,
        }));
      }
    },
    [queryClient, state.fileId],
  );

  return {
    ...state,
    startUpload,
    startTranslation,
    reset,
    restoreJob,
  };
}
