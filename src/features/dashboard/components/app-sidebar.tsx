'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  ClipboardList,
  History,
  Settings as SettingsIcon,
  HelpCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

interface NavItem {
  titleKey: string;
  href: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { titleKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { titleKey: 'documents', href: '/documents', icon: FileText },
  { titleKey: 'glossary', href: '/glossary', icon: BookOpen },
  { titleKey: 'templates', href: '/templates', icon: ClipboardList },
  { titleKey: 'history', href: '/history', icon: History },
];

const secondaryNavItems: NavItem[] = [
  { titleKey: 'settings', href: '/settings', icon: SettingsIcon },
  { titleKey: 'help', href: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('dashboard.sidebar');
  const { toggleSidebar, open } = useSidebar();

  // Remove locale prefix from pathname for matching
  const pathnameWithoutLocale = pathname.replace(/^\/(vi|en)/, '');
  const previewSource = searchParams.get('from');

  const renderNavItem = (item: NavItem) => {
    const isPreviewFromHistory =
      pathnameWithoutLocale === "/documents/preview" && previewSource === "history";
    const isActive = isPreviewFromHistory
      ? item.href === "/history"
      : pathnameWithoutLocale === item.href ||
        pathnameWithoutLocale.startsWith(item.href + "/");
    const title = t(item.titleKey);

    return (
      <SidebarMenuItem
        key={item.href}
        className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
      >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={title}
                  className="h-12 rounded-xl text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-transparent data-[active=true]:bg-[linear-gradient(135deg,#2f8cff_0%,#1e63d8_100%)] data-[active=true]:text-white data-[active=true]:shadow-[0_14px_32px_rgba(0,85,210,0.35)] [&>svg]:text-current"
                >
          <Link href={item.href}>
            <item.icon className="size-5" />
            {open && <span>{title}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className="h-svh border-r-0 [&_[data-sidebar=sidebar]]:bg-[linear-gradient(180deg,#06255c_0%,#063e8f_52%,#0755b7_100%)] [&_[data-sidebar=sidebar]]:text-white data-[sidebar=sidebar]:bg-[linear-gradient(180deg,#06255c_0%,#063e8f_52%,#0755b7_100%)] data-[sidebar=sidebar]:text-white dark:[&_[data-sidebar=sidebar]]:bg-[linear-gradient(180deg,#0c1930_0%,#112647_50%,#1a3a68_100%)] dark:data-[sidebar=sidebar]:bg-[linear-gradient(180deg,#0c1930_0%,#112647_50%,#1a3a68_100%)]"
    >
      <SidebarHeader
        className={open ? 'px-6 pb-4 pt-7' : 'items-center px-2 pb-4 pt-7'}
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden">
            <Image
              src="/shared/logo.svg"
              alt="AnyTrans Logo"
              fill
              preload
              unoptimized
              className="object-contain"
            />
          </div>
          {open ? (
            <span className="truncate text-xl font-bold tracking-tight text-white">
              AnyTrans
            </span>
          ) : null}
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className={`${open ? 'px-4' : 'px-1.5'}`}>
        <SidebarMenu className="gap-2">
          {mainNavItems.map((item) => {
            const isPreviewFromHistory =
              pathnameWithoutLocale === '/documents/preview' &&
              previewSource === 'history';
            const isActive = isPreviewFromHistory
              ? item.href === '/history'
              : pathnameWithoutLocale === item.href ||
                pathnameWithoutLocale.startsWith(item.href + '/');
            const title = t(item.titleKey);

            return (
              <SidebarMenuItem
                key={item.href}
                className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={title}
                  className="h-12 rounded-xl text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-transparent data-[active=true]:bg-[linear-gradient(135deg,#2f8cff_0%,#1e63d8_100%)] data-[active=true]:text-white data-[active=true]:shadow-[0_14px_32px_rgba(0,85,210,0.35)] [&>svg]:text-current"
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    {open && <span>{title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarMenu className="mt-auto gap-2 pb-3">
          {secondaryNavItems.map((item) => {
            const isActive =
              pathnameWithoutLocale === item.href ||
              pathnameWithoutLocale.startsWith(item.href + '/');
            const title = t(item.titleKey);

            return (
              <SidebarMenuItem
                key={item.href}
                className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={title}
                  className="h-12 rounded-xl text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-transparent data-[active=true]:bg-[linear-gradient(135deg,#2f8cff_0%,#1e63d8_100%)] data-[active=true]:text-white data-[active=true]:shadow-[0_14px_32px_rgba(0,85,210,0.35)] [&>svg]:text-current"
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    {open && <span>{title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {open ? (
        <SidebarFooter className="px-4 pb-5">
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur">
            <div className="relative z-10 max-w-[130px] space-y-1.5">
              <p className="text-sm font-semibold leading-5">
                {t('creditTitle')}
              </p>
              <p className="text-xs leading-5 text-white/75">
                {t('creditDescription')}
              </p>
              <Link
                href="/settings?tab=billing"
                className="inline-flex text-xs font-medium text-white/90 hover:text-white"
              >
                {t('creditCta')}
              </Link>
            </div>
            <Image
              src="/dashboard/sidebar-credit.png"
              alt="Credits"
              width={512}
              height={512}
              quality={100}
              sizes="512px"
              className="absolute -bottom-5 -right-4 h-24 w-24 object-contain"
            />
          </div>
        </SidebarFooter>
      ) : null}

      {/* Collapse / Expand round button on the right edge */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3.5 z-20 hidden -translate-y-1/2 size-7 items-center justify-center rounded-full border border-white/20 bg-[#0b3f91] shadow-sm transition-colors hover:bg-[#155bc2] md:flex"
      >
        <ChevronRight
          className="size-3.5 text-white transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
    </Sidebar>
  );
}
