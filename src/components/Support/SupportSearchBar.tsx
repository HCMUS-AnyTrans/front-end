'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BaseSearchBar } from '@/components/Common';

interface SupportSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export default function SupportSearchBar({
  searchQuery,
  onSearchChange,
  placeholder,
}: SupportSearchBarProps) {
  const t = useTranslations('support.search');

  return (
    <BaseSearchBar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      placeholder={placeholder || t('placeholder')}
    />
  );
}
