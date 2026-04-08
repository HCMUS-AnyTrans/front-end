'use client';

import { useTranslations } from 'next-intl';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { BillingPaymentItem } from './billing-payment-item';
import type { Payment } from '../../types';

interface BillingPaymentSectionProps {
  payments: Payment[];
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

export function BillingPaymentSection({
  payments,
  isLoading,
  isFetching,
  pagination,
  onPageChange,
}: BillingPaymentSectionProps) {
  const t = useTranslations('settings.billing');

  return (
    <SettingsSection
      title={t('paymentHistory')}
      description={t('paymentHistoryDescription')}
    >
      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="ml-auto h-4 w-20" />
                <Skeleton className="ml-auto h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <CreditCard className="mb-2 size-8" />
          <p>{t('noPayments')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {payments.map((payment, idx) => (
            <div key={payment.id}>
              {idx > 0 && <SettingsDivider />}
              <BillingPaymentItem payment={payment} />
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
