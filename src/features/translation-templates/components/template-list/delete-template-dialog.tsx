'use client';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteTranslationTemplate } from '../../hooks';
import type { TranslationTemplate } from '../../types';

interface DeleteTemplateDialogProps {
  template: TranslationTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTemplateDialog({
  template,
  open,
  onOpenChange,
}: DeleteTemplateDialogProps) {
  const t = useTranslations('templates');
  const tCommon = useTranslations('common');
  const { deleteTemplate, isDeleting } = useDeleteTranslationTemplate({
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      onOpenChange(false);
    },
    onError: (message) => toast.error(message || t('deleteError')),
  });

  function handleDelete() {
    if (!template) return;
    deleteTemplate(template.id);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            {t('deleteTemplate')}
          </DialogTitle>
          <DialogDescription>{t('deleteConfirm')}</DialogDescription>
        </DialogHeader>
        {template ? (
          <div className="rounded-md border bg-muted/50 p-3 text-sm font-medium">
            {template.name}
          </div>
        ) : null}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            {tCommon('cancel')}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : null}
            {isDeleting ? t('form.deleting') : tCommon('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
