'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  PricingTabSelector,
  PricingGrid,
  PricingAnimations,
  PricingFAQSection,
} from '@/components/Pricing';
import { personalPlans, enterprisePlans } from '@/lib/pricing-plans';
import { faqs } from '@/lib/pricing-data';

export default function PricingPageClient() {
  const [selectedTab, setSelectedTab] = useState<'personal' | 'enterprise'>(
    'enterprise'
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            Choose Plan
            <br />
            <span className="inline-block">That's Right For You</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose plan that works best for you, feel free to contact us
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-24 mb-16">
            {/* Tab selector */}
            <PricingTabSelector
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              isLoaded={isLoaded}
            />

            {/* Pricing cards */}
            <PricingGrid
              plans={currentPlans}
              selectedTab={selectedTab}
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
