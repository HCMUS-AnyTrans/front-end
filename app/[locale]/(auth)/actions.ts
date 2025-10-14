'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
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
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData);

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
      redirect('/');
    } else {
      return {
        error: 'Invalid email or password',
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function signupAction(formData: SignupFormData) {
  try {
    // Validate the form data
    const validatedData = signupSchema.parse(formData);

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
    redirect('/login?message=Account created successfully. Please sign in.');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

// OTP verification action
export async function verifyOtpAction(formData: OtpFormData) {
  try {
    // Validate the form data
    const validatedData = otpSchema.parse(formData);

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
      redirect('/dashboard');
    } else {
      return {
        error: 'Invalid verification code',
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Invalid verification code format',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      error: 'Verification failed. Please try again.',
    };
  }
}

// Resend OTP action
export async function resendOtpAction(email: string) {
  try {
    // Validate email
    const validatedEmail = z.string().email().parse(email);

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
  } catch (error) {
    return {
      error: 'Failed to resend verification code. Please try again.',
    };
  }
}

// Forgot password request action
export async function requestPasswordResetAction(
  formData: ForgotPasswordFormData
) {
  try {
    // Validate the form data
    const validatedData = forgotPasswordSchema.parse(formData);

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
    redirect(
      `/forgot-password/check-email?email=${encodeURIComponent(maskedEmail)}`
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Please enter a valid email address',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      error: 'Failed to send reset email. Please try again.',
    };
  }
}

// Resend password reset email action
export async function resendPasswordEmailAction(email: string) {
  try {
    // Validate email
    const validatedEmail = z.string().email().parse(email);

    // TODO: Implement actual resend logic
    console.log('Resend password reset email for:', validatedEmail);

    // Simulate resend delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo purposes, always succeed
    return {
      success: true,
      message: 'Reset email sent successfully',
    };
  } catch (error) {
    return {
      error: 'Failed to resend reset email. Please try again.',
    };
  }
}

// Reset password action
export async function resetPasswordAction(
  formData: ResetPasswordFormData & { token: string }
) {
  try {
    // Validate the form data
    const validatedData = resetPasswordSchema.parse(formData);

    // Validate token
    if (!formData.token || formData.token.length < 10) {
      return {
        error: 'Invalid or expired reset token',
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
    redirect(
      '/login?message=Password reset successfully. Please sign in with your new password.'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      error: 'Password reset failed. Please try again.',
    };
  }
}

// Utility function to mask email
function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }
  return `${username[0]}${'*'.repeat(Math.min(3, username.length - 2))}${username.slice(-1)}@${domain}`;
}
