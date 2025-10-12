'use client';

import React, { ReactNode } from 'react';

interface BaseFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButton: ReactNode;
  className?: string;
}

export default function BaseForm({
  title,
  description,
  children,
  onSubmit,
  submitButton,
  className = '',
}: BaseFormProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-4">
        {children}
        {submitButton}
      </form>
    </div>
  );
}
