'use client';

import React, { useState } from 'react';
import {
  FileText,
  Languages,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Upload,
  Download,
  Zap,
  BarChart3,
  Calendar,
  Globe,
  Film,
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';

export default function DashboardPage() {
  const recentActivity = [
    {
      id: 1,
      fileName: 'Business_Proposal_2024.docx',
      sourceLang: 'English',
      targetLang: 'Vietnamese',
      status: 'completed',
      time: '2 hours ago',
      wordCount: 2847,
    },
    {
      id: 2,
      fileName: 'Marketing_Campaign_Brief.pdf',
      sourceLang: 'English',
      targetLang: 'Spanish',
      status: 'completed',
      time: '1 day ago',
      wordCount: 1923,
    },
    {
      id: 3,
      fileName: 'Technical_Documentation.docx',
      sourceLang: 'English',
      targetLang: 'Japanese',
      status: 'completed',
      time: '3 days ago',
      wordCount: 5634,
    },
    {
      id: 4,
      fileName: 'Financial_Report_Q4.xlsx',
      sourceLang: 'English',
      targetLang: 'Chinese',
      status: 'processing',
      time: '5 hours ago',
      wordCount: 2156,
    },
  ];

  const topLanguages = [
    { lang: 'Vietnamese', count: 12, percentage: 35 },
    { lang: 'Spanish', count: 8, percentage: 24 },
    { lang: 'Japanese', count: 6, percentage: 18 },
    { lang: 'Chinese', count: 5, percentage: 15 },
    { lang: 'French', count: 3, percentage: 8 },
  ];

  const weeklyStats = [
    { day: 'Mon', documents: 3 },
    { day: 'Tue', documents: 5 },
    { day: 'Wed', documents: 4 },
    { day: 'Thu', documents: 7 },
    { day: 'Fri', documents: 6 },
    { day: 'Sat', documents: 2 },
    { day: 'Sun', documents: 1 },
  ];
  const weeklyStatsSubtitles = [
    { day: 'Mon', subtitles: 1 },
    { day: 'Tue', subtitles: 2 },
    { day: 'Wed', subtitles: 1 },
    { day: 'Thu', subtitles: 3 },
    { day: 'Fri', subtitles: 2 },
    { day: 'Sat', subtitles: 1 },
    { day: 'Sun', subtitles: 0 },
  ];

  const [weeklyFilter, setWeeklyFilter] = useState<
    'all' | 'document' | 'subtitle'
  >('all');
  const maxDocs = Math.max(
    ...(weeklyFilter === 'all'
      ? weeklyStats.map((s) => s.documents)
      : weeklyStatsSubtitles.map((s) => s.subtitles))
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back! Here's an overview of your translation activity.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm">
                <Upload className="w-5 h-5" />
                New Translation
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    12%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Documents Translated
                </p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500 mt-2">+3 this week</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Film className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    25%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Subtitle Translated
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-2">2 new this month</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    8%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Words</p>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
                <p className="text-xs text-gray-500 mt-2">6.8K this week</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    156
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Credits Remaining</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-gray-500 mt-2">28 used this week</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Activity Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Weekly Activity
                    </h3>
                    <p className="text-sm text-gray-600">
                      {weeklyFilter === 'subtitle'
                        ? 'Subtitles translated this week'
                        : weeklyFilter === 'document'
                          ? 'Documents translated this week'
                          : 'All translations this week'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-600">
                          {weeklyFilter === 'subtitle'
                            ? 'Subtitles'
                            : weeklyFilter === 'document'
                              ? 'Documents'
                              : 'All'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setWeeklyFilter((prev) =>
                            prev === 'document' ? 'all' : 'document'
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                          weeklyFilter === 'document'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Doc
                      </button>
                      <button
                        onClick={() =>
                          setWeeklyFilter((prev) =>
                            prev === 'subtitle' ? 'all' : 'subtitle'
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                          weeklyFilter === 'subtitle'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Sub
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {(weeklyFilter === 'subtitle'
                    ? weeklyStatsSubtitles
                    : weeklyStats
                  ).map((stat: any) => (
                    <div key={stat.day} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-8">
                        {stat.day}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 transition-all"
                          style={{
                            width: `${
                              ((weeklyFilter === 'subtitle'
                                ? stat.subtitles
                                : stat.documents) /
                                (maxDocs || 1)) *
                              100
                            }%`,
                          }}
                        >
                          {(weeklyFilter === 'subtitle'
                            ? stat.subtitles
                            : stat.documents) > 0 && (
                            <span className="text-xs font-semibold text-white">
                              {weeklyFilter === 'subtitle'
                                ? stat.subtitles
                                : stat.documents}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Languages */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Top Languages
                    </h3>
                    <p className="text-sm text-gray-600">Most translated to</p>
                  </div>
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {topLanguages.map((item, index) => (
                    <div key={item.lang}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {item.lang}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {item.count}
                        </span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            index === 0
                              ? 'bg-blue-600'
                              : index === 1
                                ? 'bg-purple-500'
                                : index === 2
                                  ? 'bg-green-500'
                                  : index === 3
                                    ? 'bg-orange-500'
                                    : 'bg-pink-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      Recent Activity
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate mb-1">
                            {item.fileName}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Languages className="w-3 h-3" />
                              {item.sourceLang} → {item.targetLang}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </div>
                            <span>•</span>
                            <span>{item.wordCount.toLocaleString()} words</span>
                          </div>
                        </div>
                        <div>
                          {item.status === 'completed' ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-xs font-medium text-green-600">
                                Completed
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-xs font-medium text-blue-600">
                                Processing
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                  <Upload className="w-8 h-8 mb-4 opacity-90" />
                  <h3 className="text-lg font-bold mb-2">
                    Start New Translation
                  </h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Upload your document and get professional translation in
                    seconds
                  </p>
                  <button className="w-full bg-white hover:bg-gray-100 text-blue-600 px-4 py-2.5 rounded-xl font-semibold transition-all">
                    Upload Document
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <BarChart3 className="w-8 h-8 text-gray-400 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Monthly Summary
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Documents</span>
                      <span className="text-sm font-semibold text-gray-900">
                        24
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Words</span>
                      <span className="text-sm font-semibold text-gray-900">
                        45,234
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Credits Used
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        128
                      </span>
                    </div>
                  </div>
                  <button className="w-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-semibold transition-all">
                    View Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
