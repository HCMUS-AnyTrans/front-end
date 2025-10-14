'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import NavigationLink from './Layout/Header/NavigationLink';
import FeaturesDropdown from './Layout/Header/FeaturesDropdown';
import AuthButtons from './Layout/Header/AuthButtons';
import MobileMenu from './Layout/Header/MobileMenu';

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [pathname, setPathname] = useState('');

  // Track pathname changes
  useEffect(() => {
    setPathname(window.location.pathname);

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href.startsWith(window.location.origin)) {
        setTimeout(handleLocationChange, 0);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
    if (href === '/') return pathname === '/' || pathname === '/dashboard';
    if (href === '/features') return pathname.startsWith('/features');
    return pathname === href;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  return (
    <>
      <header className="font-medium sticky top-0 z-50 w-full bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center hover:scale-102 transition-all duration-300 delay-0" onClick={closeMobileMenu}>
            <img
              src="/logo-icon-mono.svg"
              alt="anytrans"
              className="w-50 h-10"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationLink href="/" label="Home" isActive={isActive('/')} />

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

          {/* Desktop Auth Buttons */}
          <AuthButtons variant="desktop" />

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
