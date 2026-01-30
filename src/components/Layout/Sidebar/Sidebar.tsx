'use client';

import { useEffect, useState } from 'react';
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
import { ROUTES } from '@/config';
import type { NavItem, SidebarProps } from '@/types/sidebar';
import { SidebarContent } from './SidebarContent';
import MobileHeader from './MobileHeader';

export default function Sidebar({ className }: SidebarProps) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [credits] = useState({ current: 45, total: 100, plan: 'Free' });

  const navigationItems: NavItem[] = [
    {
      label: t('navigation.dashboard'),
      href: ROUTES.APP.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: t('navigation.documentTranslator'),
      href: ROUTES.APP.DOCUMENT_TRANSLATION,
      icon: FileText,
    },
    {
      label: t('navigation.subtitleTranslator'),
      href: ROUTES.APP.SUBTITLE_TRANSLATION,
      icon: Film,
    },
    {
      label: t('navigation.translationHistory'),
      href: ROUTES.APP.TRANSLATION_HISTORY,
      icon: History,
    },
  ];

  const secondaryItems: NavItem[] = [
    {
      label: t('secondary.notification'),
      href: ROUTES.APP.NOTIFICATIONS,
      icon: Bell,
    },
    { label: t('secondary.support'), href: ROUTES.APP.SUPPORT, icon: Info },
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
    if (href === ROUTES.APP.DASHBOARD) {
      return (
        pathname === ROUTES.APP.DASHBOARD || pathname === ROUTES.PUBLIC.HOME
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <MobileHeader
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div
        suppressHydrationWarning
        className={`hidden lg:flex bg-white h-screen flex-col border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[260px] xl:w-[300px]'} ${className || ''}`}
      >
        <SidebarContent
          navigationItems={navigationItems}
          secondaryItems={secondaryItems}
          credits={credits}
          isActive={isActive}
          isCollapsed={isCollapsed}
          isAccountOpen={isAccountOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onCloseAccount={() => setIsAccountOpen(false)}
        />
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 z-50 bg-white w-full h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <SidebarContent
          navigationItems={navigationItems}
          secondaryItems={secondaryItems}
          credits={credits}
          isActive={isActive}
          isCollapsed={false}
          isAccountOpen={isAccountOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onToggleCollapse={() => {}}
          onOpenAccount={() => setIsAccountOpen(true)}
          onCloseAccount={() => setIsAccountOpen(false)}
        />
      </div>
    </>
  );
}
