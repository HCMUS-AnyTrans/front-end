// FILE: components/translation-history/TranslationHistoryEmpty.tsx
import React from 'react';
import { FileText } from 'lucide-react';

interface TranslationHistoryEmptyProps {
  searchQuery: string;
}

export default function TranslationHistoryEmpty({
  searchQuery,
}: TranslationHistoryEmptyProps) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No translations found
      </h3>
      <p className="text-sm text-gray-600">
        {searchQuery
          ? 'Try adjusting your search criteria'
          : 'Start translating documents to see your history here'}
      </p>
    </div>
  );
}
