import type { Glossary } from '@/features/glossary';
import type {
  CreditEstimateResponse,
  FileAnalysisEstimateModes,
  PdfTranslationFlow,
  TranslationFlowStatus,
  TranslationJobResponse,
} from '../types';

export type UploadPipelineStatus =
  | 'idle'
  | 'uploading'
  | 'confirming'
  | 'analyzing'
  | 'failed';

type TranslationPollConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export function getFontConfigurationApplicable(params: {
  fileMime?: string | null;
  pdfTranslationFlow: PdfTranslationFlow;
}) {
  return (
    params.fileMime !== 'application/pdf' ||
    params.pdfTranslationFlow === 'format_preserved'
  );
}

export function getTranslationPollInterval(params: {
  flowStatus: TranslationFlowStatus;
  socketConnectionState: TranslationPollConnectionState;
}): false | 3000 {
  return params.flowStatus === 'translating' &&
    params.socketConnectionState === 'connected'
    ? false
    : 3000;
}

export function getUploadPipelineStatus(
  flowStatus: TranslationFlowStatus,
): UploadPipelineStatus {
  switch (flowStatus) {
    case 'uploading':
    case 'confirming':
    case 'analyzing':
    case 'failed':
      return flowStatus;
    default:
      return 'idle';
  }
}

export function getSelectedEstimate(params: {
  fileMime?: string | null;
  estimate: CreditEstimateResponse | null;
  estimateModes: FileAnalysisEstimateModes | null;
  pdfTranslationFlow: PdfTranslationFlow;
}) {
  if (params.fileMime !== 'application/pdf' || !params.estimateModes) {
    return params.estimate ?? undefined;
  }

  return params.pdfTranslationFlow === 'non_format_preserved'
    ? params.estimateModes.non_format_preserved
    : params.estimateModes.format_preserved;
}

export function getActiveSelectedGlossaryId(params: {
  glossaryInputMode: 'none' | 'saved' | 'manual';
  selectedGlossaryId: string | null;
  visibleGlossaries: Glossary[];
}) {
  return params.glossaryInputMode === 'saved' &&
    params.selectedGlossaryId &&
    params.visibleGlossaries.some(
      (item) => item.id === params.selectedGlossaryId,
    )
    ? params.selectedGlossaryId
    : null;
}

export function getEffectiveFlowStatus(params: {
  flowStatus: TranslationFlowStatus;
  jobStatus?: TranslationJobResponse['status'];
}): TranslationFlowStatus {
  return params.jobStatus === 'succeeded'
    ? 'succeeded'
    : params.jobStatus === 'failed'
      ? 'failed'
      : params.flowStatus;
}
