'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface TranslationHistoryPaginationProps {
  currentCount: number;
  totalCount: number;
}

export default function TranslationHistoryPagination({
  currentCount,
  totalCount,
}: TranslationHistoryPaginationProps) {
  const t = useTranslations('translationHistory.pagination');

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        {t('showing', { current: currentCount, total: totalCount })}
      </p>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          disabled
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  );
}
