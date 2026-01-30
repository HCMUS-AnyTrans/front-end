'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface DocumentInfoCardProps {
  fileName: string;
  onBack: () => void;
}

export function DocumentInfoCard({ fileName, onBack }: DocumentInfoCardProps) {
  const t = useTranslations('documentTranslation.configure.documentInfo');

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-sm text-[#4169E1] hover:text-brand-primary-dark font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('changeFile')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-12 h-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 mb-1">{fileName}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                2,847 {t('words')}
              </span>
              <span>•</span>
              <span>DOCX</span>
              <span>•</span>
              <span>245 KB</span>
              <span>•</span>
              <span>8 {t('pages')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
