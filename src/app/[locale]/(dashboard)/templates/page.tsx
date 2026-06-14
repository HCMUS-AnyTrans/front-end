'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { TemplateContent } from '@/features/translation-templates';

export default function TemplatesPage() {
  const t = useTranslations('templates');

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <AppCard className="overflow-hidden rounded-xl border dark:bg-card">
        <AppCardContent
          padding="none"
          className="relative min-h-[200px] overflow-hidden p-6 sm:min-h-[200px] sm:p-8 lg:min-h-[200px] lg:p-10"
        >
          <Image
            src="/template/template-banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_center] dark:opacity-35"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-card via-card/85 to-card/45 dark:block" />
          <div className="relative z-10 flex max-w-xl flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
              {t('description')}
            </p>
          </div>
        </AppCardContent>
      </AppCard>

      <TemplateContent />
    </div>
  );
}
