import { Skeleton } from '@/components/ui/skeleton';
import { AppCard } from '@/components/ui/app-card';

interface TemplateTableSkeletonProps {
  rowCount?: number;
}

export function TemplateTableSkeleton({ rowCount = 8 }: TemplateTableSkeletonProps) {
  return (
    <AppCard className="overflow-hidden">
      <div className="space-y-0">
        {Array.from({ length: rowCount }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(0,1.5fr)_1fr_1fr_1fr_1fr_96px] gap-4 border-b px-4 py-4 last:border-b-0 lg:px-6"
          >
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-7" />
          </div>
        ))}
      </div>
    </AppCard>
  );
}
