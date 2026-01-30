'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import {
  PricingTabSelector,
  PricingGrid,
  PricingAnimations,
  PricingFAQSection,
} from '@/components/Pricing';

export default function PricingPageClient() {
  const t = useTranslations('pricing');
  const [selectedTab, setSelectedTab] = useState<'personal' | 'enterprise'>(
    'enterprise'
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const personalPlans = [
    {
      name: t('personalPlans.starter.name'),
      tagline: t('personalPlans.starter.tagline'),
      price: t('personalPlans.starter.price'),
      billing: t('personalPlans.starter.billing'),
      features: [
        t('personalPlans.starter.features.0'),
        t('personalPlans.starter.features.1'),
        t('personalPlans.starter.features.2'),
        t('personalPlans.starter.features.3'),
        t('personalPlans.starter.features.4'),
      ],
      cta: t('personalPlans.starter.cta'),
    },
    {
      name: t('personalPlans.plus.name'),
      tagline: t('personalPlans.plus.tagline'),
      price: t('personalPlans.plus.price'),
      billing: t('personalPlans.plus.billing'),
      features: [
        t('personalPlans.plus.features.0'),
        t('personalPlans.plus.features.1'),
        t('personalPlans.plus.features.2'),
        t('personalPlans.plus.features.3'),
        t('personalPlans.plus.features.4'),
        t('personalPlans.plus.features.5'),
      ],
      cta: t('personalPlans.plus.cta'),
      recommended: true,
    },
  ];

  const enterprisePlans = [
    {
      name: t('enterprisePlans.starter.name'),
      tagline: t('enterprisePlans.starter.tagline'),
      price: t('enterprisePlans.starter.price'),
      billing: t('enterprisePlans.starter.billing'),
      features: [
        t('enterprisePlans.starter.features.0'),
        t('enterprisePlans.starter.features.1'),
        t('enterprisePlans.starter.features.2'),
        t('enterprisePlans.starter.features.3'),
        t('enterprisePlans.starter.features.4'),
      ],
      cta: t('enterprisePlans.starter.cta'),
    },
    {
      name: t('enterprisePlans.growth.name'),
      tagline: t('enterprisePlans.growth.tagline'),
      price: t('enterprisePlans.growth.price'),
      billing: t('enterprisePlans.growth.billing'),
      features: [
        t('enterprisePlans.growth.features.0'),
        t('enterprisePlans.growth.features.1'),
        t('enterprisePlans.growth.features.2'),
        t('enterprisePlans.growth.features.3'),
        t('enterprisePlans.growth.features.4'),
        t('enterprisePlans.growth.features.5'),
      ],
      cta: t('enterprisePlans.growth.cta'),
      recommended: true,
    },
    {
      name: t('enterprisePlans.custom.name'),
      tagline: t('enterprisePlans.custom.tagline'),
      price: t('enterprisePlans.custom.price'),
      billing: t('enterprisePlans.custom.billing'),
      features: [
        t('enterprisePlans.custom.features.0'),
        t('enterprisePlans.custom.features.1'),
        t('enterprisePlans.custom.features.2'),
        t('enterprisePlans.custom.features.3'),
        t('enterprisePlans.custom.features.4'),
        t('enterprisePlans.custom.features.5'),
      ],
      cta: t('enterprisePlans.custom.cta'),
    },
  ];

  const faqs = [
    {
      question: t('faqs.0.question'),
      answer: t('faqs.0.answer'),
    },
    {
      question: t('faqs.1.question'),
      answer: t('faqs.1.answer'),
    },
    {
      question: t('faqs.2.question'),
      answer: t('faqs.2.answer'),
    },
    {
      question: t('faqs.3.question'),
      answer: t('faqs.3.answer'),
    },
    {
      question: t('faqs.4.question'),
      answer: t('faqs.4.answer'),
    },
    {
      question: t('faqs.5.question'),
      answer: t('faqs.5.answer'),
    },
  ];

  const currentPlans =
    selectedTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white ">
      <PricingAnimations />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4169E1] via-[#1e3a8a] to-[#4169E1] text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {t('hero.title.part1')}
            <br />
            <span className="inline-block">{t('hero.title.highlight')}</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-24 mb-16">
            {/* Tab selector */}
            <div className="animate-fade-in-up">
              <PricingTabSelector
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />
            </div>

            {/* Pricing cards */}
            <PricingGrid
              plans={currentPlans}
              selectedTab={selectedTab}
              hoveredCard={hoveredCard}
              onCardHover={setHoveredCard}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <PricingFAQSection faqs={faqs} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
