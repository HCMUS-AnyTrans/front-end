'use client';

import { TemplateForm } from '@/features/translation-templates';

export default function CreateTemplatePage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <TemplateForm mode="create" />
    </div>
  );
}
