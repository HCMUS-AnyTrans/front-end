'use client';

import Image from 'next/image';
import { HardDrive, ShieldCheck, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { cn } from '@/lib/utils';
import { DOCUMENT_FILE_TYPE_LABELS } from '@/shared/utils/document-upload';

interface StepUploadEmptyProps {
  isBusy: boolean;
  onOpenPicker: () => void;
  onDropzoneKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export function StepUploadEmpty({
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
        'relative flex min-h-[360px] flex-col items-center justify-center px-6 py-2 sm:py-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-[380px]',
        isBusy ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      )}
      aria-disabled={isBusy}
    >
      <Image
        src="/translation/upload-banner.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 960px"
        className="pointer-events-none object-cover object-top opacity-95"
      />
      <div className="pointer-events-none absolute inset-0 hidden bg-card/70 dark:block" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <Image
          src="/translation/upload-icon.png"
          alt=""
          width={168}
          height={136}
        />

        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          {t('dropzone')}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {DOCUMENT_FILE_TYPE_LABELS.map((ext) => (
            <span
              key={ext}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur"
            >
              <FileTypeIcon
                fileName={`document.${ext.toLowerCase()}`}
                className="size-4"
              />
              {ext}
            </span>
          ))}
        </div>

        <Button
          type="button"
          size="lg"
          className="mt-6 h-12 min-w-60 gap-2 rounded-xl bg-primary px-8 text-base font-semibold  hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPicker();
          }}
          disabled={isBusy}
        >
          <Upload className="size-5" />
          {t('browse')}
        </Button>

        <div className="mt-6 flex w-full max-w-2xl items-center justify-center border-t border-border pt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 px-4">
            <HardDrive className="size-4 shrink-0 text-muted-foreground" />
            {t('maxSize')}
          </span>
          <span className="hidden h-10 w-px bg-border sm:block" />
          <span className="flex items-center gap-2 px-4">
            <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
            {t('secureHint')}
          </span>
        </div>
      </div>
    </div>
  );
}
