'use client';

import React from 'react';
import { X, ChevronLeft } from 'lucide-react';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import SecondaryNav from './SecondaryNav';
import CreditSection from './CreditSection';
import UserProfileButton from './UserProfileButton';
import { AccountDialog } from '@/components/Account';
import type { NavItem } from '@/types/sidebar';

interface SidebarContentProps {
  collapsed?: boolean;
  navigationItems: NavItem[];
  secondaryItems: NavItem[];
  credits: { current: number; total: number; plan: string };
  isActive: (href: string) => boolean;
  isCollapsed: boolean;
  isAccountOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
  onOpenAccount: () => void;
  onCloseAccount: () => void;
}

export function SidebarContent({
  collapsed = false,
  navigationItems,
  secondaryItems,
  credits,
  isActive,
  isCollapsed,
  isAccountOpen,
  onCloseMobile,
  onToggleCollapse,
  onOpenAccount,
  onCloseAccount,
}: SidebarContentProps) {
  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-2 mb-4 border-b border-gray-200">
        <SidebarLogo isCollapsed={collapsed} />
        <button
          onClick={onCloseMobile}
          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:block px-4 py-6 relative">
        <div className="flex items-center justify-center">
          <SidebarLogo isCollapsed={collapsed} />
        </div>
        <button
          onClick={onToggleCollapse}
          className="absolute -right-2.5 top-1/2 -translate-y-1/2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-all cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={`w-3.5 h-3.5 text-gray-600 transition-transform ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <SidebarNav
        items={navigationItems}
        isActive={isActive}
        isCollapsed={collapsed}
      />

      <SecondaryNav
        items={secondaryItems}
        isActive={isActive}
        isCollapsed={collapsed}
      />

      {!collapsed && (
        <CreditSection current={credits.current} total={credits.total} />
      )}

      <UserProfileButton
        planLabel={credits.plan}
        onOpenAccount={onOpenAccount}
        isCollapsed={collapsed}
      />

      {isAccountOpen && (
        <AccountDialog open={isAccountOpen} onOpenChange={onCloseAccount} />
      )}
    </>
  );
}
