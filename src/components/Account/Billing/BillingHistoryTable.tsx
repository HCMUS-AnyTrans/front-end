'use client';

import React from 'react';
import { Calendar, CheckCircle, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Invoice } from '@/types/account';

type BillingHistoryTableProps = {
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
};

export default function BillingHistoryTable({
  invoices,
  onDownload,
}: BillingHistoryTableProps) {
  const t = useTranslations('common.billing.billingHistory');

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                {t('date')}
              </th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                {t('amount')}
              </th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                {t('status')}
              </th>
              <th className="text-right px-4 sm:px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id}
                className={
                  index !== invoices.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }
              >
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-900 whitespace-nowrap">
                      {invoice.date}
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ${invoice.amount}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" />
                    {t('paid')}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <button
                    onClick={() => onDownload?.(invoice.id)}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('download')}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
