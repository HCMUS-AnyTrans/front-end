'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  icon?: React.ReactNode;
  iconWrapperClass?: string;
  title: string;
  description?: string;
  popular?: boolean;
  price?: number | null;
  priceLabel?: string;
  cta?: string;
  features?: Array<{ text: string; included: boolean }>;
  onCtaClick?: () => void;
  className?: string;
}

export function PricingCard({
  icon,
  iconWrapperClass = 'bg-brand-100',
  title,
  description,
  popular,
  price,
  priceLabel,
  cta,
  features,
  onCtaClick,
  className = '',
}: PricingCardProps) {
  return (
    <div
      className={`bg-card rounded-2xl overflow-hidden transition-all ${
        popular
          ? 'border-2 border-brand-primary-light shadow-2xl md:scale-105'
          : 'border border-border shadow-lg hover:shadow-xl'
      } ${className}`}
    >
      {popular && (
        <div className="bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from text-primary-foreground text-center py-2 text-sm font-semibold">
          ⭐ Most Popular
        </div>
      )}

      <div className="p-6 sm:p-8">
        {icon && (
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${iconWrapperClass}`}
          >
            {icon}
          </div>
        )}

        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>

        <div className="mb-6">
          {price !== null ? (
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-foreground">
                  ${price}
                </span>
                <span className="text-muted-foreground">{priceLabel}</span>
              </div>
            </div>
          ) : (
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              Contact us
            </div>
          )}
        </div>

        {cta && (
          <button
            onClick={onCtaClick}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-6 cursor-pointer ${
              popular
                ? 'bg-gradient-to-r from-gradient-from to-gradient-to hover:from-gradient-to hover:to-gradient-from text-primary-foreground shadow-lg'
                : 'bg-muted hover:bg-accent text-foreground'
            }`}
          >
            {cta}
          </button>
        )}

        {features && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground mb-4">
              What&apos;s included:
            </p>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-border flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={`text-sm ${
                    feature.included
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
