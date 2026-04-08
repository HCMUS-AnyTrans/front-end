'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function PreferencesTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-24" />
        <Skeleton className="mb-4 h-4 w-48" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-9 w-48" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-32" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-44" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
