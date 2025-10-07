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
  Languages,
  Zap,
  MoreHorizontal,
  X,
  Menu,
  Coins,
  TrendingUp,
} from 'lucide-react';
import AccountDialog from '@/src/components/Account/AccountDialog';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
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

const secondaryItems = [
  { label: 'Notification', href: '/notifications', icon: Bell },
  { label: 'Support', href: '/support', icon: Info },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Credit system state - có thể lấy từ API hoặc context
  const [credits, setCredits] = useState({
    current: 45,
    total: 100,
    plan: 'Free',
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Accessibility & UX: close on ESC, lock body scroll when menu open
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

  const creditPercentage = (credits.current / credits.total) * 100;
  const isLowCredit = creditPercentage < 30;

  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );

  const MobileOverlay = () =>
    isMobileMenuOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
    );

  const CreditSection = () => (
    <div className="px-4 pb-4">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
        {/* Credit Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLowCredit
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-500'
              }`}
            >
              <Coins className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">
                Translation Credits
              </p>
            </div>
          </div>
          <Link
            href="/credits"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>

        {/* Credit Display */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1 mb-2">
            <span
              className={`text-2xl font-bold ${
                isLowCredit ? 'text-amber-600' : 'text-gray-900'
              }`}
            >
              {credits.current}
            </span>
            <span className="text-sm text-gray-500">
              / {credits.total} credits
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                isLowCredit
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
              }`}
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
        </div>

        {/* Low Credit Warning */}
        {isLowCredit && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Credits are running low! Upgrade to get unlimited translations.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/buy-credits"
            className="text-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-colors"
          >
            Buy Credits
          </Link>
          <Link
            href="/pricing"
            className="text-center text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 py-2 rounded-lg transition-colors border border-gray-200"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center gap-3 px-6 py-6">
        <Link href="/" className="w-40 h-40">
          <img src="./logo-icon-mono.svg" alt="" className=" " />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="h-px bg-gray-200 my-4" />

        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Credit Section */}
      <CreditSection />

      {/* Upgrade Card */}
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-900 text-center mb-1">
            Upgrade to Pro
          </p>
          <p className="text-xs text-gray-600 text-center mb-3">
            Get unlimited translations & priority support
          </p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4">
        <button
          onClick={() => setIsAccountOpen(true)}
          className="w-full flex items-center gap-3 p-3 border-t border-gray-200 hover:bg-gray-50 rounded-lg text-left"
          aria-label="Open account settings"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              Johnathan
            </p>
            <p className="text-xs text-gray-500">
              {credits.plan} Plan • Manage
            </p>
          </div>
          <span className="p-1 rounded-lg text-gray-400">
            <MoreHorizontal className="w-5 h-5" />
          </span>
        </button>
      </div>
      {isAccountOpen && (
        <AccountDialog open={isAccountOpen} onOpenChange={setIsAccountOpen} />
      )}
    </>
  );

  return (
    <>
      <MobileHeader />
      <MobileOverlay />

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
