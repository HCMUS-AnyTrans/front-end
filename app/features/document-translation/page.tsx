// FILE: app/features/document-translation/page.tsx
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import DocumentTranslatorClient from './document-translator-interface';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <DocumentTranslatorClient />
    </div>
  );
}
