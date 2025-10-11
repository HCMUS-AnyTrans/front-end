'use client';

import React from 'react';
import { User, CreditCard, Settings } from 'lucide-react';
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
import { useMediaQuery } from '@/src/hooks';

type AccountDialogProps = {
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
};

// Mobile/Tablet Horizontal Tabs Component
type MobileTabsProps = {
  activeTab: AccountTabId;
  onChange: (tab: AccountTabId) => void;
};

const tabs = [
  { id: 'profile' as AccountTabId, label: 'Profile', icon: User },
  { id: 'billing' as AccountTabId, label: 'Billing', icon: CreditCard },
  { id: 'settings' as AccountTabId, label: 'Settings', icon: Settings },
];

function MobileTabs({ activeTab, onChange }: MobileTabsProps) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}

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
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    timezone: 'UTC',
    defaultSourceLanguage: 'en',
    defaultTargetLanguage: 'vi',
    autoSaveDrafts: true,
    showTooltips: true,
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

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Render content based on active tab
  const renderTabContent = () => {
    const contentSpacing = isMobile ? 'space-y-4' : 'space-y-6';

    switch (activeTab) {
      case 'profile':
        return (
          <div className={contentSpacing}>
            <ProfilePictureSection user={userData} onUploadClick={() => {}} />
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
        );

      case 'billing':
        return (
          <div className={contentSpacing}>
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
            <BillingHistoryTable invoices={invoices} onDownload={() => {}} />
          </div>
        );

      case 'settings':
        return (
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
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12h',
                timezone: 'UTC',
                defaultSourceLanguage: 'en',
                defaultTargetLanguage: 'vi',
                autoSaveDrafts: true,
                showTooltips: true,
              })
            }
            onSave={() => {}}
          />
        );

      default:
        return null;
    }
  };

  return (
    <BaseDialog open={open} onOpenChange={setOpen}>
      <BaseDialogContent
        className={`
          overflow-hidden flex flex-col
          ${
            isMobile
              ? 'w-screen h-screen max-w-none max-h-none rounded-none'
              : isTablet
                ? 'w-[95vw] max-w-3xl max-h-[90vh] rounded-2xl'
                : 'w-[90vw] max-w-6xl max-h-[90vh] rounded-2xl'
          }
        `}
      >
        {/* Header - responsive padding */}
        <div
          className={`${isMobile ? 'px-4 py-4' : 'px-6 py-5 lg:px-8 lg:pt-6 lg:pb-0'}`}
        >
          <AccountDialogHeader onClose={() => setOpen(false)} />
        </div>

        {/* Tabs Navigation - Changes based on screen size */}
        {(isMobile || isTablet) && (
          <MobileTabs activeTab={activeTab} onChange={setActiveTab} />
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar - only show on desktop */}
          {isDesktop && (
            <AccountSidebarTabs activeTab={activeTab} onChange={setActiveTab} />
          )}

          {/* Content Panel - responsive sizing and padding */}
          <div
            className={`
              flex-1 overflow-y-auto
              ${isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8'}
            `}
          >
            {renderTabContent()}
          </div>
        </div>
      </BaseDialogContent>
    </BaseDialog>
  );
}
