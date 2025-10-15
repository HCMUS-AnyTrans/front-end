'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import NavigationLink from './Layout/Header/NavigationLink';
import FeaturesDropdown from './Layout/Header/FeaturesDropdown';
import AuthButtons from './Layout/Header/AuthButtons';
import MobileMenu from './Layout/Header/MobileMenu';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/features') return pathname.startsWith('/features');
    return pathname === href;
  };

  const navLinks = [
    { href: '/pricing', label: t('navigation.pricing') },
    { href: '/about', label: t('navigation.about') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  return (
    <>
      <header className="font-medium sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <img
              src="/logo/logo-name-mono.svg"
              alt="anytrans"
              className="w-50 h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationLink
              href="/"
              label={t('navigation.home')}
              isActive={isActive('/')}
            />

            <FeaturesDropdown
              isActive={isActive('/features')}
              isOpen={isDropdownOpen}
              pathname={pathname}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        onToggleFeatures={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
        isActive={isActive}
      />
    </>
  );
}
