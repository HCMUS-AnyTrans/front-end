'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { FileUp, Coins } from 'lucide-react';
import { BuyCreditsDialog } from '@/features/settings/components/billing/buy-credits-dialog';

export function QuickActions() {
  const [openBuyCredits, setOpenBuyCredits] = useState(false);
  const t = useTranslations('dashboard.quickActions');

  return (
    <>
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
          variant="outline"
          className="w-full cursor-pointer gap-2 bg-secondary-500 text-white hover:bg-secondary-400 hover:text-white sm:w-auto"
          onClick={() => setOpenBuyCredits(true)}
        >
          <Coins className="size-4" />
          {t('buyCredits')}
        </Button>
      </div>

      <BuyCreditsDialog
        open={openBuyCredits}
        onOpenChange={setOpenBuyCredits}
      />
    </>
  );
}
