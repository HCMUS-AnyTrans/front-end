'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';
import { getDaysUntilFileExpiry } from '../../utils/files-display';
import type { TranslationJobFile } from '@/types';

interface FileExpiryInfoProps {
  file: TranslationJobFile;
}

export function FileExpiryInfo({ file }: FileExpiryInfoProps) {
  const t = useTranslations('settings.files');
  const locale = useLocale();

  if (file.is_expired) {
    return (
      <span className="flex items-center gap-1 text-destructive/70">
        {t('fileExpired')}
      </span>
    );
  }

  const days = getDaysUntilFileExpiry(file.store_until);

  if (days <= 3) {
    return (
      <span className="flex items-center gap-1 text-warning">
        <AlertTriangle className="size-3" />
        {t('daysRemaining', { count: days })}
      </span>
    );
  }

  return (
    <span>
      {t('expiresOn', {
        date: new Date(file.store_until).toLocaleDateString(
          locale === 'vi' ? 'vi-VN' : 'en-US',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          },
        ),
      })}
    </span>
  );
}
