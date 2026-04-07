'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/features/dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { createGlossarySchema, type CreateGlossaryFormValues } from '../data';
import {
  getCreateGlossaryStepTwoState,
  resetSourceSpecificState,
  type GlossarySourceType,
} from '../data/create-glossary-source';
import { CreateGlossaryStepOne } from './create-glossary-step-one';
import { CreateGlossaryStepTwo } from './create-glossary-step-two';
import {
  useCreateGlossaryBySource as useCreateGlossaryBySourceHook,
  useGlossaryLlmPrice,
} from '../hooks';

interface CreateGlossaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGlossaryDialog({
  open,
  onOpenChange,
}: CreateGlossaryDialogProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const tCommon = useTranslations('common');
  const [step, setStep] = useState<1 | 2>(1);
  const [sourceType, setSourceType] = useState<GlossarySourceType>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

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

  const resetDialog = () => {
    form.reset();
    setStep(1);
    setSourceType(null);
    setSelectedTemplateId(null);
    setDocumentFiles([]);
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
  const {
    price,
    isLoading: isPriceLoading,
    isFetching: isPriceFetching,
    isError: isPriceError,
  } = useGlossaryLlmPrice(
    step === 2 && sourceType === 'document' && documentFiles.length > 0,
  );
  const {
    wallet,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallet();

  const stepTwoState = getCreateGlossaryStepTwoState(sourceType);
  const creditsFormatter = new Intl.NumberFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
  );

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

  const handleSourceTypeChange = (nextSourceType: GlossarySourceType) => {
    const nextState = resetSourceSpecificState({
      nextSourceType,
      selectedTemplateId,
      documentFiles,
    });

    setSourceType(nextSourceType);
    setSelectedTemplateId(nextState.selectedTemplateId);
    setDocumentFiles(nextState.documentFiles as File[]);
  };

  const isStepTwoSubmitDisabled =
    stepTwoState.submitDisabled ||
    (stepTwoState.requiresTemplate ? selectedTemplateId === null : false) ||
    (stepTwoState.requiresDocument ? documentFiles.length === 0 : false) ||
    (sourceType === 'document' && form.getValues('domain') === 'other'
      ? form.getValues('customizedDomain')?.trim().length === 0
      : false);
  const isDocumentCreditFlow =
    step === 2 && sourceType === 'document' && documentFiles.length > 0;
  const requiredCredits = typeof price?.cost === 'number' ? price.cost : null;
  const currentBalance = typeof wallet?.balance === 'number' ? wallet.balance : null;
  const isPricePending =
    isDocumentCreditFlow &&
    requiredCredits === null &&
    (isPriceLoading || isPriceFetching);
  const isPriceUnavailable =
    isDocumentCreditFlow && requiredCredits === null && isPriceError;
  const isInsufficientCredits =
    isDocumentCreditFlow &&
    requiredCredits !== null &&
    currentBalance !== null &&
    currentBalance < requiredCredits;
  const missingCredits =
    isInsufficientCredits && requiredCredits !== null && currentBalance !== null
      ? requiredCredits - currentBalance
      : 0;
  const shouldShowDocumentCredit = isDocumentCreditFlow;
  const shouldDisableDocumentSubmit =
    isPricePending || isPriceUnavailable || isInsufficientCredits;

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
                domain={form.getValues('domain')}
                sourceType={sourceType}
                onSourceTypeChange={handleSourceTypeChange}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={setSelectedTemplateId}
                documentFiles={documentFiles}
                onDocumentFilesChange={setDocumentFiles}
              />
            ) : null}

            <div className="flex flex-col gap-3 border-t bg-muted/50 px-8 py-5">
              <div className="flex items-center justify-end gap-3">
                {step === 2 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    disabled={isCreating}
                  >
                    {tCommon('back')}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleOpenChange(false)}
                    disabled={isCreating}
                  >
                    {tCommon('cancel')}
                  </Button>
                )}

                {step === 1 ? (
                  <Button
                    key="glossary-step-one-continue"
                    type="button"
                    onClick={() => void handleContinue()}
                  >
                    {t('stepTwo.continue')}
                  </Button>
                ) : (
                  <Button
                    key="glossary-step-two-submit"
                    type="submit"
                    disabled={
                      isStepTwoSubmitDisabled ||
                      shouldDisableDocumentSubmit ||
                      isCreating
                    }
                    className="gap-2.5"
                  >
                    {isCreating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    <span>
                      {isCreating
                        ? t('form.creating')
                        : t(stepTwoState.submitLabelKey)}
                    </span>
                    {shouldShowDocumentCredit ? (
                      <span className="rounded-full bg-primary-foreground/16 px-2 py-0.5 text-[11px] font-semibold text-primary-foreground/90">
                        - {isPricePending ? '--' : requiredCredits ?? '--'}{' '}
                        {t('stepTwo.documentCreditShort')}
                      </span>
                    ) : null}
                  </Button>
                )}
              </div>
              {isDocumentCreditFlow ? (
                <div className="space-y-1 text-right text-xs">
                  <p className="text-muted-foreground">
                    <span>{t('stepTwo.documentBalanceLabel')}: </span>
                    <span className="font-medium text-foreground">
                      {isWalletLoading
                        ? t('stepTwo.documentBalanceLoading')
                        : isWalletError || currentBalance === null
                          ? t('stepTwo.documentBalanceUnavailable')
                          : `${creditsFormatter.format(currentBalance)} ${t('stepTwo.documentCreditShort')}`}
                    </span>
                  </p>
                  {isPriceUnavailable ? (
                    <p className="font-medium text-destructive">
                      {t('stepTwo.documentCreditUnavailable')}
                    </p>
                  ) : null}
                  {isInsufficientCredits ? (
                    <p className="font-medium text-destructive">
                      {t('stepTwo.documentInsufficientCredits', {
                        missing: creditsFormatter.format(missingCredits),
                      })}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
