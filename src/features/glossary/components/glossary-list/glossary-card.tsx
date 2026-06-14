'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRightLeft,
  Book,
  Calendar,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getDomainLabel, useDomains } from '@/features/domains';
import type { Glossary } from '../../types';
import {
  GlossaryDomainIcon,
  GlossaryLanguageFlag,
} from '../shared/glossary-visuals';

interface GlossaryCardProps {
  glossary: Glossary;
  onClick: (glossary: Glossary) => void;
  onEdit: (glossary: Glossary) => void;
  onDelete: (glossary: Glossary) => void;
}

export function GlossaryCard({
  glossary,
  onClick,
  onEdit,
  onDelete,
}: GlossaryCardProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const tCommon = useTranslations('common');
  const isBlocked =
    glossary.status === 'pending' || glossary.status === 'processing';

  const { getDomainById } = useDomains();
  const domainInfo = getDomainById(glossary.domainId);
  const domainLabel = domainInfo ? getDomainLabel(domainInfo, locale) : '';

  const formattedDate = new Date(glossary.createdAt).toLocaleDateString();

  return (
    <div
      className={
        isBlocked
          ? 'group relative rounded-2xl border bg-card p-5 opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          : 'group relative cursor-pointer rounded-2xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      }
      onClick={() => {
        if (!isBlocked) {
          onClick(glossary);
        }
      }}
      role="button"
      tabIndex={0}
      aria-disabled={isBlocked}
      aria-label={`${glossary.name} — ${t(`languages.${glossary.srcLang}`)} → ${t(`languages.${glossary.tgtLang}`)}`}
      onKeyDown={(e) => {
        if (!isBlocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(glossary);
        }
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <GlossaryDomainIcon
            domainKey={domainInfo?.key}
            className="size-10 object-contain"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 pr-2">
              <h3 className="line-clamp-1 text-base font-semibold leading-tight">
                {glossary.name}
              </h3>
              {glossary.status !== 'created' ? (
                <span
                  className={
                    glossary.status === 'failed'
                      ? 'inline-flex rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive'
                      : 'inline-flex rounded-full border border-amber-300/40 bg-amber-100/70 px-2 py-0.5 text-[11px] font-medium text-amber-700'
                  }
                >
                  {t(`status.${glossary.status}`)}
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              {domainLabel}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-mr-2 -mt-2 size-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={(e) => e.stopPropagation()}
              disabled={isBlocked}
            >
              <MoreHorizontal className="size-5" />
              <span className="sr-only">{tCommon('actions')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit(glossary);
              }}
            >
              <Pencil className="size-4" />
              {tCommon('edit')}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(glossary);
              }}
            >
              <Trash2 className="text-destructive size-4" />
              {tCommon('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl border bg-muted/50 p-3">
        <div className="flex flex-1 items-center justify-center gap-2 text-center text-sm font-medium text-foreground">
          <GlossaryLanguageFlag code={glossary.srcLang} />
          {t(`languages.${glossary.srcLang}`)}
        </div>
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm text-muted-foreground">
          <ArrowRightLeft className="size-3" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 text-center text-sm font-medium text-foreground">
          <GlossaryLanguageFlag code={glossary.tgtLang} />
          {t(`languages.${glossary.tgtLang}`)}
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Book className="size-3.5" />
          <span>{t('termCount', { count: glossary.termCount })}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70">
          <Calendar className="size-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
