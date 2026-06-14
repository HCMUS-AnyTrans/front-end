'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowRight, Eye } from 'lucide-react';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { LanguageLabel } from '@/components/shared/language-label';
import { getJobStatusConfig } from '@/features/dashboard/data';
import { canPreviewTranslationJob } from '@/features/documents/utils/preview-capabilities';
import type { TranslationJobResponse } from '@/types';
import { HistoryDownloadButton } from './download-button';
import { formatHistoryTableDate } from '../../utils/history-display';

interface HistoryTableRowProps {
  job: TranslationJobResponse;
  locale: string;
  hideActions?: boolean;
  onViewDetails: (job: TranslationJobResponse) => void;
}

export function HistoryTableRow({
  job,
  locale,
  hideActions = false,
  onViewDetails,
}: HistoryTableRowProps) {
  const router = useRouter();
  const tStatus = useTranslations('dashboard.status');
  const tReview = useTranslations('documents.review');

  const fileName = job.input_file?.name ?? job.job_id;
  const statusCfg = getJobStatusConfig(job.status);
  const canPreview =
    job.status === 'succeeded' &&
    !job.input_file?.is_expired &&
    !job.output_file?.is_expired &&
    canPreviewTranslationJob({
      inputFile: job.input_file,
      outputFile: job.output_file,
    });

  const handlePreview = () => {
    if (!canPreview) return;
    const previewUrl = `/${locale}/documents/preview?jobId=${encodeURIComponent(job.job_id)}&from=history`;
    router.push(previewUrl);
  };

  return (
    <TableRow
      className="group cursor-pointer hover:bg-muted/30"
      onClick={() => onViewDetails(job)}
    >
      <TableCell className="max-w-[180px] px-4 py-3.5 sm:max-w-[220px] lg:px-6">
        <div className="flex items-center gap-2">
          <FileTypeIcon fileName={fileName} className="size-7" />
          <span className="truncate text-sm font-medium text-foreground">
            {fileName}
          </span>
        </div>
      </TableCell>

      <TableCell className="hidden px-4 py-3.5 sm:table-cell lg:px-6">
        <div className="flex items-center gap-2 text-sm">
          <LanguageLabel value={job.src_lang} />
          <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
          <LanguageLabel value={job.tgt_lang} />
        </div>
      </TableCell>

      <TableCell className="px-4 py-3.5 lg:px-6">
        <Badge
          variant="outline"
          className={`text-xs ${statusCfg?.className ?? ''}`}
        >
          {tStatus(job.status)}
        </Badge>
      </TableCell>

      <TableCell className="hidden px-4 py-3.5 text-right md:table-cell lg:px-6">
        {job.cost_credits !== undefined ? (
          <div className="flex items-center justify-end gap-1.5">
            <Image
              src="/shared/credit.png"
              alt="Credits"
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            <span className="text-sm font-medium tabular-nums text-foreground">
              {job.cost_credits}
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </TableCell>

      <TableCell className="hidden px-4 py-3.5 md:table-cell lg:px-6">
        <span className="text-sm text-muted-foreground">
          {formatHistoryTableDate(job.created_at, locale)}
        </span>
      </TableCell>

      {!hideActions && (
        <TableCell
          className="px-4 py-3.5 text-right lg:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-end gap-1">
            <HistoryDownloadButton job={job} />
            {canPreview && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={handlePreview}
                    >
                      <Eye className="size-3.5 text-muted-foreground" />
                      <span className="sr-only">{tReview('preview')}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{tReview('preview')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
