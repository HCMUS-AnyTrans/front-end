'use client';

import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { createGlossarySchema, type CreateGlossaryFormValues } from '../data';
import { getCreateGlossaryStepTwoState } from '../data';
import { CreateGlossaryStepOne } from './create-glossary-step-one';
import { CreateGlossaryStepTwo } from './create-glossary-step-two';
import { CreateGlossaryDialogFooter } from './create-glossary-dialog-footer';
import { useCreateGlossaryBySource as useCreateGlossaryBySourceHook } from '../hooks';
import { useCreateGlossaryFlow } from '../hooks/use-create-glossary-flow';
import { useDocumentCreditState } from '../hooks/use-document-credit-state';
import { getStepTwoSubmitState } from '../selectors/get-step-two-submit-state';

interface CreateGlossaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGlossaryDialog({
  open,
  onOpenChange,
}: CreateGlossaryDialogProps) {
  const t = useTranslations('glossary');
  const {
    step,
    setStep,
    sourceType,
    changeSourceType,
    selectedTemplateId,
    setSelectedTemplateId,
    documentFiles,
    setDocumentFiles,
    reset,
  } = useCreateGlossaryFlow();

  const form = useForm<CreateGlossaryFormValues>({
    resolver: zodResolver(createGlossarySchema),
    defaultValues: {
      name: '',
      domain: '',
      srcLang: '',
      tgtLang: '',
      customizedDomain: '',
    },
  });
  const watchedDomain = useWatch({ control: form.control, name: 'domain' });
  const watchedCustomizedDomain = useWatch({
    control: form.control,
    name: 'customizedDomain',
  });

  const resetDialog = () => {
    form.reset();
    reset();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialog();
    }

    onOpenChange(nextOpen);
  };

  const { createGlossaryBySource, isCreating } = useCreateGlossaryBySourceHook({
    onSuccess: () => {
      resetDialog();
      onOpenChange(false);
    },
  });

  const isDocumentCreditFlow =
    step === 2 && sourceType === 'document' && documentFiles.length > 0;
  const {
    requiredCredits,
    currentBalance,
    missingCredits,
    isPricePending,
    isPriceUnavailable,
    isInsufficientCredits,
    isWalletLoading,
    isWalletError,
  } = useDocumentCreditState({ enabled: isDocumentCreditFlow });

  const stepTwoState = getCreateGlossaryStepTwoState(sourceType);
  const submitState = getStepTwoSubmitState({
    sourceType,
    stepTwoState,
    selectedTemplateId,
    documentFiles,
    domain: watchedDomain ?? '',
    customizedDomain: watchedCustomizedDomain,
    isPricePending,
    isPriceUnavailable,
    isInsufficientCredits,
  });

  const handleContinue = async () => {
    const isValid = await form.trigger([
      'name',
      'domain',
      'srcLang',
      'tgtLang',
    ]);

    if (isValid) {
      setStep(2);
    }
  };

  const handleSubmit = (values: CreateGlossaryFormValues) => {
    createGlossaryBySource({
      values,
      sourceType,
      selectedTemplateId,
      documentFiles,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-4xl">
        <DialogHeader className="px-8 pb-6 pt-8">
          <div className="mb-2 inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {step === 1 ? t('stepOneLabel') : t('stepTwoLabel')}
          </div>
          <DialogTitle className="text-2xl">
            {step === 1 ? t('stepOneTitle') : t('stepTwoTitle')}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {step === 1 ? <CreateGlossaryStepOne form={form} /> : null}
            {step === 2 ? (
              <CreateGlossaryStepTwo
                form={form}
                domain={watchedDomain ?? ''}
                sourceType={sourceType}
                onSourceTypeChange={changeSourceType}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={setSelectedTemplateId}
                documentFiles={documentFiles}
                onDocumentFilesChange={setDocumentFiles}
              />
            ) : null}

            <CreateGlossaryDialogFooter
              step={step}
              isCreating={isCreating}
              onBack={() => setStep(1)}
              onCancel={() => handleOpenChange(false)}
              onContinue={() => void handleContinue()}
              isSubmitDisabled={submitState.disabled}
              submitLabelKey={stepTwoState.submitLabelKey}
              shouldShowDocumentCredit={isDocumentCreditFlow}
              requiredCredits={requiredCredits}
              isPricePending={isPricePending}
              currentBalance={currentBalance}
              isWalletLoading={isWalletLoading}
              isWalletError={isWalletError}
              isPriceUnavailable={isPriceUnavailable}
              isInsufficientCredits={isInsufficientCredits}
              missingCredits={missingCredits}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
