"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../dashboard-card";

export function StorageUsageCardLoading() {
  return (
    <DashboardCard>
      <DashboardCardHeader>
        <Skeleton className="h-5 w-16" />
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-3 w-28" />
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

type StorageUsageCardErrorProps = {
  onRetry: () => void;
  isRetrying: boolean;
};

export function StorageUsageCardError({
  onRetry,
  isRetrying,
}: StorageUsageCardErrorProps) {
  const tStorage = useTranslations("dashboard.storage");

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          {tStorage("title")}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {tStorage("loadErrorTitle")}
          </p>
          <p className="text-xs text-muted-foreground">
            {tStorage("loadErrorDescription")}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          {tStorage("retry")}
        </Button>
      </DashboardCardContent>
    </DashboardCard>
  );
}
