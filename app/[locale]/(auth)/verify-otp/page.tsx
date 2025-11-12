import { routing } from '@/i18n/routing';
import { VerifyOtpClient } from './verify-otp-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function VerifyOtpPage() {
  return <VerifyOtpClient />;
}
