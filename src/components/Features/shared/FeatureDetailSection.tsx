'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureMockup from './FeatureMockup';
import FeatureListItem from './FeatureListItem';
import BenefitGrid, { Benefit } from './BenefitGrid';

export interface FeatureDetailSectionProps {
  title: string;
  description: string;
  features: string[];
  benefits: Benefit[];
  imagePosition: 'left' | 'right';
  gradient: string;
  index: number;
  ctaText: string;
  ctaHref: string;
  icon?: LucideIcon;
  showIcon?: boolean;
  variant?: 'default' | 'compact';
  mockupSubDomain: string;
}

export default function FeatureDetailSection({
  title,
  description,
  features,
  benefits,
  imagePosition,
  gradient,
  index,
  ctaText,
  ctaHref,
  icon: Icon,
  showIcon = false,
  variant = 'default',
  mockupSubDomain
}: FeatureDetailSectionProps) {
  const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50';

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${bgClass} rounded-3xl p-8 lg:p-12`}
    >
      {/* Content */}
      <div
        className={`space-y-6 ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="space-y-4">
          {/* Icon + Title (if showIcon) */}
          {showIcon && Icon && (
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
          )}

          {/* Badge (for default variant) */}
          {variant === 'default' && (
            <div className="inline-block">
              <span className="text-sm font-bold uppercase tracking-wider text-[#4169E1] bg-blue-50 px-4 py-2 rounded-full">
                Feature
              </span>
            </div>
          )}

          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          {variant === 'compact' && (
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Key Features
            </h4>
          )}
          <div
            className={
              variant === 'compact' ? 'grid sm:grid-cols-2 gap-3' : 'space-y-3'
            }
          >
            {features.map((feature, idx) => (
              <FeatureListItem
                key={idx}
                text={feature}
                gradient={gradient}
                variant={variant}
              />
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <BenefitGrid benefits={benefits} columns={3} />
      </div>

      {/* Visual/Mockup */}
      <div
        className={`relative ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <FeatureMockup title={title} gradient={gradient} subDomain={mockupSubDomain} />
      </div>
    </div>
  );
}
