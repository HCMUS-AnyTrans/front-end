'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Upload, FileText, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BaseFeatureCard from '@/components/Translation/shared/BaseFeatureCard';

type UploadVariant = 'document' | 'subtitle';

type StepUploadProps = {
  variant: UploadVariant;
  onUpload: () => void;
};

export default function StepUpload({ variant, onUpload }: StepUploadProps) {
  const namespace =
    variant === 'document' ? 'documentTranslation' : 'subtitleTranslation';
  const t = useTranslations(`${namespace}.upload`);

  const config =
    variant === 'document'
      ? {
          icon: FileText,
          features: [
            {
              icon: <Upload className="w-5 h-5 text-purple-600" />,
              title: t('features.fast.title'),
              description: t('features.fast.description'),
              iconBgClass: 'bg-purple-100',
            },
            {
              icon: <FileText className="w-5 h-5 text-green-600" />,
              title: t('features.formatPreserved.title'),
              description: t('features.formatPreserved.description'),
              iconBgClass: 'bg-green-100',
            },
            {
              icon: <FileText className="w-5 h-5 text-[#4169E1]" />,
              title: t('features.languages.title'),
              description: t('features.languages.description'),
              iconBgClass: 'bg-blue-100',
            },
          ],
        }
      : {
          icon: Film,
          features: [
            {
              icon: <Upload className="w-5 h-5 text-amber-600" />,
              title: t('features.contextAware.title'),
              description: t('features.contextAware.description'),
              iconBgClass: 'bg-amber-100',
            },
            {
              icon: <Film className="w-5 h-5 text-indigo-600" />,
              title: t('features.multiFormat.title'),
              description: t('features.multiFormat.description'),
              iconBgClass: 'bg-indigo-100',
            },
            {
              icon: <FileText className="w-5 h-5 text-rose-600" />,
              title: t('features.speakerDetection.title'),
              description: t('features.speakerDetection.description'),
              iconBgClass: 'bg-rose-100',
            },
          ],
        };

  const IconComponent = config.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-8 h-8 text-[#4169E1]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h2>
            <p className="text-gray-600">{t('description')}</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 hover:border-[#4169E1] rounded-xl p-12 text-center transition-all cursor-pointer bg-gray-50 hover:bg-blue-50">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <Button
              onClick={onUpload}
              size="xl"
              className="text-white rounded-xl font-semibold"
            >
              <Upload className="w-5 h-5" />
              {t('chooseFile')}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              {t('supportedFormats')}
            </p>
            <p className="text-xs text-gray-400 mt-2">{t('maxFileSize')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {config.features.map((feature, index) => (
          <BaseFeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconBgClass={feature.iconBgClass}
          />
        ))}
      </div>
    </div>
  );
}
