'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface GlossaryPasteAreaProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function GlossaryPasteArea({
  value,
  onChange,
  onClear,
}: GlossaryPasteAreaProps) {
  const t = useTranslations('documentTranslation.configure.glossary');

  return (
    <div>
      <Textarea
        placeholder={t('pastePrompt')}
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      {value && (
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {value.split('\n').filter((line) => line.trim()).length}{' '}
            {t('termsDetected')}
          </span>
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {t('clear')}
          </Button>
        </div>
      )}
    </div>
  );
}
