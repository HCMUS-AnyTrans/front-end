'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ValueCard } from '@/components/Common/BaseCard/ValueCard';
import { AboutValuesProps } from '@/types/about';

export default function AboutValues({ values }: AboutValuesProps) {
  const t = useTranslations('about.sections.values');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div
        className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          {t('title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {values.map((value, idx) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className={`h-full transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible ? '0ms' : `${idx * 150}ms`,
              }}
            >
              <ValueCard
                icon={<Icon className="w-6 h-6" />}
                title={value.title}
                description={value.description}
                color={value.color}
                className="h-full flex flex-col transition-all duration-500"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
