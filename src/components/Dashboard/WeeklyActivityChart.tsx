'use client';

import React, { useMemo, useState } from 'react';
import { WeeklyStat, WeeklySubStat } from './types';

type WeeklyActivityChartProps = {
  weeklyStats: WeeklyStat[];
  weeklyStatsSubtitles: WeeklySubStat[];
};

export default function WeeklyActivityChart({
  weeklyStats,
  weeklyStatsSubtitles,
}: WeeklyActivityChartProps) {
  const [weeklyFilter, setWeeklyFilter] = useState<
    'all' | 'document' | 'subtitle'
  >('all');

  const { rows, maxValue } = useMemo(() => {
    const docs = weeklyStats.map((s) => s.documents);
    const subs = weeklyStatsSubtitles.map((s) => s.subtitles);
    const totals = weeklyStats.map(
      (s, i) => s.documents + (weeklyStatsSubtitles[i]?.subtitles || 0)
    );

    const max = Math.max(
      ...(weeklyFilter === 'document'
        ? docs
        : weeklyFilter === 'subtitle'
          ? subs
          : totals),
      1
    );

    const merged = weeklyStats.map((s, i) => ({
      day: s.day,
      documents: s.documents,
      subtitles: weeklyStatsSubtitles[i]?.subtitles || 0,
    }));

    return { rows: merged, maxValue: max };
  }, [weeklyStats, weeklyStatsSubtitles, weeklyFilter]);

  return (
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
        {rows.map((row) => {
          const value =
            weeklyFilter === 'document'
              ? row.documents
              : weeklyFilter === 'subtitle'
                ? row.subtitles
                : row.documents + row.subtitles;
          return (
            <div key={row.day} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-8">
                {row.day}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${(value / (maxValue || 1)) * 100}%` }}
                >
                  {value > 0 && (
                    <span className="text-xs font-semibold text-white">
                      {value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
