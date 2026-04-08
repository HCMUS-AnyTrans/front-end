'use client';

import { useTranslations } from 'next-intl';
import { Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { BillingLedgerItem } from './billing-ledger-item';
import type { WalletLedger } from '../../types';

interface BillingLedgerSectionProps {
  ledger: WalletLedger[];
  isLoading: boolean;
  isFetching: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange: (page: number) => void;
}

export function BillingLedgerSection({
  ledger,
  isLoading,
  isFetching,
  pagination,
  onPageChange,
}: BillingLedgerSectionProps) {
  const t = useTranslations('settings.billing');

  return (
    <SettingsSection
      title={t('transactionHistory')}
      description={t('recentTransactions')}
    >
      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : ledger.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Wallet className="mb-2 size-8" />
          <p>{t('noTransactions')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {ledger.map((entry, idx) => (
            <div key={entry.id}>
              {idx > 0 && <SettingsDivider />}
              <BillingLedgerItem entry={entry} />
            </div>
          ))}
        </div>
      )}

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          onPageChange={onPageChange}
          isFetching={isFetching}
        />
      )}
    </SettingsSection>
  );
}
