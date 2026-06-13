'use client';

import { useCallback, useDeferredValue, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { getDocToneLabel, useDocTones } from '@/features/doc-tones';
import { getDomainLabel, useDomains } from '@/features/domains';
import { useTranslationTemplates } from '../../hooks';
import type { TranslationTemplate } from '../../types';
import { getTemplateDomainLabel } from '../../utils/translation-template-utils';
import { TemplateFilters } from './template-filters';
import { TemplateTable } from './template-table';
import { TemplateTableSkeleton } from './template-table-skeleton';
import { TemplateEmptyState } from './template-empty-state';
import { TemplateDetailDrawer } from './template-detail-drawer';
import { DeleteTemplateDialog } from './delete-template-dialog';

const PAGE_SIZE = 20;

export function TemplateContent() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('templates');
  const { getDomainById } = useDomains();
  const { data: docTones = [] } = useDocTones();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<TranslationTemplate | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const queryParams = {
    page,
    limit: PAGE_SIZE,
    sortBy: 'updatedAt',
    sortOrder: 'desc' as const,
    ...(deferredSearch ? { search: deferredSearch } : {}),
  };

  const { templates = [], pagination, isLoading, isFetching, isError, refetch } =
    useTranslationTemplates(queryParams);

  const getDomainLabelById = useCallback((domainId: string) => {
    const domain = getDomainById(domainId);
    return domain ? getDomainLabel(domain, locale) : null;
  }, [getDomainById, locale]);

  const hasFilters = search !== '';
  const isEmpty = templates.length === 0;
  const isRefetching = isFetching && !isLoading && !isEmpty;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCreate() {
    router.push(`/${locale}/templates/new`);
  }

  function handleView(template: TranslationTemplate) {
    setSelectedTemplate(template);
    setDetailOpen(true);
  }

  function handleEdit(template: TranslationTemplate) {
    router.push(`/${locale}/templates/${template.id}`);
  }

  function handleDelete(template: TranslationTemplate) {
    setSelectedTemplate(template);
    setDeleteOpen(true);
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <TemplateFilters
          search={search}
          onSearchChange={handleSearchChange}
        />
        <Button size="sm" className="w-full shrink-0 sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4" />
          {t('createTemplate')}
        </Button>
      </div>

      {isLoading && templates.length === 0 ? (
        <TemplateTableSkeleton />
      ) : isRefetching ? (
        <TemplateTableSkeleton rowCount={templates.length || 8} />
      ) : isError || isEmpty ? (
        <AppCard>
          <TemplateEmptyState
            hasFilters={hasFilters}
            onCreateClick={handleCreate}
            isError={isError}
            onRetry={() => void refetch()}
          />
        </AppCard>
      ) : (
        <>
          <AppCard className="overflow-hidden">
            <TemplateTable
              templates={templates}
              locale={locale}
              getDomainLabel={(template) =>
                getTemplateDomainLabel(template, getDomainLabelById)
              }
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </AppCard>
          {pagination ? (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          ) : null}
        </>
      )}

      <TemplateDetailDrawer
        template={selectedTemplate}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        locale={locale}
        domainLabel={
          selectedTemplate
            ? getTemplateDomainLabel(selectedTemplate, getDomainLabelById)
            : '-'
        }
        docToneLabel={
          selectedTemplate
            ? getDocToneLabel(docTones, selectedTemplate.docTone, locale)
            : '-'
        }
        showCustomizedDomain={Boolean(
          selectedTemplate &&
            (getDomainById(selectedTemplate.domainId)?.key === 'other' ||
              selectedTemplate.customizedDomain?.trim()),
        )}
      />
      <DeleteTemplateDialog
        template={selectedTemplate}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
