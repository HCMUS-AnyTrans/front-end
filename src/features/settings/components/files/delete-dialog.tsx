'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { TranslationJobResponse } from '@/types';

interface FilesDeleteDialogProps {
  open: boolean;
  job: TranslationJobResponse | null;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function FilesDeleteDialog({
  open,
  job,
  isDeleting,
  onOpenChange,
  onCancel,
  onConfirm,
}: FilesDeleteDialogProps) {
  const t = useTranslations('settings.files');
  const tCommon = useTranslations('common');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('confirmDeleteJob')}</DialogTitle>
          <DialogDescription>
            {t('confirmDeleteJobMessage', {
              name: job?.input_file?.name ?? job?.job_id ?? '',
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {tCommon('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
