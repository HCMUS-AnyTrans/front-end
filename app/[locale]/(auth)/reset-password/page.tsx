import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ResetPasswordClient } from './reset-password-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.meta' });

  return {
    title: t('resetPassword'),
    description: t('authDescription'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: ResetPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const search = await searchParams;
  return <ResetPasswordClient token={search.token} />;
}
