'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';
import { BaseFAQ } from '@/components/Common';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQSectionProps {
  faqs: FAQItem[];
}

export default function PricingFAQSection({ faqs }: PricingFAQSectionProps) {
  const t = useTranslations('pricing.faqSection');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4169E1] to-[#1e3a8a] rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* FAQ List */}
        <BaseFAQ
          variant="accordion"
          faqs={faqs}
          openIndex={openIndex}
          onToggle={setOpenIndex}
        />

        {/* CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-gray-600 mb-4">{t('cta.text')}</p>
          <Button variant="gradient-primary" size="hero" asChild>
            <Link href="/contact">{t('cta.button')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
