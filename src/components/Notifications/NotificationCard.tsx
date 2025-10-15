'use client';

import React from 'react';
import {
  FileCheck,
  AlertCircle,
  Bell,
  Pin,
  CheckCheck,
  Trash2,
  Clock,
  ChevronRight,
  CreditCard,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NotificationItem } from '@/types/notifications';

type Props = {
  notification: NotificationItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onToggleRead: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
  formatTimestamp: (date: Date) => string;
};

function getNotificationIcon(type: NotificationItem['type']) {
  switch (type) {
    case 'success':
      return <FileCheck className="w-5 h-5" />;
    case 'error':
      return <AlertCircle className="w-5 h-5" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5" />;
    case 'info':
      return <Bell className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
}

function getNotificationColor(type: NotificationItem['type']) {
  switch (type) {
    case 'success':
      return 'from-green-500 to-emerald-500';
    case 'error':
      return 'from-red-500 to-rose-500';
    case 'warning':
      return 'from-amber-500 to-orange-500';
    case 'info':
      return 'from-[#4169E1] to-[#1e3a8a]';
    default:
      return 'from-gray-500 to-slate-500';
  }
}

export default function NotificationCard({
  notification,
  isSelected,
  onToggleSelect,
  onToggleRead,
  onTogglePin,
  onDelete,
  formatTimestamp,
}: Props) {
  const t = useTranslations('notifications.card');

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl border-2 transition-all hover:shadow-md ${
        notification.isRead ? 'border-gray-200' : 'border-blue-200 shadow-sm'
      } ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="mt-0.5 sm:mt-1 w-4 h-4 text-[#4169E1] border-gray-300 rounded focus:ring-[#4169E1]"
          />

          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${getNotificationColor(
              notification.type
            )} text-white flex-shrink-0`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              {getNotificationIcon(notification.type)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                  {notification.isPinned && (
                    <Pin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                  <h3
                    className={`text-sm sm:text-base font-semibold ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4169E1] rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {notification.description}
                </p>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                <button
                  onClick={onTogglePin}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  title={
                    notification.isPinned
                      ? t('actions.unpin')
                      : t('actions.pin')
                  }
                >
                  <Pin
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      notification.isPinned
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                <button
                  onClick={onToggleRead}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  title={
                    notification.isRead
                      ? t('actions.markUnread')
                      : t('actions.markRead')
                  }
                >
                  <CheckCheck
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      notification.isRead ? 'text-green-600' : 'text-gray-400'
                    }`}
                  />
                </button>
                <button
                  onClick={onDelete}
                  className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                  title={t('actions.delete')}
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-red-600" />
                </button>
              </div>
            </div>

            {notification.metadata && (
              <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-gray-600">
                  {notification.metadata.fileName && (
                    <span className="flex items-center gap-1 max-w-full truncate">
                      <FileCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {notification.metadata.fileName}
                      </span>
                    </span>
                  )}
                  {notification.metadata.wordsTranslated !== undefined && (
                    <span className="whitespace-nowrap">
                      {notification.metadata.wordsTranslated.toLocaleString()}{' '}
                      {t('metadata.wordsTranslated')}
                    </span>
                  )}
                  {notification.metadata.creditsUsed !== undefined && (
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {notification.metadata.creditsUsed}{' '}
                      {t('metadata.creditsUsed')}
                    </span>
                  )}
                  {notification.metadata.creditsRemaining !== undefined &&
                    notification.metadata.totalCredits !== undefined && (
                      <span className="font-medium text-amber-600 whitespace-nowrap">
                        {notification.metadata.creditsRemaining}/
                        {notification.metadata.totalCredits}{' '}
                        {t('metadata.creditsRemaining')}
                      </span>
                    )}
                </div>
              </div>
            )}

            <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {formatTimestamp(notification.timestamp)}
                </span>
                <span>•</span>
                <span className="capitalize">{notification.category}</span>
              </div>
              {notification.category === 'translation' && (
                <button className="text-[#4169E1] hover:text-[#1e3a8a] font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  {t('viewDetails')}
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
