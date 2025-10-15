'use client';

import React, { useState } from 'react';

interface FeatureMockupProps {
  title: string;
  gradient: string;
  showBrowserChrome?: boolean;
  subDomain: string;
}

export default function FeatureMockup({
  title,
  gradient,
  showBrowserChrome = true,
  subDomain
}: FeatureMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser Chrome */}
      {showBrowserChrome && (
        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 font-mono">
              {subDomain}.anytrans.me
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div
        className={`absolute inset-0 ${showBrowserChrome ? 'top-10' : ''} p-6 overflow-hidden`}
      >
        {/* Simulated UI */}
        <div className="space-y-4">
          {/* Header Bars */}
          <div
            className={`h-3 bg-gradient-to-r ${gradient} rounded-full opacity-30 w-2/3`}
          />
          <div
            className={`h-3 bg-gradient-to-r ${gradient} rounded-full opacity-20 w-full`}
          />
          <div
            className={`h-3 bg-gradient-to-r ${gradient} rounded-full opacity-15 w-4/5`}
          />

          {/* Main Content Box */}
          <div className="mt-8">
            <div
              className={`h-40 bg-gradient-to-br ${gradient} rounded-2xl opacity-10 shadow-lg transition-all duration-500 ${
                isHovered ? 'scale-105 opacity-20' : ''
              }`}
            />
          </div>

          {/* Bottom Items */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div
              className={`h-24 bg-gradient-to-br ${gradient} rounded-xl opacity-10`}
            />
            <div
              className={`h-24 bg-gradient-to-br ${gradient} rounded-xl opacity-10`}
            />
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`}
            />
            <span className="text-xs font-bold text-gray-700">Active</span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-500 ${
            isHovered ? 'opacity-5' : 'opacity-0'
          }`}
        />
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 blur-2xl`}
      />
      <div
        className={`absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 blur-2xl`}
      />
    </div>
  );
}
