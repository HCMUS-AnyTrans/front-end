'use client';

import React from 'react';
import { User, CreditCard, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type AccountTabId = 'profile' | 'billing' | 'settings';

type Tab = {
  id: AccountTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const getTabs = (t: (key: string) => string): Tab[] => [
  { id: 'profile', label: t('profile'), icon: User },
  { id: 'billing', label: t('billing'), icon: CreditCard },
  { id: 'settings', label: t('settings'), icon: Settings },
];

type AccountSidebarTabsProps = {
  activeTab: AccountTabId;
  onChange: (tab: AccountTabId) => void;
};

export default function AccountSidebarTabs({
  activeTab,
  onChange,
}: AccountSidebarTabsProps) {
  const t = useTranslations('common.sidebar');
  const tabs = getTabs(t);

  return (
    <div className="w-48 lg:w-56 border-r border-gray-200 p-3 lg:p-4 space-y-1 flex-shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
