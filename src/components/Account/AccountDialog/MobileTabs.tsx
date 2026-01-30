'use client';

import React from 'react';
import { User, CreditCard, Settings } from 'lucide-react';
import type { AccountTabId } from '../AccountSidebarTabs';

type MobileTabsProps = {
  activeTab: AccountTabId;
  onChange: (tab: AccountTabId) => void;
};

const tabs = [
  { id: 'profile' as AccountTabId, label: 'Profile', icon: User },
  { id: 'billing' as AccountTabId, label: 'Billing', icon: CreditCard },
  { id: 'settings' as AccountTabId, label: 'Settings', icon: Settings },
];

export function MobileTabs({ activeTab, onChange }: MobileTabsProps) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-all relative cursor-pointer ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
