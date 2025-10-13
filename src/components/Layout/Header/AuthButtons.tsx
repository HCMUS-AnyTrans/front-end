import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  variant?: 'desktop' | 'mobile';
  onSignupClick?: () => void;
  onLoginClick?: () => void;
}

export default function AuthButtons({
  variant = 'desktop',
  onSignupClick,
  onLoginClick,
}: AuthButtonsProps) {
  if (variant === 'mobile') {
    return (
      <div className="p-4 space-y-3 border-t border-gray-200 mt-4">
        <a
          href="/login"
          className="block px-4 py-2 rounded-xl font-semibold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300 active:scale-98"
          onClick={onLoginClick}
        >
          Login
        </a>
        <Button
          variant="gradient-primary"
          size="default"
          className="w-full px-4 py-4"
          asChild
        >
          <a href="/signup" onClick={onSignupClick}>
            Sign up
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      <a
        href="/login"
        className="px-4 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
      >
        Login
      </a>
      <Button
        variant="gradient-primary"
        size="default"
        className="px-5 xl:px-6 py-3 rounded-lg text-sm xl:text-[15px]"
        asChild
      >
        <a href="/signup">Sign up</a>
      </Button>
    </div>
  );
}

