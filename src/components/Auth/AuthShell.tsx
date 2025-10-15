'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  className?: string;
}

export function AuthShell({
  title,
  description,
  children,
  showBackButton = false,
  backHref = '/login',
  backText = 'Back to login',
  className = '',
}: AuthShellProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Card
      className={`w-full max-w-md mx-auto backdrop-blur-xl bg-white/90 border-white/20 shadow-2xl transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      <CardHeader className="space-y-4 text-center pb-8 pt-8">
        {showBackButton && (
          <div
            className={`flex justify-start mb-2 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-[#4169E1]/10 transition-all duration-300"
            >
              <Link
                href={backHref}
                className="text-muted-foreground hover:text-[#4169E1]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backText}
              </Link>
            </Button>
          </div>
        )}

        {/* Logo with animation */}
        <Link
          href="/"
          className={`mx-auto mb-4 block group transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex items-center justify-center">
            <img
              src="/logo/logo-name-mono.svg"
              alt="Anytrans"
              className="w-40 h-10 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Title and Description */}
        <div
          className={`space-y-2 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent
        className={`transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {children}
      </CardContent>
    </Card>
  );
}
