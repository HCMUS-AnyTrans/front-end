import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface BaseEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  searchQuery?: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'gradient-primary' | 'outline';
  };
}

export default function BaseEmptyState({
  icon,
  title,
  description,
  searchQuery,
  className = '',
  action,
}: BaseEmptyStateProps) {
  return (
    <div className={`px-6 py-16 text-center ${className}`}>
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        {searchQuery ? 'Try adjusting your search criteria' : description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || 'gradient-primary'}
          size="default"
          className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
