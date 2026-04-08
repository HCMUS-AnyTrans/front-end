'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, FileDown, FileInput, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { triggerFileDownload } from '../../utils/file-download';
import type { TranslationJobResponse } from '@/types';

interface FilesDownloadButtonProps {
  job: TranslationJobResponse;
}

export function FilesDownloadButton({ job }: FilesDownloadButtonProps) {
  const t = useTranslations('settings.files');
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
      await triggerFileDownload(job.input_file!.id, job.input_file!.name);
    } finally {
      setLoadingOriginal(false);
    }
  }, [hasInput, job.input_file, loadingOriginal]);

  const handleDownloadTranslated = useCallback(async () => {
    if (!hasOutput || outputExpired || loadingTranslated) return;
    setLoadingTranslated(true);
    try {
      await triggerFileDownload(job.output_file!.id, job.output_file!.name);
    } finally {
      setLoadingTranslated(false);
    }
  }, [hasOutput, job.output_file, loadingTranslated, outputExpired]);

  if (!hasInput && !hasOutput) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <Download className="size-4 text-muted-foreground" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          {t('download')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {hasInput &&
          (inputExpired ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <DropdownMenuItem
                      disabled
                      className="cursor-not-allowed gap-2 opacity-50"
                    >
                      <FileInput className="size-4 shrink-0" />
                      <div className="flex flex-col">
                        <span>{t('downloadOriginal')}</span>
                        <span className="text-xs text-muted-foreground">
                          {t('fileExpired')}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left">{t('fileExpired')}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <DropdownMenuItem
              className="gap-2"
              onClick={handleDownloadOriginal}
              disabled={loadingOriginal}
            >
              <FileInput className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span>{t('downloadOriginal')}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {job.input_file!.name}
                </span>
              </div>
            </DropdownMenuItem>
          ))}

        {hasOutput &&
          (outputExpired ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <DropdownMenuItem
                      disabled
                      className="cursor-not-allowed gap-2 opacity-50"
                    >
                      <FileDown className="size-4 shrink-0" />
                      <div className="flex flex-col">
                        <span>{t('downloadTranslated')}</span>
                        <span className="text-xs text-muted-foreground">
                          {t('fileExpired')}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left">{t('fileExpired')}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <DropdownMenuItem
              className="gap-2"
              onClick={handleDownloadTranslated}
              disabled={loadingTranslated}
            >
              <FileDown className="size-4 shrink-0 text-primary" />
              <div className="flex min-w-0 flex-col">
                <span>{t('downloadTranslated')}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {job.output_file!.name}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
