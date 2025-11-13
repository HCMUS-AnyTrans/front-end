'use server';

import { z } from 'zod';
import { redirect as nextRedirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  createSchemas,
  type LoginFormData,
  type SignupFormData,
  type OtpFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from './schemas';

// Server actions
export async function loginAction(formData: LoginFormData) {
  const t = await getTranslations('auth.errors');
  const schemas = await createSchemas();
  
  // Validate the form data
  const result = schemas.loginSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: t('validationFailed'),
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual authentication logic
  console.log('Login attempt:', {
    email: validatedData.email,
    rememberMe: validatedData.rememberMe,
  });

  // Simulate authentication delay (for testing)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful login (for testing)
  // In a real app, you would check credentials against a database
  if (validatedData.email && validatedData.password) {
    // Set authentication cookies/session here
    const locale = await getLocale();
    nextRedirect(`/${locale}/dashboard`);
  } else {
    return {
      error: t('invalidCredentials'),
    };
  }
}

export async function signupAction(formData: SignupFormData) {
  const t = await getTranslations('auth.errors');
  const schemas = await createSchemas();
  
  // Validate the form data
  const result = schemas.signupSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: t('validationFailed'),
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

  // Simulate registration delay (for testing)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful signup (for testing)
  // In a real app, you would:
  // 1. Check if user already exists
  // 2. Hash the password
  // 3. Save user to database
  // 4. Send verification email with OTP

  // Redirect to verify-otp page after successful signup with email parameter
  const locale = await getLocale();
  nextRedirect(`/${locale}/verify-otp?email=${encodeURIComponent(validatedData.email)}`);
}

// OTP verification action
export async function verifyOtpAction(formData: OtpFormData) {
  const t = await getTranslations('auth.errors');
  const schemas = await createSchemas();
  
  // Validate the form data
  const result = schemas.otpSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: t('invalidVerificationCodeFormat'),
      fieldErrors: errors.fieldErrors,
    };
  }

  const validatedData = result.data;

  // TODO: Implement actual OTP verification logic
  console.log('OTP verification attempt:', {
    code: validatedData.code,
  });

  // Simulate verification delay (for testing)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful OTP verification (for testing)
  // In a real app, you would:
  // 1. Check if OTP code is valid and not expired
  // 2. Verify it matches the user's pending verification
  // 3. Mark user as verified

  if (validatedData.code.length === 6) {
    // Redirect to login after successful verification with success message
    const locale = await getLocale();
    nextRedirect(`/${locale}/login?message=account_created`);
  } else {
    return {
      error: t('invalidVerificationCode'),
    };
  }
}

// Resend OTP action
export async function resendOtpAction(email: string) {
  const t = await getTranslations('auth.errors');
  
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
      message: t('verificationCodeSentSuccess'),
    };
  } catch {
    return {
      error: t('resendVerificationFailed'),
    };
  }
}

// Forgot password request action
export async function requestPasswordResetAction(
  formData: ForgotPasswordFormData
) {
  const t = await getTranslations('auth.errors');
  const schemas = await createSchemas();
  
  // Validate the form data
  const result = schemas.forgotPasswordSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: t('invalidEmailAddress'),
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

  // Redirect to check email page with real email (not masked)
  // The client component will handle masking for display
  const locale = await getLocale();
  nextRedirect(`/${locale}/forgot-password/check-email?email=${encodeURIComponent(validatedData.email)}`);
}

// Resend password reset email action
export async function resendPasswordEmailAction(email: string) {
  const t = await getTranslations('auth.errors');
  
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
      message: t('resetEmailSentSuccess'),
    };
  } catch {
    return {
      error: t('resendResetEmailFailed'),
    };
  }
}

// Reset password action
export async function resetPasswordAction(
  formData: ResetPasswordFormData & { token: string }
) {
  const t = await getTranslations('auth.errors');
  const schemas = await createSchemas();
  
  // Validate token first
  if (!formData.token || formData.token.length < 10) {
    return {
      error: t('invalidOrExpiredToken'),
    };
  }

  // Validate the form data
  const result = schemas.resetPasswordSchema.safeParse(formData);
  
  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      error: t('validationFailed'),
      fieldErrors: errors.fieldErrors,
    };
  }

  // TODO: Implement actual password reset logic
  console.log('Password reset attempt with token:', formData.token);

  // Simulate reset delay (for testing)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful password reset (for testing)
  // In a real app, you would:
  // 1. Verify reset token is valid and not expired
  // 2. Hash the new password
  // 3. Update user's password in database
  // 4. Invalidate the reset token
  // 5. Optionally log out user from all devices

  // Redirect to login page with success message
  const locale = await getLocale();
  nextRedirect(`/${locale}/login?message=password_reset`);
}
