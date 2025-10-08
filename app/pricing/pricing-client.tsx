'use client';

import React, { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import {
  PricingHero,
  PricingTabs,
  PricingPlansGrid,
  PricingFAQ,
  PricingCTA,
} from '@/src/components/Pricing';
import { personalPlans, enterprisePlans, faqs } from '@/src/lib/pricing-data';
import { BillingPeriod, PlanTab } from '@/src/types/pricing';

export default function PricingPageClient() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [activeTab, setActiveTab] = useState<PlanTab>('personal');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const currentPlans =
    activeTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PricingHero
        billingPeriod={billingPeriod}
        onBillingPeriodChange={setBillingPeriod}
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <PricingTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <PricingPlansGrid
            plans={currentPlans}
            billingPeriod={billingPeriod}
          />
          <PricingFAQ
            faqs={faqs}
            openIndex={openFaqIndex}
            onToggle={setOpenFaqIndex}
          />
          <PricingCTA />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
