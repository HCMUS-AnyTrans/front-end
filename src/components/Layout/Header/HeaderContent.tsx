'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import { LogoSection } from './LogoSection';
import { DesktopNavigation } from './DesktopNavigation';

const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
  ssr: true,
});
const AuthButtons = dynamic(() => import('./AuthButtons'), {
  ssr: true,
});
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});

interface HeaderProps {
  isActive: (href: string) => boolean;
  pathname: string;
  isDropdownOpen: boolean;
  isMobileMenuOpen: boolean;
  isMobileFeaturesOpen: boolean;
  onDropdownEnter: () => void;
  onDropdownLeave: () => void;
  onDropdownClick: () => void;
  onToggleMobileMenu: () => void;
  onToggleMobileFeatures: () => void;
  onCloseMobileMenu: () => void;
}

export function Header({
  isActive,
  pathname,
  isDropdownOpen,
  isMobileMenuOpen,
  isMobileFeaturesOpen,
  onDropdownEnter,
  onDropdownLeave,
  onDropdownClick,
  onToggleMobileMenu,
  onToggleMobileFeatures,
  onCloseMobileMenu,
}: HeaderProps) {
  return (
    <>
      <header className="font-medium sticky top-0 z-50 w-full bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
          <LogoSection onClick={onCloseMobileMenu} />

          <DesktopNavigation isActive={isActive} pathname={pathname} />

          <div className="hidden lg:flex items-center gap-2">
            <LocaleSwitcher />
            <AuthButtons variant="desktop" />
          </div>

          <button
            onClick={onToggleMobileMenu}
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

      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={pathname}
        isFeaturesOpen={isMobileFeaturesOpen}
        onClose={onCloseMobileMenu}
        onToggleFeatures={onToggleMobileFeatures}
        isActive={isActive}
      />
    </>
  );
}
