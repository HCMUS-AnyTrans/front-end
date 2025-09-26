"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Film, 
  Bell, 
  Info,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountDialog } from "@/src/contexts/AccountDialogContext";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Document Translator",
    href: "/features/document-translation",
    icon: FileText,
  },
  {
    label: "Subtitle Translator", 
    href: "/features/subtitle-translation",
    icon: Film,
  },
];

const secondaryItems = [
  {
    label: "Notification",
    href: "/notifications",
    icon: Bell,
  },
  {
    label: "Support",
    href: "/support",
    icon: Info,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { openAccount } = useAccountDialog();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`bg-white w-[280px] h-screen flex flex-col border-r border-gray-100 ${className || ""}`}>
      {/* Logo Section - Brand Link */}
      <Link 
        href="/"
        className="flex items-center gap-2 px-3 py-6 mx-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:ring-offset-2 group"
      >
        <div className="w-7 h-7 relative">
          {/* Logo placeholder - would use actual logo component */}
          <div className="w-full h-full bg-[#19398f] rounded-md flex items-center justify-center group-hover:bg-[#142457] transition-colors">
            <span className="text-white text-xs font-bold">AT</span>
          </div>
        </div>
        <h1 className="text-[24px] font-bold text-[#19398f] font-hero-light leading-none group-hover:text-[#142457] transition-colors">
          anytrans
        </h1>
      </Link>

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
                  ${active 
                    ? "bg-[#eaf4ff] text-[#19398f]" 
                    : "text-[#717680] hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-[10.67px] h-[10.67px]" strokeWidth={2} />
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
                  ${active 
                    ? "bg-[#eaf4ff] text-[#19398f]" 
                    : "text-[#717680] hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-[10.67px] h-[10.67px]" strokeWidth={2} />
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
              <p className="text-xs text-gray-600 font-nunito">Upgrade to Pro</p>
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
              onClick={() => openAccount("profile")}
              className="flex items-center gap-3 w-full justify-start p-0 h-auto hover:bg-gray-50 cursor-pointer"
              aria-label="Open account"
            >
              <div className="w-10 h-10 bg-[#ffb31f] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">J</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs text-slate-500 font-medium">Welcome back 👋</p>
                <p className="text-sm text-[#081021] font-medium truncate">Johnathan</p>
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
                  onClick={() => openAccount("profile")}
                  className="cursor-pointer"
                >
                  Personal Info
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => openAccount("billing")}
                  className="cursor-pointer"
                >
                  Billing & Subscription
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => openAccount("settings")}
                  className="cursor-pointer"
                >
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
