'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useLocale } from 'next-intl';
import { getDomainLabel, useDomains } from '@/features/domains';
import { getDefaultDocToneValue, useDocTones } from '@/features/doc-tones';
import { useGlossaries, useTerms } from '@/features/glossary';
import { useTranslationTemplates } from '@/features/translation-templates';
import { useWallet } from '@/features/dashboard/hooks';
import { useDocumentTranslationConfig } from './use-document-translation-config';
import { useDownloadFile } from './use-download-file';
import { useTranslationJob } from './use-translation-job';
import { useUploadAndTranslate } from './use-upload-and-translate';
import {
  getActiveJobId,
  useTranslationStore,
} from '../store/translation.store';
import { canPreviewTranslationJob } from '../utils/preview-capabilities';
import { deriveGlossaryInputMode } from '../utils/glossary-mode';
import {
  getActiveSelectedGlossaryId,
  getEffectiveFlowStatus,
  getSelectedEstimate,
  getTranslationPollInterval,
} from '../utils/document-wizard-selectors';

export function useDocumentTranslationWizardData() {
  const locale = useLocale();
  const {
    domains,
    getDomainById,
    getDomainByKey,
    isLoading: isLoadingDomains,
  } = useDomains();
  const {
    data: docTones = [],
    isLoading: isLoadingDocTones,
    isError: isDocTonesError,
    refetch: refetchDocTones,
  } = useDocTones();

  const {
    flowStatus,
    uploadProgress,
    fileId,
    estimate,
    estimateModes,
    analysisFile,
    fontsUsedByGroup,
    fontParseSupported,
    fontFlowUnavailable,
    jobId,
    error: flowError,
    startUpload,
    startTranslation,
    reset: resetFlow,
    restoreJob,
  } = useUploadAndTranslate();

  const socketConnectionState = useTranslationStore(
    (state) => state.connectionState,
  );
  const initialStoreActiveJobIdRef = useRef(getActiveJobId());

  useEffect(() => {
    if (initialStoreActiveJobIdRef.current && !jobId) {
      restoreJob(initialStoreActiveJobIdRef.current);
    }
  }, [jobId, restoreJob]);

  const translationPollInterval = getTranslationPollInterval({
    flowStatus,
    socketConnectionState,
  });

  const { data: jobData } = useTranslationJob(jobId, {
    enabled: flowStatus === 'translating',
    pollInterval: translationPollInterval,
  });

  const { download, isDownloading } = useDownloadFile();
  const { wallet, isLoading: isLoadingWallet } = useWallet();
  const {
    templates: translationTemplates = [],
    isLoading: isLoadingTranslationTemplates,
    isFetching: isFetchingTranslationTemplates,
  } = useTranslationTemplates({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'desc' });

  const {
    config,
    fontCheckItems,
    fontCheckUnavailable,
    isCheckingFonts,
    isFontConfigurationEnabledForFlow,
    handleConfigChange,
    handleFontSelectionChange,
    handleFontConfigEnabledChange,
    handleKeepOriginalFontSizeChange,
    handlePdfTranslationFlowChange,
    handleFontEnabledChange,
    resetConfig,
  } = useDocumentTranslationConfig({
    domainsCount: domains.length,
    isLoadingDomains,
    fontCheckContext: {
      fileId,
      analysisFileId: analysisFile?.id,
      fileMime: analysisFile?.mime,
      fontsUsedByGroup,
      fontParseSupported,
    },
    getDomainByKey,
  });

  const selectedDomain = useMemo(
    () => getDomainById(config.domainId),
    [config.domainId, getDomainById],
  );

  const domainOptions = useMemo(
    () =>
      domains.map((domain) => ({
        id: domain.id,
        key: domain.key,
        label: getDomainLabel(domain, locale),
        icon: domain.icon,
      })),
    [domains, locale],
  );

  useEffect(() => {
    if (docTones.length === 0) return;
    if (docTones.some((tone) => tone.value === config.tone)) return;

    const defaultDocTone = getDefaultDocToneValue(docTones);
    if (defaultDocTone && defaultDocTone !== config.tone) {
      handleConfigChange({ tone: defaultDocTone });
    }
  }, [config.tone, docTones, handleConfigChange]);

  const glossaryFilters = useMemo(
    () => ({
      page: 1,
      limit: 100,
      srcLang: config.srcLang,
      tgtLang: config.tgtLang,
      ...(selectedDomain ? { domainId: selectedDomain.id } : {}),
    }),
    [config.srcLang, config.tgtLang, selectedDomain],
  );

  const {
    glossaries = [],
    isLoading: isLoadingGlossaries,
    isFetching: isFetchingGlossaries,
  } = useGlossaries(glossaryFilters);

  const visibleGlossaries = useMemo(
    () => (isFetchingGlossaries ? [] : glossaries),
    [glossaries, isFetchingGlossaries],
  );
  const glossaryInputMode = deriveGlossaryInputMode(config);

  const activeSelectedGlossaryId = getActiveSelectedGlossaryId({
    glossaryInputMode,
    selectedGlossaryId: config.selectedGlossaryId,
    visibleGlossaries,
  });

  const { terms: selectedGlossaryTerms = [] } = useTerms(
    activeSelectedGlossaryId,
    {
      page: 1,
      limit: 100,
      sortBy: 'srcTerm',
      sortOrder: 'asc',
    },
  );

  const selectedEstimate = useMemo(
    () =>
      getSelectedEstimate({
        fileMime: analysisFile?.mime,
        estimate,
        estimateModes,
        pdfTranslationFlow: config.pdfTranslationFlow,
      }),
    [analysisFile?.mime, config.pdfTranslationFlow, estimate, estimateModes],
  );

  const effectiveFlowStatus = getEffectiveFlowStatus({
    flowStatus,
    jobStatus: jobData?.status,
  });
  const isPdfFile = analysisFile?.mime === 'application/pdf';

  const canPreview = useMemo(
    () =>
      canPreviewTranslationJob({
        inputFile: jobData?.input_file,
        outputFile: jobData?.output_file,
      }),
    [jobData?.input_file, jobData?.output_file],
  );

  return {
    activeSelectedGlossaryId,
    analysisFile,
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
    isLoadingDomains,
    isLoadingDocTones,
    isLoadingGlossaries,
    isLoadingTranslationTemplates:
      isLoadingTranslationTemplates || isFetchingTranslationTemplates,
    isLoadingWallet,
    isDocTonesError,
    isPdfFile,
    isFetchingGlossaries,
    jobData,
    resetConfig,
    resetFlow,
    refetchDocTones,
    selectedDomainKey: selectedDomain?.key ?? null,
    selectedEstimate,
    selectedGlossaryTerms,
    startTranslation,
    startUpload,
    translationTemplates,
    uploadProgress,
    visibleGlossaries,
    wallet,
  };
}
