'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthShell, PasswordField, PasswordStrength } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  useResetPasswordMutation,
  useValidateResetTokenMutation,
  useAuthErrorMessage,
} from '@/features/auth';
import { createClientSchemas, type ResetPasswordFormData } from '../schemas';

interface ResetPasswordClientProps {
  token?: string;
}

export function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const t = useTranslations('auth.resetPassword');
  const tErrors = useTranslations('auth.errors');
  const getErrorMessage = useAuthErrorMessage();
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const schemas = createClientSchemas(tErrors);

  // Validate reset token mutation
  const validateTokenMutation = useValidateResetTokenMutation({
    onSuccess: (data) => {
      if (data.valid) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
        setValidationError(data.message || t('invalidToken'));
      }
      setIsValidating(false);
    },
    onError: (error) => {
      setIsValidToken(false);
      setValidationError(getErrorMessage(error) || t('invalidToken'));
      setIsValidating(false);
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      toast.success(t('success'));
      // Hook automatically redirects to /login?message=password_reset
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg || tErrors('serverError'));
    },
  });

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schemas.resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Validate token on mount
  useEffect(() => {
    if (!token || token.length < 10) {
      setIsValidToken(false);
      setValidationError(t('invalidToken'));
      setIsValidating(false);
      return;
    }

    // Call API to validate token
    validateTokenMutation.mutate(token);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error(t('invalidToken'));
      return;
    }

    resetPasswordMutation.mutate({
      token,
      newPassword: data.password,
    });
  };

  // Show loading while validating token
  if (isValidating) {
    return (
      <AuthShell
        title={t('title')}
        description={t('subtitle')}
        showBackButton
        backHref="/login"
        backText={t('backToLogin')}
      >
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-sm text-muted-foreground">
            {t('validatingToken')}
          </p>
        </div>
      </AuthShell>
    );
  }

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
              {validationError || t('invalidLink.message')}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              asChild
              variant="gradient-primary"
              size="default"
              className="w-full"
            >
              <Link href="/forgot-password">
                {t('invalidLink.requestNewLink')}
              </Link>
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
          {resetPasswordMutation.isError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {getErrorMessage(resetPasswordMutation.error)}
            </div>
          )}

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
                    disabled={resetPasswordMutation.isPending}
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
                    disabled={resetPasswordMutation.isPending}
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
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? t('submitting') : t('submit')}
          </Button>
        </form>
      </Form>

      <div className="space-y-2 text-center text-sm text-gray-600 mt-4">
        <p>
          {t('rememberPassword')}{' '}
          <Link
            href="/login"
            className="font-semibold text-brand-primary-light hover:text-brand-primary-dark transition-colors duration-300"
          >
            {t('signIn')}
          </Link>
        </p>

        <p>
          {t('needNewLink')}{' '}
          <Link
            href="/forgot-password"
            className="font-semibold text-brand-primary-light hover:text-brand-primary-dark transition-colors duration-300"
          >
            {t('requestAnother')}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
