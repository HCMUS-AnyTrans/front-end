'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const { price, isLoading: isPriceLoading } = useGlossaryLlmPrice(
    step === 2 && sourceType === 'document' && documentFiles.length > 0,
  );

  const stepTwoState = getCreateGlossaryStepTwoState(sourceType);

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
    (stepTwoState.requiresDocument ? documentFiles.length === 0 : false);
  const shouldShowDocumentCredit =
    step === 2 && sourceType === 'document' && documentFiles.length > 0;

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
                    disabled={isStepTwoSubmitDisabled || isCreating}
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
                        - {isPriceLoading ? '--' : price?.cost ?? '--'}{' '}
                        {t('stepTwo.documentCreditShort')}
                      </span>
                    ) : null}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
