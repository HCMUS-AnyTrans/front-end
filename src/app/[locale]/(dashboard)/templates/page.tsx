'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { TemplateContent } from '@/features/translation-templates';

export default function TemplatesPage() {
  const t = useTranslations('templates');

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <TemplateContent />
    </div>
  );
}
