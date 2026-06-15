import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
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
      <AppCard className="overflow-hidden rounded-xl border-border/70 bg-[#eef5ff] dark:bg-[linear-gradient(135deg,#0e1e38_0%,#061024_100%)] dark:border-primary/15">
        <AppCardContent
          padding="none"
          className="relative overflow-hidden p-5 sm:p-7 lg:p-9"
        >
          <Image
            src="/dashboard/dashboard-icon-banner.png"
            alt=""
            fill
            preload
            unoptimized
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-40 dark:opacity-15 dark:mix-blend-luminosity lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-br from-primary/10 via-transparent to-background/60 dark:block" />
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <DashboardGreeting />
              <div className="shrink-0 sm:pt-1">
                <QuickActions />
              </div>
            </div>
            <StatsCards />
          </div>
        </AppCardContent>
      </AppCard>

      <PaymentStatusBanner />

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
      <JobsChart />
    </div>
  );
}
