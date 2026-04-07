'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { useRecentJobs } from '../../hooks';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from '../dashboard-card';
import {
  RecentJobsTableError,
  RecentJobsTableLoading,
} from './recent-jobs-table.fallback';
import { HistoryJobDetail } from '@/features/history';
import { RecentJobsContent } from './recent-jobs-content';
import type { TranslationJobResponse } from '../../api/dashboard.api';

export function RecentJobsTable() {
  const t = useTranslations('dashboard.recentJobs');
  const locale = useLocale();
  const { jobsData, isLoading, isError, refetch, isFetching, isFetched } =
    useRecentJobs({
      limit: 6,
      page: 1,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

  const [selectedJob, setSelectedJob] = useState<TranslationJobResponse | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewDetails = useCallback((job: TranslationJobResponse) => {
    setSelectedJob(job);
    setDetailOpen(true);
  }, []);

  const jobs = jobsData?.data ?? [];
  const isEmpty = isFetched && jobs.length === 0;
  const shouldShowLoading = isLoading || !isFetched;

  return (
    <>
      <DashboardCard className="flex h-full flex-col overflow-hidden">
        <DashboardCardHeader className="flex flex-row items-center justify-between gap-4 px-4 pb-4 sm:px-6">
          <CardTitle className="text-base font-semibold text-foreground">
            {t('title')}
          </CardTitle>
          <Link
            href="/history"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t('viewAll')}
          </Link>
        </DashboardCardHeader>
        <DashboardCardContent
          padding="none"
          className="flex flex-1 flex-col px-0 pb-6"
        >
          {shouldShowLoading ? (
            <div className="flex flex-1 px-4 sm:px-6">
              <RecentJobsTableLoading />
            </div>
          ) : isError ? (
            <RecentJobsTableError
              onRetry={() => refetch()}
              isRetrying={isFetching}
            />
          ) : isEmpty ? (
            <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
              <p className="text-sm text-muted-foreground">{t('noJobs')}</p>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto">
              <RecentJobsContent
                jobs={jobs}
                onViewDetails={handleViewDetails}
              />
            </div>
          )}
        </DashboardCardContent>
      </DashboardCard>

      <HistoryJobDetail
        job={selectedJob}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        locale={locale}
      />
    </>
  );
}
