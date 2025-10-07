'use client';

import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';

type PromoBannerVariant = 'upgrade' | 'referral';

type PromoBannerProps = {
  variant: PromoBannerVariant;
};

const bannerConfig = {
  upgrade: {
    title: 'Boost your productivity',
    description:
      'Upgrade to Pro for higher limits, faster processing and premium features.',
    buttonText: 'Explore Plans',
    buttonHref: '/pricing',
    headerTextColor: 'text-white',
    icon: Zap,
    className:
      'bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white',
    buttonClassName:
      'w-full inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 px-4 py-2.5 rounded-xl font-semibold transition-all',
    descriptionClassName: 'text-sm text-blue-100 mb-4',
  },
  referral: {
    title: 'Invite friends, get credits',
    description:
      'Share Anytrans with your teammates and earn bonus translation credits for every signup.',
    buttonText: 'Invite Now',
    buttonHref: '/referrals',
    headerTextColor: 'text-gray-900',
    icon: ArrowUpRight,
    className: 'bg-white rounded-2xl border border-gray-200 p-6',
    buttonClassName:
      'w-full inline-flex items-center justify-center border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-semibold transition-all',
    descriptionClassName: 'text-sm text-gray-600 mb-4',
  },
};

export default function PromoBanner({ variant }: PromoBannerProps) {
  const config = bannerConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className={config.className}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-bold ${config.headerTextColor}`}>
          {config.title}
        </h3>
        <IconComponent className="w-6 h-6 text-gray-400" />
      </div>
      <p className={config.descriptionClassName}>{config.description}</p>
      <a href={config.buttonHref} className={config.buttonClassName}>
        {config.buttonText}
      </a>
    </div>
  );
}
