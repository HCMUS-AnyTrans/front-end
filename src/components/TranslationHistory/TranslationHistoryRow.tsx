'use client';

import React from 'react';
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
import { TranslationItem, StatusConfig } from '@/src/types/translation-history';

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
  const getStatusConfig = (status: string): StatusConfig => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Completed',
        };
      case 'processing':
        return {
          icon: RefreshCw,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Processing',
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Failed',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Unknown',
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5 flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate mb-1">
              {item.fileName}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{item.wordCount.toLocaleString()} words</span>
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
                  View Details
                </button>
                <button
                  onClick={() => onDownload(item.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
