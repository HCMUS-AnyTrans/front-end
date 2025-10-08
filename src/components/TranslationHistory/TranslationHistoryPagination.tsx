import React from 'react';

interface TranslationHistoryPaginationProps {
  currentCount: number;
  totalCount: number;
}

export default function TranslationHistoryPagination({
  currentCount,
  totalCount,
}: TranslationHistoryPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Showing{' '}
        <span className="font-semibold text-gray-900">{currentCount}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalCount}</span>{' '}
        translations
      </p>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  );
}
