'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  FooterLogo,
  FooterNewsletter,
  FooterLinkSection,
  FooterSocial,
  FooterBottom,
} from './';
import { ROUTES } from '@/config';

export default function Footer() {
  const t = useTranslations('footer');

  // Memoize quickLinks to avoid recreation on every render
  const quickLinks = useMemo(
    () => [
      { name: t('quickLinks.home'), href: ROUTES.PUBLIC.HOME },
      { name: t('quickLinks.features'), href: ROUTES.PUBLIC.FEATURES },
      { name: t('quickLinks.pricing'), href: ROUTES.PUBLIC.PRICING },
      { name: t('quickLinks.about'), href: ROUTES.PUBLIC.ABOUT },
      { name: t('quickLinks.contact'), href: ROUTES.PUBLIC.CONTACT },
    ],
    [t]
  );

  // Memoize services to avoid recreation on every render
  const services = useMemo(
    () => [
      {
        name: t('services.documentTranslation'),
        href: ROUTES.FEATURES.DOCUMENT_TRANSLATION,
      },
      {
        name: t('services.subtitleTranslation'),
        href: ROUTES.FEATURES.SUBTITLE_TRANSLATION,
      },
    ],
    [t]
  );

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A]">
      {/* Animated background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4169E1] to-[#1e3a8a] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1e3a8a] to-[#4169E1] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left section - Logo and newsletter */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <FooterLogo />
              <FooterNewsletter />
            </div>

            {/* Right section - Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterLinkSection
                title={t('quickLinks.title')}
                links={quickLinks}
              />
              <FooterLinkSection title={t('services.title')} links={services} />
              <FooterSocial />
            </div>
          </div>

          {/* Bottom section */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}
