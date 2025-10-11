import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BaseCTAProps {
  variant?: 'pricing' | 'about' | 'contact';
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export default function BaseCTA({
  variant = 'pricing',
  title,
  description,
  primaryButton,
  secondaryButton,
  className = '',
}: BaseCTAProps) {
  const getGradientClass = () => {
    switch (variant) {
      case 'pricing':
        return 'bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from';
      case 'about':
        return 'bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from';
      case 'contact':
        return 'bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from';
      default:
        return 'bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-from';
    }
  };

  const getTextColor = () => {
    return 'text-brand-100';
  };

  const getButtonColor = () => {
    return 'text-brand-primary-light';
  };

  const ButtonComponent = ({
    button,
    isSecondary = false,
  }: {
    button: typeof primaryButton;
    isSecondary?: boolean;
  }) => {
    const baseClass = isSecondary
      ? 'inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-primary-foreground border-2 border-white/30 px-8 py-4 rounded-xl font-semibold transition-all'
      : `inline-flex items-center gap-2 bg-card hover:bg-muted ${getButtonColor()} px-8 py-4 rounded-xl font-semibold transition-all shadow-lg`;

    const content = (
      <>
        {button.text}
        {!isSecondary && <ArrowRight className="w-5 h-5" />}
      </>
    );

    if (button.href) {
      return (
        <a href={button.href} className={baseClass}>
          {content}
        </a>
      );
    }

    return (
      <button
        onClick={button.onClick}
        className={`${baseClass} cursor-pointer`}
      >
        {content}
      </button>
    );
  };

  return (
    <section className={variant === 'pricing' ? 'mt-16' : ''}>
      <div
        className={`${getGradientClass()} rounded-3xl p-8 sm:p-12 text-center text-primary-foreground ${className}`}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
          <p className={`text-lg ${getTextColor()} mb-8`}>{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonComponent button={primaryButton} />
            {secondaryButton && (
              <ButtonComponent button={secondaryButton} isSecondary />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
