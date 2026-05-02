'use client';

import { FileUp, LayoutTemplate, PencilLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { glossarySourceOptions } from '../../../data';
import type { CreateGlossaryFormValues } from '../../../data';
import type { GlossarySourceType } from '../../../data';
import { GlossarySourceOptionCard } from './source-option-card';
import { GlossarySourcePanelSwitch } from './source-panel-switch';

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
          <GlossarySourcePanelSwitch
            form={form}
            domain={domain}
            sourceType={sourceType}
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={onSelectTemplate}
            documentFiles={documentFiles}
            onDocumentFilesChange={onDocumentFilesChange}
          />
        </section>
      </div>
    </div>
  );
}
