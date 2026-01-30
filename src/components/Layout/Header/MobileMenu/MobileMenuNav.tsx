'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/config';
import { useTranslations } from 'next-intl';

interface MobileMenuNavProps {
  pathname: string;
  isFeaturesOpen: boolean;
  onToggleFeatures: () => void;
  isActive: (href: string) => boolean;
  onClose: () => void;
}

export function MobileMenuNav({
  pathname,
  isFeaturesOpen,
  onToggleFeatures,
  isActive,
  onClose,
}: MobileMenuNavProps) {
  const t = useTranslations('header');

  const navItems = [
    { href: ROUTES.PUBLIC.HOME, label: t('navigation.home') },
    { href: ROUTES.PUBLIC.PRICING, label: t('navigation.pricing') },
    { href: ROUTES.PUBLIC.ABOUT, label: t('navigation.about') },
    { href: ROUTES.PUBLIC.CONTACT, label: t('navigation.contact') },
  ];

  const featureItems = [
    {
      href: ROUTES.FEATURES.DOCUMENT_TRANSLATION,
      label: t('featuresDropdown.documentTranslation.title'),
    },
    {
      href: ROUTES.FEATURES.SUBTITLE_TRANSLATION,
      label: t('featuresDropdown.subtitleTranslation.title'),
    },
  ];

  return (
    <nav className="p-4 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isActive(item.href)
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-brand-primary-light shadow-sm'
              : 'text-gray-700 hover:bg-gray-50 active:scale-98'
          }`}
          onClick={onClose}
        >
          <span>{item.label}</span>
          <div
            className={`w-2 h-2 bg-brand-primary-light rounded-full transition-all duration-300 ${
              isActive(item.href)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0'
            }`}
          />
        </Link>
      ))}

      <MobileFeaturesSection
        isOpen={isFeaturesOpen}
        onToggle={onToggleFeatures}
        isActive={isActive}
        features={featureItems}
        onClose={onClose}
        pathname={pathname}
      />
    </nav>
  );
}

interface MobileFeaturesSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  isActive: (href: string) => boolean;
  features: { href: string; label: string }[];
  onClose: () => void;
  pathname: string;
}

export function MobileFeaturesSection({
  isOpen,
  onToggle,
  isActive,
  features,
  onClose,
  pathname,
}: MobileFeaturesSectionProps) {
  const t = useTranslations('header');

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
          isActive('/features')
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-brand-primary-light shadow-sm'
            : 'text-gray-700 hover:bg-gray-50 active:scale-98'
        }`}
      >
        <span>{t('navigation.features')}</span>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      <div
        className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {features.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
              pathname === item.href
                ? 'bg-blue-50 text-brand-primary-light font-semibold'
                : 'text-gray-600 hover:bg-gray-50 active:scale-98'
            }`}
            onClick={onClose}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                pathname === item.href ? 'bg-brand-primary-light' : 'bg-gray-400'
              }`}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
