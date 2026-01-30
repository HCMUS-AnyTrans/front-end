'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FileCheck, CreditCard } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';

interface NotificationMetadataProps {
  metadata: NotificationItem['metadata'];
}

export function NotificationMetadata({ metadata }: NotificationMetadataProps) {
  const t = useTranslations('notifications.card');
  const locale = useLocale();

  if (!metadata) return null;

  return (
    <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-gray-600">
        {metadata.fileName && (
          <span className="flex items-center gap-1 max-w-full truncate">
            <FileCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="truncate">{metadata.fileName}</span>
          </span>
        )}
        {metadata.wordsTranslated !== undefined && (
          <span className="whitespace-nowrap">
            {metadata.wordsTranslated.toLocaleString(locale)}{' '}
            {t('metadata.wordsTranslated')}
          </span>
        )}
        {metadata.creditsUsed !== undefined && (
          <span className="flex items-center gap-1 whitespace-nowrap">
            <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {metadata.creditsUsed} {t('metadata.creditsUsed')}
          </span>
        )}
        {metadata.creditsRemaining !== undefined &&
          metadata.totalCredits !== undefined && (
            <span className="font-medium text-amber-600 whitespace-nowrap">
              {metadata.creditsRemaining}/{metadata.totalCredits}{' '}
              {t('metadata.creditsRemaining')}
            </span>
          )}
      </div>
    </div>
  );
}
