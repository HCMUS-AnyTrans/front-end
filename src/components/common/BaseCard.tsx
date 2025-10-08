import React, { ReactNode } from 'react';
import { Check, X } from 'lucide-react';

interface BaseCardProps {
  icon?: ReactNode;
  iconWrapperClass?: string;
  title: string;
  content?: ReactNode;
  variant?:
    | 'stat'
    | 'feature'
    | 'language'
    | 'pricing'
    | 'value'
    | 'contact'
    | 'default';
  trend?: ReactNode;
  trendClass?: string;
  subtitle?: string;
  value?: string;
  description?: string;
  className?: string;
  // Pricing specific props
  popular?: boolean;
  price?: number | null;
  priceLabel?: string;
  cta?: string;
  features?: Array<{ text: string; included: boolean }>;
  onCtaClick?: () => void;
  // Contact/Value specific props
  contact?: string;
  color?: string;
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
  popular,
  price,
  priceLabel,
  cta,
  features,
  onCtaClick,
  contact,
  color = 'blue',
}: BaseCardProps) {
  const getCardClass = () => {
    switch (variant) {
      case 'stat':
        return 'bg-white rounded-xl p-6 border border-gray-200';
      case 'feature':
        return 'bg-white rounded-xl p-6 border border-gray-200';
      case 'language':
        return 'bg-white rounded-2xl border border-gray-200 p-6';
      case 'pricing':
        return `bg-white rounded-2xl overflow-hidden transition-all ${
          popular
            ? 'border-2 border-blue-600 shadow-2xl md:scale-105'
            : 'border border-gray-200 shadow-lg hover:shadow-xl'
        }`;
      case 'value':
      case 'contact':
        return 'bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all';
      default:
        return 'bg-white rounded-xl border border-gray-200';
    }
  };

  const getColorClasses = () => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      pink: 'bg-pink-50 text-pink-600',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconSize = () => {
    switch (variant) {
      case 'pricing':
      case 'contact':
        return 'w-14 h-14';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <div className={`${getCardClass()} ${className}`}>
      {variant === 'pricing' && popular && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-semibold">
          ⭐ Most Popular
        </div>
      )}

      <div className={variant === 'pricing' ? 'p-6 sm:p-8' : ''}>
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

        {(variant === 'value' || variant === 'contact') && icon && (
          <div
            className={`${getIconSize()} rounded-xl flex items-center justify-center mb-4 ${getColorClasses()}`}
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

        {variant === 'pricing' && icon && (
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${iconWrapperClass}`}
          >
            {icon}
          </div>
        )}

        {variant === 'stat' && (
          <>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
            )}
          </>
        )}

        {variant === 'feature' && (
          <>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </>
        )}

        {variant === 'value' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </>
        )}

        {variant === 'contact' && (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <p className="text-base font-semibold text-gray-900">{contact}</p>
          </>
        )}

        {variant === 'pricing' && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-6">{description}</p>

            <div className="mb-6">
              {price !== null ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      ${price}
                    </span>
                    <span className="text-gray-600">{priceLabel}</span>
                  </div>
                </div>
              ) : (
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Contact us
                </div>
              )}
            </div>

            {cta && (
              <button
                onClick={onCtaClick}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-6 ${
                  popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {cta}
              </button>
            )}

            {features && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  What's included:
                </p>
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {variant === 'language' && content}
      </div>
    </div>
  );
}
