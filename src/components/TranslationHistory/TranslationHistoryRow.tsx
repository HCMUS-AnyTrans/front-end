'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  FileText,
  Languages,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { TranslationItem, StatusConfig } from '@/types/translation-history';

interface TranslationHistoryRowProps {
  item: TranslationItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showActionMenu: boolean;
  onToggleActionMenu: () => void;
  onViewDetails: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TranslationHistoryRow({
  item,
  isSelected,
  onSelect,
  showActionMenu,
  onToggleActionMenu,
  onViewDetails,
  onDownload,
  onDelete,
}: TranslationHistoryRowProps) {
  const t = useTranslations('translationHistory.table');
  const locale = useLocale();

  const getStatusConfig = (status: string): StatusConfig => {
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
  };

  const formatDate = (dateString: string) => {
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
  };

  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4 mt-1 text-[#4169E1] bg-gray-100 border-gray-300 rounded focus:ring-[#4169E1] focus:ring-2"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#4169E1]" />
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
                    {formatDate(item.translatedAt)}
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
                  onClick={() => onViewDetails(item.id)}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {t('actions.viewDetails')}
                </button>
                <button
                  onClick={() => onDownload(item.id)}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t('actions.download')}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
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

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5 flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4 text-[#4169E1] bg-gray-100 border-gray-300 rounded focus:ring-[#4169E1] focus:ring-2"
          />
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#4169E1]" />
          </div>
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
            {formatDate(item.translatedAt)}
          </div>
        </div>

        <div className="col-span-1 flex justify-end">
          <div className="relative">
            <button
              onClick={onToggleActionMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {showActionMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => onViewDetails(item.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  {t('actions.viewDetails')}
                </button>
                <button
                  onClick={() => onDownload(item.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {t('actions.download')}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('actions.delete')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
