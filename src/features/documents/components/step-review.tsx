'use client';

import { useTranslations } from 'next-intl';
import type {
  TranslationFlowStatus,
  TranslationJobResponse,
  UploadedFile,
} from '../types';
import type { LanguageCode } from '../types';
import {
  getIsStepReviewFinished,
  getStepReviewDisplayState,
} from '../utils/step-review-state';
import { StepReviewBottomBar } from './step-review-bottom-bar';
import { StepReviewFailedCard } from './step-review-failed-card';
import { StepReviewPreparingCard } from './step-review-preparing-card';
import { StepReviewSuccessCard } from './step-review-success-card';
import { StepReviewTranslatingCard } from './step-review-translating-card';
import { StepReviewUploadingCard } from './step-review-uploading-card';

// =============== TYPES ===============

interface StepReviewProps {
  file: UploadedFile;
  /** The multi-step flow status (uploading → confirming → creating → translating → succeeded/failed) */
  flowStatus: TranslationFlowStatus;
  /** Upload progress percentage (0-100) during the "uploading" phase */
  uploadProgress: number;
  /** Translation job data from polling (null until job is created) */
  jobData: TranslationJobResponse | null;
  /** Error message from any step */
  error: string | null;
  /** Source language code */
  srcLang: LanguageCode;
  /** Target language code */
  tgtLang: LanguageCode;
  onDownload: () => void;
  onPreview?: () => void;
  onReset: () => void;
  isDownloading?: boolean;
  canPreview?: boolean;
}

export function StepReview({
  file,
  flowStatus,
  uploadProgress,
  jobData,
  error,
  srcLang,
  tgtLang,
  onDownload,
  onPreview,
  onReset,
  isDownloading,
  canPreview,
}: StepReviewProps) {
  const t = useTranslations('documents.review');
  const tLang = useTranslations('documents.languages');
  const jobStatus = jobData?.status;
  const reviewState = getStepReviewDisplayState({ flowStatus, jobStatus });
  const isFinished = getIsStepReviewFinished({ flowStatus, jobStatus });

  return (
    <div className="flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-foreground">{t('title')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('document', { name: file.name })}
        </p>
      </div>

      <div className="flex-1">
        {reviewState === 'uploading' ? (
          <StepReviewUploadingCard progress={uploadProgress} t={t} />
        ) : null}

        {reviewState === 'preparing' ? <StepReviewPreparingCard t={t} /> : null}

        {reviewState === 'translating' ? (
          <StepReviewTranslatingCard t={t} />
        ) : null}

        {reviewState === 'succeeded' ? (
          <StepReviewSuccessCard
            file={file}
            jobData={jobData}
            srcLang={srcLang}
            tgtLang={tgtLang}
            onDownload={onDownload}
            onPreview={onPreview}
            isDownloading={isDownloading}
            canPreview={canPreview}
            t={t}
            tLang={tLang}
          />
        ) : null}

        {reviewState === 'failed' ? (
          <StepReviewFailedCard error={error} jobError={jobData?.error} t={t} />
        ) : null}
      </div>

      <StepReviewBottomBar isFinished={isFinished} onReset={onReset} t={t} />
    </div>
  );
}
