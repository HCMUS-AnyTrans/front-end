import React from 'react';
import { TranslationHistoryStats as Stats } from '@/types/translation-history';

interface TranslationHistoryStatsProps {
  stats: Stats;
}

export default function TranslationHistoryStats({
  stats,
}: TranslationHistoryStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Projects</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          {stats.totalProjects}
        </p>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Completed</p>
        <p className="text-xl sm:text-2xl font-bold text-green-600">
          {stats.totalCompleted}
        </p>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Words</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          {stats.totalWords.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Credits Used</p>
        <p className="text-xl sm:text-2xl font-bold text-blue-600">
          {stats.totalCredits}
        </p>
      </div>
    </div>
  );
}
