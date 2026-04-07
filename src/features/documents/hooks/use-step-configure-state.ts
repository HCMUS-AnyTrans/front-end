'use client';

import type {
  CreditEstimateResponse,
  LanguageCode,
  ParsedFontsByGroup,
} from '../types';

interface UseStepConfigureStateOptions {
  srcLang: LanguageCode;
  tgtLang: LanguageCode;
  domainId: string;
  selectedDomainKey?: string | null;
  customDomain: string;
  estimate: CreditEstimateResponse | undefined;
  isEstimating: boolean;
  currentBalance?: number;
  fontsUsedByGroup: ParsedFontsByGroup;
  fontParseSupported: boolean | null;
  isCheckingFonts: boolean;
  isFontConfigurationApplicable: boolean;
  isLoading?: boolean;
}

export function useStepConfigureState({
  srcLang,
  tgtLang,
  domainId,
  selectedDomainKey,
  customDomain,
  estimate,
  isEstimating,
  currentBalance,
  fontsUsedByGroup,
  fontParseSupported,
  isCheckingFonts,
  isFontConfigurationApplicable,
  isLoading,
}: UseStepConfigureStateOptions) {
  const isSameLang = srcLang === tgtLang;
  const isDomainMissing = domainId.trim().length === 0;
  const isOtherDomainMissing =
    selectedDomainKey === 'other' && customDomain.trim().length === 0;
  const hasEstimate = !isEstimating && !!estimate;
  const isEstimatePending = isEstimating || !estimate;
  const hasParsedFonts = Object.keys(fontsUsedByGroup).length > 0;
  const isInsufficientCredits =
    hasEstimate &&
    typeof currentBalance === 'number' &&
    currentBalance < estimate.totalCredits;
  const missingCredits =
    isInsufficientCredits && typeof currentBalance === 'number'
      ? estimate.totalCredits - currentBalance
      : 0;
  const isFontCheckPending =
    isFontConfigurationApplicable &&
    hasParsedFonts &&
    fontParseSupported === true &&
    isCheckingFonts;
  const isStartDisabled =
    isSameLang ||
    isDomainMissing ||
    isOtherDomainMissing ||
    isLoading ||
    isEstimatePending ||
    isInsufficientCredits ||
    isFontCheckPending;

  return {
    isSameLang,
    isDomainMissing,
    isOtherDomainMissing,
    hasEstimate,
    isEstimatePending,
    hasParsedFonts,
    isInsufficientCredits,
    missingCredits,
    isFontCheckPending,
    isStartDisabled,
  };
}
