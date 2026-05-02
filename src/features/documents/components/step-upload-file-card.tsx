'use client';

import { Check, Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/shared/utils/document-upload';
import type { UploadedFile } from '../types';
import type { UploadPipelineStatus } from '../utils/document-wizard-selectors';
import { StepUploadPipeline } from './step-upload-pipeline';

interface StepUploadFileCardProps {
  file: UploadedFile;
  hasError: boolean;
  isBusy: boolean;
  pipelineStatus: UploadPipelineStatus;
  onRemove: () => void;
  onReplace: () => void;
}

export function StepUploadFileCard({
  file,
  hasError,
  isBusy,
  pipelineStatus,
  onRemove,
  onReplace,
}: StepUploadFileCardProps) {
  const t = useTranslations('documents.upload');

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 sm:h-16 sm:w-16">
          <FileTypeIcon fileName={file.name} className="size-8" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {file.name}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              disabled={isBusy}
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </div>

          {!hasError && pipelineStatus === 'idle' ? (
            <div className="mt-2">
              <Badge
                variant="outline"
                className="gap-1.5 border-success/30 bg-success/10 text-xs text-success"
              >
                <Check className="size-3" />
                {t('fileReady')}
              </Badge>
            </div>
          ) : null}

          <div className="mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onReplace}
              disabled={isBusy}
              className="h-8 gap-1.5 text-xs"
            >
              <Upload className="size-3" />
              {t('replaceFile')}
            </Button>
          </div>
        </div>
      </div>

      {isBusy ? <StepUploadPipeline pipelineStatus={pipelineStatus} /> : null}
    </div>
  );
}
