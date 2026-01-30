'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlossaryModeSelectorProps {
  mode: 'upload' | 'paste';
  onModeChange: (mode: 'upload' | 'paste') => void;
}

export function GlossaryModeSelector({
  mode,
  onModeChange,
}: GlossaryModeSelectorProps) {
  const t = useTranslations('documentTranslation.configure.glossary');

  return (
    <div className="flex gap-2 mb-4">
      <Button
        onClick={() => onModeChange('upload')}
        variant={mode === 'upload' ? 'default' : 'secondary'}
        size="default"
        className={`flex-1 rounded-lg ${
          mode === 'upload'
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Upload className="w-4 h-4 mr-2" />
        {t('uploadFile')}
      </Button>
      <Button
        onClick={() => onModeChange('paste')}
        variant={mode === 'paste' ? 'default' : 'secondary'}
        size="default"
        className={`flex-1 rounded-lg ${
          mode === 'paste'
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        {t('pasteContent')}
      </Button>
    </div>
  );
}
