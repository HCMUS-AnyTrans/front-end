'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
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
import {
  useForgotPasswordMutation,
  useAuthErrorMessage,
} from '@/features/auth';
import { createClientSchemas, type ForgotPasswordFormData } from '../schemas';

export function ForgotPasswordClient() {
  const t = useTranslations('auth.forgotPassword');
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const getErrorMessage = useAuthErrorMessage();

  const schemas = createClientSchemas(tErrors);

  // Forgot password mutation
  const forgotPasswordMutation = useForgotPasswordMutation({
    onSuccess: (data, variables) => {
      // Redirect to check-email page with email parameter
      router.push(
        `/forgot-password/check-email?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg || tErrors('serverError'));
    },
  });

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schemas.forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data);
  };

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
          {forgotPasswordMutation.isError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {getErrorMessage(forgotPasswordMutation.error)}
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
                    disabled={forgotPasswordMutation.isPending}
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
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? t('submitting') : t('submit')}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-3">
        {t('rememberPassword')}{' '}
        <Link
          href="/login"
          className="font-semibold text-brand-primary-light hover:text-brand-primary-dark transition-colors duration-300"
        >
          {t('signIn')}
        </Link>
      </div>
    </AuthShell>
  );
}
