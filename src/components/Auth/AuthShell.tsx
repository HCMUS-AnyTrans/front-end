'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useAuthShellAnimation } from './useAuthShellAnimation';

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
  backHref = ROUTES.AUTH.LOGIN,
  backText = 'Back to login',
  className = '',
}: AuthShellProps) {
  const { isVisible } = useAuthShellAnimation();

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
              className="hover:bg-brand-primary-light/10 transition-all duration-300"
            >
              <Link
                href={backHref}
                className="text-muted-foreground hover:text-brand-primary-light"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backText}
              </Link>
            </Button>
          </div>
        )}

        <Link
          href={ROUTES.PUBLIC.HOME}
          className={`mx-auto mb-4 block group transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/logo/logo-name-mono.svg"
              alt="Anytrans"
              className="transition-transform duration-300"
              width={160}
              height={40}
            />
          </div>
        </Link>

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
