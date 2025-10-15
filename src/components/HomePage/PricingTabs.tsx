'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  PricingTabSelector,
  PricingGrid,
  PricingAnimations,
} from '@/components/Pricing';

export default function PricingTabs() {
  const t = useTranslations('pricing');
  const [selectedTab, setSelectedTab] = useState<'personal' | 'enterprise'>(
    'enterprise'
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const currentPlans =
    selectedTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <section className="w-full py-20 bg-gradient-to-br from-muted to-accent/30 overflow-hidden">
      <PricingAnimations />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-24">
          {/* Header */}
          <div
            className={`flex flex-col items-center gap-8 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
          >
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-5xl lg:text-6xl leading-tight text-foreground">
                {t('header.title.part1')}
                <br />
                <span className="text-brand-primary inline-block">
                  {t('header.title.highlight')}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                {t('header.description')}
              </p>
            </div>

            {/* Tab selector */}
            <PricingTabSelector
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              isLoaded={isLoaded}
            />
          </div>

          {/* Pricing cards */}
          <PricingGrid plans={currentPlans} selectedTab={selectedTab} />
        </div>
      </div>
    </section>
  );
}
