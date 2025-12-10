'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MoreHorizontal } from 'lucide-react';
import { UserProfileButtonProps } from '@/types/sidebar';

export default function UserProfileButton({
  planLabel,
  onOpenAccount,
  isCollapsed,
}: UserProfileButtonProps) {
  const t = useTranslations('sidebar.userProfile');

  return (
    <div className="p-2">
      <button
        onClick={onOpenAccount}
        className={`w-full flex items-center gap-3 p-3 border-t border-gray-200 hover:bg-gray-50 rounded-lg text-left cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
        aria-label="Open account settings"
        title={isCollapsed ? 'Johnathan' : undefined}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">J</span>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w- truncate">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Johnathan
              </p>
              <p className="text-xs text-gray-500">
                {t('plan', { plan: planLabel })} • {t('manage')}
              </p>
            </div>
            <span className="p-1 rounded-lg text-gray-400">
              <MoreHorizontal className="w-5 h-5" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
