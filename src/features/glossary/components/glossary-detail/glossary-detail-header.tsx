'use client';

import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlossaryDetailHeaderProps {
  glossaryName: string;
  domainLabel: string;
  srcLangLabel: string;
  tgtLangLabel: string;
  termCountLabel: string;
  backLabel: string;
  bulkImportLabel: string;
  onBack: () => void;
  onBulkImport: () => void;
  DomainIcon?: React.ComponentType<{ className?: string }>;
}

export function GlossaryDetailHeader({
  glossaryName,
  domainLabel,
  srcLangLabel,
  tgtLangLabel,
  termCountLabel,
  backLabel,
  bulkImportLabel,
  onBack,
  onBulkImport,
  DomainIcon,
}: GlossaryDetailHeaderProps) {
  return (
    <>
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
            {DomainIcon && <DomainIcon className="size-5" />}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold leading-tight sm:text-2xl">
              {glossaryName}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-muted-foreground">
              <span>{domainLabel}</span>
              <span>·</span>
              <span>{srcLangLabel}</span>
              <ArrowRight className="size-3 shrink-0" />
              <span>{tgtLangLabel}</span>
              <span>·</span>
              <span>{termCountLabel}</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full shrink-0 sm:w-auto"
          onClick={onBulkImport}
        >
          <Upload className="size-4" />
          {bulkImportLabel}
        </Button>
      </div>
    </>
  );
}
