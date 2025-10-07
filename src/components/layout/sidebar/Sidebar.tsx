'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Film,
  History,
  Bell,
  Info,
} from 'lucide-react';
import AccountDialog from '@/src/components/account/AccountDialog';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import SecondaryNav from './SecondaryNav';
import CreditSection from './CreditSection';
import UpgradeCard from './UpgradeCard';
import UserProfileButton from './UserProfileButton';
import MobileHeader from './MobileHeader';
import MobileOverlay from './MobileOverlay';
import type { NavItem, SidebarProps } from '@types/sidebar';

const navigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Document Translator',
    href: '/features/document-translation',
    icon: FileText,
  },
  {
    label: 'Subtitle Translator',
    href: '/features/subtitle-translation',
    icon: Film,
  },
  { label: 'Translation History', href: '/translation-history', icon: History },
];

const secondaryItems: NavItem[] = [
  { label: 'Notification', href: '/notifications', icon: Bell },
  { label: 'Support', href: '/support', icon: Info },
];

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [credits] = useState({ current: 45, total: 100, plan: 'Free' });

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

      <UpgradeCard />

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
