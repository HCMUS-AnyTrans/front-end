import { setRequestLocale } from 'next-intl/server';
import {
  StatsCards,
  QuickActions,
  JobsChart,
  DashboardGreeting,
  PaymentStatusBanner,
  RecentJobsTable,
  CreditUsageCard,
  StorageUsageCard,
} from '@/features/dashboard';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-hidden py-4 sm:gap-6 md:py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DashboardGreeting />
        <div className="shrink-0">
          <QuickActions />
        </div>
      </div>

      <PaymentStatusBanner />

      {/* KPI Stats */}
      <StatsCards />

      {/* Main operational area: Recent Jobs + Usage panel */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecentJobsTable />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:h-full">
          <div className="lg:flex-1">
            <CreditUsageCard />
          </div>
          <div className="lg:flex-1">
            <StorageUsageCard />
          </div>
        </div>
      </div>

      {/* Analytics: Activity chart (full width) */}
      <div className="w-full"></div>
      <JobsChart />
    </div>
  );
}
