'use client';

import React from 'react';
import { Film, Check, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FeatureDetailSection,
  FeatureSectionHeader,
  BackgroundPattern,
  Benefit,
} from '@/components/Features/shared';

export default function FeatureGrid() {
  const features = [
    {
      title: 'Document Translation',
      description:
        'Transform your business documents, reports, and presentations into any language while maintaining perfect formatting, layout, and professional quality. Powered by advanced AI technology.',
      features: [
        'Support for DOCX, PDF, XLSX, PPTX formats',
        'Preserve original formatting and layout',
        'Batch processing for multiple files',
        'AI-powered contextual translation',
      ],
      benefits: [
        { icon: Zap, text: 'Fast Processing' },
        { icon: Shield, text: 'Secure & Private' },
        { icon: Globe, text: '100+ Languages' },
      ] as Benefit[],
      imagePosition: 'right' as const,
      gradient: 'from-blue-500 to-indigo-600',
      ctaText: 'Try Document Translation',
      ctaHref: '/features/document-translation',
    },
    {
      title: 'Subtitle Translation',
      description:
        'Translate video subtitles with perfect timing synchronization. Support for all major subtitle formats with intelligent context-aware translation that preserves meaning and timing.',
      features: [
        'Support for SRT, VTT, ASS, SSA formats',
        'Perfect timing synchronization',
        'Real-time preview and editing',
        'Context-aware subtitle adaptation',
      ],
      benefits: [
        { icon: Film, text: 'Video Ready' },
        { icon: Zap, text: 'Auto Sync' },
        { icon: Check, text: 'Quality Check' },
      ] as Benefit[],
      imagePosition: 'left' as const,
      gradient: 'from-purple-500 to-pink-600',
      ctaText: 'Try Subtitle Translation',
      ctaHref: '/features/subtitle-translation',
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern variant="dots" opacity={0.02} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FeatureSectionHeader
          title={
            <>
              Professional Tools for
              <br />
              <span className="bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] bg-clip-text text-transparent">
                Every Translation Need
              </span>
            </>
          }
          description="Choose the right tool for your project. Both powered by state-of-the-art AI technology for professional results."
          align="center"
          className="mb-16 lg:mb-20"
        />

        {/* Features */}
        <div className="space-y-12 lg:space-y-20">
          {features.map((feature, index) => (
            <FeatureDetailSection key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who trust AnyTrans for their translation
            needs. Start your free trial today.
          </p>
          <Button variant="gradient-primary" size="hero" asChild>
            <a href="/signup">Start Free Trial</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
