import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PricingPageClient from './pricing-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing.meta' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Anytrans', url: baseUrl }],
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
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: {
        en: `${baseUrl}/en/pricing`,
        vi: `${baseUrl}/vi/pricing`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/pricing`,
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
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Anytrans Pricing',
    description:
      'Choose the perfect plan for your translation needs. Flexible pricing for individuals and businesses.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me'}/${locale}/pricing`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Anytrans',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingPageClient />
    </>
  );
}
