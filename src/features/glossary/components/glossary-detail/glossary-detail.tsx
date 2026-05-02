'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getDomainLabel, useDomains } from '@/features/domains';
import { useGlossaryDetail } from '../../hooks/use-glossary-detail';
import { useTerms } from '../../hooks/use-terms';
import { AddTermForm, GlossaryTermDialogs, TermTableSkeleton } from '../terms';
import { GlossaryDetailHeader } from './glossary-detail-header';
import { GlossaryTermsSection } from './glossary-terms-section';
import type { Term, TermQueryParams } from '../../types';

interface GlossaryDetailProps {
  glossaryId: string;
}

/**
 * Detail view for a single glossary.
 * Shows glossary metadata header, inline add-term form,
 * searchable/paginated term table, and edit/delete term dialogs.
 */
export function GlossaryDetail({ glossaryId }: GlossaryDetailProps) {
  const t = useTranslations('glossary');
  const tTerms = useTranslations('glossary.terms');
  const router = useRouter();
  const locale = useLocale();
  const { getDomainById } = useDomains();

  // ─── Term search & pagination state ─────────────────────────────────
  const [termSearch, setTermSearch] = useState('');
  const [termPage, setTermPage] = useState(1);

  // ─── Dialog state ───────────────────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  // ─── Data fetching ──────────────────────────────────────────────────
  const { glossary, isLoading: isLoadingDetail } =
    useGlossaryDetail(glossaryId);

  const termQueryParams: TermQueryParams = {
    page: termPage,
    limit: 20,
    sortBy: 'srcTerm',
    sortOrder: 'asc',
    ...(termSearch && { search: termSearch }),
  };

  const {
    terms,
    pagination: termPagination,
    isLoading: isLoadingTerms,
    isFetching: isFetchingTerms,
  } = useTerms(glossaryId, termQueryParams);

  // ─── Handlers ───────────────────────────────────────────────────────
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTermSearch(e.target.value);
      setTermPage(1);
    },
    [],
  );

  const handleEditTerm = useCallback((term: Term) => {
    setSelectedTerm(term);
    setEditOpen(true);
  }, []);

  const handleDeleteTerm = useCallback((term: Term) => {
    setSelectedTerm(term);
    setDeleteOpen(true);
  }, []);

  // ─── Loading state ──────────────────────────────────────────────────
  if (isLoadingDetail) {
    return <TermTableSkeleton />;
  }

  if (!glossary) {
    return null;
  }

  const domainInfo = getDomainById(glossary.domainId);
  const DomainIcon = domainInfo?.icon;
  const domainLabel = domainInfo ? getDomainLabel(domainInfo, locale) : '';
  const isTermLimitReached = glossary.termCount >= 80;
  const remainingTermSlots = Math.max(0, 80 - glossary.termCount);

  return (
    <>
      <GlossaryDetailHeader
        glossaryName={glossary.name}
        domainLabel={domainLabel}
        srcLangLabel={t(`languages.${glossary.srcLang}`)}
        tgtLangLabel={t(`languages.${glossary.tgtLang}`)}
        termCountLabel={t('termCount', { count: glossary.termCount })}
        onBack={() => router.push(`/${locale}/glossary`)}
        onBulkImport={() => setBulkImportOpen(true)}
        DomainIcon={DomainIcon}
        backLabel={t('backToList')}
        bulkImportLabel={tTerms('bulkImport')}
      />

      <AddTermForm
        glossaryId={glossaryId}
        isTermLimitReached={isTermLimitReached}
      />

      <GlossaryTermsSection
        searchValue={termSearch}
        searchPlaceholder={tTerms('searchPlaceholder')}
        hasSearch={termSearch !== ''}
        onSearchChange={handleSearchChange}
        terms={terms}
        isLoadingTerms={isLoadingTerms}
        isFetchingTerms={isFetchingTerms}
        pagination={termPagination}
        onPageChange={setTermPage}
        onEdit={handleEditTerm}
        onDelete={handleDeleteTerm}
      />

      <GlossaryTermDialogs
        glossaryId={glossaryId}
        selectedTerm={selectedTerm}
        editOpen={editOpen}
        deleteOpen={deleteOpen}
        bulkImportOpen={bulkImportOpen}
        onEditOpenChange={setEditOpen}
        onDeleteOpenChange={setDeleteOpen}
        onBulkImportOpenChange={setBulkImportOpen}
        remainingTermSlots={remainingTermSlots}
      />
    </>
  );
}
