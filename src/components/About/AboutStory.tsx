'use client';

import React, { useState, useEffect } from 'react';
import { Target, Globe } from 'lucide-react';
import { AboutStoryProps } from '@/types/about';

export default function AboutStory({ mission, vision }: AboutStoryProps) {
  const MissionIcon = mission.icon;
  const VisionIcon = vision.icon;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <div
        className={`text-center mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Story</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From a small team with a big vision to a global platform trusted by
          thousands
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className={`bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="w-14 h-14 bg-[#4169E1]/10 rounded-xl flex items-center justify-center mb-4 hover:bg-[#4169E1]/20 hover:scale-110 transition-all duration-300">
            <MissionIcon className="w-7 h-7 text-[#4169E1]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {mission.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{mission.description}</p>
        </div>

        <div
          className={`bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="w-14 h-14 bg-[#1e3a8a]/10 rounded-xl flex items-center justify-center mb-4 hover:bg-[#1e3a8a]/20 hover:scale-110 transition-all duration-300">
            <VisionIcon className="w-7 h-7 text-[#1e3a8a]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {vision.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{vision.description}</p>
        </div>
      </div>
    </section>
  );
}
