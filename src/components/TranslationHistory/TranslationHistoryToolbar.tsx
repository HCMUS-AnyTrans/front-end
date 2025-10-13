'use client';

import React from 'react';
import { Search, Filter, Download, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranslationHistoryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: string;
  filterCategory: string;
  onFilterStatusChange: (status: string) => void;
  onFilterCategoryChange: (category: string) => void;
  showFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  selectedItems: string[];
  onBulkDownload: () => void;
  onBulkDelete: () => void;
}

export default function TranslationHistoryToolbar({
  searchQuery,
  onSearchChange,
  filterStatus,
  filterCategory,
  onFilterStatusChange,
  onFilterCategoryChange,
  showFilterMenu,
  onToggleFilterMenu,
  selectedItems,
  onBulkDownload,
  onBulkDelete,
}: TranslationHistoryToolbarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search by filename, language..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={onToggleFilterMenu}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus !== 'all' || filterCategory !== 'all'
                ? 'bg-blue-50 border-blue-200 text-[#1e3a8a]'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {(filterStatus !== 'all' || filterCategory !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-[#4169E1]"></span>
            )}
            <ChevronDown className="w-4 h-4" />
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
              {['all', 'completed', 'processing', 'failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onFilterStatusChange(status);
                    onToggleFilterMenu();
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    filterStatus === status
                      ? 'bg-blue-50 text-[#1e3a8a] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
              <div className="my-2 h-px bg-gray-100" />
              {[
                { id: 'all', label: 'All Types' },
                { id: 'document', label: 'Document' },
                { id: 'subtitle', label: 'Subtitle' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onFilterCategoryChange(c.id);
                    onToggleFilterMenu();
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    filterCategory === c.id
                      ? 'bg-blue-50 text-[#1e3a8a] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedItems.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left">
              {selectedItems.length} selected
            </span>
            <div className="flex gap-2">
              <Button
                onClick={onBulkDownload}
                size="sm"
                className="flex-1 sm:flex-initial rounded-lg px-3 sm:px-4 py-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                onClick={onBulkDelete}
                variant="destructive"
                size="sm"
                className="flex-1 sm:flex-initial bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 sm:px-4 py-2 shadow-none"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
