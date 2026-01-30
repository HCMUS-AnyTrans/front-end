'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  FileText,
  Film,
  TrendingUp,
  CheckCircle2,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import {
  PageHeader,
  QuickStats,
  WeeklyActivityChart,
  TopLanguagesCard,
  RecentActivityList,
  PromoBanner,
} from '@/components/Dashboard';
import type { DashboardClientProps } from '@/features/dashboard';

export default function DashboardClient({
  recentActivity,
  topLanguages,
  weeklyStatsDocuments,
  weeklyStatsSubtitles,
}: DashboardClientProps) {
  const t = useTranslations('dashboard.stats');

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader />

      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStats.StatCard
              icon={<FileText className="w-6 h-6 text-[#4169E1]" />}
              iconWrapperClass="bg-blue-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title={t('documentsTranslated.title')}
              value="24"
              subtitle={t('documentsTranslated.subtitle', { count: '3' })}
            />
            <QuickStats.StatCard
              icon={<Film className="w-6 h-6 text-purple-600" />}
              iconWrapperClass="bg-purple-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title={t('subtitlesTranslated.title')}
              value="8"
              subtitle={t('subtitlesTranslated.subtitle', { count: '2' })}
            />
            <QuickStats.StatCard
              icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
              iconWrapperClass="bg-green-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title={t('totalWords.title')}
              value="45.2K"
              subtitle={t('totalWords.subtitle', { count: '6.8K' })}
            />
            <QuickStats.StatCard
              icon={<Zap className="w-6 h-6 text-orange-600" />}
              iconWrapperClass="bg-orange-50"
              trend={<ArrowUpRight className="w-4 h-4" />}
              trendClass="text-red-600"
              title={t('creditsRemaining.title')}
              value="156"
              subtitle={t('creditsRemaining.subtitle', { count: '28' })}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <WeeklyActivityChart
              weeklyStats={weeklyStatsDocuments}
              weeklyStatsSubtitles={weeklyStatsSubtitles}
            />

            {/* Top Languages */}
            <TopLanguagesCard topLanguages={topLanguages} />
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <RecentActivityList items={recentActivity} />

            {/* Quick Actions */}
            <div className="space-y-4">
              <PromoBanner variant="upgrade" />
              <PromoBanner variant="referral" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
