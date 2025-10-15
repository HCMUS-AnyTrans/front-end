import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import SubtitleTranslationClient from './subtitle-translation-interface';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <SubtitleTranslationClient />
    </div>
  );
}
