'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageFlag } from '@/components/shared/language-flag';
import { CardTitle } from '@/components/ui/card';
import { useCreditsChart } from '../../hooks';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from '../dashboard-card';
import {
  CreditUsageCardError,
  CreditUsageCardLoading,
} from './credit-usage-card.fallback';
import type { LanguageCreditUsage } from '../../types';

type TopLanguage = {
  rank: 1 | 2 | 3;
} & LanguageCreditUsage;

export function CreditUsageCard() {
  const tCharts = useTranslations('dashboard.charts');
  const { creditsData, isLoading, isError, refetch, isFetching } =
    useCreditsChart();

  if (isLoading) return <CreditUsageCardLoading />;
  if (isError)
    return (
      <CreditUsageCardError onRetry={() => refetch()} isRetrying={isFetching} />
    );

  const topLanguages: TopLanguage[] =
    creditsData?.languages.slice(0, 3).map((language, index) => ({
      ...language,
      rank: (index + 1) as TopLanguage['rank'],
    })) ?? [];

  return (
    <DashboardCard className="h-full rounded-xl border-border/70 bg-card/95">
      <DashboardCardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold text-card-foreground">
            {tCharts('topLanguages.title')}
          </CardTitle>
        </div>
      </DashboardCardHeader>
      <DashboardCardContent className="space-y-3 px-4 pb-5 pt-0 sm:px-5">
        {topLanguages.length > 0 ? (
          topLanguages.map((language) => (
            <TopLanguageRow
              key={`${language.rank}-${language.language}`}
              language={language}
              creditsLabel={tCharts('topLanguages.credits')}
            />
          ))
        ) : (
          <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 text-center text-sm text-muted-foreground">
            {tCharts('noUsageInfo')}
          </div>
        )}
      </DashboardCardContent>
    </DashboardCard>
  );
}

function TopLanguageRow({
  language,
  creditsLabel,
}: {
  language: TopLanguage;
  creditsLabel: string;
}) {
  const isFirst = language.rank === 1;

  return (
    <div
      className={
        isFirst
          ? 'relative flex items-center gap-3 overflow-hidden rounded-xl border border-amber-300 bg-amber-50/70 px-3 py-3 dark:border-amber-500/40 dark:bg-amber-500/10'
          : 'flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3 py-3'
      }
    >
      <Image
        src={`/dashboard/top-${language.rank}.png`}
        alt={`Top ${language.rank}`}
        width={256}
        height={256}
        quality={100}
        sizes="256px"
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
      />
      <LanguageFlag
        value={language.language}
        className=" w-10 shrink-0 border border-border object-cover"
        fallbackClassName="w-11 shrink-0 border border-border"
      />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground sm:text-base">
        {language.language}
      </span>
      <span
        className={
          isFirst
            ? 'shrink-0 text-lg font-bold tabular-nums text-orange-600 sm:text-xl'
            : 'shrink-0 text-lg font-bold tabular-nums text-primary sm:text-xl'
        }
      >
        {language.credits}{' '}
        <span className="text-sm font-semibold sm:text-base">
          {creditsLabel}
        </span>
      </span>
    </div>
  );
}
