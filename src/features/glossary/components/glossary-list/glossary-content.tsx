'use client';

import { useState, useDeferredValue } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpenText, FileText, Globe2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { Pagination } from '@/components/ui/pagination';
import { useDomains } from '@/features/domains';
import { useGlossaries } from '../../hooks/use-glossaries';
import {
  CreateGlossaryDialog,
  DeleteGlossaryDialog,
  EditGlossaryDialog,
} from '../dialogs';
import { GlossaryEmptyState } from './glossary-empty-state';
import { GlossaryFilters } from './glossary-filters';
import { GlossaryList } from './glossary-list';
import { GlossarySkeleton } from './glossary-skeleton';
import type { Glossary, GlossaryQueryParams } from '../../types';

/**
 * Top-level orchestrator for the glossary list page.
 * Manages filter/pagination state and wires hooks to presentational components.
 */
export function GlossaryContent() {
  const t = useTranslations('glossary');
  const router = useRouter();
  const locale = useLocale();
  const { getDomainByKey, isLoading: isLoadingDomains } = useDomains();

  // ─── Filter & Pagination State ──────────────────────────────────────
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [srcLangFilter, setSrcLangFilter] = useState('all');
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search);
  const selectedDomain =
    domainFilter !== 'all' ? getDomainByKey(domainFilter) : null;
  const effectiveDomainFilter =
    domainFilter !== 'all' && !isLoadingDomains && !selectedDomain
      ? 'all'
      : domainFilter;

  // ─── Dialog State ───────────────────────────────────────────────────
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<Glossary | null>(
    null,
  );

  // ─── Build Query Params ─────────────────────────────────────────────
  const queryParams: GlossaryQueryParams | undefined =
    domainFilter !== 'all' && !selectedDomain && isLoadingDomains
      ? undefined
      : {
          page,
          limit: 20,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          ...(deferredSearch && { search: deferredSearch }),
          ...(selectedDomain ? { domainId: selectedDomain.id } : {}),
          ...(srcLangFilter !== 'all' && { srcLang: srcLangFilter }),
        };

  const { glossaries, pagination, isLoading, isError, isFetching } =
    useGlossaries(queryParams);
  const visibleGlossaries = (glossaries ?? []).filter(
    (glossary) => glossary.status !== 'failed',
  );
  const stats = {
    glossaries: pagination?.total ?? visibleGlossaries.length,
    languagePairs: new Set(
      visibleGlossaries.map(
        (glossary) => `${glossary.srcLang}:${glossary.tgtLang}`,
      ),
    ).size,
    terms: visibleGlossaries.reduce(
      (total, glossary) => total + glossary.termCount,
      0,
    ),
  };

  const hasFilters =
    search !== '' || effectiveDomainFilter !== 'all' || srcLangFilter !== 'all';

  const isEmpty = visibleGlossaries.length === 0;
  // isFetching but we already have data — show overlay, not skeleton
  const isRefetching = isFetching && !isLoading && !isEmpty;

  // ─── Handlers ───────────────────────────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDomainChange = (value: string) => {
    setDomainFilter(value);
    setPage(1);
  };

  const handleSrcLangChange = (value: string) => {
    setSrcLangFilter(value);
    setPage(1);
  };

  const handleGlossaryClick = (glossary: Glossary) => {
    if (glossary.status === 'pending' || glossary.status === 'processing') {
      return;
    }

    router.push(`/${locale}/glossary/${glossary.id}`);
  };

  const handleEdit = (glossary: Glossary) => {
    setSelectedGlossary(glossary);
    setEditOpen(true);
  };

  const handleDelete = (glossary: Glossary) => {
    setSelectedGlossary(glossary);
    setDeleteOpen(true);
  };

  const handleCreateOpen = () => setCreateOpen(true);

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <>
      <AppCard className="overflow-hidden rounded-2xl border-0 bg-[#eaf4ff] shadow-sm dark:bg-card">
        <AppCardContent
          padding="none"
          className="relative min-h-[264px] overflow-hidden p-6 sm:min-h-[260px] sm:p-8 lg:min-h-[264px] lg:p-10"
        >
          <Image
            src="/glossary/glossay-banner.png"
            alt="Glossary Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] dark:opacity-35 lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-card via-card/85 to-card/45 dark:block" />
          <div className="relative z-10 flex max-w-xl flex-col gap-5">
            <div className="space-y-3">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t('title')}
                </h2>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                  {t('description')}
                </p>
              </div>
            </div>

            <div className="grid max-w-[580px] grid-cols-1 overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-sm backdrop-blur dark:border-border dark:bg-background/75 sm:grid-cols-3">
              <GlossaryStat
                icon={<BookOpenText className="size-5" />}
                value={stats.glossaries}
                label={t('banner.glossaries')}
              />
              <GlossaryStat
                icon={<Globe2 className="size-5" />}
                value={stats.languagePairs}
                label={t('banner.languagePairs')}
              />
              <GlossaryStat
                icon={<FileText className="size-5" />}
                value={stats.terms}
                label={t('banner.terms')}
                className="sm:border-r-0"
              />
            </div>
          </div>
        </AppCardContent>
      </AppCard>

      {/* Toolbar: filters + create button */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <GlossaryFilters
          search={search}
          onSearchChange={handleSearchChange}
          domainFilter={effectiveDomainFilter}
          onDomainChange={handleDomainChange}
          srcLangFilter={srcLangFilter}
          onSrcLangChange={handleSrcLangChange}
        />
        <Button
          className="h-10 w-full shrink-0 rounded-xl px-4 sm:w-auto"
          onClick={handleCreateOpen}
        >
          <Plus className="size-4" />
          {t('createGlossary')}
        </Button>
      </div>

      {/* Content */}
      {isLoading && !glossaries ? (
        <GlossarySkeleton showFilters={false} />
      ) : isRefetching ? (
        <GlossarySkeleton
          showFilters={false}
          count={visibleGlossaries.length || 6}
        />
      ) : isError || isEmpty ? (
        <GlossaryEmptyState
          hasFilters={hasFilters}
          onCreateClick={handleCreateOpen}
        />
      ) : (
        <>
          <GlossaryList
            glossaries={visibleGlossaries}
            onGlossaryClick={handleGlossaryClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          )}
        </>
      )}

      {/* Dialogs */}
      <CreateGlossaryDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditGlossaryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        glossary={selectedGlossary}
      />
      <DeleteGlossaryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        glossary={selectedGlossary}
      />
    </>
  );
}

function GlossaryStat({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r ${className ?? ''}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-lg font-bold leading-none text-foreground">
          {value}
        </div>
        <div className="mt-1 text-xs font-medium text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
