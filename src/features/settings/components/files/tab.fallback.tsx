'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function FilesTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-28" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-20" />
        <Skeleton className="mb-4 h-4 w-40" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 py-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
