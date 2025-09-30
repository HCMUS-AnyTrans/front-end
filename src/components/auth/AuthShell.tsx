import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="space-y-1 text-center">
        {showBackButton && (
          <div className="flex justify-start mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={backHref}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backText}
              </Link>
            </Button>
          </div>
        )}
        <Link href="/" className="mx-auto mb-6 block">
          <h1 className="font-bold text-4xl text-[#19398f] font-nunito">
            anytrans
          </h1>
        </Link>
        <CardTitle className="text-2xl font-semibold font-inter">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-inter">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
