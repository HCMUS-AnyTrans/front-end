'use client';

import { AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StepReviewFailedCardProps {
  error: string | null;
  jobError: string | null | undefined;
  t: (key: string) => string;
}

export function StepReviewFailedCard({
  error,
  jobError,
  t,
}: StepReviewFailedCardProps) {
  const errorMessage = error || jobError || t('unknownError');

  return (
    <Card className="mx-auto max-w-sm sm:max-w-lg">
      <CardContent className="p-5 sm:p-8">
        <div className="space-y-5 text-center sm:space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 sm:size-16">
            <XCircle className="size-7 text-destructive sm:size-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {t('failed')}
            </h3>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-left">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
