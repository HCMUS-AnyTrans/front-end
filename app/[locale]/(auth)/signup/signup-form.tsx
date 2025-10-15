'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link, redirect } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthShell, PasswordField, OAuthButtons } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signupAction } from '../actions';
import { signupSchema, type SignupFormData } from '../schemas';

export function SignupForm() {
  const t = useTranslations('auth.signup');
  const tOAuth = useTranslations('auth.oauth');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setError(null);
    redirect({ href: '/verify-otp', locale: 'en' });
    // startTransition(async () => {
    //   try {
    //     const result = await signupAction(data);
    //     if (result?.error) {
    //       setError(result.error);
    //     }
    //   } catch {
    //     setError('An unexpected error occurred. Please try again.');
    //   }
    // });
  };

  return (
    <AuthShell title={t('title')} description={t('subtitle')}>
      <div className="space-y-6">
        {/* OAuth Buttons */}
        <OAuthButtons />

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('divider')}
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0.5">
                  <FormLabel>{t('fullName.label')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('fullName.placeholder')}
                      autoComplete="name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0.5">
                  <FormLabel>{t('password.label')}</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      placeholder={t('password.placeholder')}
                      autoComplete="new-password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0.5">
                  <FormLabel>{t('confirmPassword.label')}</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      placeholder={t('confirmPassword.placeholder')}
                      autoComplete="new-password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <div className="text-sm font-normal">
                      {t.rich('terms', {
                        termsLink: (chunks) => (
                          <Link
                            href="/terms"
                            className="text-[#4169E1] hover:text-[#1e3a8a] font-medium transition-colors duration-300"
                          >
                            {chunks}
                          </Link>
                        ),
                        privacyLink: (chunks) => (
                          <Link
                            href="/privacy"
                            className="text-[#4169E1] hover:text-[#1e3a8a] font-medium transition-colors duration-300"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="gradient-primary"
              size="default"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </Form>

        {/* Sign in link */}
        <div className="text-center text-sm text-gray-600">
          {t('haveAccount')}{' '}
          <Link
            href="/login"
            className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
