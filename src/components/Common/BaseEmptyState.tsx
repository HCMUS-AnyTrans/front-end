import React, { ReactNode } from 'react';

interface BaseEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  searchQuery?: string;
  className?: string;
}

export default function BaseEmptyState({
  icon,
  title,
  description,
  searchQuery,
  className = '',
}: BaseEmptyStateProps) {
  return (
    <div className={`px-6 py-16 text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">
        {searchQuery ? 'Try adjusting your search criteria' : description}
      </p>
    </div>
  );
}
