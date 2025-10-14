// FILE: components/translation-history/TranslationHistoryEmpty.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';
import { BaseEmptyState } from '@/components/Common';

interface TranslationHistoryEmptyProps {
  searchQuery: string;
}

export default function TranslationHistoryEmpty({
  searchQuery,
}: TranslationHistoryEmptyProps) {
  const t = useTranslations('translationHistory.empty');

  return (
    <BaseEmptyState
      icon={<FileText className="w-8 h-8 text-gray-400" />}
      title={t('title')}
      description={t('description')}
      searchQuery={searchQuery}
    />
  );
}
