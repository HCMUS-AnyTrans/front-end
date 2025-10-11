'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X, Menu } from 'lucide-react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  // Simulate usePathname
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileFeaturesOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '/dashboard';
    if (href === '/features') return pathname.startsWith('/features');
    return pathname === href;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center" onClick={closeMobileMenu}>
            <img
              src="/logo-icon-mono.svg"
              alt="anytrans"
              className="w-50 h-10"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="/"
              className={`relative px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 ${
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
                className={`relative flex items-center gap-1.5 px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 cursor-pointer ${
                  isActive('/features')
                    ? 'text-[#4169E1]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                aria-current={isActive('/features') ? 'page' : undefined}
              >
                Features
                <ChevronDown
                  className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-300 ${
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
              className={`relative px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 ${
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
              className={`relative px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 ${
                isActive('/about')
                  ? 'text-[#4169E1]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
              {isActive('/about') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
              )}
            </a>

            <a
              href="/contact"
              className={`relative px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 ${
                isActive('/contact')
                  ? 'text-[#4169E1]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
              )}
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/login"
              className="px-4 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="relative px-5 xl:px-6 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] text-white bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Sign up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#4169E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a]">
          <h2 className="font-bold text-xl text-white">Menu</h2>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          <nav className="p-4 space-y-1">
            <a
              href="/"
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 active:scale-98'
              }`}
              onClick={closeMobileMenu}
            >
              <span>Home</span>
              {isActive('/') && (
                <div className="w-2 h-2 bg-[#4169E1] rounded-full" />
              )}
            </a>

            {/* Features Collapsible */}
            <div>
              <button
                onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  isActive('/features')
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:scale-98'
                }`}
              >
                <span>Features</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isMobileFeaturesOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Features Submenu */}
              <div
                className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                  isMobileFeaturesOpen
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <a
                  href="/features/document-translation"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    pathname === '/features/document-translation'
                      ? 'bg-blue-50 text-[#4169E1] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 active:scale-98'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      pathname === '/features/document-translation'
                        ? 'bg-[#4169E1]'
                        : 'bg-gray-400'
                    }`}
                  />
                  <span>Document Translation</span>
                </a>
                <a
                  href="/features/subtitle-translation"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    pathname === '/features/subtitle-translation'
                      ? 'bg-blue-50 text-[#4169E1] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 active:scale-98'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      pathname === '/features/subtitle-translation'
                        ? 'bg-[#4169E1]'
                        : 'bg-gray-400'
                    }`}
                  />
                  <span>Subtitle Translation</span>
                </a>
              </div>
            </div>

            <a
              href="/pricing"
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/pricing')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 active:scale-98'
              }`}
              onClick={closeMobileMenu}
            >
              <span>Pricing</span>
              {isActive('/pricing') && (
                <div className="w-2 h-2 bg-[#4169E1] rounded-full" />
              )}
            </a>

            <a
              href="/about"
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 active:scale-98'
              }`}
              onClick={closeMobileMenu}
            >
              <span>About</span>
              {isActive('/about') && (
                <div className="w-2 h-2 bg-[#4169E1] rounded-full" />
              )}
            </a>

            <a
              href="/contact"
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-[#4169E1] shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 active:scale-98'
              }`}
              onClick={closeMobileMenu}
            >
              <span>Contact</span>
              {isActive('/contact') && (
                <div className="w-2 h-2 bg-[#4169E1] rounded-full" />
              )}
            </a>
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="p-4 space-y-3 border-t border-gray-200 mt-4">
            <a
              href="/login"
              className="block px-4 py-3 rounded-xl font-semibold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300 active:scale-98"
              onClick={closeMobileMenu}
            >
              Login
            </a>
            <a
              href="/signup"
              className="block px-4 py-3 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:shadow-lg transition-all duration-300 active:scale-98"
              onClick={closeMobileMenu}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
