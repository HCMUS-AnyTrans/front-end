'use client';

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { usePathname } from '@/i18n/routing';
import { ROUTES } from '@/config';
import { Header } from './HeaderContent';

const HeaderComponent = memo(function HeaderComponent() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

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

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  }, []);

  const handleDropdownEnter = useCallback(() => setIsDropdownOpen(true), []);
  const handleDropdownLeave = useCallback(() => setIsDropdownOpen(false), []);
  const handleDropdownClick = useCallback(() => {
    window.location.href = ROUTES.PUBLIC.FEATURES;
  }, []);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );
  const toggleMobileFeatures = useCallback(
    () => setIsMobileFeaturesOpen((prev) => !prev),
    []
  );

  return (
    <Header
      isActive={isActive}
      pathname={pathname}
      isDropdownOpen={isDropdownOpen}
      isMobileMenuOpen={isMobileMenuOpen}
      isMobileFeaturesOpen={isMobileFeaturesOpen}
      onDropdownEnter={handleDropdownEnter}
      onDropdownLeave={handleDropdownLeave}
      onDropdownClick={handleDropdownClick}
      onToggleMobileMenu={toggleMobileMenu}
      onToggleMobileFeatures={toggleMobileFeatures}
      onCloseMobileMenu={closeMobileMenu}
    />
  );
});

export default HeaderComponent;
