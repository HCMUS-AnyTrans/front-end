'use client';

import React, { useState } from 'react';
import { User, CreditCard, Settings, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useLogoutMutation, useAuthErrorMessage } from '@/features/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const tLogout = useTranslations('common.sidebar.logout');
  const getErrorMessage = useAuthErrorMessage();
  const tabs = getTabs(t);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Logout mutation
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      setShowLogoutDialog(false);
      toast.success(tLogout('success'));
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg || tLogout('error'));
    },
  });

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="w-48 lg:w-56 border-r border-gray-200 p-3 lg:p-4 space-y-1 flex-shrink-0 flex flex-col">
      <div className="flex-1 space-y-1">
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

      {/* Logout Button */}
      <div className="pt-2 mt-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">
            {logoutMutation.isPending
              ? tLogout('loggingOut')
              : tLogout('label')}
          </span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="w-5 h-5 text-red-600" />
              {tLogout('dialogTitle')}
            </DialogTitle>
            <DialogDescription>{tLogout('confirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              disabled={logoutMutation.isPending}
            >
              {tLogout('cancel')}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending
                ? tLogout('loggingOut')
                : tLogout('confirmButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
