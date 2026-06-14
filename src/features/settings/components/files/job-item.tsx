'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { getJobStatusConfig } from '@/features/dashboard/data';
import { FileExpiryInfo } from './file-expiry-info';
import { FilesDownloadButton } from './download-button';
import { formatSettingsFileSize } from '../../utils/files-display';
import type { TranslationJobResponse } from '@/types';

interface FilesJobItemProps {
  job: TranslationJobResponse;
  isDeleting: boolean;
  onDeleteClick: (job: TranslationJobResponse) => void;
}

export function FilesJobItem({
  job,
  isDeleting,
  onDeleteClick,
}: FilesJobItemProps) {
  const t = useTranslations('settings.files');
  const tStatus = useTranslations('dashboard.status');

  const fileName = job.input_file?.name ?? job.job_id;
  const statusCfg = getJobStatusConfig(job.status);
  const hasInputFile = Boolean(job.input_file);
  const hasOutputFile = Boolean(job.output_file);

  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <FileTypeIcon fileName={fileName} className="size-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-medium text-foreground">
              {fileName}
            </p>
            <Badge
              variant="outline"
              className={`shrink-0 text-xs ${statusCfg?.className ?? ''}`}
            >
              {tStatus(job.status)}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              {job.src_lang}
              <ArrowRight className="size-3" />
              {job.tgt_lang}
            </span>
            {job.cost_credits !== undefined && (
              <>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/shared/credit.svg"
                    alt="Credits"
                    width={12}
                    height={12}
                    className="size-3 shrink-0"
                  />
                  {job.cost_credits}
                </span>
              </>
            )}
          </div>

          {hasInputFile && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {t('originalFile')}:
              </span>
              <span>{formatSettingsFileSize(job.input_file!.size_bytes)}</span>
              <span>&bull;</span>
              <FileExpiryInfo file={job.input_file!} />
            </div>
          )}

          {hasOutputFile && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {t('translatedFile')}:
              </span>
              <span>{formatSettingsFileSize(job.output_file!.size_bytes)}</span>
              <span>&bull;</span>
              <FileExpiryInfo file={job.output_file!} />
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <FilesDownloadButton job={job} />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onDeleteClick(job)}
          className="text-muted-foreground hover:text-destructive"
          disabled={isDeleting}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
