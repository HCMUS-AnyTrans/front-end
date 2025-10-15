'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface StatItemProps {
  iconSrc: string;
  number: string;
  label: string;
  bgColor: string;
  delay: number;
}

export function StatItem({
  iconSrc,
  number,
  label,
  bgColor,
  delay,
}: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [label]);

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
      id={`stat-${label}`}
      className="flex flex-col lg:flex-row items-center gap-6 lg:gap-9 text-center lg:text-left transition-all duration-700 ease-out"
      style={{
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : 'translateY(30px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-9">
        <div
          className={`${bgColor} rounded-[40px] w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center relative transition-all duration-500`}
          style={{
            transform: isVisible ? 'rotate(0deg)' : 'rotate(-180deg)',
            transitionDelay: `${delay + 200}ms`,
          }}
        >
          <img src={iconSrc} alt={label} className="w-8 h-8 lg:w-12 lg:h-12" />
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:gap-6 w-full lg:w-[165px]">
        <div className="font-semibold text-2xl lg:text-[40px] leading-[1.3] text-foreground capitalize">
          {count}+
        </div>
        <div className="font-bold text-sm lg:text-base leading-6 text-muted-foreground font-rubik">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
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
}
