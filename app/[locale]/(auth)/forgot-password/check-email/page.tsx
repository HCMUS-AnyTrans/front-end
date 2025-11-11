import { routing } from '@/i18n/routing';
import { CheckEmailClient } from './check-email-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface CheckEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function CheckEmailPage({
  searchParams,
}: CheckEmailPageProps) {
  const params = await searchParams;
  return <CheckEmailClient email={params.email} />;
}
