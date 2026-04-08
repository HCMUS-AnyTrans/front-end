'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { FilesJobItem } from './files-job-item';
import type { TranslationJobResponse } from '@/types';

interface FilesListSectionProps {
  jobs: TranslationJobResponse[];
  meta?: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  isFetching: boolean;
  isDeleting: boolean;
  onDeleteClick: (job: TranslationJobResponse) => void;
  onPageChange: (page: number) => void;
}

export function FilesListSection({
  jobs,
  meta,
  isFetching,
  isDeleting,
  onDeleteClick,
  onPageChange,
}: FilesListSectionProps) {
  const t = useTranslations('settings.files');

  return (
    <SettingsSection
      title={t('yourFiles')}
      description={t('yourFilesDescription')}
    >
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
          <FolderOpen className="mb-3 size-10" />
          <p className="text-sm font-medium text-foreground">
            {t('noTranslationFiles')}
          </p>
          <p className="mt-1 text-sm">{t('noTranslationFilesDescription')}</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/documents">{t('startTranslating')}</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-1">
          {jobs.map((job, idx) => (
            <div key={job.job_id}>
              {idx > 0 && <SettingsDivider />}
              <FilesJobItem
                job={job}
                isDeleting={isDeleting}
                onDeleteClick={onDeleteClick}
              />
            </div>
          ))}
        </div>
      )}

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          hasNext={meta.hasNext}
          hasPrev={meta.hasPrev}
          onPageChange={onPageChange}
          isFetching={isFetching}
        />
      )}
    </SettingsSection>
  );
}
