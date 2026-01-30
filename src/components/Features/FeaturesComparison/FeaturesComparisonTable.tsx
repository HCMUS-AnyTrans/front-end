'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { FeatureCategory } from './ComparisonFeaturesData';

interface FeaturesComparisonTableProps {
  features: FeatureCategory[];
}

export function FeaturesComparisonTable({
  features,
}: FeaturesComparisonTableProps) {
  const t = useTranslations('features.comparison');

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div className="font-bold text-gray-900">{t('columns.features')}</div>
        <div className="text-center font-bold text-primary">
          {t('columns.documentTranslation')}
        </div>
        <div className="text-center font-bold text-purple-600">
          {t('columns.subtitleTranslation')}
        </div>
      </div>

      {features.map((category, idx) => (
        <div key={idx}>
          <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
              {category.category}
            </h3>
          </div>

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
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
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
  );
}
