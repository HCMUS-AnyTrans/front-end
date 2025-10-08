import React, { ReactNode } from 'react';

interface BaseCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  title: string;
  content?: ReactNode;
  variant?: 'stat' | 'feature' | 'language' | 'default';
  trend?: ReactNode;
  trendClass?: string;
  subtitle?: string;
  value?: string;
  description?: string;
  className?: string;
}

export default function BaseCard({
  icon,
  iconWrapperClass = 'bg-blue-100',
  title,
  content,
  variant = 'default',
  trend,
  trendClass,
  subtitle,
  value,
  description,
  className = '',
}: BaseCardProps) {
  const getCardClass = () => {
    switch (variant) {
      case 'stat':
        return 'bg-white rounded-xl p-6 border border-gray-200';
      case 'feature':
        return 'bg-white rounded-xl p-6 border border-gray-200';
      case 'language':
        return 'bg-white rounded-2xl border border-gray-200 p-6';
      default:
        return 'bg-white rounded-xl border border-gray-200';
    }
  };

  return (
    <div className={`${getCardClass()} ${className}`}>
      {variant === 'stat' && (
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div
              className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center`}
            >
              {icon}
            </div>
          )}
          {trend && (
            <div
              className={`flex items-center gap-1 ${trendClass} text-sm font-medium`}
            >
              {trend}
            </div>
          )}
        </div>
      )}

      {variant === 'feature' && icon && (
        <div
          className={`w-12 h-12 ${iconWrapperClass} rounded-xl flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
      )}

      {variant === 'language' && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {icon}
        </div>
      )}

      {variant === 'stat' && (
        <>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </>
      )}

      {variant === 'feature' && (
        <>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </>
      )}

      {variant === 'language' && content}
    </div>
  );
}
