'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { getJobStatusConfig } from '@/features/dashboard/data';
import { formatHistoryDateTime } from '../../utils/history-display';
import type { TranslationJobResponse } from '@/types';

interface HistoryJobDetailHeaderProps {
  job: TranslationJobResponse;
  locale: string;
}

export function HistoryJobDetailHeader({
  job,
  locale,
}: HistoryJobDetailHeaderProps) {
  const t = useTranslations('dashboard.history');
  const tStatus = useTranslations('dashboard.status');
  const statusCfg = getJobStatusConfig(job.status);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Badge
          variant="outline"
          className={`text-xs ${statusCfg?.className ?? ''}`}
        >
          {tStatus(job.status)}
        </Badge>
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>{job.src_lang}</span>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <span>{job.tgt_lang}</span>
        </div>
      </div>

      {job.status === 'failed' && job.error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span className="wrap-break-word">{job.error}</span>
        </div>
      )}

      <Separator />

      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t('detail.timing')}
        </p>
        <div className="grid gap-2 text-sm">
          <div className="flex items-start justify-between gap-2">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3.5" />
              {t('detail.createdAt')}
            </span>
            <span className="text-right text-foreground">
              {formatHistoryDateTime(job.created_at, locale)}
            </span>
          </div>
          {job.completed_at && (
            <div className="flex items-start justify-between gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="size-3.5" />
                {t('detail.completedAt')}
              </span>
              <span className="text-right text-foreground">
                {formatHistoryDateTime(job.completed_at, locale)}
              </span>
            </div>
          )}
        </div>
      </div>

      <Separator />
    </>
  );
}
