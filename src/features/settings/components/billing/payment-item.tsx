'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createPaymentStatusConfig } from '../../data';
import {
  formatBillingCurrency,
  formatBillingDate,
} from '../../utils/billing-display';
import type { Payment } from '../../types';

interface BillingPaymentItemProps {
  payment: Payment;
}

export function BillingPaymentItem({ payment }: BillingPaymentItemProps) {
  const t = useTranslations('settings.billing');
  const locale = useLocale();
  const statusConfig = createPaymentStatusConfig((key) => t(key))[
    payment.status
  ];

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <CreditCard className="size-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {payment.package.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {payment.package.credits.toLocaleString(
              locale === 'vi' ? 'vi-VN' : 'en-US',
            )}{' '}
            {t('credits')} &middot;{' '}
            {formatBillingDate(payment.createdAt, locale)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm font-semibold text-foreground">
          {formatBillingCurrency(payment.amount, locale, payment.currency)}
        </p>
        <Badge
          variant="outline"
          className={cn('text-xs font-medium', statusConfig?.color)}
        >
          {statusConfig?.label ?? payment.status}
        </Badge>
      </div>
    </div>
  );
}
