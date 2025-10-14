'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { AboutTimelineProps } from '@/types/about';

export default function AboutTimeline({ milestones }: AboutTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div
        className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Our Journey
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          Key milestones in our growth story
        </p>
      </div>

      <div className="relative">
        {/* Timeline line for mobile */}
        <div className="lg:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4169E1]/30 via-[#1e3a8a]/30 to-[#4169E1]/30"></div>

        {/* Timeline line for desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4169E1]/30 via-[#1e3a8a]/30 to-[#4169E1]/30 transform -translate-x-1/2"></div>

        <div className="space-y-10 sm:space-y-12 lg:space-y-8">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.year}
              className={`flex items-start lg:items-center gap-6 lg:gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : idx % 2 === 0
                    ? 'opacity-0 -translate-x-12'
                    : 'opacity-0 translate-x-12'
              }`}
              style={{
                transitionDelay: isVisible ? '0ms' : `${idx * 200}ms`,
              }}
            >
              {/* Mobile timeline dot */}
              <div className="lg:hidden relative flex-shrink-0">
                <div className="w-4 h-4 bg-[#4169E1] rounded-full border-4 border-gray-50 animate-pulse"></div>
              </div>

              <div
                className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block w-full lg:w-auto cursor-pointer shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-[#4169E1]" />
                    <span className="text-xl sm:text-2xl font-bold text-[#4169E1]">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Desktop timeline dot */}
              <div className="hidden lg:block relative">
                <div className="w-4 h-4 bg-[#4169E1] rounded-full border-4 border-gray-50 animate-pulse"></div>
              </div>

              <div className="flex-1 hidden lg:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
