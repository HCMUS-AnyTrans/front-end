import { routing } from '@/i18n/routing';
import { ResetPasswordClient } from './reset-password-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  return <ResetPasswordClient token={params.token} />;
}
