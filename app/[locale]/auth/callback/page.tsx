/**
 * Google OAuth Callback Page
 *
 * Handles the redirect from Google OAuth authentication.
 * Reads accessToken from URL query params and sets it in auth state.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { useTranslations } from 'next-intl';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuth();
  const t = useTranslations('auth.callback');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const error = searchParams.get('error');

    if (error) {
      // OAuth failed
      setStatus('error');
      setErrorMessage(error);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login?error=oauth_failed');
      }, 3000);
      return;
    }

    if (!accessToken) {
      // No token provided
      setStatus('error');
      setErrorMessage('No access token provided');
      setTimeout(() => {
        router.push('/login?error=oauth_failed');
      }, 3000);
      return;
    }

    // We have an access token
    // We need to fetch user data or decode the token
    // For simplicity, we'll assume the backend also returns user data in the URL
    // or we need to call a /users/me endpoint

    // Option 1: If backend includes user data in URL (as JSON)
    const userDataParam = searchParams.get('user');
    if (userDataParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userDataParam));
        setAuth(user, accessToken);
        setStatus('success');

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        return;
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }

    // Option 2: Call /users/me or similar endpoint
    // For now, we'll create a minimal user object and let the app fetch full profile later
    // This is a simplified approach - in production you'd want to fetch user data properly

    // Create a placeholder user (will be replaced by actual user data when profile loads)
    const placeholderUser = {
      id: 'temp',
      email: 'user@example.com',
      fullName: 'User',
    };

    setAuth(placeholderUser, accessToken);
    setStatus('success');

    // Redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, [searchParams, setAuth, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t ? t('processing') : 'Completing authentication...'}
          </h2>
          <p className="text-gray-600">
            {t ? t('pleaseWait') : 'Please wait while we log you in'}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t ? t('authenticationFailed') : 'Authentication Failed'}
          </h2>
          <p className="text-gray-600 mb-4">
            {errorMessage ||
              (t
                ? t('errorOccurred')
                : 'An error occurred during authentication')}
          </p>
          <p className="text-sm text-gray-500">
            {t ? t('redirecting') : 'Redirecting to login...'}
          </p>
        </div>
      </div>
    );
  }

  // Success
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center">
        <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {t ? t('success') : 'Authentication Successful!'}
        </h2>
        <p className="text-gray-600">
          {t ? t('redirectingDashboard') : 'Redirecting to dashboard...'}
        </p>
      </div>
    </div>
  );
}
