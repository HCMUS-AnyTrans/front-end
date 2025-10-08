'use client';

import React from 'react';
import { Upload, FileText, Film } from 'lucide-react';
import BaseFeatureCard from '@/src/components/Translation/BaseFeatureCard';

type UploadVariant = 'document' | 'subtitle';

type StepUploadProps = {
  variant: UploadVariant;
  onUpload: () => void;
};

const uploadConfig = {
  document: {
    title: 'Upload Your Document',
    description: 'Drag and drop your file or click to browse',
    icon: FileText,
    supportedFormats: 'DOCX, PDF, XLSX, PPTX, TXT',
    features: [
      {
        icon: <Upload className="w-5 h-5 text-purple-600" />,
        title: 'Fast Translation',
        description: 'Get results in seconds with AI-powered translation',
        iconBgClass: 'bg-purple-100',
      },
      {
        icon: <FileText className="w-5 h-5 text-green-600" />,
        title: 'Format Preserved',
        description: 'Maintain original layout, fonts, and styling',
        iconBgClass: 'bg-green-100',
      },
      {
        icon: <FileText className="w-5 h-5 text-blue-600" />,
        title: '100+ Languages',
        description: 'Translate between any language pair',
        iconBgClass: 'bg-blue-100',
      },
    ],
  },
  subtitle: {
    title: 'Upload Your Subtitle Files',
    description: 'Drag and drop your files or click to browse',
    icon: Film,
    supportedFormats: 'SRT, VTT, ASS, SSA, MP4',
    features: [
      {
        icon: <Upload className="w-5 h-5 text-amber-600" />,
        title: 'Context-Aware Translation',
        description:
          'Automatic movie/TV show context detection for more accurate, natural translations',
        iconBgClass: 'bg-amber-100',
      },
      {
        icon: <Film className="w-5 h-5 text-indigo-600" />,
        title: 'Multi-Format Support',
        description: 'SRT, VTT, ASS, SSA, and MP4 subtitle formats',
        iconBgClass: 'bg-indigo-100',
      },
      {
        icon: <FileText className="w-5 h-5 text-rose-600" />,
        title: 'Speaker Detection',
        description: 'Identify and preserve speaker names and dialogue context',
        iconBgClass: 'bg-rose-100',
      },
    ],
  },
};

export default function StepUpload({ variant, onUpload }: StepUploadProps) {
  const config = uploadConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {config.title}
            </h2>
            <p className="text-gray-600">{config.description}</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-12 text-center transition-all cursor-pointer bg-gray-50 hover:bg-blue-50">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <button
              onClick={onUpload}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <Upload className="w-5 h-5" />
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: {config.supportedFormats}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum file size: 50MB
            </p>
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
