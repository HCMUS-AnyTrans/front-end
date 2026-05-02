"use client";

import { useTranslations } from "next-intl";
import { CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useJobsChart } from "../../hooks";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../dashboard-card";
import { JobsChartError, JobsChartLoading } from "./jobs-chart.fallback";

export function JobsChart() {
  const t = useTranslations("dashboard.charts");
  const isMobile = useIsMobile();
  const { chartData, isLoading, isError, refetch, isFetching } = useJobsChart();

  const chartConfig = {
    document: {
      label: t("documents"),
      color: "var(--color-chart-1)",
    },
  } satisfies ChartConfig;

  if (isLoading) return <JobsChartLoading />;
  if (isError)
    return <JobsChartError onRetry={() => refetch()} isRetrying={isFetching} />;
  if (!chartData) return <JobsChartLoading />;

  return (
    <DashboardCard className="h-full">
      <DashboardCardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          {t("jobsByDay")}
        </CardTitle>
      </DashboardCardHeader>
      <DashboardCardContent>
        <ChartContainer config={chartConfig} className="h-[140px] w-full sm:h-[160px] md:h-[180px]">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 4,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              interval={isMobile ? 1 : 0}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              className="text-xs"
              width={isMobile ? 24 : 40}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickCount={isMobile ? 3 : 6}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => `${value}`}
                />
              }
            />
            <Area
              dataKey="document"
              type="linear"
              fill="var(--color-document)"
              fillOpacity={0.4}
              stroke="var(--color-document)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-2 flex items-center justify-center gap-6 sm:mt-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-chart-1" />
            <span className="text-xs text-muted-foreground">
              {t("documents")}
            </span>
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
