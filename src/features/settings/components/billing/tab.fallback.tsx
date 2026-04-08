'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function BillingTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-24" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 rounded-xl" />
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-32" />
        <Skeleton className="mb-4 h-4 w-36" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-32" />
        <Skeleton className="mb-4 h-4 w-36" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
