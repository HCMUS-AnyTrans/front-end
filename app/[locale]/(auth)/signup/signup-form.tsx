'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
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
import { useRegisterMutation, useAuthErrorMessage } from '@/features/auth';
import { createClientSchemas, type SignupFormData } from '../schemas';

export function SignupForm() {
  const t = useTranslations('auth.signup');
  const tErrors = useTranslations('auth.errors');
  const getErrorMessage = useAuthErrorMessage();

  // Register mutation
  const registerMutation = useRegisterMutation({
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg || 'Registration failed. Please try again.');
    },
  });

  const schemas = createClientSchemas(tErrors);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(schemas.signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      fullName: data.name,
    });
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
            {registerMutation.isError && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {getErrorMessage(registerMutation.error)}
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
                      disabled={registerMutation.isPending}
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
                      disabled={registerMutation.isPending}
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
                      disabled={registerMutation.isPending}
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
                      disabled={registerMutation.isPending}
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
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      {t.rich('terms', {
                        termsLink: (chunks) => (
                          <Link
                            href="/terms"
                            className="text-brand-primary-light hover:text-brand-primary-dark font-medium transition-colors duration-300"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {chunks}
                          </Link>
                        ),
                        privacyLink: (chunks) => (
                          <Link
                            href="/privacy"
                            className="text-brand-primary-light hover:text-brand-primary-dark font-medium transition-colors duration-300"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </FormLabel>
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
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </Form>

        {/* Sign in link */}
        <div className="text-center text-sm text-gray-600">
          {t('haveAccount')}{' '}
          <Link
            href="/login"
            className="font-semibold text-brand-primary-light hover:text-brand-primary-dark transition-colors duration-300"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
