'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import NavigationLink from './NavigationLink';
import { ROUTES } from '@/config';

const FeaturesDropdown = dynamic(() => import('./FeaturesDropdown'), {
  ssr: true,
});

interface DesktopNavigationProps {
  isActive: (href: string) => boolean;
  pathname: string;
}

export function DesktopNavigation({
  isActive,
  pathname,
}: DesktopNavigationProps) {
  const t = useTranslations('header');
  const router = useRouter();

  const navLinks = [
    { href: ROUTES.PUBLIC.PRICING, label: t('navigation.pricing') },
    { href: ROUTES.PUBLIC.ABOUT, label: t('navigation.about') },
    { href: ROUTES.PUBLIC.CONTACT, label: t('navigation.contact') },
  ];

  const handleDropdownClick = () => {
    router.push(ROUTES.PUBLIC.FEATURES);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      <NavigationLink
        href={ROUTES.PUBLIC.HOME}
        label={t('navigation.home')}
        isActive={isActive(ROUTES.PUBLIC.HOME)}
      />

      <FeaturesDropdown
        isActive={isActive(ROUTES.PUBLIC.FEATURES)}
        isOpen={pathname.startsWith(ROUTES.PUBLIC.FEATURES)}
        pathname={pathname}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onMouseDown={handleDropdownClick}
      />

      {navLinks.map((link) => (
        <NavigationLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={isActive(link.href)}
        />
      ))}
    </nav>
  );
}
