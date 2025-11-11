'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';

const ContactHero = memo(function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <div className="bg-gradient-to-r from-[#4169E1] via-[#1e3a8a] to-[#4169E1] text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
        style={{ animation: 'float-slow 8s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
        style={{ animation: 'float-slow 10s ease-in-out infinite reverse' }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 animate-fade-in-scale">
          <MessageSquare className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">{t('badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up-delay-300">
          {t('description')}
        </p>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
      `}</style>
    </div>
  );
});

export default ContactHero;
