import Sidebar from '@/src/components/Layout/Sidebar/Sidebar';
import DashboardClient from './dashboard-client';

export const dynamic = 'force-static';

export default function Page() {
  // Server Component: cung cấp dữ liệu tĩnh/mock cho client container
  const recentActivity = [
    {
      id: 1,
      fileName: 'Business_Proposal_2024.docx',
      sourceLang: 'English',
      targetLang: 'Vietnamese',
      status: 'completed' as const,
      time: '2 hours ago',
      wordCount: 2847,
    },
    {
      id: 2,
      fileName: 'Marketing_Campaign_Brief.pdf',
      sourceLang: 'English',
      targetLang: 'Spanish',
      status: 'completed' as const,
      time: '1 day ago',
      wordCount: 1923,
    },
    {
      id: 3,
      fileName: 'Technical_Documentation.docx',
      sourceLang: 'English',
      targetLang: 'Japanese',
      status: 'completed' as const,
      time: '3 days ago',
      wordCount: 5634,
    },
    {
      id: 4,
      fileName: 'Financial_Report_Q4.xlsx',
      sourceLang: 'English',
      targetLang: 'Chinese',
      status: 'processing' as const,
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

  const weeklyStatsDocuments = [
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <DashboardClient
        recentActivity={recentActivity}
        topLanguages={topLanguages}
        weeklyStatsDocuments={weeklyStatsDocuments}
        weeklyStatsSubtitles={weeklyStatsSubtitles}
      />
    </div>
  );
}
