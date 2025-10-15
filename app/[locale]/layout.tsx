import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Nunito, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { AccountDialogProvider } from '@/contexts/AccountDialogContext';
import { Toaster } from 'sonner';
import '../globals.css';

// Primary Font - Nunito (Universal font for all languages)
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// Backup Font - Inter
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

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
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
