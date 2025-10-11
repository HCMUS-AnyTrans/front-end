'use client';

import React from 'react';
import { BaseSearchBar } from '@/components/Common';

interface SupportSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export default function SupportSearchBar({
  searchQuery,
  onSearchChange,
  placeholder = 'Search for help articles, FAQs, and guides...',
}: SupportSearchBarProps) {
  return (
    <BaseSearchBar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      placeholder={placeholder}
    />
  );
}
