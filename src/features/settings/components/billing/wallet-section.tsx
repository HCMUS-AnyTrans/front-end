'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Plus, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsSection } from '../shared/settings-section';
import { createCreditPackageFormatter } from '@/lib/credit-package';
import { BuyCreditsDialog } from './buy-credits-dialog';

interface BillingWalletSectionProps {
  balance: number;
}

export function BillingWalletSection({ balance }: BillingWalletSectionProps) {
  const [openBuyCredits, setOpenBuyCredits] = useState(false);
  const t = useTranslations('settings.billing');
  const locale = useLocale();
  const { formatCredits } = createCreditPackageFormatter(locale);

  return (
    <SettingsSection title={t('currentBalance')}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
            <Wallet className="size-7 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">
              {formatCredits(balance)}
            </p>
            <p className="text-sm text-muted-foreground">{t('credits')}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setOpenBuyCredits(true)}>
            <Plus className="size-4" />
            {t('addMore')}
          </Button>
        </div>
      </div>

      <BuyCreditsDialog
        open={openBuyCredits}
        onOpenChange={setOpenBuyCredits}
      />
    </SettingsSection>
  );
}
