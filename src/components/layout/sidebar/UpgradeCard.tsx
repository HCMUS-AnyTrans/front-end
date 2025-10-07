'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export default function UpgradeCard() {
  return (
    <div className="px-4 pb-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-semibold text-gray-900 text-center mb-1">
          Upgrade to Pro
        </p>
        <p className="text-xs text-gray-600 text-center mb-3">
          Get unlimited translations & priority support
        </p>
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
