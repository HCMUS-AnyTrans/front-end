'use client';

import React from 'react';
import { FileCheck, AlertCircle, Bell } from 'lucide-react';
import { NotificationItem } from '@/types/notifications';

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

interface NotificationIconProps {
  type: NotificationItem['type'];
}

export function NotificationIcon({ type }: NotificationIconProps) {
  return (
    <div
      className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${getNotificationColor(
        type
      )} text-white flex-shrink-0`}
    >
      <div className="w-4 h-4 sm:w-5 sm:h-5">{getNotificationIcon(type)}</div>
    </div>
  );
}
