'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthShell } from '@/src/components/Auth';
import { Button } from '@/components/ui/button';
import { resendPasswordEmailAction } from '../../actions';

interface CheckEmailClientProps {
  email?: string;
}

export function CheckEmailClient({
  email = 'user@example.com',
}: CheckEmailClientProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      const result = await resendPasswordEmailAction(email);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result?.message || 'Reset email sent successfully');
        setResendCooldown(60); // 60 seconds cooldown
      }
    } catch {
      toast.error('Failed to resend reset email');
    } finally {
      setIsResending(false);
    }
  };

  const handleOpenEmailApp = () => {
    // Try to open default email client
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_self');
  };

  return (
    <AuthShell
      title="Check your email"
      description={`We&apos;ve sent a password reset link to ${email}`}
      showBackButton
      backHref="/login"
      backText="Back to login"
    >
      <div className="space-y-6">
        {/* Email Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-center">
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address. Click
            the link in the email to reset your password.
          </p>

          <div className="p-3 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">
              <strong>Tip:</strong> Check your spam folder if you don&apos;t see
              the email in your inbox.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleOpenEmailApp}
            className="w-full"
            variant="outline"
          >
            <Mail className="h-4 w-4 mr-2" />
            Open email app
          </Button>

          <Button
            onClick={handleResendEmail}
            disabled={resendCooldown > 0 || isResending}
            className="w-full"
            variant="ghost"
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : isResending
                ? 'Sending...'
                : 'Resend email'}
          </Button>
        </div>

        {/* Additional Help */}
        <div className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            Still having trouble?{' '}
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Try a different email
            </Link>
          </p>

          <p>
            Remember your password?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
