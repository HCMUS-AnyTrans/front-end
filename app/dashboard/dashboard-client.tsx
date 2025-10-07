'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  ChevronDown,
  FileText,
  Film,
  TrendingUp,
  CheckCircle2,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import PageHeader from '@/src/components/Dashboard/PageHeader';
import QuickStats from '@/src/components/Dashboard/QuickStats/QuickStats';
import WeeklyActivityChart from '@/src/components/Dashboard/WeeklyActivityChart';
import TopLanguagesCard from '@/src/components/Dashboard/TopLanguagesCard';
import RecentActivityList from '@/src/components/Dashboard/RecentActivityList';
import PromoUpgradeBanner from '@/src/components/Dashboard/QuickActions/PromoUpgradeBanner';
import PromoReferralBanner from '@/src/components/Dashboard/QuickActions/PromoReferralBanner';
import { DashboardClientProps } from '@/src/components/Dashboard/types';

export default function DashboardClient({
  recentActivity,
  topLanguages,
  weeklyStatsDocuments,
  weeklyStatsSubtitles,
}: DashboardClientProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader />

      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStats.StatCard
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              iconWrapperClass="bg-blue-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title="Documents Translated"
              value="24"
              subtitle="+3 this week"
            />
            <QuickStats.StatCard
              icon={<Film className="w-6 h-6 text-purple-600" />}
              iconWrapperClass="bg-purple-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title="Subtitle Translated"
              value="8"
              subtitle="2 new this month"
            />
            <QuickStats.StatCard
              icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
              iconWrapperClass="bg-green-50"
              trend={<TrendingUp className="w-4 h-4" />}
              trendClass="text-green-600"
              title="Total Words"
              value="45.2K"
              subtitle="6.8K this week"
            />
            <QuickStats.StatCard
              icon={<Zap className="w-6 h-6 text-orange-600" />}
              iconWrapperClass="bg-orange-50"
              trend={<ArrowUpRight className="w-4 h-4" />}
              trendClass="text-red-600"
              title="Credits Remaining"
              value="156"
              subtitle="28 used this week"
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
              <PromoUpgradeBanner />
              <PromoReferralBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
