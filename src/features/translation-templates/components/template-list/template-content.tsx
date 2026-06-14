'use client';

import { useCallback, useDeferredValue, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Plus, ClipboardList, LayoutGrid, FileText } from 'lucide-react';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
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

  const { templates = [], pagination, summary, isLoading, isFetching, isError, refetch } =
    useTranslationTemplates(queryParams);

  const getDomainLabelById = useCallback((domainId: string) => {
    const domain = getDomainById(domainId);
    return domain ? getDomainLabel(domain, locale) : null;
  }, [getDomainById, locale]);

  const hasFilters = search !== '';
  const isEmpty = templates.length === 0;
  const isRefetching = isFetching && !isLoading && !isEmpty;

  const stats = {
    templates: summary?.totalTemplates ?? 0,
    instructions: summary?.withInstructions ?? 0,
    domains: summary?.uniqueDomains ?? 0,
  };

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
      <AppCard className="overflow-hidden rounded-xl border dark:bg-card">
        <AppCardContent
          padding="none"
          className="relative min-h-[264px] overflow-hidden p-6 sm:min-h-[260px] sm:p-8 lg:min-h-[264px] lg:p-10 dark:bg-[linear-gradient(135deg,#0e1e38_0%,#061024_100%)] dark:border-primary/15"
        >
          <Image
            src="/template/template-banner.png"
            alt="Templates Banner"
            fill
            preload
            unoptimized
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] dark:opacity-60 lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-card via-card/85 to-card/45 dark:block" />
          <div className="relative z-10 flex max-w-xl flex-col gap-5">
            <div className="space-y-3">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t('title')}
                </h2>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                  {t('description')}
                </p>
              </div>
            </div>

            <div className="grid max-w-[580px] grid-cols-1 overflow-hidden rounded-xl border border-white/60 bg-white/45 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-black/15 sm:grid-cols-3">
              <TemplateStat
                icon={<ClipboardList className="size-5" />}
                value={stats.templates}
                label={t('banner.templates')}
              />
              <TemplateStat
                icon={<FileText className="size-5" />}
                value={stats.instructions}
                label={t('banner.instructions')}
              />
              <TemplateStat
                icon={<LayoutGrid className="size-5" />}
                value={stats.domains}
                label={t('banner.domains')}
                className="sm:border-r-0"
              />
            </div>
          </div>
        </AppCardContent>
      </AppCard>

      <div className="flex flex-col gap-3 sm:flex-row">
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
            ? getDocToneLabel(docTones, selectedTemplate.docToneId, locale)
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

function TemplateStat({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 border-b border-white/40 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r dark:border-white/10 ${className ?? ''}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-lg font-bold leading-none text-foreground">
          {value}
        </div>
        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
