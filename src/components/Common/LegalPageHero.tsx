'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LucideIcon } from 'lucide-react';

interface LegalPageHeroProps {
  namespace: string;
  icon: LucideIcon;
  gradientColors: string;
}

export default function LegalPageHero({ namespace, icon: Icon, gradientColors }: LegalPageHeroProps) {
  const t = useTranslations(namespace);

  return (
    <section className={`relative ${gradientColors} text-white py-16 sm:py-20`}>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm text-white/80 mt-4">
          {t('hero.lastUpdated')}: {t('hero.date')}
        </p>
      </div>
    </section>
  );
}
