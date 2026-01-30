'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  FileText,
  Languages,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RecentActivityItem } from '@/features/dashboard';

type RecentActivityListProps = {
  items: RecentActivityItem[];
};

export default function RecentActivityList({ items }: RecentActivityListProps) {
  const t = useTranslations('dashboard.recentActivity');
  const locale = useLocale();

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200">
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{t('title')}</h3>
          <Button variant="link" className="text-sm p-0 h-auto">
            {t('viewAll')}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate mb-1">
                  {item.fileName}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    {item.sourceLang} → {item.targetLang}
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {item.wordCount.toLocaleString(locale)} {t('words')}
                  </span>
                </div>
              </div>
              <div className="sm:ml-auto mt-2 sm:mt-0">
                {item.status === 'completed' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-medium text-green-600">
                      {t('status.completed')}
                    </span>
                  </div>
                ) : item.status === 'failed' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-xs font-medium text-red-600">
                      {t('status.failed')}
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      {t('status.processing')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
