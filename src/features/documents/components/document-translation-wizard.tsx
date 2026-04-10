'use client';

import { TranslationStepper } from './translation-stepper';
import { StepUpload } from './step-upload';
import { StepConfigure } from './step-configure';
import { StepReview } from './step-review';
import { useDocumentTranslationWizard } from '../hooks';

export function DocumentTranslationWizard() {
  const { step, uploadStepProps, configureStepProps, reviewStepProps } =
    useDocumentTranslationWizard();

  return (
    <div className="flex h-full flex-col">
      <TranslationStepper currentStep={step} className="mb-6" />
      <div className="flex-1">
        {step === 1 ? <StepUpload {...uploadStepProps} /> : null}
        {step === 2 ? <StepConfigure {...configureStepProps} /> : null}
        {step === 3 && reviewStepProps ? (
          <StepReview {...reviewStepProps} />
        ) : null}
      </div>
    </div>
  );
}
