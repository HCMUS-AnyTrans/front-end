'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ContactSocialProps } from '@/types/contact';

export default function ContactSocial({ socialLinks }: ContactSocialProps) {
  const t = useTranslations('contact.social');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div
        className={`bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div
          className={`text-center mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h3>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <button
                key={social.name}
                className={`flex items-center gap-3 bg-gray-50 hover:bg-[#4169E1]/10 border border-gray-200 hover:border-[#4169E1]/30 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-[#4169E1] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer group ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${200 + idx * 100}ms`,
                }}
              >
                <Icon
                  className={`w-5 h-5 ${social.color} transition-transform duration-300 group-hover:rotate-12`}
                />
                {social.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
