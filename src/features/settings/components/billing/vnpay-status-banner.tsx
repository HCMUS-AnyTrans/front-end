'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import type { VnpayStatus } from '../../hooks/use-billing-vnpay-status';

interface BillingVnpayStatusBannerProps {
  status: VnpayStatus;
  returnSource: string | null;
}

export function BillingVnpayStatusBanner({
  status,
  returnSource,
}: BillingVnpayStatusBannerProps) {
  const t = useTranslations('settings.billing');

  if (!status) return null;

  if (status === 'success') {
    return (
      <Alert className="border-success bg-success/10 text-success [&>svg]:text-success">
        <CheckCircle className="size-4" />
        <AlertDescription className="flex items-center gap-3">
          <span>{t('vnpaySuccess')}</span>
          {returnSource === 'dashboard' ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard?source=dashboard&paymentStatus=success">
                {t('backToDashboard')}
              </Link>
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <XCircle className="size-4" />
        <AlertDescription className="flex items-center gap-3">
          <span>{t('vnpayError')}</span>
          {returnSource === 'dashboard' ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard?source=dashboard&paymentStatus=error">
                {t('backToDashboard')}
              </Link>
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 [&>svg]:text-yellow-600">
      <Clock className="size-4" />
      <AlertDescription className="flex items-center gap-3">
        <span>{t('vnpayPending')}</span>
        {returnSource === 'dashboard' ? (
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard?source=dashboard&paymentStatus=pending">
              {t('backToDashboard')}
            </Link>
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
