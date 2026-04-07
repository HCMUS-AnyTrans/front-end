"use client";

import { useTranslations } from "next-intl";
import { CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStorage } from "../../hooks";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../dashboard-card";
import {
  StorageUsageCardError,
  StorageUsageCardLoading,
} from "./storage-usage-card.fallback";

export function StorageUsageCard() {
  const tStorage = useTranslations("dashboard.storage");
  const { storage, isLoading, isError, refetch, isFetching } = useStorage();

  if (isLoading) return <StorageUsageCardLoading />;
  if (isError) {
    return (
      <StorageUsageCardError
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (!storage) return <StorageUsageCardLoading />;

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          {tStorage("title")}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex min-w-0 items-end justify-between gap-2">
            <span className="text-base font-bold tabular-nums text-foreground sm:text-lg">
              {storage.used} {storage.unit}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              / {storage.total} {storage.unit} ({storage.percentage}%)
            </span>
          </div>
          <Progress value={storage.percentage} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {tStorage("remaining", {
              value: (storage.total - storage.used).toFixed(1),
            })}
          </p>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
