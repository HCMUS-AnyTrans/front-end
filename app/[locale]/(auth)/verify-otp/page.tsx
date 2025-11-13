import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { VerifyOtpClient } from './verify-otp-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.meta' });

  return {
    title: t('verifyOtp'),
    description: t('authDescription'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface VerifyOtpPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function VerifyOtpPage({
  params,
  searchParams,
}: VerifyOtpPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const search = await searchParams;
  return <VerifyOtpClient email={search.email} />;
}
