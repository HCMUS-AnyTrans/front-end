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
  iconWrapperClass = 'bg-brand-100',
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
        return 'bg-card rounded-xl p-6 border border-border';
      case 'feature':
        return 'bg-card rounded-xl p-6 border border-border';
      case 'language':
        return 'bg-card rounded-2xl border border-border p-6';
      case 'pricing':
        return `bg-card rounded-2xl overflow-hidden transition-all ${
          popular
            ? 'border-2 border-brand-primary-light shadow-2xl md:scale-105'
            : 'border border-border shadow-lg hover:shadow-xl'
        }`;
      case 'value':
      case 'contact':
        return 'bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all';
      default:
        return 'bg-card rounded-xl border border-border';
    }
  };

  const getColorClasses = () => {
    const colorMap: Record<string, string> = {
      blue: 'bg-brand-50 text-brand-primary',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-accent/50 text-accent-foreground',
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
        <div className="bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from text-primary-foreground text-center py-2 text-sm font-semibold">
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
              <h3 className="text-lg font-bold text-foreground mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
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
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
            )}
          </>
        )}

        {variant === 'feature' && (
          <>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </>
        )}

        {variant === 'value' && (
          <>
            <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {description}
            </p>
          </>
        )}

        {variant === 'contact' && (
          <>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <p className="text-base font-semibold text-foreground">{contact}</p>
          </>
        )}

        {variant === 'pricing' && (
          <>
            <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{description}</p>

            <div className="mb-6">
              {price !== null ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground">
                      ${price}
                    </span>
                    <span className="text-muted-foreground">{priceLabel}</span>
                  </div>
                </div>
              ) : (
                <div className="text-3xl sm:text-4xl font-bold text-foreground">
                  Contact us
                </div>
              )}
            </div>

            {cta && (
              <button
                onClick={onCtaClick}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-6 cursor-pointer ${
                  popular
                    ? 'bg-gradient-to-r from-gradient-from to-gradient-to hover:from-gradient-to hover:to-gradient-from text-primary-foreground shadow-lg'
                    : 'bg-muted hover:bg-accent text-foreground'
                }`}
              >
                {cta}
              </button>
            )}

            {features && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground mb-4">
                  What's included:
                </p>
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-border flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}
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
