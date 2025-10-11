'use client';

import React from 'react';
import { Search, Filter, Download, Trash2, ChevronDown } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by filename, language..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <button
            onClick={onToggleFilterMenu}
            className={`flex items-center gap-2 px-5 py-3 border rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus !== 'all' || filterCategory !== 'all'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {(filterStatus !== 'all' || filterCategory !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
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
                      ? 'bg-blue-50 text-blue-700 font-medium'
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
                      ? 'bg-blue-50 text-blue-700 font-medium'
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">
              {selectedItems.length} selected
            </span>
            <button
              onClick={onBulkDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
