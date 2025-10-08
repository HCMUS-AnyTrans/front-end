'use client';

import React, { useState, useEffect } from 'react';
import { BaseCTA } from '@/src/components/Common';

export default function ContactCTA() {
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
        title="Have a Question?"
        description="Check out our FAQ section for quick answers to common questions about our translation services."
        primaryButton={{
          text: 'Visit FAQ',
          href: '/support',
        }}
      />
    </div>
  );
}
