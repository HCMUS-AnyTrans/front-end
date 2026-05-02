'use client';

import { CheckCircle2, Download, Eye, Loader2 } from 'lucide-react';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatFileSize } from '@/shared/utils/document-upload';
import type {
  LanguageCode,
  TranslationJobResponse,
  UploadedFile,
} from '../types';

interface StepReviewSuccessCardProps {
  file: UploadedFile;
  jobData: TranslationJobResponse | null;
  srcLang: LanguageCode;
  tgtLang: LanguageCode;
  onDownload: () => void;
  onPreview?: () => void;
  isDownloading?: boolean;
  canPreview?: boolean;
  t: (key: string) => string;
  tLang: (key: string) => string;
}

export function StepReviewSuccessCard({
  file,
  jobData,
  srcLang,
  tgtLang,
  onDownload,
  onPreview,
  isDownloading,
  canPreview,
  t,
  tLang,
}: StepReviewSuccessCardProps) {
  const outputFile = jobData?.output_file;
  const outputFileName = outputFile?.name || `translated-${file.name}`;
  const outputFileSize = outputFile?.size_bytes;

  return (
    <Card className="mx-auto max-w-sm sm:max-w-lg">
      <CardContent className="p-5 sm:p-8">
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-success/10 sm:mb-4 sm:size-16">
              <CheckCircle2 className="size-7 text-success sm:size-8" />
            </div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {t('success')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('successHint')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{tLang(srcLang)}</Badge>
            <span>{'->'}</span>
            <Badge variant="secondary">{tLang(tgtLang)}</Badge>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:gap-4 sm:p-4">
            <div className="shrink-0">
              <FileTypeIcon fileName={outputFileName} className="size-8" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {outputFileName}
              </h4>
              {outputFileSize ? (
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {formatFileSize(outputFileSize)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {canPreview ? (
              <Button
                onClick={onPreview}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Eye className="size-4" />
                {t('preview')}
              </Button>
            ) : null}

            <Button
              onClick={onDownload}
              disabled={isDownloading}
              className="w-full"
              size="lg"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t('downloading')}
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  {t('download')}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
