import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { BackgroundDecorations } from '@/components/Common';
import {
  FeatureGrid,
  PricingTabs,
  ReviewSection,
  Hero,
  Statistics,
  About,
} from '@/components/HomePage';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Anytrans', url: baseUrl }],
    creator: 'Anytrans',
    publisher: 'Anytrans',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        vi: `${baseUrl}/vi`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName: 'Anytrans',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: `${baseUrl}/banner/banner-homepage.svg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@anytrans',
      creator: '@anytrans',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [`${baseUrl}/banner/banner-homepage.svg`],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anytrans',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me',
    description:
      'Professional AI-powered translation services for documents and subtitles',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: [locale],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white flex flex-col min-h-screen">
        <BackgroundDecorations />

        {/* Main content */}
        <div className="relative z-10 flex flex-col flex-1">
          <Header />
          <main className="flex-1">
            <Hero />
            <Statistics />
            <FeatureGrid />
            <About />
            <PricingTabs />
            <ReviewSection />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
