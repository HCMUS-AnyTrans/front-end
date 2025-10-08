export type RecentActivityItem = {
  id: number;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  status: 'completed' | 'processing';
  time: string;
  wordCount: number;
};

export type TopLanguageItem = {
  lang: string;
  count: number;
  percentage: number;
};

export type WeeklyStat = { day: string; documents: number };
export type WeeklySubStat = { day: string; subtitles: number };

export type DashboardClientProps = {
  recentActivity: RecentActivityItem[];
  topLanguages: TopLanguageItem[];
  weeklyStatsDocuments: WeeklyStat[];
  weeklyStatsSubtitles: WeeklySubStat[];
};
