'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Download } from 'lucide-react';

interface ReviewHeaderProps {
  isDocument: boolean;
  translationNamespace: string;
  onDownload: () => void;
  onExport: () => void;
  onTranslateAnother: () => void;
}

export function ReviewHeader({
  isDocument,
  translationNamespace,
  onDownload,
  onExport,
  onTranslateAnother,
}: ReviewHeaderProps) {
  const t = useTranslations(`${translationNamespace}.review`);

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold mb-1">{t('complete')}</h3>
          <p className="text-sm sm:text-base text-green-50">
            {isDocument ? t('descriptionDocument') : t('descriptionSubtitle')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={isDocument ? onDownload : onExport}
            className="bg-white hover:bg-green-50 text-green-700 px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Download className="w-5 h-5" />
            {isDocument ? t('download') : t('export')}
          </button>
          <button
            onClick={onTranslateAnother}
            className="bg-white/20 hover:bg-white/30 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border border-white/30 cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            {t('translateAnother')}
          </button>
        </div>
      </div>
    </div>
  );
}
