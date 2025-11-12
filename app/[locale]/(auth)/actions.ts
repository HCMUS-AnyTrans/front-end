'use server';

import { z } from 'zod';
import { redirect as nextRedirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import {
  loginSchema,
  signupSchema,
  otpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginFormData,
  type SignupFormData,
  type OtpFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from './schemas';

// Server actions
export async function loginAction(formData: LoginFormData) {
  // Validate the form data
  const result = loginSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: 'Validation failed',
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual authentication logic
  console.log('Login attempt:', {
    email: validatedData.email,
    rememberMe: validatedData.rememberMe,
  });

  // Simulate authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  // In a real app, you would check credentials against a database
  if (validatedData.email && validatedData.password) {
    // Set authentication cookies/session here
    const locale = await getLocale();
    nextRedirect(`/${locale}/`);
  } else {
    return {
      error: 'Invalid email or password',
    };
  }
}

export async function signupAction(formData: SignupFormData) {
  // Validate the form data
  const result = signupSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: 'Validation failed',
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual user registration logic
  console.log('Signup attempt:', {
    name: validatedData.name,
    email: validatedData.email,
    agreeToTerms: validatedData.agreeToTerms,
  });

  // Simulate registration delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  // In a real app, you would:
  // 1. Check if user already exists
  // 2. Hash the password
  // 3. Save user to database
  // 4. Send verification email

  // Redirect to login page after successful signup
  const locale = await getLocale();
  nextRedirect(`/${locale}/login?message=Account created successfully. Please sign in.`);
}

// OTP verification action
export async function verifyOtpAction(formData: OtpFormData) {
  // Validate the form data
  const result = otpSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: 'Invalid verification code format',
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual OTP verification logic
  console.log('OTP verification attempt:', {
    code: validatedData.code,
  });

  // Simulate verification delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, accept any 6-digit code
  // In a real app, you would:
  // 1. Check if OTP code is valid and not expired
  // 2. Verify it matches the user's pending verification
  // 3. Mark user as verified
  // 4. Set authentication cookies/session

  if (validatedData.code.length === 6) {
    // Redirect to dashboard after successful verification
    const locale = await getLocale();
    nextRedirect(`/${locale}/dashboard`);
  } else {
    return {
      error: 'Invalid verification code',
    };
  }
}

// Resend OTP action
export async function resendOtpAction(email: string) {
  try {
    // Validate email
    const validatedEmail = z.email().parse(email);

    // TODO: Implement actual resend logic
    console.log('Resend OTP attempt for:', validatedEmail);

    // Simulate resend delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo purposes, always succeed
    // In a real app, you would:
    // 1. Generate new OTP code
    // 2. Send email with new code
    // 3. Update expiration time

    return {
      success: true,
      message: 'Verification code sent successfully',
    };
  } catch {
    return {
      error: 'Failed to resend verification code. Please try again.',
    };
  }
}

// Forgot password request action
export async function requestPasswordResetAction(
  formData: ForgotPasswordFormData
) {
  // Validate the form data
  const result = forgotPasswordSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: 'Please enter a valid email address',
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual password reset request logic
  console.log('Password reset request for:', validatedData.email);

  // Simulate request delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  // In a real app, you would:
  // 1. Check if user exists
  // 2. Generate reset token
  // 3. Send reset email with token
  // 4. Store token with expiration

  // Redirect to check email page
  const maskedEmail = maskEmail(validatedData.email);
  const locale = await getLocale();
  nextRedirect(`/${locale}/forgot-password/check-email?email=${encodeURIComponent(maskedEmail)}`);
}

// Resend password reset email action
export async function resendPasswordEmailAction(email: string) {
  try {
    // Validate email
    const validatedEmail = z.email().parse(email);

    // TODO: Implement actual resend logic
    console.log('Resend password reset email for:', validatedEmail);

    // Simulate resend delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo purposes, always succeed
    return {
      success: true,
      message: 'Reset email sent successfully',
    };
  } catch {
    return {
      error: 'Failed to resend reset email. Please try again.',
    };
  }
}

// Reset password action
export async function resetPasswordAction(
  formData: ResetPasswordFormData & { token: string }
) {
  // Validate token first
  if (!formData.token || formData.token.length < 10) {
    return {
      error: 'Invalid or expired reset token',
    };
  }

  // Validate the form data
  const result = resetPasswordSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: 'Validation failed',
      fieldErrors: errors.fieldErrors,
    };
  }

  // TODO: Implement actual password reset logic
  console.log('Password reset attempt with token:', formData.token);

  // Simulate reset delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  // In a real app, you would:
  // 1. Verify reset token is valid and not expired
  // 2. Hash the new password
  // 3. Update user's password in database
  // 4. Invalidate the reset token
  // 5. Optionally log out user from all devices

  // Redirect to login page with success message
  const locale = await getLocale();
  nextRedirect(`/${locale}/login?message=Password reset successfully. Please sign in with your new password.`);
}

// Utility function to mask email
function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }
  return `${username[0]}${'*'.repeat(Math.min(3, username.length - 2))}${username.slice(-1)}@${domain}`;
}
