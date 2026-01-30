'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FeatureSectionHeader } from '@/components/Features/shared';
import { FeaturesComparisonTable } from './FeaturesComparisonTable';
import { ComparisonFeaturesData } from './ComparisonFeaturesData';

export default function FeaturesComparison() {
  const t = useTranslations('features.comparison');

  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureSectionHeader
          title={t('title')}
          description={t('description')}
          align="center"
          className="mb-12"
        />
        <ComparisonFeaturesData>
          {(features) => <FeaturesComparisonTable features={features} />}
        </ComparisonFeaturesData>
        <p className="text-center text-sm text-gray-500 mt-6">{t('note')}</p>
      </div>
    </section>
  );
}
