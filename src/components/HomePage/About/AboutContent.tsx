'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FloatingCard } from './FloatingCard';

export function AboutContent() {
  const t = useTranslations('home.about');

  return (
    <div className="flex flex-col gap-8 text-center lg:text-left w-full lg:max-w-xl">
      <h2 className="font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight text-foreground">
        {t('title.part1')}
        <br />
        <span className="text-brand-primary inline-block transition-all duration-1000 ease-out">
          {t('title.highlight')}
        </span>
      </h2>

      <p className="text-lg leading-relaxed text-muted-foreground">
        {t('description')}
      </p>

      <div className="flex justify-center lg:justify-start">
        <Button variant="gradient-primary" size="hero">
          {t('button')}
        </Button>
      </div>
    </div>
  );
}
