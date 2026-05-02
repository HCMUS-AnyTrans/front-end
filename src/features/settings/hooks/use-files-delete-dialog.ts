'use client';

import { useCallback, useState } from 'react';
import type { TranslationJobResponse } from '@/types';

interface UseFilesDeleteDialogOptions {
  deleteFilesByJob: (jobId: string) => void;
}

export function useFilesDeleteDialog({
  deleteFilesByJob,
}: UseFilesDeleteDialogOptions) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    job: TranslationJobResponse | null;
  }>({
    open: false,
    job: null,
  });

  const handleDeleteClick = useCallback((job: TranslationJobResponse) => {
    setDeleteDialog({ open: true, job });
  }, []);

  const handleClose = useCallback(
    (open: boolean) => {
      setDeleteDialog({ open, job: open ? deleteDialog.job : null });
    },
    [deleteDialog.job],
  );

  const handleCancel = useCallback(() => {
    setDeleteDialog({ open: false, job: null });
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteDialog.job) {
      deleteFilesByJob(deleteDialog.job.job_id);
      setDeleteDialog({ open: false, job: null });
    }
  }, [deleteDialog.job, deleteFilesByJob]);

  return {
    deleteDialog,
    handleDeleteClick,
    handleClose,
    handleCancel,
    confirmDelete,
  };
}
