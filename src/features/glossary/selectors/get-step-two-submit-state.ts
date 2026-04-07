import type { GlossarySourceType } from '../data';

type StepTwoState = {
  submitDisabled: boolean;
  requiresTemplate?: boolean;
  requiresDocument?: boolean;
};

type GetStepTwoSubmitStateParams = {
  sourceType: GlossarySourceType;
  stepTwoState: StepTwoState;
  selectedTemplateId: string | null;
  documentFiles: File[];
  domain: string;
  customizedDomain?: string;
  isPricePending: boolean;
  isPriceUnavailable: boolean;
  isInsufficientCredits: boolean;
};

export function getStepTwoSubmitState({
  sourceType,
  stepTwoState,
  selectedTemplateId,
  documentFiles,
  domain,
  customizedDomain,
  isPricePending,
  isPriceUnavailable,
  isInsufficientCredits,
}: GetStepTwoSubmitStateParams) {
  const requiresTemplate =
    Boolean(stepTwoState.requiresTemplate) && !selectedTemplateId;

  const requiresDocument =
    Boolean(stepTwoState.requiresDocument) && documentFiles.length === 0;

  const requiresCustomDomain =
    sourceType === 'document' &&
    domain === 'other' &&
    !customizedDomain?.trim();

  return {
    disabled:
      stepTwoState.submitDisabled ||
      requiresTemplate ||
      requiresDocument ||
      requiresCustomDomain ||
      isPricePending ||
      isPriceUnavailable ||
      isInsufficientCredits,
    requiresTemplate,
    requiresDocument,
    requiresCustomDomain,
    isPricePending,
    isPriceUnavailable,
    isInsufficientCredits,
  };
}
