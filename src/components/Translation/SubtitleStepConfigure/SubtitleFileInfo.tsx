'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubtitleFile } from '@/types/translation';

interface SubtitleFileInfoProps {
  selectedFile: SubtitleFile | null;
  onBack: () => void;
}

export function SubtitleFileInfo({
  selectedFile,
  onBack,
}: SubtitleFileInfoProps) {
  const t = useTranslations('subtitleTranslation.configure');

  if (!selectedFile) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('fileInfo.title')}
        </h3>
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-sm text-[#4169E1] hover:text-[#1e3a8a] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('fileInfo.changeFiles')}
        </Button>
      </div>
      <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="w-12 h-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
          <FileVideo className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 mb-1">
            {selectedFile.fileName}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{selectedFile.fileType}</span>
            <span>•</span>
            <span>{selectedFile.fileSize}</span>
            <span>•</span>
            <span>
              {selectedFile.subtitleCount} {t('fileInfo.subtitles')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
