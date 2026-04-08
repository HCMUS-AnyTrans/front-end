'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Download, FileDown, FileInput, Loader2 } from 'lucide-react';
import type { TranslationJobResponse } from '@/types';
import { triggerHistoryFileDownload } from '../../utils/file-download';

export function HistoryDownloadButton({
  job,
}: {
  job: TranslationJobResponse;
}) {
  const tHistory = useTranslations('dashboard.history');
  const [loadingOriginal, setLoadingOriginal] = useState(false);
  const [loadingTranslated, setLoadingTranslated] = useState(false);

  const isLoading = loadingOriginal || loadingTranslated;
  const hasInput = Boolean(job.input_file?.id);
  const hasOutput = Boolean(job.output_file?.id);
  const inputExpired = job.input_file?.is_expired ?? false;
  const outputExpired = job.output_file?.is_expired ?? false;

  const handleDownloadOriginal = useCallback(async () => {
    if (!hasInput || loadingOriginal) return;
    setLoadingOriginal(true);
    try {
      await triggerHistoryFileDownload(
        job.input_file!.id,
        job.input_file!.name,
      );
    } finally {
      setLoadingOriginal(false);
    }
  }, [hasInput, job.input_file, loadingOriginal]);

  const handleDownloadTranslated = useCallback(async () => {
    if (!hasOutput || outputExpired || loadingTranslated) return;
    setLoadingTranslated(true);
    try {
      await triggerHistoryFileDownload(
        job.output_file!.id,
        job.output_file!.name,
      );
    } finally {
      setLoadingTranslated(false);
    }
  }, [hasOutput, job.output_file, loadingTranslated, outputExpired]);

  if (!hasInput && !hasOutput) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                ) : (
                  <Download className="size-3.5 text-muted-foreground" />
                )}
                <span className="sr-only">{tHistory('download.label')}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              {tHistory('download.label')}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {hasInput &&
              (inputExpired ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <DropdownMenuItem
                        disabled
                        className="cursor-not-allowed gap-2 opacity-50"
                      >
                        <FileInput className="size-4 shrink-0" />
                        <div className="flex flex-col">
                          <span>{tHistory('download.original')}</span>
                          <span className="text-xs text-muted-foreground">
                            {tHistory('fileExpired')}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {tHistory('fileExpired')}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <DropdownMenuItem
                  className="gap-2"
                  onClick={handleDownloadOriginal}
                  disabled={loadingOriginal}
                >
                  <FileInput className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span>{tHistory('download.original')}</span>
                    <span className="max-w-[150px] truncate text-xs text-muted-foreground">
                      {job.input_file!.name}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}

            {hasOutput &&
              (outputExpired ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <DropdownMenuItem
                        disabled
                        className="cursor-not-allowed gap-2 opacity-50"
                      >
                        <FileDown className="size-4 shrink-0" />
                        <div className="flex flex-col">
                          <span>{tHistory('download.translated')}</span>
                          <span className="text-xs text-muted-foreground">
                            {tHistory('fileExpired')}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {tHistory('fileExpired')}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <DropdownMenuItem
                  className="gap-2"
                  onClick={handleDownloadTranslated}
                  disabled={loadingTranslated}
                >
                  <FileDown className="size-4 shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <span>{tHistory('download.translated')}</span>
                    <span className="max-w-[150px] truncate text-xs text-muted-foreground">
                      {job.output_file!.name}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipContent>{tHistory('download.label')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
