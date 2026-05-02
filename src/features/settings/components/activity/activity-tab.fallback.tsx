'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ActivityTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4">
          <Skeleton className="mb-1 h-5 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3 py-3">
              <Skeleton className="mt-0.5 size-9 rounded-lg" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-44" />
                </div>
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
