'use client';

import type { ReactNode } from 'react';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, CreditCard, ListChecks } from 'lucide-react';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import type { TranslationJobResponse } from '@/types';
import { useHistoryJobs } from '../../hooks';
import { HistoryFilters } from './filters';
import { HistoryTable } from './table';
import { HistoryPagination } from './pagination';
import { HistoryEmptyState } from './empty-state';
import { HistoryTableSkeleton } from './table-skeleton';
import { HistoryJobDetail } from '../detail/job-detail';

/**
 * Orchestrator for the history page.
 * Connects useHistoryJobs to all presentational sub-components
 * and manages the job-detail slide-over state.
 */
export function HistoryContent() {
  const locale = useLocale();
  const t = useTranslations('dashboard.history');

  const [selectedJob, setSelectedJob] = useState<TranslationJobResponse | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewDetails = useCallback((job: TranslationJobResponse) => {
    setSelectedJob(job);
    setDetailOpen(true);
  }, []);

  const {
    jobs,
    meta,
    summary,
    isLoading,
    isFetching,
    isError,
    search,
    statusFilter,
    domainFilter,
    hasFilters,
    handleSearchChange,
    handleStatusChange,
    handleDomainChange,
    setPage,
  } = useHistoryJobs();

  const isEmpty = jobs.length === 0;
  // isFetching but we already have data — show overlay, not skeleton
  const isRefetching = isFetching && !isLoading && !isEmpty;

  return (
    <div className="flex flex-col gap-6">
      {/* Banner stats */}
      <AppCard className="overflow-hidden rounded-xl border dark:bg-card">
        <AppCardContent
          padding="none"
          className="relative min-h-[264px] overflow-hidden p-6 sm:min-h-[260px] sm:p-8 lg:min-h-[264px] lg:p-10"
        >
          <Image
            src="/history/history-banner.svg"
            alt="History Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] dark:opacity-35 lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-card via-card/85 to-card/45 dark:block" />
          <div className="relative z-10 flex max-w-xl flex-col gap-5">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t('title')}
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                {t('description')}
              </p>
            </div>

            <div className="grid max-w-[580px] grid-cols-1 overflow-hidden rounded-xl border border-white/70 bg-white/75 shadow-sm backdrop-blur dark:border-border dark:bg-background/75 sm:grid-cols-3">
              <HistoryStat
                icon={<ListChecks className="size-5" />}
                value={(summary?.totalJobs ?? 0).toLocaleString()}
                label={t('banner.totalJobs')}
              />
              <HistoryStat
                icon={<CheckCircle2 className="size-5" />}
                value={(summary?.completedJobs ?? 0).toLocaleString()}
                label={t('banner.completedJobs')}
              />
              <HistoryStat
                icon={<CreditCard className="size-5" />}
                value={(summary?.credits ?? 0).toLocaleString()}
                label={t('banner.usedCredits')}
                className="sm:border-r-0"
              />
            </div>
          </div>
        </AppCardContent>
      </AppCard>

      {/* Filter bar */}
      <HistoryFilters
        search={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        domainFilter={domainFilter}
        onDomainChange={handleDomainChange}
      />

      {/* Content */}
      {isLoading && isEmpty ? (
        <HistoryTableSkeleton showFilters={false} />
      ) : isRefetching ? (
        <HistoryTableSkeleton showFilters={false} rowCount={jobs.length || 8} />
      ) : isError || isEmpty ? (
        <AppCard>
          <HistoryEmptyState hasFilters={hasFilters} />
        </AppCard>
      ) : (
        <AppCard className="overflow-hidden">
          <HistoryTable
            jobs={jobs}
            locale={locale}
            onViewDetails={handleViewDetails}
          />

          {meta && meta.totalPages > 1 && (
            <AppCardContent
              padding="none"
              className="border-t px-4 py-3 lg:px-6"
            >
              <HistoryPagination meta={meta} onPageChange={setPage} />
            </AppCardContent>
          )}
        </AppCard>
      )}

      {/* Job detail slide-over */}
      <HistoryJobDetail
        job={selectedJob}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        locale={locale}
      />
    </div>
  );
}

function HistoryStat({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: string;
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
        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
