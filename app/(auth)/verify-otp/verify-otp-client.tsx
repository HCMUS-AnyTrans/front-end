'use client';

import React, { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthShell } from '@/src/components/Auth/AuthShell';
import { OTPInput } from '@/src/components/Auth/OTPInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { verifyOtpAction, resendOtpAction } from '../actions';
import { otpSchema, type OtpFormData } from '../schemas';
import { redirect } from 'next/navigation';

interface VerifyOtpClientProps {
  email?: string;
}

export function VerifyOtpClient({
  email = 'user@example.com',
}: VerifyOtpClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [newEmail, setNewEmail] = useState(email);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
    },
  });

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const onSubmit = (data: OtpFormData) => {
    redirect('/login');
    // startTransition(async () => {
    //   try {
    //     const result = await verifyOtpAction(data);
    //     if (result?.error) {
    //       toast.error(result.error);
    //     }
    //   } catch {
    //     toast.error('Verification failed. Please try again.');
    //   }
    // });
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      const result = await resendOtpAction(newEmail);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result?.message || 'Verification code sent successfully');
        setResendCooldown(60); // 60 seconds cooldown
      }
    } catch {
      toast.error('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail || newEmail === email) {
      setShowChangeEmail(false);
      return;
    }

    setIsResending(true);
    try {
      const result = await resendOtpAction(newEmail);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Verification code sent to new email');
        // Email will be updated in the next render
        setShowChangeEmail(false);
        setResendCooldown(60);
      }
    } catch {
      toast.error('Failed to send verification code to new email');
    } finally {
      setIsResending(false);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) {
      return `${username[0]}***@${domain}`;
    }
    return `${username[0]}${'*'.repeat(Math.min(3, username.length - 2))}${username.slice(-1)}@${domain}`;
  };

  return (
    <AuthShell
      title="Verify your email"
      description={`Enter the 6-digit code sent to ${maskEmail(newEmail)}`}
      showBackButton
      backHref="/login"
      backText="Back to login"
    >
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Verification code</FormLabel>
                  <FormControl>
                    <OTPInput
                      value={field.value}
                      onChange={field.onChange}
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
              disabled={isPending || form.watch('code').length !== 6}
            >
              {isPending ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </Form>

        <div className="space-y-4 text-center">
          <div className="text-sm text-muted-foreground">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isResending}
              className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                  ? 'Sending...'
                  : 'Resend code'}
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            Wrong email?{' '}
            <button
              type="button"
              onClick={() => setShowChangeEmail(!showChangeEmail)}
              className="text-primary hover:underline"
            >
              Change email
            </button>
          </div>

          {showChangeEmail && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-email">New email address</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  disabled={isResending}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChangeEmail(false)}
                  disabled={isResending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleChangeEmail}
                  disabled={isResending || !newEmail}
                  className="bg-[#19398f] hover:bg-[#142457]"
                >
                  {isResending ? 'Sending...' : 'Send code'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthShell>
  );
}
