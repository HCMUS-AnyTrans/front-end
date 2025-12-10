'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  FeatureDetailSection,
  FeatureDetailSectionProps,
  Benefit,
} from '@/components/Features/shared';

interface FeatureShowcaseProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  href: string;
  gradient: string;
  imagePosition: 'left' | 'right';
  index: number;
  cta: string;
  mockupSubDomain: string;
  id?: string;
}

export default function FeatureShowcase({
  title,
  description,
  icon,
  features,
  benefits,
  href,
  gradient,
  imagePosition,
  index,
  cta,
  mockupSubDomain,
  id
}: FeatureShowcaseProps) {
  // Convert string[] benefits to Benefit[] format
  // For now, we'll use generic icons or map to proper ones
  const benefitItems: Benefit[] = benefits.map((text) => ({
    icon: icon, // Use the same icon for all benefits
    text,
  }));

  const sectionProps: FeatureDetailSectionProps = {
    title,
    description,
    features,
    benefits: benefitItems,
    imagePosition,
    gradient,
    index,
    ctaText: cta,
    ctaHref: href,
    icon,
    showIcon: true,
    variant: 'compact',
    mockupSubDomain
  };

  return (
    <section
      id={id}
      className={`w-full py-16 sm:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureDetailSection {...sectionProps} />
      </div>
    </section>
  );
}
