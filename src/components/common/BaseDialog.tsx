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
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
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
  return (
    <div className={`bg-white rounded-2xl shadow-2xl  ${className}`}>
      {children}
    </div>
  );
}
