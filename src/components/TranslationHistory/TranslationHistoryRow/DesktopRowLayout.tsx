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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { IconContainer } from '@/components/ui/icon-container';

interface DesktopRowLayoutProps {
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

export function DesktopRowLayout({
  item,
  isSelected,
  onSelect,
  showActionMenu,
  onToggleActionMenu,
  statusConfig,
  onViewDetails,
  onDownload,
  onDelete,
}: DesktopRowLayoutProps) {
  const t = useTranslations('translationHistory.table');
  const locale = useLocale();

  const handleSelect = useCallback(() => {
    onSelect(item.id);
  }, [onSelect, item.id]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
      <div className="col-span-5 flex items-center gap-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleSelect}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <IconContainer variant="primary" size="sm">
          <FileText className="w-5 h-5" />
        </IconContainer>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate mb-1">
            {item.fileName}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>
              {item.wordCount.toLocaleString(locale)} {t('words')}
            </span>
            <span>•</span>
            <span>{item.fileSize}</span>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Languages className="w-4 h-4 text-gray-400" />
          <span className="truncate">
            {item.sourceLanguage} → {item.targetLanguage}
          </span>
        </div>
      </div>

      <div className="col-span-2">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.border} border rounded-full`}
        >
          <StatusIcon
            className={`w-3.5 h-3.5 ${statusConfig.color} ${item.status === 'processing' ? 'animate-spin' : ''}`}
          />
          <span className={`text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      <div className="col-span-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          {formatDate(item.translatedAt, locale, t)}
        </div>
      </div>

      <div className="col-span-1 flex justify-end">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleActionMenu}
            className="h-9 w-9"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </Button>

          {showActionMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
              <Button
                variant="ghost"
                onClick={onViewDetails}
                className="w-full justify-start px-4 py-2 h-auto text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-3" />
                {t('actions.viewDetails')}
              </Button>
              <Button
                variant="ghost"
                onClick={onDownload}
                className="w-full justify-start px-4 py-2 h-auto text-sm text-gray-700 hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-3" />
                {t('actions.download')}
              </Button>
              <Button
                variant="ghost"
                onClick={onDelete}
                className="w-full justify-start px-4 py-2 h-auto text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-3" />
                {t('actions.delete')}
              </Button>
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
