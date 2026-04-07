"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../dashboard-card";

export function JobsChartLoading() {
  return (
    <DashboardCard className="h-full">
      <DashboardCardHeader>
        <Skeleton className="h-5 w-40" />
      </DashboardCardHeader>
      <DashboardCardContent>
        <Skeleton className="h-[140px] w-full rounded-md sm:h-[160px] md:h-[180px]" />
        <div className="mt-3 flex items-center justify-center gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

type JobsChartErrorProps = {
  onRetry: () => void;
  isRetrying?: boolean;
};

export function JobsChartError({
  onRetry,
  isRetrying = false,
}: JobsChartErrorProps) {
  const t = useTranslations("dashboard.charts");

  return (
    <DashboardCard className="h-full">
      <DashboardCardContent className="flex min-h-[244px] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {t("loadErrorTitle")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("loadErrorDescription")}
          </p>
        </div>
        <Button variant="outline" onClick={onRetry} disabled={isRetrying}>
          {t("retry")}
        </Button>
      </DashboardCardContent>
    </DashboardCard>
  );
}
