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
    <div className="bg-amber-50 border-b border-amber-100 px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {selectedCount} notification(s) selected
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkSelectedRead}
            className="px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
          >
            Mark as read
          </button>
          <button
            onClick={onArchiveSelected}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
            aria-label="Archive selected"
            title="Archive"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={onDeleteSelected}
            className="px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 rounded-lg transition-all"
            aria-label="Delete selected"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
