import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import DocumentTranslatorClient from './document-translator-interface';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'documentTranslation.meta',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function DocumentTranslationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <DocumentTranslatorClient />
    </div>
  );
}
