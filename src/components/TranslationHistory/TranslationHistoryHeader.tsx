import React from 'react';
import { BaseHeader } from '@/src/components/Common';

interface TranslationHistoryHeaderProps {
  totalCompleted: number;
  totalWords: number;
}

export default function TranslationHistoryHeader({
  totalCompleted,
  totalWords,
}: TranslationHistoryHeaderProps) {
  return (
    <BaseHeader
      title="Translation History"
      description="View and manage all your translation projects"
      variant="page"
      stats={[
        {
          label: 'Completed',
          value: totalCompleted,
          color: 'bg-green-500',
        },
        {
          label: 'Words',
          value: totalWords.toLocaleString(),
          color: 'bg-blue-500',
        },
      ]}
    />
  );
}
