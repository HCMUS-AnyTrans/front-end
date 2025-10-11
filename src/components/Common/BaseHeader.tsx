import React from 'react';

interface BaseHeaderProps {
  title: string;
  description: string;
  variant?: 'page' | 'dialog';
  stats?: Array<{
    label: string;
    value: string | number;
    color: string;
  }>;
  className?: string;
}

export default function BaseHeader({
  title,
  description,
  variant = 'page',
  stats,
  className = '',
}: BaseHeaderProps) {
  const containerClass =
    variant === 'dialog'
      ? 'flex items-center justify-between px-8 py-6 border-b border-gray-200'
      : 'bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className={variant === 'dialog' ? '' : 'max-w-7xl mx-auto'}>
        <div
          className={
            variant === 'dialog'
              ? ''
              : 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'
          }
        >
          <div>
            <h1
              className={`${variant === 'dialog' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 mb-1 md:mb-2`}
            >
              {title}
            </h1>
            <p className="text-xs md:text-sm text-gray-600 line-clamp-1 md:line-clamp-none">
              {description}
            </p>
          </div>
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-6 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {stat.value}
                    </span>{' '}
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
