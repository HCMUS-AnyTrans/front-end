'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { GlossaryHeader, GlossaryInfoPanel } from './GlossaryHeader';
import { GlossaryModeSelector } from './GlossaryModeSelector';
import { GlossaryUploadArea } from './GlossaryUploadArea';
import { GlossaryFilePreview } from './GlossaryFilePreview';
import { GlossaryPasteArea } from './GlossaryPasteArea';

interface GlossarySectionProps {
  glossaryMode: 'upload' | 'paste';
  onModeChange: (mode: 'upload' | 'paste') => void;
  glossaryFile: File | null;
  onFileChange: (file: File | null) => void;
  glossaryText: string;
  onTextChange: (text: string) => void;
}

export function GlossarySection({
  glossaryMode,
  onModeChange,
  glossaryFile,
  onFileChange,
  glossaryText,
  onTextChange,
}: GlossarySectionProps) {
  const t = useTranslations('documentTranslation.configure.glossary');
  const [showInfo, setShowInfo] = useState(false);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['.csv', '.txt', '.xlsx', '.xls'];
      const fileExtension = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase();

      if (!validTypes.some((type) => fileExtension === type)) {
        alert(t('alerts.invalidFile'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(t('alerts.fileTooLarge'));
        return;
      }

      onFileChange(file);
    }
  };

  const clearGlossary = () => {
    onFileChange(null);
    onTextChange('');
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="p-6 pb-4">
        <GlossaryHeader
          showInfo={showInfo}
          onToggleInfo={() => setShowInfo(!showInfo)}
        />
        {showInfo && <GlossaryInfoPanel />}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <GlossaryModeSelector mode={glossaryMode} onModeChange={onModeChange} />

        {glossaryMode === 'upload' && !glossaryFile && (
          <GlossaryUploadArea onUpload={handleUpload} />
        )}

        {glossaryMode === 'upload' && glossaryFile && (
          <GlossaryFilePreview
            fileName={glossaryFile.name}
            fileSize={glossaryFile.size}
            onClear={clearGlossary}
          />
        )}

        {glossaryMode === 'paste' && (
          <GlossaryPasteArea
            value={glossaryText}
            onChange={onTextChange}
            onClear={clearGlossary}
          />
        )}
      </CardContent>
    </Card>
  );
}
