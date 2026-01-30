'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseDialog, BaseDialogContent } from '@/components/Common';

type AddCardDialogProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onSubmit: (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => void;
};

export default function AddCardDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddCardDialogProps) {
  const t = useTranslations('common.billing.addCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [cardholder, setCardholder] = React.useState('');

  return (
    <BaseDialog open={open} onOpenChange={onOpenChange}>
      <BaseDialogContent className="max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{t('title')}</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('cardNumber')}
            </label>
            <input
              type="text"
              placeholder={t('cardNumberPlaceholder')}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('month')}
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m.toString()}>
                    {m.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('year')}
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => 2025 + i).map((y) => (
                  <option key={y} value={y.toString()}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('cvc')}
              </label>
              <input
                type="text"
                placeholder={t('cvcPlaceholder')}
                maxLength={3}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('cardholderName')}
            </label>
            <input
              type="text"
              placeholder={t('cardholderPlaceholder')}
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              onClick={() => {
                onSubmit({ cardNumber, month, year, cvc, cardholder });
                onOpenChange(false);
              }}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
            >
              {t('addCard')}
            </button>
          </div>
        </div>
      </BaseDialogContent>
    </BaseDialog>
  );
}
