'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageFlag } from '@/components/shared/language-flag';
import { CardTitle } from '@/components/ui/card';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from '../dashboard-card';

type TopLanguage = {
  rank: 1 | 2 | 3;
  languageKey: 'vietnamese' | 'english' | 'japanese';
  credits: number;
};

const TOP_LANGUAGES: TopLanguage[] = [
  { rank: 1, languageKey: 'vietnamese', credits: 40 },
  { rank: 2, languageKey: 'english', credits: 20 },
  { rank: 3, languageKey: 'japanese', credits: 5 },
];

export function CreditUsageCard() {
  const tCharts = useTranslations('dashboard.charts');

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
        {TOP_LANGUAGES.map((language) => (
          <TopLanguageRow
            key={language.rank}
            language={language}
            label={tCharts(`topLanguages.${language.languageKey}`)}
            creditsLabel={tCharts('topLanguages.credits')}
          />
        ))}
      </DashboardCardContent>
    </DashboardCard>
  );
}

function TopLanguageRow({
  language,
  label,
  creditsLabel,
}: {
  language: TopLanguage;
  label: string;
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
        src={`/dashboard/top-${language.rank}.svg`}
        alt={`Top ${language.rank}`}
        width={42}
        height={42}
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
      />
      <LanguageFlag
        value={language.languageKey}
        className=" w-10 shrink-0 border border-border object-cover"
        fallbackClassName="w-11 shrink-0 border border-border"
      />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground sm:text-base">
        {label}
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
