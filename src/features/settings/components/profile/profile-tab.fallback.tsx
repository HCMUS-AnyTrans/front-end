'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProfileTabFallback() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-20" />
        <div className="flex items-center gap-6">
          <Skeleton className="size-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-28" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-5 w-56" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
