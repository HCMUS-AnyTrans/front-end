import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Nunito, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { AccountDialogProvider } from '@/contexts/AccountDialogContext';
import { Toaster } from 'sonner';
import '../globals.css';
import Script from "next/script";

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
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJHD7J37');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body
        className={`${nunito.variable} ${inter.variable} antialiased min-h-screen font-nunito flex flex-col`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJHD7J37"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

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
