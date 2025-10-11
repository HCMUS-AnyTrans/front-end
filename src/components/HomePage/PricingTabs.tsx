'use client';

import React, { useState, useEffect } from 'react';
import {
  PricingTabSelector,
  PricingGrid,
  PricingAnimations,
} from '@/src/components/Pricing';
import { personalPlans, enterprisePlans } from '@/src/lib/pricing-plans';

export default function PricingTabs() {
  const [selectedTab, setSelectedTab] = useState<'personal' | 'enterprise'>(
    'enterprise'
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const currentPlans =
    selectedTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <section className="w-full py-20 bg-gradient-to-br from-muted to-accent/30 overflow-hidden">
      <PricingAnimations />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-24">
          {/* Header */}
          <div
            className={`flex flex-col items-center gap-8 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
          >
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-5xl lg:text-6xl leading-tight text-foreground">
                Choose Plan
                <br />
                <span className="text-brand-primary inline-block transition-all duration-1000 ease-out">
                  That&apos;s Right For You
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Choose plan that works best for you, feel free to contact us
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
          <PricingGrid
            plans={currentPlans}
            selectedTab={selectedTab}
            hoveredCard={hoveredCard}
            onCardHover={setHoveredCard}
          />
        </div>
      </div>
    </section>
  );
}
