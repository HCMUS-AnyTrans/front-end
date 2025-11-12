import { routing } from '@/i18n/routing';
import { VerifyOtpClient } from './verify-otp-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface VerifyOtpPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function VerifyOtpPage({
  searchParams,
}: VerifyOtpPageProps) {
  const params = await searchParams;
  return <VerifyOtpClient email={params.email} />;
}
