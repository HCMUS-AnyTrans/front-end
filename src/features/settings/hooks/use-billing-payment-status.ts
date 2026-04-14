'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { QueryClient } from '@tanstack/react-query';
import { billingKeys, walletKeys } from '@/lib/query-client';

export type PaymentStatus = 'success' | 'error' | 'pending' | null;

interface UseBillingPaymentStatusOptions {
  searchParams: ReadonlyURLSearchParams;
  queryClient: QueryClient;
}

export function useBillingPaymentStatus({
  searchParams,
  queryClient,
}: UseBillingPaymentStatusOptions) {
  const hasHandledPayment = useRef(false);
  const responseCode = searchParams.get('code');
  const statusCode = searchParams.get('status');
  const isCancelled = searchParams.get('cancel');
  const returnSource = searchParams.get('source');

  const paymentStatus = useMemo<PaymentStatus>(() => {
    if (statusCode) {
      const normalized = statusCode.toLowerCase();
      if (normalized === 'paid' || normalized === 'success') return 'success';
      if (normalized === 'pending' || normalized === 'processing') {
        return 'pending';
      }
      return 'error';
    }

    if (!responseCode) return null;
    if (responseCode === '00') return 'success';
    if (responseCode === '24' || responseCode === '01') return 'pending';
    if (isCancelled === 'true') return 'error';
    return 'error';
  }, [responseCode, statusCode, isCancelled]);

  useEffect(() => {
    if (!paymentStatus || hasHandledPayment.current) return;

    hasHandledPayment.current = true;

    if (paymentStatus === 'success') {
      queryClient.invalidateQueries({ queryKey: walletKeys.all });
      queryClient.invalidateQueries({ queryKey: billingKeys.all });
    }
  }, [queryClient, paymentStatus]);

  return { paymentStatus, returnSource };
}
