'use client';

import React from 'react';
import { Calendar, CheckCircle, Download } from 'lucide-react';
import { Invoice } from '@/src/types/account';

type BillingHistoryTableProps = {
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
};

export default function BillingHistoryTable({
  invoices,
  onDownload,
}: BillingHistoryTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                Actions
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
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {invoice.date}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    ${invoice.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDownload?.(invoice.id)}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
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
