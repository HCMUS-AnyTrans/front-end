'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Zap, Shield, Globe } from 'lucide-react';
import { BackgroundPattern } from '@/components/Features/shared';

const FeaturesHero = memo(function FeaturesHero() {
  const t = useTranslations('features.hero');

  const stats = [
    { label: t('stats.languages'), value: '100+', icon: Globe },
    { label: t('stats.processingSpeed'), value: '<5s', icon: Zap },
    { label: t('stats.security'), value: '100%', icon: Shield },
  ];

  return (
    <section className="relative w-full bg-white border-b border-gray-200 py-20 sm:py-24 overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern variant="dots" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 animate-fade-in-scale">
            <span className="text-sm font-bold tracking-wider uppercase text-[#4169E1]">
              {t('badge')}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            {t('title.part1')}
            <br />
            <span className="text-[#4169E1]">{t('title.highlight')}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in-up-delay-300">
            {t('description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up-delay-500">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-[#4169E1]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default FeaturesHero;
