'use client';

import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StepReviewPreparingCardProps {
  t: (key: string) => string;
}

export function StepReviewPreparingCard({ t }: StepReviewPreparingCardProps) {
  return (
    <Card className="mx-auto max-w-sm sm:max-w-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-5 text-center sm:space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 sm:size-16">
            <Loader2 className="size-7 animate-spin text-primary sm:size-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {t('preparing')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('preparingHint')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
