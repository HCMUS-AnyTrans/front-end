'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle, RefreshCw, Clock } from 'lucide-react';
import { StatusConfig } from '@/types/translation-history';

export function useStatusConfig(status: string): StatusConfig {
  const t = useTranslations('translationHistory.table');

  switch (status) {
    case 'completed':
      return {
        icon: CheckCircle2,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: t('status.completed'),
      };
    case 'processing':
      return {
        icon: RefreshCw,
        color: 'text-[#4169E1]',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: t('status.processing'),
      };
    case 'failed':
      return {
        icon: AlertCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: t('status.failed'),
      };
    default:
      return {
        icon: Clock,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        label: t('status.unknown'),
      };
  }
}
