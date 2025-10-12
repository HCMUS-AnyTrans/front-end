'use client';

import React from 'react';

type BaseDialogProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  children: React.ReactNode;
};

export default function BaseDialog({
  open,
  onOpenChange,
  children,
}: BaseDialogProps) {
  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full h-full md:w-auto md:h-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

type BaseDialogContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function BaseDialogContent({
  children,
  className,
}: BaseDialogContentProps) {
  return <div className={`bg-white shadow-2xl ${className}`}>{children}</div>;
}
