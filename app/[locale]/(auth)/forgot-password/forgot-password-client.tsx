'use client';

import React, { useTransition } from 'react';
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
import { createClientSchemas, type ForgotPasswordFormData } from '../schemas';

export function ForgotPasswordClient() {
  const t = useTranslations('auth.forgotPassword');
  const tErrors = useTranslations('auth.errors');
  const [isPending, startTransition] = useTransition();

  const schemas = createClientSchemas(tErrors);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schemas.forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    startTransition(async () => {
      await requestPasswordResetAction(data);
      // Action redirects to check-email page on success
    });
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
