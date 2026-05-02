'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Eye } from 'lucide-react';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { formatFileSize } from '../../data';
import type { TranslationJobFile } from '@/types';

interface HistoryJobDetailFileSectionProps {
  label: string;
  file: TranslationJobFile;
  downloadLabel: string;
  onDownload: () => void;
  onPreview?: () => void;
  canPreview?: boolean;
  isDownloading: boolean;
  showSeparator?: boolean;
}

export function HistoryJobDetailFileSection({
  label,
  file,
  downloadLabel,
  onDownload,
  onPreview,
  canPreview = false,
  isDownloading,
  showSeparator = true,
}: HistoryJobDetailFileSectionProps) {
  const t = useTranslations('dashboard.history');
  const tReview = useTranslations('documents.review');

  return (
    <>
      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <FileTypeIcon fileName={file.name} className="size-4" />
            <div className="min-w-0 flex-1">
              <p className="wrap-break-word text-sm font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size_bytes)}
              </p>
              {file.is_expired && (
                <Badge
                  variant="outline"
                  className="mt-1 border-muted text-xs text-muted-foreground"
                >
                  {t('detail.fileExpired')}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {canPreview && onPreview && (
              <button
                type="button"
                onClick={onPreview}
                title={tReview('preview')}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:border-primary hover:text-primary"
              >
                <Eye className="size-4" />
              </button>
            )}

            {!file.is_expired && (
              <button
                type="button"
                onClick={onDownload}
                disabled={isDownloading}
                title={downloadLabel}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showSeparator ? <Separator /> : null}
    </>
  );
}
