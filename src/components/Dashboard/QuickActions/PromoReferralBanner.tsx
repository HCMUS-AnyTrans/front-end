'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PromoReferralBanner() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">
          Invite friends, get credits
        </h3>
        <ArrowUpRight className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Share Anytrans with your teammates and earn bonus translation credits
        for every signup.
      </p>
      <a
        href="/referrals"
        className="w-full inline-flex items-center justify-center border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-semibold transition-all"
      >
        Invite Now
      </a>
    </div>
  );
}
