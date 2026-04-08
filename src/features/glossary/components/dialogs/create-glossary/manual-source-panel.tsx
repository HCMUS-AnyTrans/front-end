'use client';

import { PencilLine } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function GlossaryManualSourcePanel() {
  const t = useTranslations('glossary');

  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-dashed bg-background/70 p-6">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PencilLine className="size-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {t('stepTwo.manualPanelTitle')}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {t('stepTwo.manualPanelDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}
