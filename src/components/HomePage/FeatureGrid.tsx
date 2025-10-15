'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Film, Check, Zap, Shield, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  FeatureDetailSection,
  FeatureSectionHeader,
  BackgroundPattern,
  Benefit,
} from '@/components/Features/shared';

export default function FeatureGrid() {
  const t = useTranslations('home.featureGrid');

  const features = [
    {
      title: t('documentTranslation.title'),
      description: t('documentTranslation.description'),
      features: [
        t('documentTranslation.features.format'),
        t('documentTranslation.features.formatting'),
        t('documentTranslation.features.batch'),
        t('documentTranslation.features.ai'),
      ],
      benefits: [
        { icon: Zap, text: t('documentTranslation.benefits.fastProcessing') },
        { icon: Shield, text: t('documentTranslation.benefits.secure') },
        { icon: Globe, text: t('documentTranslation.benefits.languages') },
      ] as Benefit[],
      imagePosition: 'right' as const,
      gradient: 'from-blue-500 to-indigo-600',
      ctaText: t('documentTranslation.cta'),
      ctaHref: '/features/document-translation',
    },
    {
      title: t('subtitleTranslation.title'),
      description: t('subtitleTranslation.description'),
      features: [
        t('subtitleTranslation.features.format'),
        t('subtitleTranslation.features.timing'),
        t('subtitleTranslation.features.preview'),
        t('subtitleTranslation.features.contextAware'),
      ],
      benefits: [
        { icon: Film, text: t('subtitleTranslation.benefits.videoReady') },
        { icon: Zap, text: t('subtitleTranslation.benefits.autoSync') },
        { icon: Check, text: t('subtitleTranslation.benefits.qualityCheck') },
      ] as Benefit[],
      imagePosition: 'left' as const,
      gradient: 'from-purple-500 to-pink-600',
      ctaText: t('subtitleTranslation.cta'),
      ctaHref: '/features/subtitle-translation',
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern variant="dots" opacity={0.02} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FeatureSectionHeader
          title={
            <>
              {t('header.title.part1')}
              <br />
              <span className="bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] bg-clip-text text-transparent">
                {t('header.title.highlight')}
              </span>
            </>
          }
          description={t('header.description')}
          align="center"
          className="mb-16 lg:mb-20"
        />

        {/* Features */}
        <div className="space-y-12 lg:space-y-20">
          {features.map((feature, index) => (
            <FeatureDetailSection key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {t('bottomCTA.title')}
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('bottomCTA.description')}
          </p>
          <Button variant="gradient-primary" size="hero" asChild>
            <Link href="/signup">{t('bottomCTA.button')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
