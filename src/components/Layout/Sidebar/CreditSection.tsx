'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Coins, TrendingUp } from 'lucide-react';
import { ROUTES } from '@/config';

type CreditSectionProps = {
  current: number;
  total: number;
};

export default function CreditSection({ current, total }: CreditSectionProps) {
  const t = useTranslations('sidebar.credits');
  const creditPercentage = (current / total) * 100;
  const isLowCredit = creditPercentage < 30;

  return (
    <div className="px-4 pb-4 pt-4 truncate">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLowCredit
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-500'
              }`}
            >
              <Coins className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{t('title')}</p>
            </div>
          </div>
          <Link
            href={ROUTES.ACCOUNT.CREDITS}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t('viewDetails')}
          </Link>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-1 mb-2">
            <span
              className={`text-2xl font-bold ${
                isLowCredit ? 'text-amber-600' : 'text-gray-900'
              }`}
            >
              {current}
            </span>
            <span className="text-sm text-gray-500">
              / {total} {t('creditsLabel')}
            </span>
          </div>

          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                isLowCredit
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
              }`}
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
        </div>

        {isLowCredit && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                {t('lowCreditWarning')}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={ROUTES.ACCOUNT.BUY_CREDITS}
            className="text-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-colors"
          >
            {t('buyCredits')}
          </Link>
          <Link
            href={ROUTES.PUBLIC.PRICING}
            className="text-center text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 py-2 rounded-lg transition-colors border border-gray-200"
          >
            {t('viewPlans')}
          </Link>
        </div>
      </div>
    </div>
  );
}
