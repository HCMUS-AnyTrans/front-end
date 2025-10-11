'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import {
  UserData,
  Plan,
  PaymentMethod,
  Invoice,
  Session,
  Preferences,
} from '@/src/types/account';
import { BaseDialog, BaseDialogContent } from '@/src/components/Common';
import {
  AccountDialogHeader,
  AccountSidebarTabs,
} from '@/src/components/Account';
import type { AccountTabId } from '@/src/components/Account/AccountSidebarTabs';

import {
  ProfilePictureSection,
  PersonalInfoForm,
  ChangePasswordSection,
  TwoFactorToggle,
  ActiveSessionsList,
  ProfileSaveBar,
} from '@/src/components/Account/Profile';
import type { ShowPasswords } from '@/src/components/Account/Profile/ChangePasswordSection';

import {
  CurrentPlanCard,
  PaymentMethodsList,
  AddCardDialog,
  BillingHistoryTable,
} from '@/src/components/Account/Billing';

import { PreferencesSection } from '@/src/components/Account/Settings';

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
  const [activeTab, setActiveTab] = React.useState<AccountTabId>('profile');
  const [showAddCardDialog, setShowAddCardDialog] = React.useState(false);

  const [showPasswords, setShowPasswords] = React.useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  });

  const [preferences, setPreferences] = React.useState<Preferences>({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    translationAlerts: false,
  });

  // Mock data
  const [userData, setUserData] = React.useState<UserData>({
    fullName: 'Johnathan Smith',
    email: 'johnathan.smith@example.com',
    phone: '+84 901 234 567',
    company: 'Tech Solutions Inc.',
    avatar: null,
  });

  const [currentPlan] = React.useState<Plan>({
    name: 'Plus Plan',
    price: 19,
    billing: 'monthly',
    credits: { used: 180, total: 300 },
    renewalDate: 'March 15, 2025',
    status: 'active',
  });

  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false,
    },
  ]);

  const [invoices] = React.useState<Invoice[]>([
    { id: '1', date: 'Feb 15, 2025', amount: 19, status: 'paid' },
    { id: '2', date: 'Jan 15, 2025', amount: 19, status: 'paid' },
    { id: '3', date: 'Dec 15, 2024', amount: 19, status: 'paid' },
  ]);

  const [sessions, setSessions] = React.useState<Session[]>([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Ho Chi Minh City, VN',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Ho Chi Minh City, VN',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Firefox on MacBook',
      location: 'Hanoi, VN',
      lastActive: '2 days ago',
      current: false,
    },
  ]);

  // Handlers
  const togglePasswordVisibility = (field: keyof ShowPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  const addCard = (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => {
    const last4 = payload.cardNumber.replace(/\s+/g, '').slice(-4) || '0000';
    setPaymentMethods((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        type: 'visa',
        last4,
        expiryMonth: Number(payload.month || 12),
        expiryYear: Number(payload.year || 2030),
        isDefault: false,
      },
    ]);
  };

  const revokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const signOutAllOthers = () => {
    setSessions((prev) => prev.filter((s) => s.current));
  };

  return (
    <BaseDialog open={open} onOpenChange={setOpen}>
      <BaseDialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        <AccountDialogHeader onClose={() => setOpen(false)} />

        <div className="flex flex-1 overflow-hidden">
          <AccountSidebarTabs activeTab={activeTab} onChange={setActiveTab} />

          <div
            className="flex-none overflow-y-auto p-8"
            style={{ width: '30vw', height: '60vh' }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <ProfilePictureSection
                  user={userData}
                  onUploadClick={() => {}}
                />
                <PersonalInfoForm
                  user={userData}
                  onChange={(p) => setUserData((prev) => ({ ...prev, ...p }))}
                />
                <ChangePasswordSection
                  show={showPasswords}
                  onToggle={togglePasswordVisibility}
                />
                <TwoFactorToggle enabled={false} onToggle={() => {}} />
                <ActiveSessionsList
                  sessions={sessions}
                  onRevoke={revokeSession}
                  onSignOutAllOthers={signOutAllOthers}
                />
                <ProfileSaveBar onCancel={() => {}} onSave={() => {}} />
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <CurrentPlanCard
                  plan={currentPlan}
                  onUpgrade={() => {}}
                  onCancelPlan={() => {}}
                />

                <PaymentMethodsList
                  methods={paymentMethods}
                  onAddCard={() => setShowAddCardDialog(true)}
                  onSetDefault={setDefaultPaymentMethod}
                  onMoreAction={() => {}}
                />

                <AddCardDialog
                  open={showAddCardDialog}
                  onOpenChange={setShowAddCardDialog}
                  onSubmit={addCard}
                />

                <BillingHistoryTable
                  invoices={invoices}
                  onDownload={() => {}}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <PreferencesSection
                preferences={preferences}
                onChange={(p) => setPreferences((prev) => ({ ...prev, ...p }))}
                onReset={() =>
                  setPreferences({
                    theme: 'light',
                    language: 'en',
                    emailNotifications: true,
                    pushNotifications: true,
                    translationAlerts: false,
                  })
                }
                onSave={() => {}}
              />
            )}
          </div>
        </div>
      </BaseDialogContent>
    </BaseDialog>
  );
}
