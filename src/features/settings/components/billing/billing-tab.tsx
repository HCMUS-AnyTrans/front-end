'use client';

import { useState } from 'react';
import { BillingLedgerSection } from './ledger-section';
import { BillingPaymentSection } from './payment-section';
import { BillingTabFallback } from './tab.fallback';
import { BillingWalletSection } from './wallet-section';
import {
  useWallet,
  useWalletLedger,
  usePayments,
} from '../../hooks/use-billing';

export function BillingTab() {
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

  if (isLoadingWallet) {
    return <BillingTabFallback />;
  }

  return (
    <div className="space-y-6">
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
