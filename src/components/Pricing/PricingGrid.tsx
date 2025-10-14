'use client';

import React from 'react';
import PricingCard from './PricingCard';

interface Plan {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
}

interface PricingGridProps {
  plans: Plan[];
  selectedTab: string;
}

export default function PricingGrid({
  plans,
  selectedTab,
}: PricingGridProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-20 md:gap-8 w-full">
      {plans.map((plan, index) => (
        <div
          key={`${selectedTab}-${index}`}
          className="transition-all duration-500"
          style={{
            animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          <PricingCard {...plan} />
        </div>
      ))}
    </div>
  );
}
