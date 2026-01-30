'use client';

import React, { useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  FileText,
  Languages,
  Clock,
  MoreVertical,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { TranslationItem, StatusConfig } from '@/types/translation-history';

interface MobileRowLayoutProps {
  item: TranslationItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showActionMenu: boolean;
  onToggleActionMenu: () => void;
  statusConfig: StatusConfig;
  onViewDetails: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export function MobileRowLayout({
  item,
  isSelected,
  onSelect,
  showActionMenu,
  onToggleActionMenu,
  statusConfig,
  onViewDetails,
  onDownload,
  onDelete,
}: MobileRowLayoutProps) {
  const t = useTranslations('translationHistory.table');
  const locale = useLocale();

  const handleSelect = useCallback(() => {
    onSelect(item.id);
  }, [onSelect, item.id]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className="block md:hidden space-y-3">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="w-4 h-4 mt-1 text-brand-primary-light bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-brand-primary-light" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">
                {item.fileName}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                <span>
                  {item.wordCount.toLocaleString(locale)} {t('words')}
                </span>
                <span>•</span>
                <span>{item.fileSize}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Languages className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {item.sourceLanguage} → {item.targetLanguage}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${statusConfig.bg} ${statusConfig.border} border rounded-full`}
              >
                <StatusIcon
                  className={`w-3 h-3 ${statusConfig.color} ${item.status === 'processing' ? 'animate-spin' : ''}`}
                />
                <span
                  className={`text-[10px] font-medium ${statusConfig.color}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px]">
                  {formatDate(item.translatedAt, locale, t)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={onToggleActionMenu}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>

          {showActionMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
              <button
                onClick={onViewDetails}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                {t('actions.viewDetails')}
              </button>
              <button
                onClick={onDownload}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {t('actions.download')}
              </button>
              <button
                onClick={onDelete}
                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t('actions.delete')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(
  dateString: string,
  locale: string,
  t: { (key: string, values?: Record<string, string | number>): string }
): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return t('time.justNow');
  if (diffInHours < 24) return t('time.hoursAgo', { hours: diffInHours });
  if (diffInHours < 48) return t('time.yesterday');
  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
