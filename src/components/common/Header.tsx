'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAccountDialog } from '@/src/contexts/AccountDialogContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  const baseClasses =
    'px-4 py-2 rounded-md font-semibold text-base transition-colors cursor-pointer';
  const homeClasses =
    href === '/'
      ? 'text-slate-900 hover:bg-gray-50'
      : 'text-[#717680] hover:bg-gray-50';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${homeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

interface MobileNavProps {
  onClose: () => void;
}

function MobileNav({ onClose }: MobileNavProps) {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4 pt-6">
      <NavLink href="/" onClick={onClose}>
        Home
      </NavLink>

      <div className="space-y-2">
        <button
          onClick={() => setFeaturesOpen(!featuresOpen)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Services
          <ChevronDown
            className={`h-4 w-4 transform transition-transform ${featuresOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {featuresOpen && (
          <div className="pl-4 space-y-2">
            <NavLink
              href="/features/document-translation"
              className="block"
              onClick={onClose}
            >
              Document Translation
            </NavLink>
            <NavLink
              href="/features/subtitle-translation"
              className="block"
              onClick={onClose}
            >
              Subtitle Translation
            </NavLink>
          </div>
        )}
      </div>

      <NavLink href="/pricing" onClick={onClose}>
        Pricing
      </NavLink>

      <NavLink href="/about" onClick={onClose}>
        About Us
      </NavLink>

      <NavLink href="/contact" onClick={onClose}>
        Contact Us
      </NavLink>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <NavLink href="/login" onClick={onClose}>
          Login
        </NavLink>
        <Link
          href="/signup"
          className="block bg-[#19398f] text-white px-4 py-2 rounded-md font-semibold text-base hover:bg-[#142457] transition-colors cursor-pointer text-center"
          onClick={onClose}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openAccount } = useAccountDialog();

  // Mock user data - in real app this would come from auth context
  const userData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
    company: 'AnyTrans Inc.',
    avatar: undefined, // No avatar URL for demo
  };

  return (
    <header className="relative flex items-center justify-between w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center">
        <Link href="/" className="cursor-pointer">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-tight lg:leading-[30px] text-[#19398f] font-['Hero_Light'] tracking-tight">
            anytrans
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-12">
        <div className="flex items-center gap-2">
          <NavLink href="/">Home</NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors outline-none focus:bg-gray-50 cursor-pointer">
              Services
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link
                  href="/features/document-translation"
                  className="w-full cursor-pointer"
                >
                  Document Translation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/features/subtitle-translation"
                  className="w-full cursor-pointer"
                >
                  Subtitle Translation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/pricing">Pricing</NavLink>

          <NavLink href="/about">About Us</NavLink>

          <NavLink href="/contact">Contact Us</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <NavLink href="/signup">Signup</NavLink>
          <Link
            href="/login"
            className="bg-[#19398f] text-white px-4 py-2 rounded-md font-semibold text-base hover:bg-[#142457] transition-colors cursor-pointer"
          >
            Login
          </Link>

          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 cursor-pointer ml-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={userData.avatar} alt={userData.fullName} />
                  <AvatarFallback className="bg-[#19398f] text-white text-sm font-semibold">
                    {userData.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Handle logout logic here
                  console.log('Logout clicked');
                }}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-md text-[#717680] hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer"
                >
                  <span className="font-bold text-2xl text-[#19398f] font-['Hero_Light'] tracking-tight">
                    anytrans
                  </span>
                </Link>
              </SheetTitle>
              <SheetDescription className="text-left">
                Navigate to different sections of our website
              </SheetDescription>
            </SheetHeader>
            <MobileNav onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
