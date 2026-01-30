'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface ReviewStatsProps {
  translationNamespace: string;
}

export function ReviewStats({ translationNamespace }: ReviewStatsProps) {
  const t = useTranslations(`${translationNamespace}.review`);

  const stats = [
    { label: t('stats.wordsTranslated'), value: '2,847' },
    { label: t('stats.timeTaken'), value: '3.2s' },
    { label: t('stats.accuracy'), value: '98%' },
    { label: t('stats.creditsUsed'), value: '28' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200"
        >
          <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
