'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
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
import { loginAction } from '../actions';
import { loginSchema, type LoginFormData } from '../schemas';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await loginAction(data);
        if (result?.error) {
          setError(result.error);
        }
      } catch {
        setError('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <AuthShell title={t('title')} description={t('subtitle')}>
      <div className="space-y-6">
        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

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
                      autoComplete="current-password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
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
                      <FormLabel className="text-sm font-normal">
                        {t('rememberMe')}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-sm text-[#4169E1] hover:text-[#1e3a8a] font-medium transition-colors duration-300"
              >
                {t('forgotPassword')}
              </Link>
            </div>

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

        {/* Sign up link */}
        <div className="text-center text-sm text-gray-600">
          {t('noAccount')}{' '}
          <Link
            href="/signup"
            className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
          >
            {t('signUp')}
          </Link>
        </div>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('divider')}
            </span>
          </div>
        </div>
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons />
    </AuthShell>
  );
}
