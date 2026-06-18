"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCard, DashboardCardContent } from "../dashboard-card";

export function StatsCardsLoading() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <DashboardCard
            key={i}
            className="rounded-xl border border-white/60 bg-white/45 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-black/40"
          >
            <DashboardCardContent
              padding="all"
              className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-4 md:gap-4 md:p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-9 rounded-xl sm:h-12 sm:w-12" />
                <Skeleton className="h-5 w-12 rounded-full sm:h-6 sm:w-16" />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Skeleton className="h-3 w-20 sm:h-4 sm:w-28" />
                <Skeleton className="h-7 w-16 sm:h-9 sm:w-24" />
              </div>
            </DashboardCardContent>
          </DashboardCard>
        );
      })}
    </div>
  );
}

type StatsCardsErrorProps = {
  onRetry: () => void;
  isRetrying?: boolean;
};

export function StatsCardsError({
  onRetry,
  isRetrying = false,
}: StatsCardsErrorProps) {
  const t = useTranslations("dashboard.stats");

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4 md:gap-6">
      <DashboardCard className="col-span-full">
        <DashboardCardContent
          padding="all"
          className="flex min-h-32 flex-col items-center justify-center gap-4 p-6 text-center"
        >
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
    </div>
  );
}
