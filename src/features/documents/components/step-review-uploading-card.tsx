'use client';

import { Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StepReviewUploadingCardProps {
  progress: number;
  t: (key: string) => string;
}

export function StepReviewUploadingCard({
  progress,
  t,
}: StepReviewUploadingCardProps) {
  return (
    <Card className="mx-auto max-w-sm sm:max-w-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-5 text-center sm:space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 sm:size-16">
            <Upload className="size-7 text-primary sm:size-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {t('uploading')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('uploadingHint')}
            </p>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm font-medium text-primary">{progress}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
