'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export default function PromoUpgradeBanner() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Boost your productivity</h3>
        <Zap className="w-6 h-6 opacity-90" />
      </div>
      <p className="text-sm text-blue-100 mb-4">
        Upgrade to Pro for higher limits, faster processing and premium
        features.
      </p>
      <a
        href="/pricing"
        className="w-full inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 px-4 py-2.5 rounded-xl font-semibold transition-all"
      >
        Explore Plans
      </a>
    </div>
  );
}
