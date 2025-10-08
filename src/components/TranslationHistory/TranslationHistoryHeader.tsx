import React from 'react';

interface TranslationHistoryHeaderProps {
  totalCompleted: number;
  totalWords: number;
}

export default function TranslationHistoryHeader({
  totalCompleted,
  totalWords,
}: TranslationHistoryHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Translation History
            </h1>
            <p className="text-sm text-gray-600">
              View and manage all your translation projects
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {totalCompleted}
                </span>{' '}
                Completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {totalWords.toLocaleString()}
                </span>{' '}
                Words
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
