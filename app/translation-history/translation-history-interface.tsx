'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar,
  FileText,
  Languages,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sidebar } from '@/src/components/Sidebar';

interface TranslationHistoryItem {
  id: string;
  fileName: string;
  fileType: string;
  sourceLanguage: string;
  targetLanguage: string;
  status: 'completed' | 'processing' | 'failed';
  translatedAt: string;
  fileSize: string;
  wordCount: number;
  credits: number;
}

export function TranslationHistoryInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Sample data for demo
  const translationHistory: TranslationHistoryItem[] = [
    {
      id: '1',
      fileName: 'Business Proposal Q4 2024.docx',
      fileType: 'DOCX',
      sourceLanguage: 'English',
      targetLanguage: 'Vietnamese',
      status: 'completed',
      translatedAt: '2024-01-15T10:30:00Z',
      fileSize: '2.4 MB',
      wordCount: 2847,
      credits: 15,
    },
    {
      id: '2',
      fileName: 'Marketing Campaign Brief.pdf',
      fileType: 'PDF',
      sourceLanguage: 'English',
      targetLanguage: 'Spanish',
      status: 'completed',
      translatedAt: '2024-01-14T15:45:00Z',
      fileSize: '1.8 MB',
      wordCount: 1923,
      credits: 12,
    },
    {
      id: '3',
      fileName: 'Technical Documentation.docx',
      fileType: 'DOCX',
      sourceLanguage: 'English',
      targetLanguage: 'Japanese',
      status: 'completed',
      translatedAt: '2024-01-13T09:15:00Z',
      fileSize: '4.2 MB',
      wordCount: 5634,
      credits: 28,
    },
    {
      id: '4',
      fileName: 'Financial Report 2023.xlsx',
      fileType: 'XLSX',
      sourceLanguage: 'English',
      targetLanguage: 'Chinese',
      status: 'processing',
      translatedAt: '2024-01-12T14:20:00Z',
      fileSize: '3.1 MB',
      wordCount: 2156,
      credits: 11,
    },
    {
      id: '5',
      fileName: 'Product Manual.pdf',
      fileType: 'PDF',
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
      fileName: 'Presentation Deck.pptx',
      fileType: 'PPTX',
      sourceLanguage: 'English',
      targetLanguage: 'German',
      status: 'completed',
      translatedAt: '2024-01-10T16:45:00Z',
      fileSize: '2.9 MB',
      wordCount: 1234,
      credits: 7,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredHistory = translationHistory.filter((item) => {
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetLanguage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredHistory.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = () => {
    console.log('Downloading selected items:', selectedItems);
  };

  const handleBulkDelete = () => {
    console.log('Deleting selected items:', selectedItems);
    setSelectedItems([]);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col max-w-none overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
              Translation History
            </h1>
            <p className="text-sm text-[#717680] font-nunito">
              View and manage all your translation projects and download results
            </p>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Total Translations
                </h3>
                <p className="text-2xl font-bold text-[#414651] font-nunito">
                  {translationHistory.length}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Completed
                </h3>
                <p className="text-2xl font-bold text-green-600 font-nunito">
                  {
                    translationHistory.filter(
                      (item) => item.status === 'completed'
                    ).length
                  }
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Total Words
                </h3>
                <p className="text-2xl font-bold text-[#414651] font-nunito">
                  {translationHistory
                    .reduce((sum, item) => sum + item.wordCount, 0)
                    .toLocaleString()}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Credits Used
                </h3>
                <p className="text-2xl font-bold text-[#19398f] font-nunito">
                  {translationHistory.reduce(
                    (sum, item) => sum + item.credits,
                    0
                  )}
                </p>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search translations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-[#e9eaeb] focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                    />
                  </div>

                  {/* Filter */}
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-[#e9eaeb] text-[#717680] hover:bg-gray-50"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => setFilterStatus('all')}
                          className="cursor-pointer"
                        >
                          All Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStatus('completed')}
                          className="cursor-pointer"
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStatus('processing')}
                          className="cursor-pointer"
                        >
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFilterStatus('failed')}
                          className="cursor-pointer"
                        >
                          Failed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleBulkDownload}
                      className="border-[#19398f] text-[#19398f] hover:bg-[#19398f] hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download ({selectedItems.length})
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleBulkDelete}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Translation History List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === filteredHistory.length &&
                      filteredHistory.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#19398f] bg-gray-100 border-gray-300 rounded focus:ring-[#19398f] focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-semibold text-[#717680] font-nunito">
                    Select All
                  </span>
                </div>
              </div>

              {/* History Items */}
              <div className="divide-y divide-gray-100">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-4 h-4 text-[#19398f] bg-gray-100 border-gray-300 rounded focus:ring-[#19398f] focus:ring-2 mr-4"
                        />

                        {/* File Icon and Info */}
                        <div className="flex items-center flex-1">
                          <div className="w-10 h-10 bg-[#19398f] bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                            <FileText className="w-5 h-5 text-[#19398f]" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-sm font-semibold text-[#414651] font-nunito truncate">
                                {item.fileName}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                              >
                                {item.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-[#717680] font-nunito">
                              <div className="flex items-center gap-1">
                                <Languages className="w-3 h-3" />
                                {item.sourceLanguage} → {item.targetLanguage}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.translatedAt)}
                              </div>
                              <span>
                                {item.wordCount.toLocaleString()} words
                              </span>
                              <span>{item.fileSize}</span>
                              <span>{item.credits} credits</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredHistory.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-2">
                    No translations found
                  </h3>
                  <p className="text-sm text-[#717680] font-nunito">
                    {searchQuery
                      ? 'Try adjusting your search criteria'
                      : 'Start translating documents to see your history here'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredHistory.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-[#717680] font-nunito">
                  Showing {filteredHistory.length} of{' '}
                  {translationHistory.length} translations
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
