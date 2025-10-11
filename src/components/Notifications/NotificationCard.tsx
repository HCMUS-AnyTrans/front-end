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
import { NotificationItem } from '@/src/types/notifications';

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
      return 'from-blue-500 to-indigo-500';
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
  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all hover:shadow-md ${
        notification.isRead ? 'border-gray-200' : 'border-blue-200 shadow-sm'
      } ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getNotificationColor(
              notification.type
            )} text-white flex-shrink-0`}
          >
            {getNotificationIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {notification.isPinned && (
                    <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
                  )}
                  <h3
                    className={`font-semibold ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {notification.description}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={onTogglePin}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  title={notification.isPinned ? 'Unpin' : 'Pin'}
                >
                  <Pin
                    className={`w-4 h-4 ${
                      notification.isPinned
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                <button
                  onClick={onToggleRead}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  title={
                    notification.isRead ? 'Mark as unread' : 'Mark as read'
                  }
                >
                  <CheckCheck
                    className={`w-4 h-4 ${
                      notification.isRead ? 'text-green-600' : 'text-gray-400'
                    }`}
                  />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                </button>
              </div>
            </div>

            {notification.metadata && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  {notification.metadata.fileName && (
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      {notification.metadata.fileName}
                    </span>
                  )}
                  {notification.metadata.wordsTranslated !== undefined && (
                    <span>
                      {notification.metadata.wordsTranslated.toLocaleString()}{' '}
                      words
                    </span>
                  )}
                  {notification.metadata.creditsUsed !== undefined && (
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      {notification.metadata.creditsUsed} credits
                    </span>
                  )}
                  {notification.metadata.creditsRemaining !== undefined &&
                    notification.metadata.totalCredits !== undefined && (
                      <span className="font-medium text-amber-600">
                        {notification.metadata.creditsRemaining}/
                        {notification.metadata.totalCredits} credits remaining
                      </span>
                    )}
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimestamp(notification.timestamp)}</span>
                <span>•</span>
                <span className="capitalize">{notification.category}</span>
              </div>
              {notification.category === 'translation' && (
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                  View details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
