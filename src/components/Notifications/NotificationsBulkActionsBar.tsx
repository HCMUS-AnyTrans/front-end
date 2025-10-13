'use client';

import React from 'react';
import { Archive, Trash2 } from 'lucide-react';

type Props = {
  selectedCount: number;
  onMarkSelectedRead: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
};

export default function NotificationsBulkActionsBar({
  selectedCount,
  onMarkSelectedRead,
  onArchiveSelected,
  onDeleteSelected,
}: Props) {
  return (
    <div className="bg-amber-50 border-b border-amber-100 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
          <span className="hidden sm:inline">
            {selectedCount} notification(s) selected
          </span>
          <span className="sm:hidden">{selectedCount} selected</span>
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onMarkSelectedRead}
            className="px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="hidden sm:inline">Mark as read</span>
            <span className="sm:hidden">Read</span>
          </button>
          <button
            onClick={onArchiveSelected}
            className="p-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-all cursor-pointer"
            aria-label="Archive selected"
            title="Archive"
          >
            <Archive className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={onDeleteSelected}
            className="p-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-red-700 hover:bg-red-100 rounded-lg transition-all cursor-pointer"
            aria-label="Delete selected"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
