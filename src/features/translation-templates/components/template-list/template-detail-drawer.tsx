'use client';

import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { formatHistoryDateTime } from '@/features/history/utils/history-display';
import type { TranslationTemplate } from '../../types';
import { getLanguageDisplayName } from '../../utils/translation-template-utils';

interface TemplateDetailDrawerProps {
  template: TranslationTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
  domainLabel: string;
  docToneLabel: string;
  showCustomizedDomain: boolean;
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="whitespace-pre-wrap break-words text-sm text-foreground">
        {value || '-'}
      </dd>
    </div>
  );
}

export function TemplateDetailDrawer({
  template,
  open,
  onOpenChange,
  locale,
  domainLabel,
  docToneLabel,
  showCustomizedDomain,
}: TemplateDetailDrawerProps) {
  const t = useTranslations('templates');
  const tCommon = useTranslations('common');

  if (!template) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-base">{t('detail.title')}</SheetTitle>
          <SheetDescription className="break-all font-mono text-xs">
            {template.id}
          </SheetDescription>
        </SheetHeader>

        <dl className="flex flex-col gap-5 px-4 pb-6">
          <DetailRow label={t('fields.name')} value={template.name} />
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow
              label={t('fields.sourceLanguage')}
              value={getLanguageDisplayName(template.srcLang)}
            />
            <DetailRow
              label={t('fields.targetLanguage')}
              value={getLanguageDisplayName(template.tgtLang)}
            />
          </div>
          <DetailRow label={t('fields.domain')} value={domainLabel} />
          {showCustomizedDomain ? (
            <DetailRow
              label={t('fields.customizedDomain')}
              value={template.customizedDomain}
            />
          ) : null}
          <DetailRow
            label={t('fields.documentTone')}
            value={docToneLabel}
          />
          <Separator />

          <h3 className="text-base font-semibold text-foreground">
            {t('fields.fontAndPdf')}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow
              label={t('fields.keepOriginalFontSize')}
              value={
                (template.keepOriginalFontSize ?? true)
                  ? tCommon('yes')
                  : tCommon('no')
              }
            />
            <DetailRow
              label={t('fields.preservePdfFormat')}
              value={
                template.pdfTranslationFlow === 'format_preserved'
                  ? tCommon('yes')
                  : tCommon('no')
              }
            />
          </div>

          <Separator />
          <DetailRow
            label={t('fields.customInstruction')}
            value={template.customInstruction}
          />
          <DetailRow
            label={t('fields.globalContext')}
            value={template.globalContext}
          />
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow
              label={t('fields.createdAt')}
              value={formatHistoryDateTime(template.createdAt, locale)}
            />
            <DetailRow
              label={t('fields.updatedAt')}
              value={formatHistoryDateTime(template.updatedAt, locale)}
            />
          </div>
        </dl>
      </SheetContent>
    </Sheet>
  );
}
