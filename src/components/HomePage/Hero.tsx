'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Hero = memo(function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative w-full py-8 lg:py-12 overflow-hidden">
      {/* Background Decorations with CSS animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl animate-fade-in-scale" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-fade-in-scale-delay" />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left side - Content */}
        <div className="flex flex-col gap-6 sm:gap-7 max-w-[625px] relative z-10 text-center lg:text-left">
          <div className="relative">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[80px] leading-tight sm:leading-tight lg:leading-[1.1] xl:leading-[90px] text-black animate-fade-in-up">
              {t('title.part1')}
              <br />
              {t('title.part2')}{' '}
              <span className="text-brand-primary inline-block bg-accent-foreground/20 px-2 py-1 rounded-md animate-fade-in-scale-delay">
                {t('title.highlight')}
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground max-w-[448px] mx-auto lg:mx-0 animate-fade-in-up-delay-300">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 animate-fade-in-up-delay-500">
            <Button variant="gradient-primary" size="hero">
              {t('buttons.freeTrial')}
            </Button>

            <Button variant="outline-gradient" size="hero" className="group">
              <Play
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {t('buttons.viewDemo')}
            </Button>
          </div>
        </div>

        {/* Right side - Banner Image - Hidden on mobile */}
        <div className="hidden lg:flex flex-shrink-0 w-full lg:w-auto lg:min-w-[500px] lg:max-w-[600px] relative animate-fade-in-right">
          <Image
            src="/banner/banner-homepage.svg"
            alt={t('imageAlt')}
            width={600}
            height={400}
            priority
            className="w-full h-auto object-contain"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
});

export default Hero;
