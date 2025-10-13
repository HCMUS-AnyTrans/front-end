import React from 'react';

interface FeatureSectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function FeatureSectionHeader({
  title,
  description,
  align = 'center',
  className = '',
}: FeatureSectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
