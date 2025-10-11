'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { TopLanguageItem } from '@/types/dashboard';

type TopLanguagesCardProps = {
  topLanguages: TopLanguageItem[];
};

export default function TopLanguagesCard({
  topLanguages,
}: TopLanguagesCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Top Languages
          </h3>
          <p className="text-sm text-gray-600">Most translated to</p>
        </div>
        <Globe className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {topLanguages.map((item, index) => (
          <div key={item.lang}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.lang}
                </span>
              </div>
              <span className="text-sm text-gray-600">{item.count}</span>
            </div>
            <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  index === 0
                    ? 'bg-blue-600'
                    : index === 1
                      ? 'bg-purple-500'
                      : index === 2
                        ? 'bg-green-500'
                        : index === 3
                          ? 'bg-orange-500'
                          : 'bg-pink-500'
                }`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
