'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
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
          value: totalWords.toLocaleString(),
          color: 'bg-[#4169E1]',
        },
      ]}
    />
  );
}
