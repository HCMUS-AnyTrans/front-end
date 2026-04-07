'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import type { CreateGlossaryFormValues, GlossarySourceType } from '../data';
import { GlossaryDocumentSourceSection } from './glossary-document-source-section';
import { GlossaryManualSourcePanel } from './glossary-manual-source-panel';
import { GlossaryTemplatePanel } from './glossary-template-panel';

type GlossarySourcePanelSwitchProps = {
  form: UseFormReturn<CreateGlossaryFormValues>;
  domain: string;
  sourceType: GlossarySourceType;
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
  documentFiles: File[];
  onDocumentFilesChange: (files: File[]) => void;
};

export function GlossarySourcePanelSwitch({
  form,
  domain,
  sourceType,
  selectedTemplateId,
  onSelectTemplate,
  documentFiles,
  onDocumentFilesChange,
}: GlossarySourcePanelSwitchProps) {
  const t = useTranslations('glossary');

  if (sourceType === null) {
    return (
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
    );
  }

  if (sourceType === 'manual') {
    return <GlossaryManualSourcePanel />;
  }

  if (sourceType === 'template') {
    return (
      <GlossaryTemplatePanel
        domain={domain}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={onSelectTemplate}
      />
    );
  }

  return (
    <GlossaryDocumentSourceSection
      form={form}
      domain={domain}
      documentFiles={documentFiles}
      onDocumentFilesChange={onDocumentFilesChange}
    />
  );
}
