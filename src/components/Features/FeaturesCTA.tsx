'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import BaseCTA from '@/components/Common/BaseCTA';

export default function FeaturesCTA() {
  const t = useTranslations('features.cta');

  return (
    <div className="w-full py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <BaseCTA
            variant="pricing"
            title={t('title')}
            description={t('description')}
            primaryButton={{
              text: t('buttons.startFreeTrial'),
              href: '/signup',
            }}
            secondaryButton={{
              text: t('buttons.contactSales'),
              href: '/contact',
            }}
            className="bg-transparent shadow-none p-0 text-white"
          />

          {/* Trust Badge */}
          <p className="text-sm text-gray-500 mt-8">
            ✓ {t('trustBadges.freeTrial')} &nbsp;•&nbsp; ✓{' '}
            {t('trustBadges.noCreditCard')} &nbsp;•&nbsp; ✓{' '}
            {t('trustBadges.cancelAnytime')}
          </p>
        </div>
      </div>
    </div>
  );
}
