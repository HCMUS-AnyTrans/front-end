'use client';

import React from 'react';
import { ChevronRight, X } from 'lucide-react';
import AuthButtons from './AuthButtons';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/config';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  isFeaturesOpen: boolean;
  onClose: () => void;
  onToggleFeatures: () => void;
  isActive: (href: string) => boolean;
}

export default function MobileMenu({
  isOpen,
  pathname,
  isFeaturesOpen,
  onClose,
  onToggleFeatures,
  isActive,
}: MobileMenuProps) {
  const t = useTranslations('header');

  const navItems = [
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
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a]">
          <h2 className="font-bold text-xl text-white">
            {t('mobileMenu.title')}
          </h2>
          <div className="flex items-center gap-2">
            <div className="[&_button]:text-white hover:bg-white/20 rounded-xl [&_button]:hover:text-white transition-all duration-300">
              <LocaleSwitcher />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label={t('mobileMenu.closeMenu')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          <nav className="p-4 space-y-1">
            {/* Home */}
            <Link
              href={ROUTES.PUBLIC.HOME}
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 active:scale-98'
              }`}
              onClick={onClose}
            >
              <span>{t('navigation.home')}</span>
              <div
                className={`w-2 h-2 bg-[#4169E1] rounded-full transition-all duration-300 ${
                  isActive('/') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              />
            </Link>

            {/* Features Collapsible */}
            <div>
              <button
                onClick={onToggleFeatures}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  isActive('/features')
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:scale-98'
                }`}
              >
                <span>{t('navigation.features')}</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isFeaturesOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Submenu */}
              <div
                className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                  isFeaturesOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {featureItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-blue-50 text-[#4169E1] font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 active:scale-98'
                    }`}
                    onClick={onClose}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        pathname === item.href ? 'bg-[#4169E1]' : 'bg-gray-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:scale-98'
                }`}
                onClick={onClose}
              >
                <span>{item.label}</span>
                <div
                  className={`w-2 h-2 bg-[#4169E1] rounded-full transition-all duration-300 ${
                    isActive(item.href)
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <AuthButtons
            variant="mobile"
            onSignupClick={onClose}
            onLoginClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
