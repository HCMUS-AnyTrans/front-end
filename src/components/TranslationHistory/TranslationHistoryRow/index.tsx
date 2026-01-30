'use client';

import React, { memo, useCallback } from 'react';
import { TranslationItem } from '@/types/translation-history';
import { MobileRowLayout } from './MobileRowLayout';
import { DesktopRowLayout } from './DesktopRowLayout';
import { useStatusConfig } from './useStatusConfig';

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

export default memo(function TranslationHistoryRow({
  item,
  isSelected,
  onSelect,
  showActionMenu,
  onToggleActionMenu,
  onViewDetails,
  onDownload,
  onDelete,
}: TranslationHistoryRowProps) {
  const statusConfig = useStatusConfig(item.status);

  const handleViewDetails = useCallback(
    () => onViewDetails(item.id),
    [onViewDetails, item.id]
  );
  const handleDownload = useCallback(
    () => onDownload(item.id),
    [onDownload, item.id]
  );
  const handleDelete = useCallback(
    () => onDelete(item.id),
    [onDelete, item.id]
  );

  return (
    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
      <MobileRowLayout
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        showActionMenu={showActionMenu}
        onToggleActionMenu={onToggleActionMenu}
        statusConfig={statusConfig}
        onViewDetails={handleViewDetails}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
      <DesktopRowLayout
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        showActionMenu={showActionMenu}
        onToggleActionMenu={onToggleActionMenu}
        statusConfig={statusConfig}
        onViewDetails={handleViewDetails}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </div>
  );
});
