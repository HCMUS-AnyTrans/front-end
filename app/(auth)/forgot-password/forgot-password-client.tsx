'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthShell } from '@/src/components/Auth/AuthShell';
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
        title="Check your email"
        description="We've sent a password reset link to your email address."
        showBackButton
        backHref="/login"
        backText="Back to login"
      >
        <div className="space-y-4 text-center">
          <div className="p-4 border rounded-lg bg-blue-50/50 border-blue-100">
            <p className="text-sm text-gray-600">
              If you don&apos;t see the email, check your spam folder or try
              again.
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#4169E1] text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
          >
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot your password?"
      description="Enter your email address and we'll send you a link to reset your password."
      showBackButton
      backHref="/login"
      backText="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@example.com"
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
            className="w-full bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#4169E1] text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-3">
        Remember your password?{' '}
        <Link
          href="/login"
          className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
        >
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}
