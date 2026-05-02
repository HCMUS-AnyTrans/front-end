'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useDownloadFile } from '@/features/documents';
import { canPreviewTranslationJob } from '@/features/documents/utils/preview-capabilities';
import type { HistoryJobDetailProps } from '../../types';
import { HistoryJobDetailFileSection } from './file-section';
import { HistoryJobDetailHeader } from './detail-header';
import { HistoryJobDetailPricingSection } from './pricing-section';

export function HistoryJobDetail({
  job,
  open,
  onOpenChange,
  locale,
}: HistoryJobDetailProps) {
  const router = useRouter();
  const t = useTranslations('dashboard.history');
  const { download, isDownloading } = useDownloadFile();

  if (!job) return null;

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-base">{t('detail.title')}</SheetTitle>
          <SheetDescription className="break-all font-mono text-xs">
            {job.job_id}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 px-4 pb-6">
          <HistoryJobDetailHeader job={job} locale={locale} />

          {job.input_file && (
            <HistoryJobDetailFileSection
              label={t('detail.inputFile')}
              file={job.input_file}
              downloadLabel={t('download.original')}
              onDownload={() =>
                download(job.input_file!.id, job.input_file!.name)
              }
              isDownloading={isDownloading}
            />
          )}

          {job.output_file && (
            <HistoryJobDetailFileSection
              label={t('detail.outputFile')}
              file={job.output_file}
              downloadLabel={t('download.translated')}
              onDownload={() =>
                download(job.output_file!.id, job.output_file!.name)
              }
              onPreview={handlePreview}
              canPreview={canPreview}
              isDownloading={isDownloading}
              showSeparator={job.cost_credits !== undefined}
            />
          )}

          {job.cost_credits !== undefined && (
            <>
              <Separator />
              <HistoryJobDetailPricingSection job={job} />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
