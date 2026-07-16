'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultConfig } from '../data';
import { useFontCheck } from './use-font-check';
import type {
  LanguageCode,
  ParsedFontsByGroup,
  TranslationConfig,
} from '../types';
import { LANGUAGE_CODE_TO_API_NAME } from '../types';
import {
  buildDefaultFontSelections,
  reconcileFontEnabledMap,
  reconcileFontSelections,
} from '../utils/document-font-config';
import { getFontConfigurationApplicable } from '../utils/document-wizard-selectors';

interface FontCheckContext {
  fileId: string | null;
  analysisFileId?: string | null;
  fileMime?: string | null;
  fontsUsedByGroup: ParsedFontsByGroup;
  fontParseSupported: boolean | null;
}

interface UseDocumentTranslationConfigOptions {
  domainsCount: number;
  isLoadingDomains: boolean;
  fontCheckContext: FontCheckContext;
  getDomainByKey: (key: string | null | undefined) => { id: string } | null;
}

export function useDocumentTranslationConfig({
  domainsCount,
  isLoadingDomains,
  fontCheckContext,
  getDomainByKey,
}: UseDocumentTranslationConfigOptions) {
  const [config, setConfig] = useState<TranslationConfig>(defaultConfig);
  const previousTargetLangRef = useRef<LanguageCode>(config.tgtLang);
  const isFontConfigurationEnabledForFlow = getFontConfigurationApplicable({
    fileMime: fontCheckContext.fileMime,
    pdfTranslationFlow: config.pdfTranslationFlow,
  });

  const { data: fontCheckState, isLoading: isCheckingFonts } = useFontCheck(
    fontCheckContext.fileId,
    fontCheckContext.analysisFileId && isFontConfigurationEnabledForFlow
      ? LANGUAGE_CODE_TO_API_NAME[config.tgtLang]
      : null,
    config.tgtLang,
    fontCheckContext.fontsUsedByGroup,
    fontCheckContext.fontParseSupported,
  );
  const fontCheckItems = useMemo(
    () => fontCheckState?.items ?? [],
    [fontCheckState?.items],
  );
  const fontCheckUnavailable = fontCheckState?.fontCheckUnavailable ?? false;

  const handleConfigChange = useCallback(
    (updates: Partial<TranslationConfig>) => {
      setConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  const handleFontSelectionChange = useCallback(
    (fromFont: string, toFont: string) => {
      setConfig((prev) => ({
        ...prev,
        fontSelections: {
          ...prev.fontSelections,
          [fromFont]: toFont,
        },
      }));
    },
    [],
  );

  const handleFontConfigEnabledChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      fontConfigEnabled: enabled,
    }));
  }, []);

  const handleKeepOriginalFontSizeChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      keepOriginalFontSize: enabled,
    }));
  }, []);

  const handlePdfTranslationFlowChange = useCallback(
    (flow: TranslationConfig['pdfTranslationFlow']) => {
      setConfig((prev) => ({
        ...prev,
        pdfTranslationFlow: flow,
      }));
    },
    [],
  );

  const handlePdfOutputFormatChange = useCallback(
    (format: TranslationConfig['pdfOutputFormat']) => {
      setConfig((prev) => ({
        ...prev,
        pdfOutputFormat: format,
      }));
    },
    [],
  );

  const handleFontEnabledChange = useCallback(
    (fromFont: string, enabled: boolean) => {
      setConfig((prev) => ({
        ...prev,
        fontEnabledMap: {
          ...prev.fontEnabledMap,
          [fromFont]: enabled,
        },
      }));
    },
    [],
  );

  useEffect(() => {
    const targetChanged = previousTargetLangRef.current !== config.tgtLang;

    setConfig((prev) => {
      if (fontCheckItems.length === 0) {
        if (
          !targetChanged ||
          (Object.keys(prev.fontSelections).length === 0 &&
            Object.keys(prev.fontEnabledMap).length === 0)
        ) {
          return prev;
        }

        return {
          ...prev,
          fontConfigEnabled: true,
          fontEnabledMap: {},
          fontSelections: {},
        };
      }

      const nextSelections = targetChanged
        ? buildDefaultFontSelections(fontCheckItems)
        : reconcileFontSelections(fontCheckItems, prev.fontSelections);
      const nextEnabledMap = reconcileFontEnabledMap(
        fontCheckItems,
        prev.fontEnabledMap,
      );

      const selectionsUnchanged =
        Object.keys(nextSelections).length ===
          Object.keys(prev.fontSelections).length &&
        Object.entries(nextSelections).every(
          ([key, value]) => prev.fontSelections[key] === value,
        );
      const enabledMapUnchanged =
        Object.keys(nextEnabledMap).length ===
          Object.keys(prev.fontEnabledMap).length &&
        Object.entries(nextEnabledMap).every(
          ([key, value]) => prev.fontEnabledMap[key] === value,
        );
      const nextFontConfigEnabled =
        targetChanged || !enabledMapUnchanged ? true : prev.fontConfigEnabled;

      if (
        selectionsUnchanged &&
        enabledMapUnchanged &&
        nextFontConfigEnabled === prev.fontConfigEnabled
      ) {
        return prev;
      }

      return {
        ...prev,
        fontConfigEnabled: nextFontConfigEnabled,
        fontEnabledMap: nextEnabledMap,
        fontSelections: nextSelections,
      };
    });

    previousTargetLangRef.current = config.tgtLang;
  }, [config.tgtLang, fontCheckItems]);

  useEffect(() => {
    if (config.domainId || isLoadingDomains || domainsCount === 0) {
      return;
    }

    const autoDomain = getDomainByKey('auto');

    if (!autoDomain) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig((prev) => {
      if (prev.domainId) {
        return prev;
      }

      return {
        ...prev,
        domainId: autoDomain.id,
      };
    });
  }, [config.domainId, domainsCount, getDomainByKey, isLoadingDomains]);

  const resetConfig = useCallback(() => {
    previousTargetLangRef.current = defaultConfig.tgtLang;
    setConfig(defaultConfig);
  }, []);

  return {
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
    handlePdfOutputFormatChange,
    handleFontEnabledChange,
    resetConfig,
  };
}
