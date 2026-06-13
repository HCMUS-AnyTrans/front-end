'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  DOCUMENT_MAX_FILE_SIZE_BYTES,
  validateDocumentFile,
} from '@/shared/utils/document-upload';
import { useDocumentTranslationWizardData } from './use-document-translation-wizard-data';
import type { TranslationStep, UploadedFile } from '../types';
import { buildFontReplacements } from '../utils/document-font-config';
import { getUploadPipelineStatus } from '../utils/document-wizard-selectors';
import {
  languageCodeToApiName,
  useCreateTranslationTemplate,
} from '@/features/translation-templates';
import type { TranslationTemplatePayload } from '@/features/translation-templates';

export function useDocumentTranslationWizard() {
  const t = useTranslations('documents.upload');
  const tConfigure = useTranslations('documents.configure');
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
    docTones,
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
    isLoadingDocTones,
    isLoadingGlossaries,
    isLoadingTranslationTemplates,
    isLoadingWallet,
    isDocTonesError,
    isPdfFile,
    jobData,
    resetConfig,
    resetFlow,
    refetchDocTones,
    selectedDomainKey,
    selectedEstimate,
    selectedGlossaryTerms,
    startTranslation,
    startUpload,
    translationTemplates,
    uploadProgress,
    visibleGlossaries,
    wallet,
  } = useDocumentTranslationWizardData();
  const { createTemplateAsync, isCreating: isCreatingTemplate } =
    useCreateTranslationTemplate();

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

  const buildTemplatePayload = useCallback(
    (templateName: string): TranslationTemplatePayload | null => {
      const selectedDomain = getDomainById(config.domainId);

      if (!selectedDomain) {
        return null;
      }

      return {
        name: templateName,
        srcLang: languageCodeToApiName(config.srcLang),
        tgtLang: languageCodeToApiName(config.tgtLang),
        domainId: config.domainId,
        customizedDomain:
          selectedDomain.key === 'other' ? config.customDomain.trim() : '',
        docToneId: config.tone,
        pdfTranslationFlow: config.pdfTranslationFlow,
        keepOriginalFontSize: config.keepOriginalFontSize,
        customInstruction: config.customInstruction.trim() || undefined,
        globalContext: config.globalContext.trim() || undefined,
      };
    },
    [config, getDomainById],
  );

  const saveCurrentConfigAsTemplate = useCallback(async () => {
    const templateName = config.templateName.trim();
    if (!templateName) {
      toast.error(tConfigure('templateNameRequired'));
      return null;
    }

    const payload = buildTemplatePayload(templateName);
    if (!payload) {
      return null;
    }

    try {
      const createdTemplate = await createTemplateAsync(payload);
      handleConfigChange({
        templateId: createdTemplate.id,
        saveAsTemplate: false,
        templateName: createdTemplate.name,
      });
      toast.success(tConfigure('templateSaved'));
      return createdTemplate.id;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : tConfigure('templateSaveFailed'),
      );
      return null;
    }
  }, [
    buildTemplatePayload,
    config.templateName,
    createTemplateAsync,
    handleConfigChange,
    tConfigure,
  ]);

  const handleStartTranslation = useCallback(
    async (options?: {
      saveTemplateFirst?: boolean;
      omitTemplateId?: boolean;
    }) => {
      if (!file || !fileId) {
        return;
      }

      const selectedDomain = getDomainById(config.domainId);

      if (!selectedDomain) {
        return;
      }

      let templateId = options?.omitTemplateId ? null : config.templateId;

      if (options?.saveTemplateFirst) {
        const savedTemplateId = await saveCurrentConfigAsTemplate();
        if (!savedTemplateId) {
          return;
        }
        templateId = savedTemplateId;
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
          templateId,
          glossaryInputMode,
          keepOriginalFontSize: isFontConfigurationEnabledForFlow
            ? config.keepOriginalFontSize
            : false,
        },
        selectedDomain.key,
        usableGlossaryTerms,
        fontReplacements,
      );
    },
    [
      activeSelectedGlossaryId,
      config,
      file,
      fileId,
      fontCheckItems,
      getDomainById,
      glossaryInputMode,
      goToStep,
      isFontConfigurationEnabledForFlow,
      saveCurrentConfigAsTemplate,
      selectedGlossaryTerms,
      startTranslation,
    ],
  );

  const handleStartWithoutTemplate = useCallback(() => {
    void handleStartTranslation({ omitTemplateId: true });
  }, [handleStartTranslation]);

  const handleStartWithTemplateSave = useCallback(() => {
    void handleStartTranslation({ saveTemplateFirst: true });
  }, [handleStartTranslation]);

  const handleStartTranslationClick = useCallback(() => {
    void handleStartTranslation();
  }, [handleStartTranslation]);

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
      translationTemplates,
      isLoadingTranslationTemplates,
      selectedGlossaryTerms,
      isLoadingGlossaries: isLoadingGlossaries || isFetchingGlossaries,
      estimate: selectedEstimate,
      isEstimating: false,
      estimateError: null,
      currentBalance: wallet?.balance,
      isLoadingBalance: isLoadingWallet,
      domainOptions,
      docTones,
      isPdfFile,
      isLoadingDomains,
      isLoadingDocTones,
      isDocTonesError,
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
      isLoading:
        flowStatus === 'creating' ||
        flowStatus === 'translating' ||
        isCreatingTemplate,
      onConfigChange: handleConfigChange,
      onKeepOriginalFontSizeChange: handleKeepOriginalFontSizeChange,
      onFontConfigEnabledChange: handleFontConfigEnabledChange,
      onFontEnabledChange: handleFontEnabledChange,
      onFontSelectionChange: handleFontSelectionChange,
      onPdfTranslationFlowChange: handlePdfTranslationFlowChange,
      onRetryDocTones: refetchDocTones,
      onBack: handleConfigBack,
      onStart: handleStartTranslationClick,
      onStartWithoutTemplate: handleStartWithoutTemplate,
      onStartWithTemplateSave: handleStartWithTemplateSave,
    }),
    [
      activeSelectedGlossaryId,
      config,
      docTones,
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
      handleStartTranslationClick,
      handleStartWithoutTemplate,
      handleStartWithTemplateSave,
      isCheckingFonts,
      isCreatingTemplate,
      isFetchingGlossaries,
      isLoadingDomains,
      isLoadingDocTones,
      isLoadingGlossaries,
      isLoadingTranslationTemplates,
      isLoadingWallet,
      isDocTonesError,
      isPdfFile,
      refetchDocTones,
      selectedDomainKey,
      selectedEstimate,
      selectedGlossaryTerms,
      translationTemplates,
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
