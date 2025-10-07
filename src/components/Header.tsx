'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '/dashboard';
    if (href === '/features') return pathname.startsWith('/features');
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] tracking-tight">
            anytrans
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <a
            href="/"
            className={`relative px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 ${
              isActive('/')
                ? 'text-[#4169E1]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
            )}
          </a>

          {/* Features Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className={`relative flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 ${
                isActive('/features')
                  ? 'text-[#4169E1]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-current={isActive('/features') ? 'page' : undefined}
            >
              Features
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
              {isActive('/features') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
              )}
            </button>

            {/* Dropdown Menu */}
            <div
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                isDropdownOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="p-2">
                <a
                  href="/features/document-translation"
                  className={`flex flex-col px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    pathname === '/features/document-translation'
                      ? 'bg-blue-50'
                      : 'hover:bg-blue-50'
                  }`}
                  aria-current={
                    pathname === '/features/document-translation'
                      ? 'page'
                      : undefined
                  }
                >
                  <span className="font-semibold text-[15px] text-gray-900 group-hover:text-[#4169E1] transition-colors">
                    Document Translation
                  </span>
                  <span className="text-sm text-gray-500 mt-0.5">
                    Translate documents instantly
                  </span>
                </a>
                <a
                  href="/features/subtitle-translation"
                  className={`flex flex-col px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    pathname === '/features/subtitle-translation'
                      ? 'bg-blue-50'
                      : 'hover:bg-blue-50'
                  }`}
                  aria-current={
                    pathname === '/features/subtitle-translation'
                      ? 'page'
                      : undefined
                  }
                >
                  <span className="font-semibold text-[15px] text-gray-900 group-hover:text-[#4169E1] transition-colors">
                    Subtitle Translation
                  </span>
                  <span className="text-sm text-gray-500 mt-0.5">
                    Perfect timing & sync
                  </span>
                </a>
              </div>
            </div>
          </div>

          <a
            href="/pricing"
            className={`relative px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 ${
              isActive('/pricing')
                ? 'text-[#4169E1]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-current={isActive('/pricing') ? 'page' : undefined}
          >
            Pricing
            {isActive('/pricing') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
            )}
          </a>

          <a
            href="/about"
            className={`relative px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 ${
              isActive('/about')
                ? 'text-[#4169E1]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            About Us
            {isActive('/about') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
            )}
          </a>

          <a
            href="/contact"
            className={`relative px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 ${
              isActive('/contact')
                ? 'text-[#4169E1]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-current={isActive('/contact') ? 'page' : undefined}
          >
            Contact Us
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
            )}
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="px-5 py-2.5 rounded-lg font-semibold text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="relative px-6 py-2.5 rounded-lg font-semibold text-[15px] text-white bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Sign up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#4169E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
