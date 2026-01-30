'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Reason } from '@/types/contact';

interface WhyContactUsProps {
  reasons: Reason[];
  isVisible: boolean;
}

export function WhyContactUs({ reasons, isVisible }: WhyContactUsProps) {
  const t = useTranslations('contact.info');

  return (
    <div
      className={`bg-gradient-to-br from-[#1e3a8a]  to-[#173FB6] rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      <h3 className="text-xl font-bold mb-4">{t('whyContactUs.title')}</h3>
      <div className="space-y-3">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              style={{
                animation: `fade-in-right 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 hover:scale-110 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{reason.title}</h4>
                <p className="text-sm text-blue-100">{reason.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
