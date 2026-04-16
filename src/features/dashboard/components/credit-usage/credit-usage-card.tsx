"use client";

import { useTranslations, useLocale } from "next-intl";
import { CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import { Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCreditsChart } from "../../hooks";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../dashboard-card";
import {
  CreditUsageCardError,
  CreditUsageCardLoading,
} from "./credit-usage-card.fallback";

const FILL_COLORS = ["var(--color-chart-1)", "var(--color-chart-3)"];

export function CreditUsageCard() {
  const tCharts = useTranslations("dashboard.charts");
  const locale = useLocale();
  const isMobile = useIsMobile();
  const { creditsData, isLoading, isError, refetch, isFetching } =
    useCreditsChart();

  if (isLoading) return <CreditUsageCardLoading />;
  if (isError) {
    return (
      <CreditUsageCardError
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (!creditsData) {
    return <CreditUsageCardLoading />;
  }

  if (creditsData.usage.documentsUsed === 0) {
    return (
      <DashboardCard>
        <DashboardCardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            {tCharts("creditAllocation")}
          </CardTitle>
        </DashboardCardHeader>
        <DashboardCardContent className="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <Info className="size-6 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">{tCharts("noUsageInfo")}</p>
        </DashboardCardContent>
      </DashboardCard>
    );
  }

  const breakdown = creditsData.breakdown;

  if (breakdown.length === 0) {
    return (
      <DashboardCard>
        <DashboardCardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            {tCharts("creditAllocation")}
          </CardTitle>
        </DashboardCardHeader>
        <DashboardCardContent className="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <Info className="size-6 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">{tCharts("noUsageInfo")}</p>
        </DashboardCardContent>
      </DashboardCard>
    );
  }

  const creditUsageData = breakdown.map((item, index) => ({
    name: item.name === "Documents" ? tCharts("documents") : item.name,
    value: item.value,
    fill: FILL_COLORS[index] || FILL_COLORS[0],
  }));

  const total = creditUsageData.reduce((acc, d) => acc + d.value, 0);

  const chartConfig = {
    value: { label: "Credits", color: "var(--color-chart-1)" },
  } satisfies ChartConfig;

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          {tCharts("creditAllocation")}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[80px] w-full max-w-[140px] sm:h-[100px] sm:max-w-[180px] md:h-[120px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value?.toLocaleString(locale === "vi" ? "vi-VN" : "en-US")} ${name}`,
                    "",
                  ]}
                />
              }
            />
            <Pie
              data={creditUsageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 24 : 28}
              outerRadius={isMobile ? 40 : 48}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {creditUsageData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-2 flex flex-col gap-1.5">
          {creditUsageData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium tabular-nums text-foreground">
                {item.value.toLocaleString(locale === "vi" ? "vi-VN" : "en-US")}
                {total > 0 && (
                  <span className="ml-1 text-muted-foreground">
                    ({Math.round((item.value / total) * 100)}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
