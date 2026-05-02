'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createLedgerTypeConfig } from '../../data';
import { formatBillingDate } from '../../utils/billing-display';
import type { WalletLedger } from '../../types';

interface BillingLedgerItemProps {
  entry: WalletLedger;
}

export function BillingLedgerItem({ entry }: BillingLedgerItemProps) {
  const t = useTranslations('settings.billing');
  const locale = useLocale();
  const config = createLedgerTypeConfig((key) => t(key))[entry.ledgerType];
  const Icon = config?.icon ?? ArrowUpRight;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-lg bg-muted',
            config?.color,
          )}
        >
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{entry.note}</p>
          <p className="text-xs text-muted-foreground">
            {config?.label} &middot;{' '}
            {formatBillingDate(entry.createdAt, locale)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={cn(
            'font-semibold',
            entry.delta > 0 ? 'text-success' : 'text-foreground',
          )}
        >
          {entry.delta > 0 ? '+' : ''}
          {entry.delta.toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US')}
        </p>
      </div>
    </div>
  );
}
