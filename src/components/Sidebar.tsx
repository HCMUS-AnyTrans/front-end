'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Film,
  History,
  Bell,
  Info,
  ChevronRight,
  MoreHorizontal,
  X,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccountDialog } from '@/src/contexts/AccountDialogContext';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
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
  {
    label: 'Translation History',
    href: '/translation-history',
    icon: History,
  },
];

const secondaryItems = [
  {
    label: 'Notification',
    href: '/notifications',
    icon: Bell,
  },
  {
    label: 'Support',
    href: '/support',
    icon: Info,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { openAccount } = useAccountDialog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon-mono.svg"
            alt="AnyTrans Logo"
            width={100}
            height={100}
          />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );

  // Mobile Overlay
  const MobileOverlay = () =>
    isMobileMenuOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    );

  // Sidebar Content Component
  const SidebarContent = () => (
    <>
      {/* Logo Section - Brand Link */}
      <div className="flex justify-center py-6">
        <Link href="/">
          <Image
            src="/logo-icon-mono.svg"
            alt="AnyTrans Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-6">
        <div className="space-y-1 mb-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-colors
                  ${
                    active
                      ? 'bg-[#eaf4ff] text-[#19398f]'
                      : 'text-[#717680] hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span className="font-nunito">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mb-6" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-colors
                  ${
                    active
                      ? 'bg-[#eaf4ff] text-[#19398f]'
                      : 'text-[#717680] hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span className="font-nunito">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Upgrade CTA */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg p-4 mb-4">
          {/* Upgrade illustration placeholder */}
          <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-3 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#19398f] rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-lg">💎</span>
              </div>
              <p className="text-xs text-gray-600 font-nunito">
                Upgrade to Pro
              </p>
            </div>
          </div>
          <Button className="w-full bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito rounded-full">
            Buy more credits
          </Button>
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-200">
          <div className="flex items-center p-4">
            <Button
              variant="ghost"
              onClick={() => openAccount('profile')}
              className="flex items-center gap-3 w-full justify-start p-0 h-auto hover:bg-gray-50 cursor-pointer"
              aria-label="Open account"
            >
              <div className="w-10 h-10 bg-[#ffb31f] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">J</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs text-slate-500 font-medium">
                  Welcome back 👋
                </p>
                <p className="text-sm text-[#081021] font-medium truncate">
                  Johnathan
                </p>
              </div>
            </Button>

            {/* Quick Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-gray-50 cursor-pointer"
                  aria-label="Account options"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => openAccount('profile')}
                  className="cursor-pointer"
                >
                  Personal Info
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openAccount('billing')}
                  className="cursor-pointer"
                >
                  Billing & Subscription
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openAccount('settings')}
                  className="cursor-pointer"
                >
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />

      {/* Mobile Overlay */}
      <MobileOverlay />

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex bg-white w-[280px] h-screen flex-col border-r border-gray-100 ${className || ''}`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 bg-white w-[280px] h-screen flex flex-col border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
