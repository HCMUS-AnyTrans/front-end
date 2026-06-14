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
      <AppCard className="overflow-hidden rounded-3xl border-border/70 bg-[#f2f5ff] shadow-sm">
        <AppCardContent
          padding="none"
          className="relative overflow-hidden p-2 sm:p-4 lg:p-6"
        >
          <Image
            src="/dashboard/dashboard-banner.png"
            alt="Dashboard banner"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, calc(100vw - var(--dashboard-sidebar-width))"
            className="object-cover object-[62%_center] lg:object-center"
          />
          <div className="relative z-10 flex flex-col gap-2 sm:gap-2 lg:gap-4">
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
      <div className="w-full"></div>
      <JobsChart />
    </div>
  );
}
