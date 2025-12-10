import React from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactPageClient from './contact-client';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
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
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        vi: `${baseUrl}/vi/contact`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/contact`,
      siteName: 'Anytrans',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: `${baseUrl}/banner/contact-illustration.jpg`,
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
      images: [`${baseUrl}/banner/contact-illustration.jpg`],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Anytrans',
    description:
      'Get in touch with the Anytrans team. Send us a message, find our contact information, or connect with us on social media.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me'}/${locale}/contact`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Anytrans',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@anytrans.me',
        contactType: 'Customer Support',
        availableLanguage: ['English', 'Vietnamese'],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
