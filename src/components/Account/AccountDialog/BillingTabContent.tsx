'use client';

import React from 'react';
import { Plan, PaymentMethod, Invoice } from '@/types/account';
import {
  CurrentPlanCard,
  PaymentMethodsList,
  AddCardDialog,
  BillingHistoryTable,
} from '@/components/Account/Billing';

interface BillingTabContentProps {
  contentSpacing: string;
  currentPlan: Plan;
  paymentMethods: PaymentMethod[];
  onAddCard: () => void;
  onSetDefaultPaymentMethod: (id: string) => void;
  showAddCardDialog: boolean;
  onShowAddCardDialog: (show: boolean) => void;
  onAddPaymentMethod: (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => void;
  invoices: Invoice[];
}

export function BillingTabContent({
  contentSpacing,
  currentPlan,
  paymentMethods,
  onAddCard,
  onSetDefaultPaymentMethod,
  showAddCardDialog,
  onShowAddCardDialog,
  onAddPaymentMethod,
  invoices,
}: BillingTabContentProps) {
  return (
    <div className={contentSpacing}>
      <CurrentPlanCard
        plan={currentPlan}
        onUpgrade={() => {}}
        onCancelPlan={() => {}}
      />
      <PaymentMethodsList
        methods={paymentMethods}
        onAddCard={onAddCard}
        onSetDefault={onSetDefaultPaymentMethod}
        onMoreAction={() => {}}
      />
      <AddCardDialog
        open={showAddCardDialog}
        onOpenChange={onShowAddCardDialog}
        onSubmit={onAddPaymentMethod}
      />
      <BillingHistoryTable invoices={invoices} onDownload={() => {}} />
    </div>
  );
}
