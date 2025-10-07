'use client';

import React, { useState } from 'react';
import { ArrowRight, FileText, Subtitles, Check } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

function FeatureCard({
  title,
  description,
  icon,
  features,
  color,
  isHovered = false,
  onHover,
}: FeatureCardProps) {
  return (
    <div
      className={`relative h-[560px] w-full max-w-[520px] rounded-3xl overflow-hidden bg-white cursor-pointer transition-all duration-700 ease-out border ${
        isHovered
          ? 'border-transparent shadow-2xl scale-[1.03]'
          : 'border-gray-200 shadow-lg'
      }`}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        }}
      />

      {/* Decorative blob */}
      <div
        className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl transition-all duration-700 ${
          isHovered ? 'opacity-30 scale-150' : 'opacity-0 scale-100'
        }`}
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 h-full flex flex-col p-10">
        {/* Icon section with floating effect */}
        <div className="flex items-start justify-between mb-8">
          <div
            className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-700 ${
              isHovered ? 'shadow-2xl rotate-6 scale-110' : 'shadow-md'
            }`}
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${color}, ${color}dd)`
                : `${color}15`,
            }}
          >
            <div
              className={`transition-all duration-700 ${
                isHovered ? 'text-white scale-110' : 'text-gray-700'
              }`}
            >
              {icon}
            </div>
          </div>

          {/* Floating arrow indicator */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
              isHovered
                ? 'bg-white shadow-lg scale-110 rotate-45'
                : 'bg-gray-100 scale-100'
            }`}
          >
            <ArrowRight
              size={20}
              className={`transition-all duration-700 ${
                isHovered ? '-rotate-45' : ''
              }`}
              style={{ color: isHovered ? color : '#6B7280' }}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3
            className={`font-bold text-3xl mb-4 transition-all duration-700 ${
              isHovered ? 'translate-x-2' : ''
            }`}
            style={{ color: isHovered ? color : '#0F172A' }}
          >
            {title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {description}
          </p>

          {/* Features list with stagger animation */}
          <div className="flex flex-col gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  isHovered
                    ? 'translate-x-2 opacity-100'
                    : 'translate-x-0 opacity-80'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 ${
                    isHovered ? 'shadow-md scale-110' : 'scale-100'
                  }`}
                  style={{
                    background: isHovered ? color : `${color}20`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <Check
                    size={14}
                    className={`transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-gray-600'
                    }`}
                    strokeWidth={3}
                  />
                </div>
                <span className="text-gray-700 text-[15px] font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`absolute bottom-0 left-0 h-1 transition-all duration-700 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
      />
    </div>
  );
}

export default function FeatureGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features = [
    {
      id: 'document',
      title: 'Document Translation',
      description:
        'Translate your documents instantly while preserving formatting, layout, and structure. Support for DOCX, PDF, and PPTX files with enterprise-grade accuracy.',
      icon: <FileText size={40} strokeWidth={1.8} />,
      color: '#3B82F6',
      features: [
        'Preserve original formatting and layout',
        'Support for 50+ file formats',
        'Batch processing up to 100 files',
        'AI-powered context understanding',
      ],
    },
    {
      id: 'subtitle',
      title: 'Subtitle Translation',
      description:
        'Perfect timing and synchronization for your video subtitles. Support for SRT, VTT, and direct MP4 video translation with accurate timing preservation.',
      icon: <Subtitles size={40} strokeWidth={1.8} />,
      color: '#8B5CF6',
      features: [
        'Perfect timing synchronization',
        'Multiple subtitle formats supported',
        'Direct video file translation',
        'Context-aware subtitle adaptation',
      ],
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30 py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="text-center max-w-3xl">
            <h2 className="font-bold text-5xl lg:text-6xl leading-tight text-[#0F172A] mb-6">
              Translation Tools That
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Work For You
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the next generation of translation technology with our
              advanced AI-powered features
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                isHovered={hoveredCard === feature.id}
                onHover={(hovered) =>
                  setHoveredCard(hovered ? feature.id : null)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
