import { setRequestLocale } from 'next-intl/server';
import FAQClient from './faq-client';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FAQClient />;
}
