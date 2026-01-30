'use client';

import React from 'react';
import {
  UserData,
  Plan,
  PaymentMethod,
  Invoice,
  Session,
  Preferences,
} from '@/types/account';
import { ShowPasswords } from '@/components/Account/Profile/ChangePasswordSection';
import { useMediaQuery } from '@/hooks';
import AccountSidebarTabs from '../AccountSidebarTabs';
import type { AccountTabId } from '../AccountSidebarTabs';
import { MobileTabs } from './MobileTabs';
import { ProfileTabContent } from './ProfileTabContent';
import { BillingTabContent } from './BillingTabContent';
import { SettingsTabContent } from './SettingsTabContent';

interface AccountDialogContentProps {
  activeTab: AccountTabId;
  onChangeTab: (tab: AccountTabId) => void;
  showPasswords: ShowPasswords;
  onTogglePasswordVisibility: (field: keyof ShowPasswords) => void;
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
  preferences: Preferences;
  onUpdatePreferences: (prefs: Partial<Preferences>) => void;
  onResetPreferences: () => void;
  currentPlan: Plan;
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => void;
  onSetDefaultPaymentMethod: (id: string) => void;
  sessions: Session[];
  onRevokeSession: (sessionId: string) => void;
  onSignOutAllOthers: () => void;
  showAddCardDialog: boolean;
  onShowAddCardDialog: (show: boolean) => void;
  invoices: Invoice[];
}

export function AccountDialogContent({
  activeTab,
  onChangeTab,
  showPasswords,
  onTogglePasswordVisibility,
  userData,
  onUpdateUserData,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
  currentPlan,
  paymentMethods,
  onAddPaymentMethod,
  onSetDefaultPaymentMethod,
  sessions,
  onRevokeSession,
  onSignOutAllOthers,
  showAddCardDialog,
  onShowAddCardDialog,
  invoices,
}: AccountDialogContentProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const contentSpacing = isMobile ? 'space-y-4' : 'space-y-6';

  return (
    <div className="flex flex-1 overflow-hidden">
      {isMobile && <MobileTabs activeTab={activeTab} onChange={onChangeTab} />}
      {isMobile || (
        <AccountSidebarTabs activeTab={activeTab} onChange={onChangeTab} />
      )}

      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-8'}`}>
        {activeTab === 'profile' && (
          <ProfileTabContent
            contentSpacing={contentSpacing}
            showPasswords={showPasswords}
            onTogglePasswordVisibility={onTogglePasswordVisibility}
            userData={userData}
            onUpdateUserData={onUpdateUserData}
            sessions={sessions}
            onRevokeSession={onRevokeSession}
            onSignOutAllOthers={onSignOutAllOthers}
          />
        )}
        {activeTab === 'billing' && (
          <BillingTabContent
            contentSpacing={contentSpacing}
            currentPlan={currentPlan}
            paymentMethods={paymentMethods}
            onAddCard={() => onShowAddCardDialog(true)}
            onSetDefaultPaymentMethod={onSetDefaultPaymentMethod}
            showAddCardDialog={showAddCardDialog}
            onShowAddCardDialog={onShowAddCardDialog}
            onAddPaymentMethod={onAddPaymentMethod}
            invoices={invoices}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTabContent
            preferences={preferences}
            onUpdatePreferences={onUpdatePreferences}
            onResetPreferences={onResetPreferences}
          />
        )}
      </div>
    </div>
  );
}
