'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Upload } from 'lucide-react';

interface GlossaryUploadAreaProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GlossaryUploadArea({ onUpload }: GlossaryUploadAreaProps) {
  const t = useTranslations('documentTranslation.configure.glossary');

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all min-h-[200px] flex items-center justify-center">
      <input
        type="file"
        id="glossary-upload"
        accept=".csv,.txt,.xlsx,.xls"
        onChange={onUpload}
        className="hidden"
      />
      <label
        htmlFor="glossary-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
          <Upload className="w-7 h-7 text-purple-600" />
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-1">
          {t('uploadPrompt')}
        </p>
        <p className="text-xs text-gray-500">{t('uploadFormatHint')}</p>
      </label>
    </div>
  );
}
