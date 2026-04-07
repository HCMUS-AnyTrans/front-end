'use client';

import { FileUp, LayoutTemplate, PencilLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { glossarySourceOptions } from '../data';
import type { CreateGlossaryFormValues } from '../data';
import type { GlossarySourceType } from '../data/create-glossary-source';
import { GlossaryDocumentSourcePanel } from './glossary-document-source-panel';
import { GlossaryManualSourcePanel } from './glossary-manual-source-panel';
import { GlossarySourceOptionCard } from './glossary-source-option-card';
import { GlossaryTemplatePanel } from './glossary-template-panel';

interface CreateGlossaryStepTwoProps {
  form: UseFormReturn<CreateGlossaryFormValues>;
  domain: string;
  sourceType: GlossarySourceType;
  onSourceTypeChange: (sourceType: GlossarySourceType) => void;
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
  documentFiles: File[];
  onDocumentFilesChange: (files: File[]) => void;
}

const sourceIcons = {
  manual: PencilLine,
  template: LayoutTemplate,
  document: FileUp,
} as const;

export function CreateGlossaryStepTwo({
  form,
  domain,
  sourceType,
  onSourceTypeChange,
  selectedTemplateId,
  onSelectTemplate,
  documentFiles,
  onDocumentFilesChange,
}: CreateGlossaryStepTwoProps) {
  const t = useTranslations('glossary');

  return (
    <div className="px-8 pb-8">
      <div className="grid min-h-[360px] items-stretch gap-6 lg:grid-cols-[minmax(220px,1fr)_minmax(0,3fr)]">
        <aside className="space-y-3">
          {glossarySourceOptions.map((option) => {
            const Icon = sourceIcons[option.id];

            return (
              <GlossarySourceOptionCard
                key={option.id}
                icon={Icon}
                title={t(`stepTwo.sources.${option.id}.title`)}
                description={t(`stepTwo.sources.${option.id}.description`)}
                isActive={sourceType === option.id}
                onClick={() => onSourceTypeChange(option.id)}
              />
            );
          })}
        </aside>

        <section className="flex h-full min-h-[360px] min-w-0 flex-col">
          {sourceType === 'manual' ? <GlossaryManualSourcePanel /> : null}
          {sourceType === 'template' ? (
            <GlossaryTemplatePanel
              domain={domain}
              selectedTemplateId={selectedTemplateId}
              onSelectTemplate={onSelectTemplate}
            />
          ) : null}
          {sourceType === 'document' ? (
            <div className="flex min-h-0 flex-1 flex-col gap-4">
              {domain === 'other' ? (
                <div className="flex-none rounded-xl border bg-background/70 p-4">
                  <FormField
                    control={form.control}
                    name="customizedDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('stepTwo.customDomainLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder={t('stepTwo.customDomainPlaceholder')}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          {t('stepTwo.customDomainDescription')}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              <div className="min-h-[320px] flex-1">
                <GlossaryDocumentSourcePanel
                  files={documentFiles}
                  onFilesChange={onDocumentFilesChange}
                />
              </div>
            </div>
          ) : null}
          {sourceType === null ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('stepTwo.selectSource')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('stepTwo.selectSourceHelper')}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
