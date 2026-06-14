'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getDomainLabel, useDomains } from '@/features/domains';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Glossary } from '@/features/glossary';

const SAVED_GLOSSARY_PAGE_SIZE = 4;

interface SavedGlossarySelectorProps {
  glossaries: Glossary[];
  selectedGlossaryId: string | null;
  isLoadingGlossaries: boolean;
  onSelectGlossary: (id: string | null) => void;
  embedded?: boolean;
}

export function SavedGlossarySelector({
  glossaries,
  selectedGlossaryId,
  isLoadingGlossaries,
  onSelectGlossary,
  embedded = false,
}: SavedGlossarySelectorProps) {
  const locale = useLocale();
  const t = useTranslations('documents.configure');
  const tGlossary = useTranslations('glossary');
  const { getDomainById } = useDomains();
  const hasSavedGlossaries = glossaries.length > 0;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(glossaries.length / SAVED_GLOSSARY_PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const visibleGlossaries = useMemo(
    () =>
      glossaries.slice(
        (safePage - 1) * SAVED_GLOSSARY_PAGE_SIZE,
        safePage * SAVED_GLOSSARY_PAGE_SIZE,
      ),
    [glossaries, safePage],
  );

  return (
    <div
      className={cn(
        'rounded-lg bg-background/70 p-4',
        embedded && 'bg-muted/10',
      )}
    >
      <div className="space-y-3">
        {!embedded ? (
          <Label className="text-sm font-medium text-foreground">
            {t('savedGlossaryLabel')}
          </Label>
        ) : null}
        {hasSavedGlossaries ? (
          <div className="grid grid-cols-2 gap-2">
            {visibleGlossaries.map((glossary) => {
              const isSelected = selectedGlossaryId === glossary.id;
              const domain = getDomainById(glossary.domainId);
              const domainLabel = domain ? getDomainLabel(domain, locale) : '';

              return (
                <button
                  key={glossary.id}
                  type="button"
                  onClick={() => onSelectGlossary(glossary.id)}
                  disabled={isLoadingGlossaries}
                  className={cn(
                    'flex min-h-20 flex-col items-start rounded-lg border p-2.5 text-left text-sm transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card text-foreground hover:bg-muted/50',
                    isLoadingGlossaries && 'cursor-wait opacity-70',
                  )}
                >
                  <span
                    className={cn(
                      'line-clamp-2 text-sm font-medium leading-5',
                      isSelected ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {glossary.name}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {domainLabel}
                  </span>
                  <span className="mt-2 inline-flex rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                    {tGlossary('termCount', { count: glossary.termCount })}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {hasSavedGlossaries && totalPages > 1 ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              {t('savedGlossaryPageStatus', { page: safePage, totalPages })}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={safePage <= 1 || isLoadingGlossaries}
              >
                {t('savedGlossaryPrev')}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={safePage >= totalPages || isLoadingGlossaries}
              >
                {t('savedGlossaryNext')}
              </Button>
            </div>
          </div>
        ) : null}

        {isLoadingGlossaries ? (
          <p className="text-xs text-muted-foreground">
            {t('savedGlossaryLoading')}
          </p>
        ) : glossaries.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-muted/20 p-5 text-center">
            <p className="text-sm text-muted-foreground">
              {t('savedGlossaryEmpty')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
