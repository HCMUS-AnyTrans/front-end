'use client';

import { Loader2, LayoutTemplate } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { getDomainLabel, useDomains } from '@/features/domains';
import { useGlossaryTemplates } from '../../../hooks';

interface GlossaryTemplatePanelProps {
  domain: string;
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
}

export function GlossaryTemplatePanel({
  domain,
  selectedTemplateId,
  onSelectTemplate,
}: GlossaryTemplatePanelProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const { getDomainById, getDomainByKey } = useDomains();
  const selectedDomain = getDomainByKey(domain);
  const { templates, isLoading, isError, refetch } = useGlossaryTemplates(
    selectedDomain?.id,
    Boolean(selectedDomain),
  );

  if (isLoading) {
    return (
      <div className="flex h-full min-h-72 items-center justify-center gap-3 rounded-xl border border-dashed bg-background/70 p-6 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        {t('stepTwo.templateLoading')}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-background/70 p-6 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {t('stepTwo.templateErrorTitle')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('stepTwo.templateErrorDescription')}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          {t('stepTwo.templateRetry')}
        </Button>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-background/70 p-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <LayoutTemplate className="size-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {t('stepTwo.templateEmptyTitle')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('stepTwo.templateEmptyDescription')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full rounded-xl border bg-background/70 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const templateDomain = getDomainById(template.domainId);
          const templateDomainLabel = templateDomain
            ? getDomainLabel(templateDomain, locale)
            : '';

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
              className={
                isSelected
                  ? 'rounded-xl border border-primary bg-primary/5 p-4 text-left shadow-sm transition-all'
                  : 'rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:bg-muted/40'
              }
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <p
                    className={
                      isSelected
                        ? 'font-medium text-primary'
                        : 'font-medium text-foreground'
                    }
                  >
                    {template.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {templateDomainLabel}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1">
                    {t('termCount', { count: template.termCount })}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
