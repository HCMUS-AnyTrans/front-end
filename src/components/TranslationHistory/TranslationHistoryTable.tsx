'use client';

import React from 'react';
import { TranslationItem } from '@/src/types/translation-history';
import TranslationHistoryRow from './TranslationHistoryRow';
import TranslationHistoryEmpty from './TranslationHistoryEmpty';
import TranslationHistoryPagination from './TranslationHistoryPagination';

interface TranslationHistoryTableProps {
  items: TranslationItem[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  showActionMenu: string | null;
  onToggleActionMenu: (id: string | null) => void;
  onViewDetails: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

export default function TranslationHistoryTable({
  items,
  selectedItems,
  onSelectItem,
  showActionMenu,
  onToggleActionMenu,
  onViewDetails,
  onDownload,
  onDelete,
  searchQuery,
}: TranslationHistoryTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-600">
          <div className="col-span-5">Document</div>
          <div className="col-span-2">Languages</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <TranslationHistoryRow
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onSelect={onSelectItem}
            showActionMenu={showActionMenu === item.id}
            onToggleActionMenu={() =>
              onToggleActionMenu(showActionMenu === item.id ? null : item.id)
            }
            onViewDetails={onViewDetails}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}
      </div>

      {items.length === 0 && (
        <TranslationHistoryEmpty searchQuery={searchQuery} />
      )}

      {items.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <TranslationHistoryPagination
            currentCount={items.length}
            totalCount={items.length}
          />
        </div>
      )}
    </div>
  );
}
