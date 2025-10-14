'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthShell } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { requestPasswordResetAction } from '../actions';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas';

export function ForgotPasswordClient() {
  const t = useTranslations('auth.forgotPassword');
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    // TODO: Implement actual password reset request logic
    console.log('Password reset request:', data);
    setIsSubmitted(true);
    // startTransition(async () => {
    //   try {
    //     const result = await requestPasswordResetAction(data);
    //     if (result?.error) {
    //       // Error will be handled by the server action redirect or error return
    //       console.error(result.error);
    //     } else {
    //       setIsSubmitted(true);
    //     }
    //   } catch {
    //     console.error('Password reset request failed');
    //   }
    // });
  };

  if (isSubmitted) {
    return (
      <AuthShell
        title={t('checkEmail.title')}
        description={t('checkEmail.subtitle')}
        showBackButton
        backHref="/login"
        backText={t('checkEmail.backToLogin')}
      >
        <div className="space-y-4 text-center">
          <div className="p-4 border rounded-lg bg-blue-50/50 border-blue-100">
            <p className="text-sm text-gray-600">
              {t('checkEmail.description')}
            </p>
          </div>

          <Button
            asChild
            variant="gradient-primary"
            size="default"
            className="w-full"
          >
            <Link href="/login">{t('checkEmail.backToLogin')}</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t('title')}
      description={t('subtitle')}
      showBackButton
      backHref="/login"
      backText={t('backToLogin')}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>{t('email.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t('email.placeholder')}
                    autoComplete="email"
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
            className="w-full "
            disabled={isPending}
          >
            {isPending ? t('submitting') : t('submit')}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-3">
        {t('rememberPassword')}{' '}
        <Link
          href="/login"
          className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
        >
          {t('signIn')}
        </Link>
      </div>
    </AuthShell>
  );
}
