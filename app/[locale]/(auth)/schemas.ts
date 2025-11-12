import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

// Type for error messages
type ErrorMessages = {
  invalidEmail: string;
  passwordMin: string;
  passwordMismatch: string;
  nameMin: string;
  agreeToTerms: string;
  otpLength: string;
  otpOnlyNumbers: string;
};

// Helper function to create schemas with error messages
function buildSchemas(errors: ErrorMessages) {
  return {
    loginSchema: z.object({
      email: z.email(errors.invalidEmail),
      password: z.string().min(8, errors.passwordMin),
      rememberMe: z.boolean().optional(),
    }),

    signupSchema: z.object({
      name: z.string().min(2, errors.nameMin),
      email: z.email(errors.invalidEmail),
      password: z.string().min(8, errors.passwordMin),
      confirmPassword: z.string(),
      agreeToTerms: z.boolean(),
    })
      .refine((data) => data.agreeToTerms === true, {
        message: errors.agreeToTerms,
        path: ['agreeToTerms'],
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: errors.passwordMismatch,
        path: ['confirmPassword'],
      }),

    otpSchema: z.object({
      code: z
        .string()
        .length(6, errors.otpLength)
        .regex(/^\d{6}$/, errors.otpOnlyNumbers),
    }),

    forgotPasswordSchema: z.object({
      email: z.email(errors.invalidEmail),
    }),

    resetPasswordSchema: z.object({
      password: z.string().min(8, errors.passwordMin),
      confirmPassword: z.string(),
    }).refine(
      (data) => data.password === data.confirmPassword,
      {
        message: errors.passwordMismatch,
        path: ['confirmPassword'],
      }
    ),

    emailSchema: z.email(errors.invalidEmail),
  };
}

// Factory function for server-side with localized messages
export async function createSchemas() {
  const t = await getTranslations('auth.errors');
  
  const errors: ErrorMessages = {
    invalidEmail: t('invalidEmail'),
    passwordMin: t('passwordMin'),
    passwordMismatch: t('passwordMismatch'),
    nameMin: t('nameMin'),
    agreeToTerms: t('agreeToTerms'),
    otpLength: t('otpLength'),
    otpOnlyNumbers: t('otpOnlyNumbers'),
  };

  return buildSchemas(errors);
}

// Client-side factory function with translations object
export function createClientSchemas(t: (key: string) => string) {
  const errors: ErrorMessages = {
    invalidEmail: t('invalidEmail'),
    passwordMin: t('passwordMin'),
    passwordMismatch: t('passwordMismatch'),
    nameMin: t('nameMin'),
    agreeToTerms: t('agreeToTerms'),
    otpLength: t('otpLength'),
    otpOnlyNumbers: t('otpOnlyNumbers'),
  };

  return buildSchemas(errors);
}

// Default schemas for client-side use (will use English by default)
// These are kept for backward compatibility but should use the factory function on server
export const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

const signupBaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean(),
});

export const signupSchema = signupBaseSchema
  .refine((data) => data.agreeToTerms === true, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeToTerms'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP code must contain only numbers'),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

const resetPasswordBaseSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
});

export const resetPasswordSchema = resetPasswordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export const emailSchema = z.email('Please enter a valid email address');

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
