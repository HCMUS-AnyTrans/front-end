'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Film } from 'lucide-react';
import {
  FeaturesHero,
  FeatureShowcase,
  FeaturesComparison,
  FeaturesCTA,
} from '@/components/Features';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FeaturesClient() {
  const t = useTranslations('features.showcase');

  const features = [
    {
      title: t('documentTranslation.title'),
      description: t('documentTranslation.description'),
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      href: '/features/document-translation',
      imagePosition: 'right' as const,
      features: [
        t('documentTranslation.features.0'),
        t('documentTranslation.features.1'),
        t('documentTranslation.features.2'),
        t('documentTranslation.features.3'),
        t('documentTranslation.features.4'),
        t('documentTranslation.features.5'),
      ],
      benefits: [
        t('documentTranslation.benefits.0'),
        t('documentTranslation.benefits.1'),
        t('documentTranslation.benefits.2'),
        t('documentTranslation.benefits.3'),
        t('documentTranslation.benefits.4'),
      ],
      cta: t('documentTranslation.cta'),
    },
    {
      title: t('subtitleTranslation.title'),
      description: t('subtitleTranslation.description'),
      icon: Film,
      gradient: 'from-purple-500 to-pink-600',
      href: '/features/subtitle-translation',
      imagePosition: 'left' as const,
      features: [
        t('subtitleTranslation.features.0'),
        t('subtitleTranslation.features.1'),
        t('subtitleTranslation.features.2'),
        t('subtitleTranslation.features.3'),
        t('subtitleTranslation.features.4'),
        t('subtitleTranslation.features.5'),
      ],
      benefits: [
        t('subtitleTranslation.benefits.0'),
        t('subtitleTranslation.benefits.1'),
        t('subtitleTranslation.benefits.2'),
        t('subtitleTranslation.benefits.3'),
        t('subtitleTranslation.benefits.4'),
      ],
      cta: t('subtitleTranslation.cta'),
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <FeaturesHero />

        {/* Feature Showcases */}
        {features.map((feature, index) => (
          <FeatureShowcase key={feature.title} {...feature} index={index} />
        ))}

        {/* Comparison Table */}
        <FeaturesComparison />

        {/* CTA Section */}
        <FeaturesCTA />
      </main>

      <Footer />
    </div>
  );
}
