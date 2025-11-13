import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { CheckEmailClient } from './check-email-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.meta' });
  return {
    title: t('checkEmail'),
    description: t('authDescription'),
  };
}

interface CheckEmailPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function CheckEmailPage({
  params,
  searchParams,
}: CheckEmailPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const searchParamsData = await searchParams;
  return <CheckEmailClient email={searchParamsData.email} />;
}
