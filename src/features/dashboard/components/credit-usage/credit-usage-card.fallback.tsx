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

export function CreditUsageCardLoading() {
  return (
    <DashboardCard>
      <DashboardCardHeader>
        <Skeleton className="h-5 w-24" />
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="space-y-2">
          <Skeleton className="mx-auto h-[80px] w-full max-w-[140px] rounded-lg sm:h-[100px] sm:max-w-[180px]" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

type CreditUsageCardErrorProps = {
  onRetry: () => void;
  isRetrying: boolean;
};

export function CreditUsageCardError({
  onRetry,
  isRetrying,
}: CreditUsageCardErrorProps) {
  const tCharts = useTranslations("dashboard.charts");

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          {tCharts("creditAllocation")}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent className="flex flex-col items-center justify-center gap-3 py-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {tCharts("loadErrorTitle")}
          </p>
          <p className="text-xs text-muted-foreground">
            {tCharts("loadErrorDescription")}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          {tCharts("retry")}
        </Button>
      </DashboardCardContent>
    </DashboardCard>
  );
}
