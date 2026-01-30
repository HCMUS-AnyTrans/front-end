'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { PageHero } from '@/components/Common';
import { AboutHeroProps } from '@/types/about';

const AboutHero = memo(function AboutHero({ stats }: AboutHeroProps) {
  const t = useTranslations('about.hero');

  const heroStats = stats.map((stat) => ({
    label: stat.label,
    value: stat.number,
  }));

  return (
    <PageHero
      badge={{
        text: t('badge'),
        icon: Sparkles,
      }}
      title={
        <>
          {t('title.part1')}
          <br />
          {t('title.part2')}
        </>
      }
      description={t('description')}
      stats={heroStats}
      variant="gradient"
      gradientDirection="br"
    />
  );
});

export default AboutHero;
