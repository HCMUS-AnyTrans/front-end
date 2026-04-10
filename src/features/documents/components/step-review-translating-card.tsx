'use client';

import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StepReviewTranslatingCardProps {
  t: (key: string) => string;
}

export function StepReviewTranslatingCard({
  t,
}: StepReviewTranslatingCardProps) {
  return (
    <Card className="mx-auto max-w-sm sm:max-w-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-5 text-center sm:space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 sm:size-16">
            <Loader2 className="size-7 animate-spin text-primary sm:size-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {t('translating')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('translatingHint')}
            </p>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-muted sm:h-2">
            <div className="absolute inset-y-0 w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
