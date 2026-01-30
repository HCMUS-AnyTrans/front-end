'use client';

import React from 'react';
import AuthButtons from '../AuthButtons';
import { MobileMenuHeader } from './MobileMenuHeader';
import { MobileMenuNav } from './MobileMenuNav';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  isFeaturesOpen: boolean;
  onClose: () => void;
  onToggleFeatures: () => void;
  isActive: (href: string) => boolean;
}

export default function MobileMenu({
  isOpen,
  pathname,
  isFeaturesOpen,
  onClose,
  onToggleFeatures,
  isActive,
}: MobileMenuProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <MobileMenuHeader onClose={onClose} />

        <div className="overflow-y-auto h-[calc(100%-80px)]">
          <MobileMenuNav
            pathname={pathname}
            isFeaturesOpen={isFeaturesOpen}
            onToggleFeatures={onToggleFeatures}
            isActive={isActive}
            onClose={onClose}
          />

          <AuthButtons
            variant="mobile"
            onSignupClick={onClose}
            onLoginClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
