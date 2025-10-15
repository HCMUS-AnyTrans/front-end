'use client';

import React from 'react';
import { CreditCard, Star, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PaymentMethod } from '@/types/account';

type PaymentMethodsListProps = {
  methods: PaymentMethod[];
  onAddCard: () => void;
  onSetDefault: (id: string) => void;
  onMoreAction?: (id: string) => void;
};

export default function PaymentMethodsList({
  methods,
  onAddCard,
  onSetDefault,
  onMoreAction,
}: PaymentMethodsListProps) {
  const t = useTranslations('common.billing.paymentMethods');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
        <button
          onClick={onAddCard}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
        >
          {t('addCard')}
        </button>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {method.type === 'visa' ? 'Visa' : 'Mastercard'} ••••{' '}
                    {method.last4}
                  </span>
                  {method.isDefault && (
                    <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      {t('default')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {t('expires')}{' '}
                  {method.expiryMonth.toString().padStart(2, '0')}/
                  {method.expiryYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <button
                  onClick={() => onSetDefault(method.id)}
                  className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                >
                  {t('setDefault')}
                </button>
              )}
              <button
                onClick={() => onMoreAction?.(method.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
