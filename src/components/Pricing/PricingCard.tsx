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
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
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
  isHovered = false,
  onHover,
}: PricingCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isHighlighted = recommended;
  const cardBg = isHighlighted
    ? 'bg-gradient-to-br from-[#4169E1] to-[#1e3a8a]'
    : 'bg-white';
  const titleColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const taglineColor = isHighlighted ? 'text-white/80' : 'text-gray-400';
  const priceColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const featureBg = isHighlighted
    ? 'bg-white/10 backdrop-blur-sm'
    : 'bg-gray-50';
  const featureTextColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const checkBgColor = isHighlighted ? 'bg-white/20' : 'bg-blue-50';
  const checkColor = isHighlighted ? 'text-white' : 'text-blue-600';
  const buttonBg = isHighlighted
    ? 'bg-white text-[#4169E1] hover:bg-gray-50'
    : 'bg-[#4169E1] text-white hover:bg-[#1e3a8a]';

  return (
    <div
      className={`${cardBg} rounded-3xl w-full max-w-[380px] p-8 flex flex-col relative border-2 ${
        isHighlighted
          ? 'border-transparent shadow-2xl scale-105 animate-fade-in-up'
          : isHovered
            ? 'border-blue-200 shadow-xl scale-[1.02]'
            : 'border-gray-100 shadow-lg hover:border-blue-100'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 ease-out`}
      style={{
        height: isHighlighted ? '700px' : '660px',
        ...(isHighlighted && {
          animation:
            'shimmer 3s ease-in-out infinite, float 6s ease-in-out infinite',
        }),
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {isHighlighted && (
        <>
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 rounded-3xl blur-xl opacity-30 animate-pulse-glow"
            style={{
              background: 'linear-gradient(45deg, #4169E1, #1e3a8a, #4169E1)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}
          />

          {/* Most Popular Badge with enhanced animation */}
          <div
            className="absolute -top-4 inset-x-0 mx-auto w-max bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-10"
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
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
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
                className={`font-semibold text-sm ${featureTextColor} transition-colors duration-300`}
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
