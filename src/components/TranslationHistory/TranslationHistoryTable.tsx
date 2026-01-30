'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TranslationItem } from '@/types/translation-history';
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
  const t = useTranslations('translationHistory.table');

  // Virtualizer for efficient rendering of large lists
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88, // Estimated row height in pixels
    overscan: 5, // Number of items to render outside the visible area
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="hidden md:block px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-600">
          <div className="col-span-5">{t('headers.document')}</div>
          <div className="col-span-2">{t('headers.languages')}</div>
          <div className="col-span-2">{t('headers.status')}</div>
          <div className="col-span-2">{t('headers.date')}</div>
          <div className="col-span-1 text-right">{t('headers.actions')}</div>
        </div>
      </div>

      {items.length === 0 ? (
        <TranslationHistoryEmpty searchQuery={searchQuery} />
      ) : (
        <>
          {/* Virtualized list container */}
          <div
            ref={parentRef}
            className="divide-y divide-gray-100 overflow-auto"
            style={{
              height: `${Math.min(rowVirtualizer.getTotalSize(), 600)}px`,
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = items[virtualRow.index];
                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TranslationHistoryRow
                      item={item}
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={onSelectItem}
                      showActionMenu={showActionMenu === item.id}
                      onToggleActionMenu={() =>
                        onToggleActionMenu(
                          showActionMenu === item.id ? null : item.id
                        )
                      }
                      onViewDetails={onViewDetails}
                      onDownload={onDownload}
                      onDelete={onDelete}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
            <TranslationHistoryPagination
              currentCount={items.length}
              totalCount={items.length}
            />
          </div>
        </>
      )}
    </div>
  );
}
