'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';

interface PricingTabSelectorProps {
  selectedTab: 'personal' | 'enterprise';
  onTabChange: (tab: 'personal' | 'enterprise') => void;
}

const PricingTabSelector = memo(function PricingTabSelector({
  selectedTab,
  onTabChange,
}: PricingTabSelectorProps) {
  const t = useTranslations('pricing.tabs');

  return (
    <div className="bg-white rounded-2xl shadow-md p-2 w-[360px] h-[72px] flex items-center gap-6 transition-all duration-500 hover:shadow-xl">

      <button
        onClick={() => onTabChange('personal')}
        className={`cursor-pointer flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedTab === 'personal'
            ? 'bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] text-white shadow-lg scale-[1.02]'
            : 'bg-transparent text-gray-600 hover:bg-gray-50'
        }`}
      >
        {t('personal')}
      </button>
      <button
        onClick={() => onTabChange('enterprise')}
        className={`cursor-pointer flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedTab === 'enterprise'
            ? 'bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] text-white shadow-lg scale-[1.02]'
            : 'bg-transparent text-gray-600 hover:bg-gray-50'
        }`}
      >
        {t('enterprise')}
      </button>
    </div>
  );
});

export default PricingTabSelector;
