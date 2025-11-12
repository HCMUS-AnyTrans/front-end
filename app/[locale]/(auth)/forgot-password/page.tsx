import { routing } from '@/i18n/routing';
import { ForgotPasswordClient } from './forgot-password-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
