'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { BillingLedgerSection } from './billing-ledger-section';
import { BillingPaymentSection } from './billing-payment-section';
import { BillingTabFallback } from './billing-tab.fallback';
import { BillingVnpayStatusBanner } from './billing-vnpay-status-banner';
import { BillingWalletSection } from './billing-wallet-section';
import {
  useWallet,
  useWalletLedger,
  usePayments,
} from '../../hooks/use-billing';
import { useBillingVnpayStatus } from '../../hooks/use-billing-vnpay-status';

export function BillingTab() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [ledgerPage, setLedgerPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);

  const { wallet, isLoading: isLoadingWallet } = useWallet();
  const {
    ledger,
    pagination: ledgerPagination,
    isLoading: isLoadingLedger,
    isFetching: isFetchingLedger,
  } = useWalletLedger({ page: ledgerPage, limit: 10 });
  const {
    payments,
    pagination: paymentsPagination,
    isLoading: isLoadingPayments,
    isFetching: isFetchingPayments,
  } = usePayments({ page: paymentsPage, limit: 10 });

  const { vnpayStatus, returnSource } = useBillingVnpayStatus({
    searchParams,
    queryClient,
  });

  if (isLoadingWallet) {
    return <BillingTabFallback />;
  }

  return (
    <div className="space-y-6">
      <BillingVnpayStatusBanner
        status={vnpayStatus}
        returnSource={returnSource}
      />

      <BillingWalletSection balance={wallet?.balance ?? 0} />

      <BillingLedgerSection
        ledger={ledger ?? []}
        isLoading={isLoadingLedger}
        isFetching={isFetchingLedger}
        pagination={ledgerPagination}
        onPageChange={setLedgerPage}
      />

      <BillingPaymentSection
        payments={payments ?? []}
        isLoading={isLoadingPayments}
        isFetching={isFetchingPayments}
        pagination={paymentsPagination}
        onPageChange={setPaymentsPage}
      />
    </div>
  );
}
