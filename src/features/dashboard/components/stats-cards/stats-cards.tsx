'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { DashboardCard, DashboardCardContent } from '../dashboard-card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboardStats } from '../../hooks';
import { StatsCardsError, StatsCardsLoading } from './stats-cards.fallback';

export function StatsCards() {
  const t = useTranslations('dashboard.stats');
  const locale = useLocale();
  const { stats, isLoading, isError, refetch, isFetching } =
    useDashboardStats();

  if (isLoading) return <StatsCardsLoading />;

  if (isError)
    return (
      <StatsCardsError onRetry={() => refetch()} isRetrying={isFetching} />
    );

  if (!stats) return <StatsCardsLoading />;

  const statCards = [
    {
      title: t('totalCredits'),
      value: stats.totalCredits.toLocaleString(
        locale === 'vi' ? 'vi-VN' : 'en-US',
      ),
      change: stats.creditsChange,
      trend: stats.creditsTrend,
      iconSrc: '/dashboard/credit-stat-icon.png',
      iconAlt: 'Total credits',
    },
    {
      title: t('totalJobs'),
      value: stats.totalJobs.toString(),
      change: stats.jobsChange,
      trend: stats.jobsTrend,
      iconSrc: '/dashboard/document-stat-icon.png',
      iconAlt: 'Total jobs',
    },
    {
      title: t('processing'),
      value: stats.processingJobs.toString(),
      change: stats.processingChange,
      trend: stats.processingTrend,
      iconSrc: '/dashboard/time-stat-icon.png',
      iconAlt: 'Processing jobs',
    },
    {
      title: t('completedThisMonth'),
      value: stats.completedThisMonth.toString(),
      change: stats.completedChange,
      trend: stats.completedTrend,
      iconSrc: '/dashboard/complete-stat-icon.png',
      iconAlt: 'Completed jobs',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-2 md:grid-cols-4 md:gap-4">
      {statCards.map((stat) => (
        <DashboardCard
          key={stat.title}
          className="rounded-2xl border-border/70 bg-card/95"
        >
          <DashboardCardContent
            padding="all"
            className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4 md:p-5"
          >
            <Image
              src={stat.iconSrc}
              alt={stat.iconAlt}
              width={56}
              height={56}
              className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
            />

            <div className="flex flex-1 flex-col min-w-0">
              <span className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                {stat.title}
              </span>
              <div className="mt-0.5 flex items-baseline gap-1.5 sm:mt-1 sm:gap-2">
                <span className="text-lg font-bold tracking-tight text-foreground tabular-nums sm:text-xl md:text-2xl">
                  {stat.value}
                </span>

                <div className="flex items-center gap-0.5 rounded-full px-1 py-0 sm:gap-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="size-2.5 text-success sm:size-3" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="size-2.5 text-accent sm:size-3" />
                  ) : null}
                  <span
                    className={`text-[10px] font-bold ${
                      stat.trend === 'up'
                        ? 'text-success'
                        : stat.trend === 'down'
                          ? 'text-accent'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      ))}
    </div>
  );
}
