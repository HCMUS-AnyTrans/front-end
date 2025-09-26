"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Archive, Trash2 } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onMarkAllRead: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  allSelected: boolean;
}

export function BulkActions({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onMarkAllRead,
  onArchiveSelected,
  onDeleteSelected,
  allSelected
}: BulkActionsProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={allSelected ? onDeselectAll : onSelectAll}
            className="w-4 h-4 text-[#19398f] border-gray-300 rounded focus:ring-[#19398f] focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-700 font-nunito">
            {allSelected ? 'Deselect all' : 'Select all'}
          </span>
        </label>
        
        {selectedCount > 0 && (
          <span className="text-sm text-gray-600 font-nunito">
            {selectedCount} of {totalCount} selected
          </span>
        )}
      </div>

      {hasSelection && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            className="text-gray-700 border-gray-300 hover:bg-gray-100 font-nunito"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark read
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onArchiveSelected}
            className="text-gray-700 border-gray-300 hover:bg-gray-100 font-nunito"
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onDeleteSelected}
            className="text-red-600 border-red-300 hover:bg-red-50 font-nunito"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
