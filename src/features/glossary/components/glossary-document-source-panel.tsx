'use client';

import { useRef } from 'react';
import { FileText, FileUp, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DOCUMENT_INPUT_ACCEPT,
  formatFileSize,
} from '@/shared/utils/document-upload';
import {
  MAX_FILE_COUNT,
  getValidationMessages,
  validateIncomingFiles,
} from './glossary-document-upload';

interface GlossaryDocumentSourcePanelProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function GlossaryDocumentSourcePanel({
  files,
  onFilesChange,
}: GlossaryDocumentSourcePanelProps) {
  const t = useTranslations('glossary');
  const inputRef = useRef<HTMLInputElement>(null);
  const isAtFileLimit = files.length >= MAX_FILE_COUNT;

  const handleFiles = (nextFiles: FileList | null) => {
    if (!nextFiles) {
      return;
    }

    const { acceptedFiles, rejected } = validateIncomingFiles(
      files,
      Array.from(nextFiles),
    );

    const validationMessages = getValidationMessages(rejected, (key, values) =>
      t(key, values),
    );

    if (validationMessages.length > 0) {
      toast.error(t('stepTwo.documentUploadIssuesTitle'), {
        description: validationMessages
          .map((message) => message.text)
          .join(' '),
      });
    }

    if (acceptedFiles.length > 0) {
      onFilesChange([...files, ...acceptedFiles]);
    }
  };

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        accept={DOCUMENT_INPUT_ACCEPT}
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <div className="flex flex-none items-start">
        <div className="w-full">
          <button
            type="button"
            onClick={() => {
              if (!isAtFileLimit) {
                inputRef.current?.click();
              }
            }}
            aria-disabled={isAtFileLimit}
            className={cn(
              'flex min-h-20 w-full items-center gap-3 rounded-xl border border-dashed bg-muted/20 px-4 py-3 text-left transition-all',
              isAtFileLimit
                ? 'cursor-not-allowed border-border/70 opacity-60'
                : 'hover:border-primary/30 hover:bg-muted/30',
            )}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileUp className="size-4" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t('stepTwo.documentUploadTitle')}
              </p>
              <p className="text-xs leading-5 text-muted-foreground">
                {isAtFileLimit
                  ? t('stepTwo.documentMaxReached')
                  : t('stepTwo.documentConstraints')}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-background/70 p-4">
        {files.length > 0 ? (
          <>
            <div className="mb-3 flex flex-none items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                {t('stepTwo.documentSelectedFiles')}
              </p>
              <span className="text-xs text-muted-foreground">
                {t('stepTwo.documentSelectedFilesCount', {
                  count: files.length,
                  max: MAX_FILE_COUNT,
                })}
              </span>
            </div>
            <div
              className={cn(
                'min-h-0 flex-1 pr-1',
                files.length >= 4
                  ? 'max-h-[184px] overflow-y-scroll'
                  : 'overflow-hidden',
              )}
            >
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <FileText className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() =>
                        onFilesChange(
                          files.filter((_, fileIndex) => fileIndex !== index),
                        )
                      }
                      aria-label={t('stepTwo.documentRemoveFile')}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center">
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">
                {t('stepTwo.documentEmptyTitle')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('stepTwo.documentEmptyDescription')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
