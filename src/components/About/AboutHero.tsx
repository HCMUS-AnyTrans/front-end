'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { AboutHeroProps } from '@/types/about';

export default function AboutHero({ stats }: AboutHeroProps) {
  const t = useTranslations('about.hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#4169E1] via-[#1e3a8a] to-[#4169E1] text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        style={{ animation: 'float-slow 10s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        style={{ animation: 'float-slow 12s ease-in-out infinite reverse' }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div
          className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">{t('badge')}</span>
        </div>
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('title.part1')}
          <br />
          {t('title.part2')}
        </h1>
        <p
          className={`text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 transition-all duration-500 hover:shadow-lg hover:scale-102 hover:bg-white/20 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible ? '0ms' : `${300 + idx * 100}ms`,
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold mb-1">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
      `}</style>
    </div>
  );
}
