'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';
import { SubtitleEntry } from '@/types/translation';

interface SubtitlePreviewProps {
  subtitles: SubtitleEntry[];
}

export function SubtitlePreview({ subtitles }: SubtitlePreviewProps) {
  const t = useTranslations('subtitleTranslation.configure');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('subtitlePreview.title')}
        </h3>
      </div>
      <div className="p-6">
        <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
          {subtitles.length > 0 ? (
            <div className="space-y-2">
              {subtitles.slice(0, 8).map((subtitle) => (
                <div
                  key={subtitle.id}
                  className="p-3 border border-gray-200 rounded-lg bg-white"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {subtitle.startTime} → {subtitle.endTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">
                    {subtitle.originalText}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-gray-600">
              {t('subtitlePreview.noSubtitles')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
