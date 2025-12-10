'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BaseCTA } from '@/components/Common';

export default function ContactCTA() {
  const t = useTranslations('contact.cta');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      <BaseCTA
        variant="contact"
        title={t('title')}
        description={t('description')}
        primaryButton={{
          text: t('button'),
          href: '/faq',
        }}
      />
    </div>
  );
}
