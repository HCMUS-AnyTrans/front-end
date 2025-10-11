// FILE: components/translation-history/TranslationHistoryEmpty.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { BaseEmptyState } from '@/components/Common';

interface TranslationHistoryEmptyProps {
  searchQuery: string;
}

export default function TranslationHistoryEmpty({
  searchQuery,
}: TranslationHistoryEmptyProps) {
  return (
    <BaseEmptyState
      icon={<FileText className="w-8 h-8 text-gray-400" />}
      title="No translations found"
      description="Start translating documents to see your history here"
      searchQuery={searchQuery}
    />
  );
}
