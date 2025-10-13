'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Shield, Globe } from 'lucide-react';
import { BackgroundPattern } from '@/components/Features/shared';

const stats = [
  { label: 'Languages', value: '100+', icon: Globe },
  { label: 'Processing Speed', value: '<5s', icon: Zap },
  { label: 'Security', value: '100%', icon: Shield },
];

export default function FeaturesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full bg-white border-b border-gray-200 py-20 sm:py-24 overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern variant="dots" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-block mb-6 transition-all duration-700"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            <span className="text-sm font-bold tracking-wider uppercase text-[#4169E1]">
              Translation Platform
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '100ms',
            }}
          >
            Two Powerful Tools.
            <br />
            <span className="text-[#4169E1]">Infinite Possibilities.</span>
          </h1>

          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 transition-all duration-700"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '200ms',
            }}
          >
            Professional-grade document and subtitle translation powered by
            cutting-edge AI technology.
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-[#4169E1]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
