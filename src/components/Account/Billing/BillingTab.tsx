'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function BillingTab() {
  const t = useTranslations('common.billing.billingTab');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('title')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('currentPlan')}
            </label>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Pro Plan</h4>
                  <p className="text-sm text-gray-600">$29/month</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  {t('active')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('paymentMethod')}
            </label>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">V</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Visa ending in 4242
                  </p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="default">{t('updatePaymentMethod')}</Button>
            <Button variant="secondary">{t('viewBillingHistory')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
