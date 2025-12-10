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
  X,
  ChevronLeft,
} from 'lucide-react';
import { AccountDialog } from '@/components/Account';
import {
  SidebarLogo,
  SidebarNav,
  SecondaryNav,
  CreditSection,
  UserProfileButton,
  MobileHeader,
} from '@/components/Layout/Sidebar';
import type { NavItem, SidebarProps } from '@/types/sidebar';

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
      href: '/app/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: t('navigation.documentTranslator'),
      href: '/app/document-translation',
      icon: FileText,
    },
    {
      label: t('navigation.subtitleTranslator'),
      href: '/app/subtitle-translation',
      icon: Film,
    },
    {
      label: t('navigation.translationHistory'),
      href: '/app/translation-history',
      icon: History,
    },
  ];

  const secondaryItems: NavItem[] = [
    { label: t('secondary.notification'), href: '/app/notifications', icon: Bell },
    { label: t('secondary.support'), href: '/app/support', icon: Info },
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
    if (href === '/app/dashboard') {
      return pathname === '/app/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-2 mb-4 border-b border-gray-200">
        <SidebarLogo isCollapsed={collapsed} />
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:block px-4 py-6 relative">
        <div className="flex items-center justify-center">
          <SidebarLogo isCollapsed={collapsed} />
        </div>
        <button
          onClick={() => setIsCollapsed(!collapsed)}
          className="absolute -right-2.5 top-1/2 -translate-y-1/2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-all cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={`w-3.5 h-3.5 text-gray-600 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <SidebarNav items={navigationItems} isActive={isActive} isCollapsed={collapsed} />

      <SecondaryNav items={secondaryItems} isActive={isActive} isCollapsed={collapsed} />

      {!collapsed && <CreditSection current={credits.current} total={credits.total} />}

      <UserProfileButton
        planLabel={credits.plan}
        onOpenAccount={() => setIsAccountOpen(true)}
        isCollapsed={collapsed}
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
      {/* <MobileOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      /> */}

      <div
        suppressHydrationWarning
        className={`hidden lg:flex bg-white h-screen flex-col border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[260px] xl:w-[300px]'} ${className || ''}`}
      >
        <SidebarContent collapsed={isCollapsed} />
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 z-50 bg-white w-full h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <SidebarContent collapsed={false} />
      </div>
    </>
  );
}
