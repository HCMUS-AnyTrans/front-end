import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Nunito, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { AccountDialogProvider } from '@/contexts/AccountDialogContext';
import { Toaster } from 'sonner';
import '../globals.css';
import { GoogleTagManager } from '@next/third-parties/google'

// Primary Font - Nunito (Universal font for all languages)
// Optimized: Only loading essential weights to reduce bundle size
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Backup Font - Inter
// Optimized: Only loading essential weights to reduce bundle size
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#173FB6',
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.meta' });

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    authors: [{ name: 'Anytrans' }],
    keywords: 'translation, document translation, subtitle translation',
    openGraph: {
      type: 'website',
      locale: locale,
      title: t('title'),
      description: t('description'),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-KJHD7J37" />
      <body
        className={`${nunito.variable} ${inter.variable} antialiased min-h-screen font-nunito flex flex-col`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <AccountDialogProvider>
            {children}
            <Toaster />
          </AccountDialogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
