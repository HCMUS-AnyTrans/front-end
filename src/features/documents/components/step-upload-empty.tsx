'use client';

import { HardDrive, ShieldCheck, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DOCUMENT_FILE_TYPE_LABELS } from '@/shared/utils/document-upload';

interface StepUploadEmptyProps {
  isDragging: boolean;
  isBusy: boolean;
  onOpenPicker: () => void;
  onDropzoneKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export function StepUploadEmpty({
  isDragging,
  isBusy,
  onOpenPicker,
  onDropzoneKeyDown,
}: StepUploadEmptyProps) {
  const t = useTranslations('documents.upload');

  return (
    <div
      role="button"
      tabIndex={isBusy ? -1 : 0}
      onClick={onOpenPicker}
      onKeyDown={onDropzoneKeyDown}
      className={cn(
        'relative flex flex-col items-center px-6 py-10 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:py-14',
        isBusy ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      )}
      aria-disabled={isBusy}
    >
      <div className="relative mb-5">
        <div
          className={cn(
            'absolute -inset-2.5 rounded-2xl border-2 border-dashed transition-all duration-300',
            isDragging
              ? 'border-primary opacity-70 scale-110'
              : 'border-primary/20 opacity-60',
          )}
        />
        <div className="relative flex size-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm sm:size-20">
          <Upload className="size-7 sm:size-9" />
        </div>
      </div>

      <h3 className="text-base font-semibold text-foreground sm:text-xl">
        {t('dropzone')}
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        {t('dragHint')}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {DOCUMENT_FILE_TYPE_LABELS.map((ext) => (
          <span
            key={ext}
            className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {ext}
          </span>
        ))}
      </div>

      <Button
        type="button"
        size="lg"
        className="mt-6 gap-2 shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          onOpenPicker();
        }}
        disabled={isBusy}
      >
        <Upload className="size-4" />
        {t('browse')}
      </Button>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <HardDrive className="size-3.5 shrink-0" />
          {t('maxSize')}
        </span>
        <span className="hidden text-border sm:block">-</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 shrink-0" />
          {t('secureHint')}
        </span>
      </div>
    </div>
  );
}
