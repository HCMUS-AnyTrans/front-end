'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  DOCUMENT_MAX_FILE_SIZE_BYTES,
  validateDocumentFile,
} from '@/shared/utils/document-upload';
import { useDocumentTranslationWizardData } from './use-document-translation-wizard-data';
import type { TranslationStep, UploadedFile } from '../types';
import { buildFontReplacements } from '../utils/document-font-config';
import { getUploadPipelineStatus } from '../utils/document-wizard-selectors';

export function useDocumentTranslationWizard() {
  const t = useTranslations('documents.upload');
  const router = useRouter();
  const locale = useLocale();

  const [step, setStep] = useState<TranslationStep>(1);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    activeSelectedGlossaryId,
    canPreview,
    config,
    domainOptions,
    download,
    effectiveFlowStatus,
    fileId,
    flowError,
    flowStatus,
    fontCheckItems,
    fontCheckUnavailable,
    fontFlowUnavailable,
    fontParseSupported,
    fontsUsedByGroup,
    getDomainById,
    glossaryInputMode,
    handleConfigChange,
    handleFontConfigEnabledChange,
    handleFontEnabledChange,
    handleFontSelectionChange,
    handleKeepOriginalFontSizeChange,
    handlePdfTranslationFlowChange,
    isCheckingFonts,
    isDownloading,
    isFontConfigurationEnabledForFlow,
    isFetchingGlossaries,
    isLoadingDomains,
    isLoadingGlossaries,
    isLoadingWallet,
    isPdfFile,
    jobData,
    resetConfig,
    resetFlow,
    selectedDomainKey,
    selectedEstimate,
    selectedGlossaryTerms,
    startTranslation,
    startUpload,
    uploadProgress,
    visibleGlossaries,
    wallet,
  } = useDocumentTranslationWizardData();

  const validateFile = useCallback(
    (selectedFile: File): string | null => {
      const validationResult = validateDocumentFile(selectedFile, {
        maxFileSizeBytes: DOCUMENT_MAX_FILE_SIZE_BYTES,
        checkMimeType: true,
        checkExtension: true,
      });

      if (validationResult === 'invalidType') {
        return t('errorUnsupported');
      }

      if (validationResult === 'tooLarge') {
        return t('errorTooLarge');
      }

      return null;
    },
    [t],
  );

  const goToStep = useCallback((nextStep: TranslationStep) => {
    setStep(nextStep);
  }, []);

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      resetFlow();

      const error = validateFile(selectedFile);
      if (error) {
        setFileError(error);
        setFile(null);
        return;
      }

      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        charCount: Math.max(1, Math.round(selectedFile.size / 4)),
        file: selectedFile,
      });
      setFileError(null);
    },
    [resetFlow, validateFile],
  );

  const handleFileRemove = useCallback(() => {
    resetFlow();
    setFile(null);
    setFileError(null);
  }, [resetFlow]);

  const handleUploadNext = useCallback(async () => {
    if (!file || fileError) {
      return;
    }

    try {
      const uploadedFileId = await startUpload(file.file);
      if (uploadedFileId) {
        goToStep(2);
      }
    } catch {
      // Upload errors are already captured in the flow state.
    }
  }, [file, fileError, goToStep, startUpload]);

  const handleConfigBack = useCallback(() => {
    goToStep(1);
  }, [goToStep]);

  const handleStartTranslation = useCallback(() => {
    if (!file || !fileId) {
      return;
    }

    const selectedDomain = getDomainById(config.domainId);

    if (!selectedDomain) {
      return;
    }

    goToStep(3);

    const usableGlossaryTerms = activeSelectedGlossaryId
      ? selectedGlossaryTerms
      : [];
    const fontReplacements = isFontConfigurationEnabledForFlow
      ? buildFontReplacements(
          fontCheckItems,
          config.fontSelections,
          config.fontConfigEnabled,
          config.fontEnabledMap,
        )
      : [];

    void startTranslation(
      {
        ...config,
        glossaryInputMode,
        keepOriginalFontSize: isFontConfigurationEnabledForFlow
          ? config.keepOriginalFontSize
          : false,
      },
      selectedDomain.key,
      usableGlossaryTerms,
      fontReplacements,
    );
  }, [
    activeSelectedGlossaryId,
    config,
    file,
    fileId,
    fontCheckItems,
    getDomainById,
    glossaryInputMode,
    goToStep,
    isFontConfigurationEnabledForFlow,
    selectedGlossaryTerms,
    startTranslation,
  ]);

  const handleDownload = useCallback(() => {
    const outputFileId = jobData?.output_file?.id;
    if (!outputFileId) {
      return;
    }

    const outputFileName =
      jobData?.output_file?.name || `translated-${file?.name || 'document'}`;
    download(outputFileId, outputFileName);
  }, [download, file, jobData]);

  const handlePreview = useCallback(() => {
    const previewJobId = jobData?.job_id;
    if (!previewJobId) {
      return;
    }

    router.push(
      `/${locale}/documents/preview?jobId=${encodeURIComponent(previewJobId)}`,
    );
  }, [jobData?.job_id, locale, router]);

  const handleReset = useCallback(() => {
    resetFlow();
    setStep(1);
    setFile(null);
    setFileError(null);
    resetConfig();
  }, [resetConfig, resetFlow]);

  const uploadStepProps = useMemo(
    () => ({
      file,
      error: fileError,
      isDragging,
      pipelineStatus: getUploadPipelineStatus(flowStatus),
      uploadError: flowError,
      onFileSelect: handleFileSelect,
      onFileRemove: handleFileRemove,
      onDragChange: setIsDragging,
      onNext: handleUploadNext,
    }),
    [
      file,
      fileError,
      flowError,
      flowStatus,
      handleFileRemove,
      handleFileSelect,
      handleUploadNext,
      isDragging,
    ],
  );

  const configureStepProps = useMemo(
    () => ({
      config: {
        ...config,
        glossaryInputMode,
        selectedGlossaryId: activeSelectedGlossaryId,
      },
      glossaries: visibleGlossaries,
      selectedGlossaryTerms,
      isLoadingGlossaries: isLoadingGlossaries || isFetchingGlossaries,
      estimate: selectedEstimate,
      isEstimating: false,
      estimateError: null,
      currentBalance: wallet?.balance,
      isLoadingBalance: isLoadingWallet,
      domainOptions,
      isPdfFile,
      isLoadingDomains,
      pdfTranslationFlow: config.pdfTranslationFlow,
      selectedDomainKey,
      fontsUsedByGroup,
      fontCheckItems,
      keepOriginalFontSize: config.keepOriginalFontSize,
      fontConfigEnabled: config.fontConfigEnabled,
      fontEnabledMap: config.fontEnabledMap,
      fontParseSupported,
      fontFlowUnavailable,
      fontCheckUnavailable,
      isCheckingFonts,
      isLoading: flowStatus === 'creating' || flowStatus === 'translating',
      onConfigChange: handleConfigChange,
      onKeepOriginalFontSizeChange: handleKeepOriginalFontSizeChange,
      onFontConfigEnabledChange: handleFontConfigEnabledChange,
      onFontEnabledChange: handleFontEnabledChange,
      onFontSelectionChange: handleFontSelectionChange,
      onPdfTranslationFlowChange: handlePdfTranslationFlowChange,
      onBack: handleConfigBack,
      onStart: handleStartTranslation,
    }),
    [
      activeSelectedGlossaryId,
      config,
      domainOptions,
      flowStatus,
      fontCheckItems,
      fontCheckUnavailable,
      fontFlowUnavailable,
      fontParseSupported,
      fontsUsedByGroup,
      glossaryInputMode,
      handleConfigBack,
      handleConfigChange,
      handleFontConfigEnabledChange,
      handleFontEnabledChange,
      handleFontSelectionChange,
      handleKeepOriginalFontSizeChange,
      handlePdfTranslationFlowChange,
      handleStartTranslation,
      isCheckingFonts,
      isFetchingGlossaries,
      isLoadingDomains,
      isLoadingGlossaries,
      isLoadingWallet,
      isPdfFile,
      selectedDomainKey,
      selectedEstimate,
      selectedGlossaryTerms,
      visibleGlossaries,
      wallet?.balance,
    ],
  );

  const reviewStepProps = useMemo(
    () =>
      file
        ? {
            file,
            flowStatus: effectiveFlowStatus,
            uploadProgress,
            jobData: jobData ?? null,
            error: flowError,
            srcLang: config.srcLang,
            tgtLang: config.tgtLang,
            isDownloading,
            canPreview,
            onDownload: handleDownload,
            onPreview: handlePreview,
            onReset: handleReset,
          }
        : null,
    [
      canPreview,
      config.srcLang,
      config.tgtLang,
      effectiveFlowStatus,
      file,
      flowError,
      handleDownload,
      handlePreview,
      handleReset,
      isDownloading,
      jobData,
      uploadProgress,
    ],
  );

  return {
    step,
    uploadStepProps,
    configureStepProps,
    reviewStepProps,
  };
}
