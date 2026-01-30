'use client';

import React, { memo } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingCardHeaderProps {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  contact: boolean;
  isHighlighted: boolean;
}

export function PricingCardHeader({
  name,
  tagline,
  price,
  billing,
  contact,
  isHighlighted,
}: PricingCardHeaderProps) {
  const titleColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';
  const taglineColor = isHighlighted
    ? 'text-primary-foreground/80'
    : 'text-muted-foreground';
  const priceColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';

  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <h3
          className={`font-bold text-3xl ${titleColor} transition-colors duration-300`}
        >
          {name}
        </h3>
        <p
          className={`text-base ${taglineColor} max-w-[280px] transition-colors duration-300`}
        >
          {tagline}
        </p>

        {contact ? (
          <div
            className={`text-4xl font-bold ${priceColor} mt-4 transition-colors duration-300`}
          >
            Contact us
          </div>
        ) : (
          <div className="flex items-baseline mt-4">
            <span
              className={`font-semibold text-2xl ${priceColor} transition-colors duration-300`}
            >
              $
            </span>
            <span
              className={`font-bold text-6xl ${priceColor} ml-2 transition-colors duration-300`}
            >
              {price}
            </span>
            <span
              className={`text-lg ${taglineColor} ml-2 transition-colors duration-300`}
            >
              {billing}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
