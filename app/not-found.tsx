'use client';

import React from 'react';
import {
  Home,
  ArrowLeft,
  Search,
  FileText,
  Film,
  LayoutDashboard,
  Mail,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function NotFound() {
  const quickLinks = [
    {
      icon: LayoutDashboard,
      label: 'Home',
      href: '/',
      color: 'blue',
    },
    {
      icon: FileText,
      label: 'Document Translation',
      href: '/features/document-translation',
      color: 'green',
    },
    {
      icon: Film,
      label: 'Subtitle Translation',
      href: '/features/subtitle-translation',
      color: 'purple',
    },
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      label: 'Live Chat',
      desc: 'Chat with our team',
      color: 'blue',
    },
    {
      icon: Mail,
      label: 'Email Support',
      desc: 'support@anytrans.com',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-brand-50 flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[-200px] top-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-brand-200 to-accent rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div
          className="absolute right-[-150px] top-[200px] w-[500px] h-[500px] bg-gradient-to-br from-brand-200 to-brand-300 rounded-full opacity-30 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute left-[20%] bottom-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-accent to-accent/60 rounded-full opacity-30 blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Error Message */}
              <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                {/* 404 Animation */}
                <div className="space-y-4">
                  <div className="relative">
                    <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gradient-from via-brand-primary to-gradient-to animate-pulse">
                      404
                    </h1>
                    <div className="absolute inset-0 text-6xl sm:text-8xl lg:text-9xl font-black text-primary opacity-10 blur-sm">
                      404
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                      Oops! Page Not Found
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                      The page you're looking for seems to have wandered off
                      into the translation cosmos. Don't worry though, we'll
                      help you find your way back!
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gradient-from to-gradient-to hover:from-brand-primary-dark hover:to-brand-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    Back to Home
                  </a>
                  <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center gap-2 bg-card hover:bg-muted text-foreground border-2 border-border px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-sm transition-all text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Go Back
                  </button>
                </div>
              </div>

              {/* Right side - Quick Links & Support */}
              <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-0">
                {/* Quick Links */}
                <div className="bg-card rounded-xl sm:rounded-2xl shadow-xl border border-border p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {quickLinks.map((link, index) => {
                      const Icon = link.icon;
                      const colorClasses = {
                        blue: 'bg-brand-100 text-primary',
                        green: 'bg-brand-100 text-primary',
                        purple: 'bg-accent text-accent-foreground',
                      };

                      return (
                        <a
                          key={index}
                          href={link.href}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-muted transition-all group border border-transparent hover:border-border"
                        >
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses[link.color as keyof typeof colorClasses]} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                              {link.label}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Support Options */}
                <div className="bg-gradient-to-br from-gradient-from to-gradient-to rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-primary-foreground">
                  <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Our support team is here to assist you
                  </p>
                  <div className="space-y-2 sm:space-y-3">
                    {supportOptions.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={index}
                          className="w-full flex items-center gap-3 p-3 sm:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl transition-all group border border-white/20"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="font-semibold text-sm sm:text-base truncate">
                              {option.label}
                            </p>
                            <p className="text-xs text-primary-foreground/70 truncate">
                              {option.desc}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
