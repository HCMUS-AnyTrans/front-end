'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function SecurityTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-20" />
        <Skeleton className="mb-4 h-4 w-40" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-32" />
        <Skeleton className="mb-4 h-4 w-48" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
