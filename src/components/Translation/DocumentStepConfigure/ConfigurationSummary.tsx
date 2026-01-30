'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface ConfigurationSummaryProps {
  sourceLanguage: string;
  targetLanguage: string;
  translationProcess: string;
  topicLabel: string;
  hasGlossary: boolean;
}

export function ConfigurationSummary({
  sourceLanguage,
  targetLanguage,
  translationProcess,
  topicLabel,
  hasGlossary,
}: ConfigurationSummaryProps) {
  const t = useTranslations('documentTranslation.configure.summary');

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-xl shadow-sm">
      <CardHeader className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#4169E1]" />
          {t('title')}
        </h3>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{t('languages')}</p>
            <p className="font-semibold text-gray-900 text-sm">
              {sourceLanguage} → {targetLanguage}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{t('mode')}</p>
            <p className="font-semibold text-gray-900 text-sm capitalize">
              {translationProcess.replace('-', ' ')}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{t('domain')}</p>
            <p className="font-semibold text-gray-900 text-sm">{topicLabel}</p>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{t('glossary')}</p>
            <p className="font-semibold text-gray-900 text-sm">
              {hasGlossary ? (
                <span className="text-purple-600">{t('added')}</span>
              ) : (
                <span className="text-gray-400">{t('notAdded')}</span>
              )}
            </p>
          </div>
        </div>

        {/* Estimated Credits */}
        <div className="mt-4 pt-4 border-t border-blue-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {t('estimatedCredits')}
            </p>
            <p className="text-xs text-gray-600">{t('basedOn')}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#4169E1]">28</p>
            <p className="text-xs text-gray-600">{t('credits')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
