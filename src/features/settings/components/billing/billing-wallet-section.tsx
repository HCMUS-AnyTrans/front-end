'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Plus, Wallet } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SettingsSection } from '../shared/settings-section';
import { createCreditPackageFormatter } from '@/lib/credit-package';

interface BillingWalletSectionProps {
  balance: number;
}

export function BillingWalletSection({ balance }: BillingWalletSectionProps) {
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
          <Button asChild>
            <Link href="/pricing" target="_blank" rel="noreferrer">
              <Plus className="size-4" />
              {t('addMore')}
            </Link>
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}
