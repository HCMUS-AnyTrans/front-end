'use client';

import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepReviewBottomBarProps {
  isFinished: boolean;
  onReset: () => void;
  t: (key: string) => string;
}

export function StepReviewBottomBar({
  isFinished,
  onReset,
  t,
}: StepReviewBottomBarProps) {
  return (
    <div className="mt-6 flex justify-center sm:mt-8">
      <Button
        variant="outline"
        onClick={onReset}
        disabled={!isFinished}
        className="w-full sm:w-auto"
      >
        <RefreshCcw className="size-4" />
        {t('newTranslation')}
      </Button>
    </div>
  );
}
