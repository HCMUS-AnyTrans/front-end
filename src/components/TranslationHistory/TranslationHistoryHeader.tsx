'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { BaseHeader } from '@/components/Common';

interface TranslationHistoryHeaderProps {
  totalCompleted: number;
  totalWords: number;
}

export default function TranslationHistoryHeader({
  totalCompleted,
  totalWords,
}: TranslationHistoryHeaderProps) {
  const t = useTranslations('translationHistory.header');
  const locale = useLocale();

  return (
    <BaseHeader
      title={t('title')}
      description={t('description')}
      variant="page"
      stats={[
        {
          label: t('stats.completed'),
          value: totalCompleted,
          color: 'bg-green-500',
        },
        {
          label: t('stats.words'),
          value: totalWords.toLocaleString(locale),
          color: 'bg-[#4169E1]',
        },
      ]}
    />
  );
}
