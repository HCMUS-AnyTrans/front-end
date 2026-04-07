'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { FileUp, Coins } from 'lucide-react';

export function QuickActions() {
  const t = useTranslations('dashboard.quickActions');

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      <Button
        asChild
        className="w-full gap-2 bg-primary hover:bg-primary/90 sm:w-auto"
      >
        <Link href="/documents">
          <FileUp className="size-4" />
          {t('uploadDocument')}
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="w-full gap-2 bg-secondary-500 text-white hover:bg-secondary-400 hover:text-white cursor-pointer sm:w-auto"
      >
        <Link target="_blank" href="/pricing">
          <Coins className="size-4" />
          {t('buyCredits')}
        </Link>
      </Button>
    </div>
  );
}
