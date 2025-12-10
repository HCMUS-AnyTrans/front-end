'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { AuthShell } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import {
  useForgotPasswordMutation,
  useAuthErrorMessage,
} from '@/features/auth';

interface CheckEmailClientProps {
  email?: string;
}

export function CheckEmailClient({
  email = 'user@example.com',
}: CheckEmailClientProps) {
  const t = useTranslations('auth.forgotPassword.checkEmail');
  const tErrors = useTranslations('auth.errors');
  const getErrorMessage = useAuthErrorMessage();
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend mutation
  const resendMutation = useForgotPasswordMutation({
    onSuccess: () => {
      toast.success(t('resendSuccess'));
      setResendCooldown(60); // 60 seconds cooldown
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg || t('resendError'));
    },
  });

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
    resendMutation.mutate({ email });
  };

  const handleOpenEmailApp = () => {
    // Try to open default email client
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_self');
  };

  return (
    <AuthShell
      title={t('title')}
      description={`${t('subtitle')} ${email}`}
      showBackButton
      backHref="/login"
      backText={t('backToLogin')}
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
          <p className="text-sm text-muted-foreground">{t('instructions')}</p>

          <div className="p-3 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">
              <strong>{t('tipLabel')}</strong> {t('tipText')}
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
            {t('openEmailApp')}
          </Button>

          <Button
            onClick={handleResendEmail}
            disabled={resendCooldown > 0 || resendMutation.isPending}
            className="w-full"
            variant="ghost"
          >
            {resendCooldown > 0
              ? t('resendIn', { seconds: resendCooldown })
              : resendMutation.isPending
                ? t('resending')
                : t('resendEmail')}
          </Button>
        </div>

        {/* Additional Help */}
        <div className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            {t('stillTrouble')}{' '}
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              {t('tryDifferentEmail')}
            </Link>
          </p>

          <p>
            {t('rememberPassword')}{' '}
            <Link href="/login" className="text-primary hover:underline">
              {t('signIn')}
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
