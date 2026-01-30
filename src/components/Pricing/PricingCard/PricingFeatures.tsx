'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeaturesProps {
  features: string[];
  isHighlighted: boolean;
}

export function PricingFeatures({
  features,
  isHighlighted,
}: PricingFeaturesProps) {
  const featureBg = isHighlighted ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted';
  const featureTextColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';
  const checkBgColor = isHighlighted ? 'bg-white/20' : 'bg-brand-50';
  const checkColor = isHighlighted ? 'text-primary-foreground' : 'text-primary';

  return (
    <div
      className={`${featureBg} rounded-2xl p-6 flex-grow flex flex-col transition-all duration-300`}
    >
      <div className="flex flex-col gap-5 flex-grow mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 transition-all duration-300"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkBgColor}`}
            >
              <Check
                size={14}
                className={`${checkColor} transition-colors duration-300`}
                strokeWidth={3}
              />
            </div>
            <span
              className={`font-medium text-sm ${featureTextColor} transition-colors duration-300`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
