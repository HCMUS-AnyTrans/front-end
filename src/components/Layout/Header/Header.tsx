'use client';

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, Link, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import NavigationLink from './NavigationLink';
import { ROUTES } from '@/config';

// Dynamic imports for components that are not always visible
const FeaturesDropdown = dynamic(() => import('./FeaturesDropdown'), {
  ssr: true,
});
const AuthButtons = dynamic(() => import('./AuthButtons'), {
  ssr: true,
});
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});
const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
  ssr: true,
});

const Header = memo(function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileFeaturesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === ROUTES.PUBLIC.HOME) return pathname === ROUTES.PUBLIC.HOME;
      if (href === ROUTES.PUBLIC.FEATURES)
        return pathname.startsWith(ROUTES.PUBLIC.FEATURES);
      return pathname === href;
    },
    [pathname]
  );

  const navLinks = useMemo(
    () => [
      { href: ROUTES.PUBLIC.PRICING, label: t('navigation.pricing') },
      { href: ROUTES.PUBLIC.ABOUT, label: t('navigation.about') },
      { href: ROUTES.PUBLIC.CONTACT, label: t('navigation.contact') },
    ],
    [t]
  );

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  }, []);

  const handleDropdownEnter = useCallback(() => setIsDropdownOpen(true), []);
  const handleDropdownLeave = useCallback(() => setIsDropdownOpen(false), []);
  const handleDropdownClick = useCallback(() => {
    router.push(ROUTES.PUBLIC.FEATURES);
  }, [router]);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );
  const toggleMobileFeatures = useCallback(
    () => setIsMobileFeaturesOpen((prev) => !prev),
    []
  );

  return (
    <>
      <header className="font-medium sticky top-0 z-50 w-full bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
          {/* Logo */}
          <Link
            href={ROUTES.PUBLIC.HOME}
            className="flex items-center hover:scale-102 transition-all duration-300 delay-0"
            onClick={closeMobileMenu}
          >
            <Image
              src="/logo/logo-name-mono.svg"
              alt="anytrans"
              width={200}
              height={40}
              priority
              className="w-50 h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationLink
              href={ROUTES.PUBLIC.HOME}
              label={t('navigation.home')}
              isActive={isActive(ROUTES.PUBLIC.HOME)}
            />

            <FeaturesDropdown
              isActive={isActive(ROUTES.PUBLIC.FEATURES)}
              isOpen={isDropdownOpen}
              pathname={pathname}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <LocaleSwitcher />
            <AuthButtons variant="desktop" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={pathname}
        isFeaturesOpen={isMobileFeaturesOpen}
        onClose={closeMobileMenu}
        onToggleFeatures={toggleMobileFeatures}
        isActive={isActive}
      />
    </>
  );
});

export default Header;
