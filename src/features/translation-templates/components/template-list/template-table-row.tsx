'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Eye, Pencil, Trash2 } from 'lucide-react';
import { LanguageLabel } from '@/components/shared/language-label';
import type { TranslationTemplate } from '../../types';
import { formatHistoryTableDate } from '@/features/history/utils/history-display';

interface TemplateTableRowProps {
  template: TranslationTemplate;
  locale: string;
  domainLabel: string;
  onView: (template: TranslationTemplate) => void;
  onEdit: (template: TranslationTemplate) => void;
  onDelete: (template: TranslationTemplate) => void;
}

export function TemplateTableRow({
  template,
  locale,
  domainLabel,
  onView,
  onEdit,
  onDelete,
}: TemplateTableRowProps) {
  const t = useTranslations('templates');

  return (
    <TableRow
      className="group cursor-pointer hover:bg-muted/30"
      onClick={() => onView(template)}
    >
      <TableCell className="max-w-[220px] px-4 py-3.5 lg:px-6">
        <span className="block truncate text-sm font-medium text-foreground">
          {template.name}
        </span>
      </TableCell>
      <TableCell className="hidden px-4 py-3.5 sm:table-cell lg:px-6">
        <div className="flex items-center gap-2 text-sm">
          <LanguageLabel value={template.srcLang} />
          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/70" />
          <LanguageLabel value={template.tgtLang} />
        </div>
      </TableCell>
      <TableCell className="hidden max-w-[180px] px-4 py-3.5 md:table-cell lg:px-6">
        <span className="block truncate text-sm text-muted-foreground">
          {domainLabel}
        </span>
      </TableCell>
      <TableCell className="hidden px-4 py-3.5 text-sm text-muted-foreground lg:table-cell lg:px-6">
        {formatHistoryTableDate(template.updatedAt, locale)}
      </TableCell>
      <TableCell
        className="px-4 py-3.5 text-right lg:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-7" onClick={() => onView(template)}>
            <Eye className="size-3.5 text-muted-foreground" />
            <span className="sr-only">{t('view')}</span>
          </Button>
          <Button variant="ghost" size="icon" className="size-7" onClick={() => onEdit(template)}>
            <Pencil className="size-3.5 text-muted-foreground" />
            <span className="sr-only">{t('edit')}</span>
          </Button>
          <Button variant="ghost" size="icon" className="size-7" onClick={() => onDelete(template)}>
            <Trash2 className="size-3.5 text-muted-foreground" />
            <span className="sr-only">{t('delete')}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
