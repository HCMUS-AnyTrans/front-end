'use client';

import { useRef, useCallback } from 'react';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DOCUMENT_INPUT_ACCEPT } from '@/shared/utils/document-upload';
import type { UploadPipelineStatus } from '../utils/document-wizard-selectors';
import type { UploadedFile } from '../types';
import { StepUploadEmpty } from './step-upload-empty';
import { StepUploadFileCard } from './step-upload-file-card';

interface StepUploadProps {
  file: UploadedFile | null;
  error: string | null;
  isDragging: boolean;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onDragChange: (dragging: boolean) => void;
  onNext: () => void;
  pipelineStatus?: UploadPipelineStatus;
  uploadError?: string | null;
}

export function StepUpload({
  file,
  error,
  isDragging,
  onFileSelect,
  onFileRemove,
  onDragChange,
  onNext,
  pipelineStatus = 'idle',
  uploadError,
}: StepUploadProps) {
  const t = useTranslations('documents.upload');
  const inputRef = useRef<HTMLInputElement>(null);

  const isBusy = pipelineStatus !== 'idle' && pipelineStatus !== 'failed';

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (isBusy) return;
      onDragChange(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) onFileSelect(droppedFile);
    },
    [isBusy, onFileSelect, onDragChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onDragChange(true);
    },
    [onDragChange],
  );
  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onDragChange(false);
    },
    [onDragChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBusy) return;
      const selectedFile = e.target.files?.[0];
      if (selectedFile) onFileSelect(selectedFile);
    },
    [isBusy, onFileSelect],
  );

  const handleRemove = useCallback(() => {
    onFileRemove();
    if (inputRef.current) inputRef.current.value = '';
  }, [onFileRemove]);

  const isValid = file !== null && error === null;
  const displayError = error || uploadError;

  const openPicker = useCallback(() => {
    if (isBusy) return;
    inputRef.current?.click();
  }, [isBusy]);

  const handleDropzoneKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPicker();
      }
    },
    [openPicker],
  );

  return (
    <div className="mx-auto max-w-2xl">
      {/* ── Dropzone / File Preview ── */}
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border-2 transition-all duration-200',
          isDragging
            ? 'border-primary bg-primary/5 shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]'
            : file
              ? 'border-border bg-card'
              : 'border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/2',
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {!file && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent)]" />
        )}

        {!file ? (
          <StepUploadEmpty
            isDragging={isDragging}
            isBusy={isBusy}
            onOpenPicker={openPicker}
            onDropzoneKeyDown={handleDropzoneKeyDown}
          />
        ) : (
          <StepUploadFileCard
            file={file}
            hasError={Boolean(error)}
            isBusy={isBusy}
            pipelineStatus={pipelineStatus}
            onRemove={handleRemove}
            onReplace={openPicker}
          />
        )}
      </div>

      {/* Error message */}
      {displayError && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/8 p-3.5 text-destructive sm:mt-4">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span className="text-sm font-medium">{displayError}</span>
        </div>
      )}

      {/* Next button */}
      <div className="mt-6 flex justify-end sm:mt-8">
        <Button
          onClick={onNext}
          disabled={!isValid || isBusy}
          size="lg"
          className="w-full gap-2 sm:w-auto"
        >
          {isBusy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t('next')}
            </>
          ) : (
            <>
              {t('next')}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={DOCUMENT_INPUT_ACCEPT}
        onChange={handleInputChange}
        disabled={isBusy}
        className="hidden"
      />
    </div>
  );
}
