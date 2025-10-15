'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Plan } from '@/types/account';

type CurrentPlanCardProps = {
  plan: Plan;
  onUpgrade: () => void;
  onCancelPlan: () => void;
};

export default function CurrentPlanCard({
  plan,
  onUpgrade,
  onCancelPlan,
}: CurrentPlanCardProps) {
  const t = useTranslations('common.billing.currentPlan');
  const usagePercentage = (plan.credits.used / plan.credits.total) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-blue-100 text-sm mb-1">{t('title')}</p>
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <p className="text-3xl font-bold mt-2">${plan.price}/month</p>
        </div>
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
          {t('active')}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{t('creditsUsage')}</span>
          <span className="text-sm">
            {plan.credits.used} / {plan.credits.total}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        <p className="text-xs text-blue-100 mt-2">
          {t('renewsOn')} {plan.renewalDate}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onUpgrade}
          className="flex-1 bg-white hover:bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <TrendingUp className="w-4 h-4" />
          {t('upgradePlan')}
        </button>
        <button
          onClick={onCancelPlan}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold text-sm transition-all cursor-pointer"
        >
          {t('cancelPlan')}
        </button>
      </div>
    </div>
  );
}
