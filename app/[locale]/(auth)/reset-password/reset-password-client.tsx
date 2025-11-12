'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthShell, PasswordField, PasswordStrength } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { resetPasswordAction } from '../actions';
import { createClientSchemas, type ResetPasswordFormData } from '../schemas';

interface ResetPasswordClientProps {
  token?: string;
}

export function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const t = useTranslations('auth.resetPassword');
  const tErrors = useTranslations('auth.errors');
  const [isPending, startTransition] = useTransition();
  const [isValidToken, setIsValidToken] = useState(true);

  const schemas = createClientSchemas(tErrors);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schemas.resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Validate token on mount
  React.useEffect(() => {
    if (!token || token.length < 10) {
      setIsValidToken(false);
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error(t('invalidToken'));
      return;
    }

    startTransition(async () => {
      const result = await resetPasswordAction({ ...data, token });
      if (result?.error) {
        toast.error(result.error);
      }
      // If no result returned, redirect happened successfully
    });
  };

  // Show error if invalid token
  if (!isValidToken) {
    return (
      <AuthShell
        title={t('invalidLink.title')}
        description={t('invalidLink.description')}
        showBackButton
        backHref="/forgot-password"
        backText={t('invalidLink.requestNewLink')}
      >
        <div className="space-y-4 text-center">
          <div className="p-4 border rounded-lg bg-destructive/15 border-destructive/20">
            <p className="text-sm text-destructive">
              {t('invalidLink.message')}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              asChild
              variant="gradient-primary"
              size="default"
              className="w-full"
            >
              <Link href="/forgot-password">{t('invalidLink.requestNewLink')}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full hover:bg-gray-100 transition-all duration-300"
            >
              <Link href="/login">{t('invalidLink.backToLogin')}</Link>
            </Button>
          </div>
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
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>{t('newPassword.label')}</FormLabel>
                <FormControl>
                  <PasswordField
                    {...field}
                    placeholder={t('newPassword.placeholder')}
                    autoComplete="new-password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Strength Indicator */}
          <PasswordStrength
            password={form.watch('password')}
            className="mb-2"
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

      <div className="space-y-2 text-center text-sm text-gray-600 mt-4">
        <p>
          {t('rememberPassword')}{' '}
          <Link
            href="/login"
            className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
          >
            {t('signIn')}
          </Link>
        </p>

        <p>
          {t('needNewLink')}{' '}
          <Link
            href="/forgot-password"
            className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
          >
            {t('requestAnother')}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
