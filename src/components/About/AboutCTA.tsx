'use client';

import React, { useState, useEffect } from 'react';
import { BaseCTA } from '@/components/Common';

export default function AboutCTA() {
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
        variant="about"
        title="Ready to Break Language Barriers?"
        description="Join thousands of users who trust AnyTrans for their translation needs. Start translating documents today."
        primaryButton={{
          text: 'Get Started Free',
          href: '/signup',
        }}
        secondaryButton={{
          text: 'Contact Sales',
          href: '/contact',
        }}
      />
    </div>
  );
}
