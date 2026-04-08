'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { QueryClient } from '@tanstack/react-query';
import { billingKeys, walletKeys } from '@/lib/query-client';

export type VnpayStatus = 'success' | 'error' | 'pending' | null;

interface UseBillingVnpayStatusOptions {
  searchParams: ReadonlyURLSearchParams;
  queryClient: QueryClient;
}

export function useBillingVnpayStatus({
  searchParams,
  queryClient,
}: UseBillingVnpayStatusOptions) {
  const hasHandledVnpay = useRef(false);
  const responseCode = searchParams.get('vnp_ResponseCode');
  const returnSource = searchParams.get('source');

  const vnpayStatus = useMemo<VnpayStatus>(() => {
    if (!responseCode) return null;
    if (responseCode === '00') return 'success';
    if (responseCode === '24') return 'pending';
    return 'error';
  }, [responseCode]);

  useEffect(() => {
    if (!responseCode || hasHandledVnpay.current) return;

    hasHandledVnpay.current = true;

    if (responseCode === '00') {
      queryClient.invalidateQueries({ queryKey: walletKeys.all });
      queryClient.invalidateQueries({ queryKey: billingKeys.all });
    }
  }, [queryClient, responseCode]);

  return { vnpayStatus, returnSource };
}
