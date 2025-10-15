import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import FeaturesClient from './features-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FeaturesClient />;
}
