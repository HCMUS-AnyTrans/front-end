'use client';

import React, { useEffect, useState, memo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks';

interface StatItemProps {
  iconSrc: string;
  number: string;
  label: string;
  bgColor: string;
  delay: number;
}

export const StatItem = memo(function StatItem({
  iconSrc,
  number,
  label,
  bgColor,
  delay,
}: StatItemProps) {
  const [elementRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const targetNumber = parseInt(number);
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, number]);

  return (
    <div
      ref={elementRef}
      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-9 text-center lg:text-left animate-on-scroll-scale group ${isVisible ? 'is-visible' : ''}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-9">
        <div
          className={`${bgColor} rounded-[40px] w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center relative transition-transform duration-300 will-change-transform group-hover:rotate-45`}
        >
          <Image src={iconSrc} alt={label} width={48} height={48} className="w-8 h-8 lg:w-12 lg:h-12 group-hover:-rotate-45 transition-transform duration-300" />
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:gap-6 w-full lg:w-[165px]">
        <div className="font-semibold text-2xl lg:text-[40px] leading-[1.3] text-foreground capitalize group-hover:scale-110 transition-transform duration-300">
          {count}+
        </div>
        <div className="font-bold text-sm lg:text-base leading-6 text-muted-foreground font-rubik group-hover:scale-105 transition-transform duration-300">
          {label}
        </div>
      </div>
    </div>
  );
});

const Statistics = memo(function Statistics() {
  const t = useTranslations('home.statistics');

  return (
    <section className="w-full py-12 lg:py-16 bg-white flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-0 lg:flex lg:items-center lg:justify-between">
          <StatItem
            iconSrc="/icons/user-icon.svg"
            number="100"
            label={t('activeUser')}
            bgColor="bg-[#ecdffc]"
            delay={0}
          />

          <StatItem
            iconSrc="/icons/download-icon.svg"
            number="100"
            label={t('fileTranslation')}
            bgColor="bg-[#f9ecca]"
            delay={200}
          />

          <StatItem
            iconSrc="/icons/film-icon.svg"
            number="100"
            label={t('subtitleTranslation')}
            bgColor="bg-[#d5f3f1]"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
});

export default Statistics;
