'use client';

import React from 'react';
import { FileText, Film } from 'lucide-react';
import {
  FeaturesHero,
  FeatureShowcase,
  FeaturesComparison,
  FeaturesCTA,
} from '@/components/Features';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  {
    title: 'Document Translation',
    description:
      'Transform your business documents, reports, and presentations into any language while maintaining perfect formatting, layout, and professional quality.',
    icon: FileText,
    gradient: 'from-blue-500 to-indigo-600',
    href: '/features/document-translation',
    imagePosition: 'right' as const,
    features: [
      'DOCX, PDF, XLSX, PPTX',
      'Layout Preservation',
      'Batch Processing',
      'Instant Download',
      'Table & Chart Support',
      'Custom Glossary',
    ],
    benefits: [
      'Business reports and presentations',
      'Legal and financial documents',
      'Academic papers and research',
      'Marketing materials and brochures',
      'Technical documentation',
    ],
  },
  {
    title: 'Subtitle Translation',
    description:
      'Translate video subtitles with perfect timing synchronization. Support for all major subtitle formats with real-time preview and quality control.',
    icon: Film,
    gradient: 'from-purple-500 to-pink-600',
    href: '/features/subtitle-translation',
    imagePosition: 'left' as const,
    features: [
      'SRT, VTT, ASS, SSA',
      'Timing Sync',
      'Real-time Preview',
      'Bulk Processing',
      'Quality Check',
      'Multiple Exports',
    ],
    benefits: [
      'YouTube and online videos',
      'Movies and TV shows',
      'Educational content',
      'Corporate training videos',
      'Social media content',
    ],
  },
];

export default function FeaturesClient() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <FeaturesHero />

        {/* Feature Showcases */}
        {features.map((feature, index) => (
          <FeatureShowcase key={feature.title} {...feature} index={index} />
        ))}

        {/* Comparison Table */}
        <FeaturesComparison />

        {/* CTA Section */}
        <FeaturesCTA />
      </main>

      <Footer />
    </div>
  );
}
