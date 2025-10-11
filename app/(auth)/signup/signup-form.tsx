'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
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
import { redirect } from 'next/navigation';

export function SignupForm() {
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
    redirect('/verify-otp');
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
    <AuthShell
      title="Create an account"
      description="Enter your information to get started"
    >
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
              Or continue with
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
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
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
                  <FormLabel>Email</FormLabel>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0.5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      placeholder="Create a password"
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      placeholder="Confirm your password"
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
                    <FormLabel className="text-sm font-normal">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-[#4169E1] hover:text-[#1e3a8a] font-medium transition-colors duration-300"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-[#4169E1] hover:text-[#1e3a8a] font-medium transition-colors duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#4169E1] text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              disabled={isPending}
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>

        {/* Sign in link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-[#4169E1] hover:text-[#1e3a8a] transition-colors duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
