'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useStorage } from '../../hooks';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from '../dashboard-card';
import {
  StorageUsageCardError,
  StorageUsageCardLoading,
} from './storage-usage-card.fallback';

export function StorageUsageCard() {
  const tStorage = useTranslations('dashboard.storage');
  const { storage, isLoading, isError, refetch, isFetching } = useStorage();

  if (isLoading) return <StorageUsageCardLoading />;
  if (isError) {
    return (
      <StorageUsageCardError
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (!storage) return <StorageUsageCardLoading />;

  return (
    <DashboardCard className="h-full rounded-xl border-border/70 bg-card/95">
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-card-foreground">
          {tStorage('title')}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="flex items-center gap-5">
          <Image
            src="/dashboard/storage.png"
            alt="Storage usage"
            width={112}
            height={112}
            className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
          />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex min-w-0 items-end justify-between gap-2">
              <span className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
                {storage.used} {storage.unit}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                / {storage.total} {storage.unit} ({storage.percentage}%)
              </span>
            </div>
            <Progress value={storage.percentage} className="h-2 bg-muted" />
            <p className="text-xs text-muted-foreground">
              {tStorage('remaining', {
                value: (storage.total - storage.used).toFixed(1),
              })}
            </p>
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
