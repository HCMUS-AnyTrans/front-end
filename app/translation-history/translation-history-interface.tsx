'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  FileText,
  Languages,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { Sidebar } from '@/src/temp/Sidebar';

export default function TranslationHistoryInterface() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'document' | 'subtitle'
  >('all');
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const translationHistory = [
    {
      id: '1',
      fileName: 'Business_Proposal_2024.docx',
      fileType: 'DOCX',
      category: 'document',
      sourceLanguage: 'English',
      targetLanguage: 'Vietnamese',
      status: 'completed',
      translatedAt: '2024-01-15T10:30:00Z',
      fileSize: '245 KB',
      wordCount: 2847,
      credits: 28,
    },
    {
      id: '2',
      fileName: 'Marketing_Campaign_Brief.pdf',
      fileType: 'PDF',
      category: 'document',
      sourceLanguage: 'English',
      targetLanguage: 'Spanish',
      status: 'completed',
      translatedAt: '2024-01-14T15:45:00Z',
      fileSize: '1.8 MB',
      wordCount: 1923,
      credits: 19,
    },
    {
      id: '3',
      fileName: 'Technical_Documentation.docx',
      fileType: 'DOCX',
      category: 'document',
      sourceLanguage: 'English',
      targetLanguage: 'Japanese',
      status: 'completed',
      translatedAt: '2024-01-13T09:15:00Z',
      fileSize: '4.2 MB',
      wordCount: 5634,
      credits: 56,
    },
    {
      id: '4',
      fileName: 'Financial_Report_2023.xlsx',
      fileType: 'XLSX',
      category: 'document',
      sourceLanguage: 'English',
      targetLanguage: 'Chinese',
      status: 'processing',
      translatedAt: '2024-01-12T14:20:00Z',
      fileSize: '3.1 MB',
      wordCount: 2156,
      credits: 0,
    },
    {
      id: '5',
      fileName: 'Product_Manual.pdf',
      fileType: 'PDF',
      category: 'document',
      sourceLanguage: 'English',
      targetLanguage: 'French',
      status: 'failed',
      translatedAt: '2024-01-11T11:30:00Z',
      fileSize: '5.7 MB',
      wordCount: 7892,
      credits: 0,
    },
    {
      id: '6',
      fileName: 'movie_subtitles.srt',
      fileType: 'SRT',
      category: 'subtitle',
      sourceLanguage: 'English',
      targetLanguage: 'Vietnamese',
      status: 'completed',
      translatedAt: '2024-01-10T10:00:00Z',
      fileSize: '120 KB',
      wordCount: 1380,
      credits: 12,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Completed',
        };
      case 'processing':
        return {
          icon: RefreshCw,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Processing',
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Failed',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Unknown',
        };
    }
  };

  const filteredHistory = translationHistory.filter((item) => {
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetLanguage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((item: string) => item !== id)
        : [...prev, id]
    );
  };

  const totalCompleted = translationHistory.filter(
    (item) => item.status === 'completed'
  ).length;
  const totalWords = translationHistory.reduce(
    (sum, item) => sum + item.wordCount,
    0
  );
  const totalCredits = translationHistory.reduce(
    (sum, item) => sum + item.credits,
    0
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Translation History
                </h1>
                <p className="text-sm text-gray-600">
                  View and manage all your translation projects
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {totalCompleted}
                    </span>{' '}
                    Completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {totalWords.toLocaleString()}
                    </span>{' '}
                    Words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {translationHistory.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalCompleted}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Total Words</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalWords.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Credits Used</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCredits}
                </p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by filename, language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`flex items-center gap-2 px-5 py-3 border rounded-xl font-medium transition-all ${
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
                      {['all', 'completed', 'processing', 'failed'].map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setFilterStatus(status);
                              setShowFilterMenu(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              filterStatus === status
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        )
                      )}
                      <div className="my-2 h-px bg-gray-100" />
                      {[
                        { id: 'all', label: 'All Types' },
                        { id: 'document', label: 'Document' },
                        { id: 'subtitle', label: 'Subtitle' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setFilterCategory(
                              c.id as 'all' | 'document' | 'subtitle'
                            );
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
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
                {filteredHistory.map((item) => {
                  const statusConfig = getStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={item.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5 flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate mb-1">
                              {item.fileName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>
                                {item.wordCount.toLocaleString()} words
                              </span>
                              <span>•</span>
                              <span>{item.fileSize}</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="truncate">
                              {item.sourceLanguage} → {item.targetLanguage}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.border} border rounded-full`}
                          >
                            <StatusIcon
                              className={`w-3.5 h-3.5 ${statusConfig.color} ${item.status === 'processing' ? 'animate-spin' : ''}`}
                            />
                            <span
                              className={`text-xs font-medium ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {formatDate(item.translatedAt)}
                          </div>
                        </div>

                        <div className="col-span-1 flex justify-end">
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowActionMenu(
                                  showActionMenu === item.id ? null : item.id
                                )
                              }
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>

                            {showActionMenu === item.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredHistory.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No translations found
                  </h3>
                  <p className="text-sm text-gray-600">
                    {searchQuery
                      ? 'Try adjusting your search criteria'
                      : 'Start translating documents to see your history here'}
                  </p>
                </div>
              )}
            </div>

            {filteredHistory.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing{' '}
                  <span className="font-semibold text-gray-900">
                    {filteredHistory.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-gray-900">
                    {translationHistory.length}
                  </span>{' '}
                  translations
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
