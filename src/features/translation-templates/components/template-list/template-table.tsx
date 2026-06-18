'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TranslationTemplate } from '../../types';
import { TemplateTableRow } from './template-table-row';

interface TemplateTableProps {
  templates: TranslationTemplate[];
  locale: string;
  getDomainLabel: (template: TranslationTemplate) => string;
  onView: (template: TranslationTemplate) => void;
  onEdit: (template: TranslationTemplate) => void;
  onDelete: (template: TranslationTemplate) => void;
}

export function TemplateTable({
  templates,
  locale,
  getDomainLabel,
  onView,
  onEdit,
  onDelete,
}: TemplateTableProps) {
  const t = useTranslations('templates.columns');

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-11 px-4 text-sm font-medium text-muted-foreground lg:px-6">
              {t('name')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-sm font-medium text-muted-foreground sm:table-cell lg:px-6">
              {t('languages')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-sm font-medium text-muted-foreground md:table-cell lg:px-6">
              {t('domain')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-sm font-medium text-muted-foreground lg:table-cell lg:px-6">
              {t('updatedAt')}
            </TableHead>
            <TableHead className="h-11 px-4 text-right text-sm font-medium text-muted-foreground lg:px-6">
              {t('actions')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TemplateTableRow
              key={template.id}
              template={template}
              locale={locale}
              domainLabel={getDomainLabel(template)}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
