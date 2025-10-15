'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { FeatureSectionHeader } from '@/components/Features/shared';

export default function FeaturesComparison() {
  const t = useTranslations('features.comparison');

  const features = [
    {
      category: t('categories.fileFormats'),
      items: [
        {
          feature: t('items.docxPdfXlsxPptx'),
          document: true,
          subtitle: false,
        },
        { feature: t('items.srtVttAssSsa'), document: false, subtitle: true },
        {
          feature: t('items.batchProcessing'),
          document: true,
          subtitle: true,
        },
        {
          feature: t('items.formatPreservation'),
          document: true,
          subtitle: true,
        },
      ],
    },
    {
      category: t('categories.features'),
      items: [
        {
          feature: t('items.realtimePreview'),
          document: false,
          subtitle: true,
        },
        {
          feature: t('items.layoutPreservation'),
          document: true,
          subtitle: false,
        },
        { feature: t('items.timingSync'), document: false, subtitle: true },
        {
          feature: t('items.customGlossary'),
          document: true,
          subtitle: true,
        },
      ],
    },
    {
      category: t('categories.output'),
      items: [
        {
          feature: t('items.instantDownload'),
          document: true,
          subtitle: true,
        },
        {
          feature: t('items.multipleFormats'),
          document: true,
          subtitle: true,
        },
        {
          feature: t('items.qualityOptions'),
          document: true,
          subtitle: true,
        },
      ],
    },
  ];
  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FeatureSectionHeader
          title={t('title')}
          description={t('description')}
          align="center"
          className="mb-12"
        />

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-200">
            <div className="font-bold text-gray-900">
              {t('columns.features')}
            </div>
            <div className="text-center font-bold text-blue-600">
              {t('columns.documentTranslation')}
            </div>
            <div className="text-center font-bold text-purple-600">
              {t('columns.subtitleTranslation')}
            </div>
          </div>

          {/* Table Body */}
          {features.map((category, idx) => (
            <div key={idx}>
              {/* Category Header */}
              <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  {category.category}
                </h3>
              </div>

              {/* Category Items */}
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {item.feature}
                  </div>
                  <div className="flex justify-center">
                    {item.document ? (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Check
                          className="w-4 h-4 text-blue-600"
                          strokeWidth={3}
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-gray-400" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {item.subtitle ? (
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <Check
                          className="w-4 h-4 text-purple-600"
                          strokeWidth={3}
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-gray-400" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-500 mt-6">{t('note')}</p>
      </div>
    </section>
  );
}
