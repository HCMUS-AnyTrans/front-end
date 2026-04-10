import type { TranslationFlowStatus, TranslationJobResponse } from '../types';

export type StepReviewDisplayState =
  | 'uploading'
  | 'preparing'
  | 'translating'
  | 'succeeded'
  | 'failed';

export function getStepReviewDisplayState(params: {
  flowStatus: TranslationFlowStatus;
  jobStatus?: TranslationJobResponse['status'];
}): StepReviewDisplayState | null {
  const { flowStatus, jobStatus } = params;

  if (flowStatus === 'uploading') {
    return 'uploading';
  }

  if (flowStatus === 'confirming' || flowStatus === 'creating') {
    return 'preparing';
  }

  if (
    flowStatus === 'translating' &&
    (jobStatus === 'pending' || jobStatus === 'processing' || !jobStatus)
  ) {
    return 'translating';
  }

  if (flowStatus === 'succeeded' || jobStatus === 'succeeded') {
    return 'succeeded';
  }

  if (flowStatus === 'failed' || jobStatus === 'failed') {
    return 'failed';
  }

  return null;
}

export function getIsStepReviewFinished(params: {
  flowStatus: TranslationFlowStatus;
  jobStatus?: TranslationJobResponse['status'];
}) {
  return (
    params.flowStatus === 'succeeded' ||
    params.flowStatus === 'failed' ||
    params.jobStatus === 'succeeded' ||
    params.jobStatus === 'failed'
  );
}
