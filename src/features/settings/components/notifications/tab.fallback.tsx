'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function NotificationsTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton className="mb-1 h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3 p-2">
              <Skeleton className="mt-0.5 size-6 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-64" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-24" />
        <Skeleton className="mb-4 h-4 w-48" />
        <div className="mb-4 flex items-center justify-end gap-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="flex items-center gap-8">
                <Skeleton className="h-5 w-9" />
                <Skeleton className="h-5 w-9" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
