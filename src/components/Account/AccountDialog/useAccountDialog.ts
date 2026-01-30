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
import type { AccountTabId } from '../AccountSidebarTabs';

interface UseAccountDialogReturn {
  activeTab: AccountTabId;
  setActiveTab: (tab: AccountTabId) => void;
  showAddCardDialog: boolean;
  setShowAddCardDialog: (show: boolean) => void;
  showPasswords: ShowPasswords;
  togglePasswordVisibility: (field: keyof ShowPasswords) => void;
  preferences: Preferences;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  resetPreferences: () => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentPlan: Plan;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  addPaymentMethod: (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => void;
  setDefaultPaymentMethod: (id: string) => void;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  revokeSession: (sessionId: string) => void;
  signOutAllOthers: () => void;
  invoices: Invoice[];
}

export function useAccountDialog(): UseAccountDialogReturn {
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

  const togglePasswordVisibility = (field: keyof ShowPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const resetPreferences = () => {
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
    });
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  const addPaymentMethod = (payload: {
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

  return {
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
    setPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    sessions,
    setSessions,
    revokeSession,
    signOutAllOthers,
    invoices,
  };
}
