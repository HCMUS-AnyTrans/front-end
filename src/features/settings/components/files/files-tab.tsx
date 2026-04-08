'use client';

import { useState } from 'react';
import { FilesDeleteDialog } from './files-delete-dialog';
import { FilesListSection } from './files-list-section';
import { FilesStorageSection } from './files-storage-section';
import { FilesTabFallback } from './files-tab.fallback';
import { useRecentJobs } from '@/features/dashboard/hooks';
import { useDeleteFilesByJob, useStorageUsage } from '../../hooks/use-files';
import { useFilesDeleteDialog } from '../../hooks/use-files-delete-dialog';

const ITEMS_PER_PAGE = 10;

export function FilesTab() {
  const [page, setPage] = useState(1);

  const {
    jobsData,
    isLoading: isLoadingJobs,
    isFetching,
  } = useRecentJobs({ page, limit: ITEMS_PER_PAGE });
  const { storage, isLoading: isLoadingStorage } = useStorageUsage();
  const { deleteFilesByJob, isDeleting } = useDeleteFilesByJob();
  const deleteDialog = useFilesDeleteDialog({ deleteFilesByJob });

  const isLoading = isLoadingJobs || isLoadingStorage;

  if (isLoading) {
    return <FilesTabFallback />;
  }

  const jobs = jobsData?.data ?? [];
  const meta = jobsData?.meta;
  const usagePercent = storage?.percentage ?? 0;
  const usedText = storage
    ? `${storage.used} / ${storage.total} ${storage.unit}`
    : '— / —';

  return (
    <div className="space-y-6">
      <FilesStorageSection
        usedText={usedText}
        usagePercent={usagePercent}
        fileCount={storage?.fileCount ?? 0}
      />

      <FilesListSection
        jobs={jobs}
        meta={meta}
        isFetching={isFetching}
        isDeleting={isDeleting}
        onDeleteClick={deleteDialog.handleDeleteClick}
        onPageChange={setPage}
      />

      <FilesDeleteDialog
        open={deleteDialog.deleteDialog.open}
        job={deleteDialog.deleteDialog.job}
        isDeleting={isDeleting}
        onOpenChange={deleteDialog.handleClose}
        onCancel={deleteDialog.handleCancel}
        onConfirm={deleteDialog.confirmDelete}
      />
    </div>
  );
}
