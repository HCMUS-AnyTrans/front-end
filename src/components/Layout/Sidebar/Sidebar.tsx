'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import {
  LayoutDashboard,
  FileText,
  Film,
  History,
  Bell,
  Info,
} from 'lucide-react';
import { AccountDialog } from '@/components/Account';
import {
  SidebarLogo,
  SidebarNav,
  SecondaryNav,
  CreditSection,
  UserProfileButton,
  MobileHeader,
  MobileOverlay,
} from '@/components/Layout/Sidebar';
import type { NavItem, SidebarProps } from '@/types/sidebar';

export default function Sidebar({ className }: SidebarProps) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [credits] = useState({ current: 45, total: 100, plan: 'Free' });

  const navigationItems: NavItem[] = [
    {
      label: t('navigation.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: t('navigation.documentTranslator'),
      href: '/features/document-translation',
      icon: FileText,
    },
    {
      label: t('navigation.subtitleTranslator'),
      href: '/features/subtitle-translation',
      icon: Film,
    },
    {
      label: t('navigation.translationHistory'),
      href: '/translation-history',
      icon: History,
    },
  ];

  const secondaryItems: NavItem[] = [
    { label: t('secondary.notification'), href: '/notifications', icon: Bell },
    { label: t('secondary.support'), href: '/support', icon: Info },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', onKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      <SidebarLogo />

      <SidebarNav items={navigationItems} isActive={isActive} />

      <SecondaryNav items={secondaryItems} isActive={isActive} />

      <CreditSection current={credits.current} total={credits.total} />

      <UserProfileButton
        planLabel={credits.plan}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {isAccountOpen && (
        <AccountDialog open={isAccountOpen} onOpenChange={setIsAccountOpen} />
      )}
    </>
  );

  return (
    <>
      <MobileHeader
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`hidden lg:flex bg-white w-[260px] xl:w-[300px] h-screen flex-col border-r border-gray-200 ${className || ''}`}
      >
        <SidebarContent />
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 z-50 bg-white w-[80vw] sm:w-[300px] h-screen flex flex-col border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <SidebarContent />
      </div>
    </>
  );
}
