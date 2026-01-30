'use client';

import React from 'react';
import { BaseDialog, BaseDialogContent } from '@/components/Common';
import { AccountDialogHeader } from '@/components/Account';
import { AccountDialogContent } from './AccountDialogContent';
import { useAccountDialog } from './useAccountDialog';

type AccountDialogProps = {
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
};

export default function AccountDialog({
  open: controlledOpen,
  onOpenChange,
}: AccountDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const {
    activeTab,
    setActiveTab,
    showAddCardDialog,
    setShowAddCardDialog,
    showPasswords,
    togglePasswordVisibility,
    preferences,
    updatePreferences,
    resetPreferences,
    userData,
    updateUserData,
    currentPlan,
    paymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    sessions,
    revokeSession,
    signOutAllOthers,
    invoices,
  } = useAccountDialog();

  return (
    <BaseDialog open={open} onOpenChange={setOpen}>
      <BaseDialogContent className="overflow-hidden flex flex-col w-[90vw] max-w-6xl max-h-[90vh] rounded-2xl">
        <div className="px-6 py-5 lg:px-8 lg:pt-6 lg:pb-0">
          <AccountDialogHeader onClose={() => setOpen(false)} />
        </div>

        <AccountDialogContent
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          showPasswords={showPasswords}
          onTogglePasswordVisibility={togglePasswordVisibility}
          userData={userData}
          onUpdateUserData={updateUserData}
          preferences={preferences}
          onUpdatePreferences={updatePreferences}
          onResetPreferences={resetPreferences}
          currentPlan={currentPlan}
          paymentMethods={paymentMethods}
          onAddPaymentMethod={addPaymentMethod}
          onSetDefaultPaymentMethod={setDefaultPaymentMethod}
          sessions={sessions}
          onRevokeSession={revokeSession}
          onSignOutAllOthers={signOutAllOthers}
          showAddCardDialog={showAddCardDialog}
          onShowAddCardDialog={setShowAddCardDialog}
          invoices={invoices}
        />
      </BaseDialogContent>
    </BaseDialog>
  );
}
