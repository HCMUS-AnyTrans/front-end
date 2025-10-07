'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthShell } from '@/src/components/Auth/AuthShell';
import { PasswordField } from '@/src/components/Auth/PasswordField';
import { PasswordStrength } from '@/src/components/Auth/PasswordStrength';
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
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas';

interface ResetPasswordClientProps {
  token?: string;
}

export function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isValidToken, setIsValidToken] = useState(true);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
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

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Invalid reset token');
      return;
    }

    startTransition(async () => {
      try {
        const result = await resetPasswordAction({ ...data, token });
        if (result?.error) {
          toast.error(result.error);
        }
      } catch {
        toast.error('Password reset failed. Please try again.');
      }
    });
  };

  // Show error if invalid token
  if (!isValidToken) {
    return (
      <AuthShell
        title="Invalid reset link"
        description="This password reset link is invalid or has expired."
        showBackButton
        backHref="/forgot-password"
        backText="Request new reset link"
      >
        <div className="space-y-4 text-center">
          <div className="p-4 border rounded-lg bg-destructive/15 border-destructive/20">
            <p className="text-sm text-destructive">
              This password reset link is invalid or has expired. Please request
              a new reset link.
            </p>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full bg-[#19398f] hover:bg-[#142457]">
              <Link href="/forgot-password">Request new reset link</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      description="Enter your new password below."
      showBackButton
      backHref="/login"
      backText="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordField
                    {...field}
                    placeholder="Enter your new password"
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
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <PasswordField
                    {...field}
                    placeholder="Confirm your new password"
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
            className="w-full bg-[#19398f] hover:bg-[#142457]"
            disabled={isPending}
          >
            {isPending ? 'Resetting password...' : 'Reset password'}
          </Button>
        </form>
      </Form>

      <div className="space-y-2 text-center text-sm text-muted-foreground">
        <p>
          Remember your password?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>

        <p>
          Need a new reset link?{' '}
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Request another one
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
