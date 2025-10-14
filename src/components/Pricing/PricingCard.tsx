'use client';

import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
}

export default function PricingCard({
  name,
  tagline,
  price,
  billing,
  features,
  cta,
  recommended = false,
  contact = false,
}: PricingCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isHighlighted = recommended;
  const cardBg = isHighlighted
    ? 'bg-gradient-to-br from-gradient-from to-gradient-to'
    : 'bg-card';
  const titleColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';
  const taglineColor = isHighlighted
    ? 'text-primary-foreground/80'
    : 'text-muted-foreground';
  const priceColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';
  const featureBg = isHighlighted ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted';
  const featureTextColor = isHighlighted
    ? 'text-primary-foreground'
    : 'text-foreground';
  const checkBgColor = isHighlighted ? 'bg-white/20' : 'bg-brand-50';
  const checkColor = isHighlighted ? 'text-primary-foreground' : 'text-primary';
  const buttonBg = isHighlighted
    ? 'bg-card text-brand-primary-light hover:bg-muted'
    : 'bg-brand-primary-light text-primary-foreground hover:bg-brand-primary-dark';

  return (
    <div
      className={`group ${cardBg} rounded-3xl w-full max-w-[380px] p-8 flex flex-col relative border-2 transition-all duration-300 ease-out will-change-transform ${
        isHighlighted
          ? 'border-transparent shadow-2xl animate-fade-in-up hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:scale-[1.02] hover:-translate-y-2'
          : 'border-border shadow-lg hover:border-[#4169E1]/50 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        height: isHighlighted ? '700px' : '660px',
        ...(isHighlighted && {
          animation:
            'shimmer 3s ease-in-out infinite, float 6s ease-in-out infinite',
        }),
      }}
    >
      {isHighlighted && (
        <>
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse-glow"
            style={{
              background:
                'linear-gradient(45deg, hsl(var(--gradient-from)), hsl(var(--gradient-to)), hsl(var(--gradient-from)))',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}
          />

          {/* Most Popular Badge with enhanced animation */}
          <div
            className="absolute -top-4 inset-x-0 mx-auto w-max bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{
              backgroundSize: '200% auto',
              animation:
                'gradient-x 3s linear infinite, bounce-subtle 2s ease-in-out infinite',
            }}
          >
            ✨ Most Popular
          </div>
        </>
      )}

      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3
            className={`font-bold text-3xl ${titleColor} transition-colors duration-300`}
          >
            {name}
          </h3>
          <p
            className={`text-base ${taglineColor} max-w-[280px] transition-colors duration-300`}
          >
            {tagline}
          </p>

          {contact ? (
            <div
              className={`text-4xl font-bold ${priceColor} mt-4 transition-colors duration-300`}
            >
              Contact us
            </div>
          ) : (
            <div className="flex items-baseline mt-4">
              <span
                className={`font-semibold text-2xl ${priceColor} transition-colors duration-300`}
              >
                $
              </span>
              <span
                className={`font-bold text-6xl ${priceColor} ml-2 transition-colors duration-300`}
              >
                {price}
              </span>
              <span
                className={`text-lg ${taglineColor} ml-2 transition-colors duration-300`}
              >
                {billing}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${featureBg} rounded-2xl p-6 flex-grow flex flex-col transition-all duration-300`}
      >
        <div className="flex flex-col gap-5 flex-grow mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 transition-all duration-300"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkBgColor}`}
              >
                <Check
                  size={14}
                  className={`${checkColor} transition-colors duration-300`}
                  strokeWidth={3}
                />
              </div>
              <span
                className={`font-medium text-sm ${featureTextColor} transition-colors duration-300`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`${buttonBg} rounded-xl h-14 w-full font-bold text-base transition-all duration-300 hover:scale-[1.05] hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer`}
        >
          {cta}
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
