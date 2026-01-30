'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export interface FeatureItem {
  feature: string;
  document: boolean;
  subtitle: boolean;
}

export interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

export interface ComparisonFeaturesDataProps {
  children: (features: FeatureCategory[]) => React.ReactNode;
}

export function ComparisonFeaturesData({
  children,
}: ComparisonFeaturesDataProps) {
  const t = useTranslations('features.comparison');

  const features: FeatureCategory[] = [
    {
      category: t('categories.fileFormats'),
      items: [
        {
          feature: t('items.docxPdfXlsxPptx'),
          document: true,
          subtitle: false,
        },
        { feature: t('items.srtVttAssSsa'), document: false, subtitle: true },
        { feature: t('items.batchProcessing'), document: true, subtitle: true },
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
        { feature: t('items.customGlossary'), document: true, subtitle: true },
      ],
    },
    {
      category: t('categories.output'),
      items: [
        { feature: t('items.instantDownload'), document: true, subtitle: true },
        { feature: t('items.multipleFormats'), document: true, subtitle: true },
        { feature: t('items.qualityOptions'), document: true, subtitle: true },
      ],
    },
  ];

  return <>{children(features)}</>;
}
