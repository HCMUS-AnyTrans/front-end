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
  hoveredCard: string | null;
  onCardHover: (cardId: string | null) => void;
}

export default function PricingGrid({
  plans,
  selectedTab,
  hoveredCard,
  onCardHover,
}: PricingGridProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 w-full">
      {plans.map((plan, index) => (
        <div
          key={`${selectedTab}-${index}`}
          className="transition-all duration-700"
          style={{
            animation: `fade-in-up 0.8s ease-out ${index * 0.15}s both`,
          }}
        >
          <PricingCard
            {...plan}
            isHovered={hoveredCard === `${selectedTab}-${index}`}
            onHover={(hovered) =>
              onCardHover(hovered ? `${selectedTab}-${index}` : null)
            }
          />
        </div>
      ))}
    </div>
  );
}
