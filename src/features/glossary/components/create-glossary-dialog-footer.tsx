'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CreateGlossaryDialogFooterProps = {
  step: 1 | 2;
  isCreating: boolean;
  onBack: () => void;
  onCancel: () => void;
  onContinue: () => void;
  isSubmitDisabled: boolean;
  submitLabelKey: string;
  shouldShowDocumentCredit: boolean;
  requiredCredits: number | null;
  isPricePending: boolean;
  currentBalance: number | null;
  isWalletLoading: boolean;
  isWalletError: boolean;
  isPriceUnavailable: boolean;
  isInsufficientCredits: boolean;
  missingCredits: number;
};

export function CreateGlossaryDialogFooter({
  step,
  isCreating,
  onBack,
  onCancel,
  onContinue,
  isSubmitDisabled,
  submitLabelKey,
  shouldShowDocumentCredit,
  requiredCredits,
  isPricePending,
  currentBalance,
  isWalletLoading,
  isWalletError,
  isPriceUnavailable,
  isInsufficientCredits,
  missingCredits,
}: CreateGlossaryDialogFooterProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const tCommon = useTranslations('common');
  const creditsFormatter = new Intl.NumberFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
  );

  return (
    <div className="flex flex-col gap-3 border-t bg-muted/50 px-8 py-4">
      <div className="flex items-center justify-end gap-3">
        {step === 2 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isCreating}
          >
            {tCommon('back')}
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isCreating}
          >
            {tCommon('cancel')}
          </Button>
        )}

        {step === 1 ? (
          <Button key="continue" type="button" onClick={onContinue}>
            {t('stepTwo.continue')}
          </Button>
        ) : (
          <Button
            key="submit"
            type="submit"
            disabled={isSubmitDisabled || isCreating}
            className="gap-2.5"
          >
            {isCreating ? <Loader2 className="size-4 animate-spin" /> : null}
            <span>{isCreating ? t('form.creating') : t(submitLabelKey)}</span>
            {shouldShowDocumentCredit ? (
              <span className="rounded-full bg-primary-foreground/16 px-2 py-0.5 text-[11px] font-semibold text-primary-foreground/90">
                - {isPricePending ? '--' : (requiredCredits ?? '--')}{' '}
                {t('stepTwo.documentCreditShort')}
              </span>
            ) : null}
          </Button>
        )}
      </div>

      {shouldShowDocumentCredit ? (
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
  );
}
