'use client';

import type * as React from 'react';
import { Search } from 'lucide-react';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { TermEmptyState } from '../terms/term-empty-state';
import { TermTable } from '../terms/term-table';
import { TermTableSkeleton } from '../terms/term-table-skeleton';
import type { Term } from '../../types';

interface GlossaryTermsSectionProps {
  searchValue: string;
  searchPlaceholder: string;
  hasSearch: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  terms?: Term[];
  isLoadingTerms: boolean;
  isFetchingTerms: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange: (page: number) => void;
  onEdit: (term: Term) => void;
  onDelete: (term: Term) => void;
}

export function GlossaryTermsSection({
  searchValue,
  searchPlaceholder,
  hasSearch,
  onSearchChange,
  terms,
  isLoadingTerms,
  isFetchingTerms,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}: GlossaryTermsSectionProps) {
  return (
    <AppCard className="overflow-hidden">
      <div className="border-b bg-muted/40 px-4 py-3 lg:px-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            className="h-9 bg-background pl-9 text-sm"
          />
        </div>
      </div>

      {isLoadingTerms ? (
        <TermTableSkeleton showControls={false} />
      ) : !terms || terms.length === 0 ? (
        <TermEmptyState hasSearch={hasSearch} />
      ) : (
        <TermTable terms={terms} onEdit={onEdit} onDelete={onDelete} />
      )}

      {pagination && pagination.totalPages > 1 && (
        <AppCardContent
          padding="none"
          className="border-t bg-muted/40 px-4 py-3 lg:px-6"
        >
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
            onPageChange={onPageChange}
            isFetching={isFetchingTerms}
          />
        </AppCardContent>
      )}
    </AppCard>
  );
}
