'use client';

import React, { useState } from 'react';
import {
  TranslationHistoryHeader,
  TranslationHistoryStats,
  TranslationHistoryToolbar,
  TranslationHistoryTable,
} from '@/components/TranslationHistory';
import { TranslationItem } from '@/types/translation-history';

export default function TranslationHistoryClient() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'document' | 'subtitle'
  >('all');
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const translationHistory: TranslationItem[] = [
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

  const stats = {
    totalProjects: translationHistory.length,
    totalCompleted,
    totalWords,
    totalCredits,
  };

  const handleBulkDownload = () => {
    console.log('Bulk download:', selectedItems);
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete:', selectedItems);
  };

  const handleViewDetails = (id: string) => {
    console.log('View details:', id);
  };

  const handleDownload = (id: string) => {
    console.log('Download:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete:', id);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
        <TranslationHistoryHeader
          totalCompleted={totalCompleted}
          totalWords={totalWords}
        />
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <TranslationHistoryStats stats={stats} />
            <TranslationHistoryToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterStatus={filterStatus}
              filterCategory={filterCategory}
              onFilterStatusChange={setFilterStatus}
              onFilterCategoryChange={(category) =>
                setFilterCategory(category as 'all' | 'document' | 'subtitle')
              }
              showFilterMenu={showFilterMenu}
              onToggleFilterMenu={() => setShowFilterMenu(!showFilterMenu)}
              selectedItems={selectedItems}
              onBulkDownload={handleBulkDownload}
              onBulkDelete={handleBulkDelete}
            />
            <TranslationHistoryTable
              items={filteredHistory}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              showActionMenu={showActionMenu}
              onToggleActionMenu={setShowActionMenu}
              onViewDetails={handleViewDetails}
              onDownload={handleDownload}
              onDelete={handleDelete}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
  );
}
