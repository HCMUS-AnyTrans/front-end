'use client';

import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PricingCardHeader } from './PricingCardHeader';
import { PricingFeatures } from './PricingFeatures';

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
}

const PricingCard = memo(function PricingCard({
  name,
  tagline,
  price,
  billing,
  features,
  cta,
  recommended = false,
  contact = false,
}: PricingCardProps) {
  const isHighlighted = recommended;
  const cardBg = isHighlighted
    ? 'bg-gradient-to-br from-gradient-from to-gradient-to'
    : 'bg-card';
  const buttonBg = isHighlighted
    ? 'bg-card text-brand-primary-light hover:bg-muted'
    : 'bg-brand-primary-light text-primary-foreground hover:bg-brand-primary-dark';

  return (
    <div
      className={`group ${cardBg} rounded-3xl w-full p-8 flex flex-col relative border-2 transition-all duration-300 ease-out will-change-transform ${
        isHighlighted
          ? 'border-transparent shadow-2xl hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:scale-[1.02] hover:-translate-y-2'
          : 'border-border shadow-lg hover:border-[#4169E1]/50 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2'
      }`}
      style={{
        height: isHighlighted ? '700px' : '660px',
        ...(isHighlighted && {
          animation:
            'shimmer 3s ease-in-out infinite, float 6s ease-in-out infinite',
        }),
      }}
    >
      {isHighlighted && (
        <>
          <div
            className="absolute inset-0 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse-glow"
            style={{
              background:
                'linear-gradient(45deg, hsl(var(--gradient-from)), hsl(var(--gradient-to)), hsl(var(--gradient-from)))',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}
          />

          <div
            className="absolute -top-4 inset-x-0 mx-auto w-max bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{
              backgroundSize: '200% auto',
              animation:
                'gradient-x 3s linear infinite, bounce-subtle 2s ease-in-out infinite',
            }}
          >
            ✨ Most Popular
          </div>
        </>
      )}

      <PricingCardHeader
        name={name}
        tagline={tagline}
        price={price}
        billing={billing}
        contact={contact}
        isHighlighted={isHighlighted}
      />

      <PricingFeatures features={features} isHighlighted={isHighlighted} />

      <button
        className={`${buttonBg} rounded-xl h-14 w-full font-bold text-base transition-all duration-300 hover:scale-[1.05] hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer`}
      >
        {cta}
        <ArrowRight
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
});

export default PricingCard;
