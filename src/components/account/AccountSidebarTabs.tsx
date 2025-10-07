'use client';

import React from 'react';
import { User, CreditCard, Settings } from 'lucide-react';

export type AccountTabId = 'profile' | 'billing' | 'settings';

type Tab = {
  id: AccountTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const tabs: Tab[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

type AccountSidebarTabsProps = {
  activeTab: AccountTabId;
  onChange: (tab: AccountTabId) => void;
};

export default function AccountSidebarTabs({
  activeTab,
  onChange,
}: AccountSidebarTabsProps) {
  return (
    <div className="w-56 border-r border-gray-200 p-4 space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
