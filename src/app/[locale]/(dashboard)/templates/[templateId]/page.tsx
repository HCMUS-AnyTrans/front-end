'use client';

import { use } from 'react';
import { TemplateForm, useTranslationTemplateDetail } from '@/features/translation-templates';

interface EditTemplatePageProps {
  params: Promise<{ templateId: string }>;
}

export default function EditTemplatePage({ params }: EditTemplatePageProps) {
  const { templateId } = use(params);
  const { template, isLoading } = useTranslationTemplateDetail(templateId);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <TemplateForm mode="edit" template={template} isLoading={isLoading} />
    </div>
  );
}
