'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthShell, OTPInput } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { verifyOtpAction, resendOtpAction } from '../actions';
import { createClientSchemas, type OtpFormData } from '../schemas';

interface VerifyOtpClientProps {
  email?: string;
}

export function VerifyOtpClient({
  email = 'user@example.com',
}: VerifyOtpClientProps) {
  const t = useTranslations('auth.verifyOtp');
  const tErrors = useTranslations('auth.errors');
  const [isPending, startTransition] = useTransition();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const schemas = createClientSchemas(tErrors);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(schemas.otpSchema),
    defaultValues: {
      code: '',
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

  const onSubmit = async (data: OtpFormData) => {
    startTransition(async () => {
      const result = await verifyOtpAction(data);
      if (result?.error) {
        toast.error(result.error);
      }
      // If no result returned, redirect happened successfully
    });
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      const result = await resendOtpAction(email);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result?.message || t('resendSuccess'));
        setResendCooldown(60); // 60 seconds cooldown
      }
    } catch {
      toast.error(t('resendError'));
    } finally {
      setIsResending(false);
    }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t('codeLabel')}</FormLabel>
                  <FormControl>
                    <OTPInput
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="gradient-primary"
              size="default"
              className="w-full"
              disabled={isPending || form.watch('code').length !== 6}
            >
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <div className="text-sm text-gray-600">
            {t('didntReceive')}{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isResending}
              className="font-semibold text-brand-primary-light hover:text-brand-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? t('resendIn', { seconds: resendCooldown })
                : isResending
                  ? t('resending')
                  : t('resendCode')}
            </button>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
