'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlossaryHeaderProps {
  showInfo: boolean;
  onToggleInfo: () => void;
}

export function GlossaryHeader({
  showInfo,
  onToggleInfo,
}: GlossaryHeaderProps) {
  const t = useTranslations('documentTranslation.configure.glossary');

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
            {t('optional')}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{t('description')}</p>
      </div>
      <Button
        onClick={onToggleInfo}
        variant="ghost"
        size="sm"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        <Info className="w-4 h-4" />
        {t('help')}
      </Button>
    </div>
  );
}

export function GlossaryInfoPanel() {
  const t = useTranslations('documentTranslation.configure.glossary');

  return (
    <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
      <p className="text-sm text-purple-900 font-semibold mb-2">
        {t('whatIsGlossary')}
      </p>
      <p className="text-sm text-purple-700 mb-3">{t('glossaryInfo')}</p>
      <div className="space-y-1">
        <p className="text-xs text-purple-600">
          <strong>{t('supportedFormats')}</strong> CSV, TXT, Excel (.xlsx, .xls)
        </p>
        <p className="text-xs text-purple-600">
          <strong>{t('exampleFormat')}</strong>
        </p>
        <code className="block text-xs bg-purple-100 text-purple-800 p-2 rounded mt-1">
          source_term,target_term
          <br />
          API,API
          <br />
          cloud computing,điện toán đám mây
        </code>
      </div>
    </div>
  );
}
