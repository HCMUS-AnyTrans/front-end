'use client';

import React, { memo, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface HeroStat {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface PageHeroProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: ReactNode;
  description: string;
  stats?: HeroStat[];
  variant?: 'gradient' | 'light';
  gradientDirection?: 'br' | 'r';
  children?: ReactNode;
}

const PageHero = memo(function PageHero({
  badge,
  title,
  description,
  stats,
  variant = 'gradient',
  gradientDirection = 'br',
  children,
}: PageHeroProps) {
  const isGradient = variant === 'gradient';
  const gradientClass =
    gradientDirection === 'br'
      ? 'from-brand-primary-light via-[#1e3a8a] to-brand-primary-light'
      : 'from-brand-primary-light via-[#1e3a8a] to-brand-primary-light';

  return (
    <section
      className={`relative w-full overflow-hidden ${
        isGradient
          ? `bg-gradient-to-${gradientDirection} ${gradientClass} text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16`
          : 'bg-white border-b border-gray-200 py-20 sm:py-24'
      }`}
    >
      {/* Animated background elements for gradient variant */}
      {isGradient && (
        <>
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ animation: 'float-slow 10s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ animation: 'float-slow 12s ease-in-out infinite reverse' }}
          />
        </>
      )}

      <div
        className={`relative z-10 mx-auto ${
          isGradient
            ? 'max-w-7xl text-center'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div className={isGradient ? '' : 'max-w-4xl mx-auto text-center'}>
          {/* Badge */}
          {badge && (
            <div
              className={`inline-flex items-center gap-2 mb-4 sm:mb-6 animate-fade-in-scale ${
                isGradient
                  ? 'bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'
                  : ''
              }`}
            >
              {badge.icon && (
                <badge.icon
                  className={`w-4 h-4 ${isGradient ? 'animate-pulse' : ''}`}
                />
              )}
              <span
                className={`text-sm font-${isGradient ? 'medium' : 'bold'} ${
                  isGradient
                    ? ''
                    : 'tracking-wider uppercase text-brand-primary-light'
                }`}
              >
                {badge.text}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className={`font-bold mb-4 sm:mb-6 animate-fade-in-up ${
              isGradient
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight'
            }`}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={`animate-fade-in-up-delay-300 ${
              isGradient
                ? 'text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto'
                : 'text-xl text-gray-600 max-w-2xl mx-auto mb-12'
            }`}
          >
            {description}
          </p>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              className={`mt-8 sm:mt-12 animate-fade-in-up-delay-500 ${
                isGradient
                  ? 'grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto'
                  : 'grid grid-cols-3 gap-8 max-w-2xl mx-auto'
              }`}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={
                      isGradient
                        ? `bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 transition-all duration-500 hover:shadow-lg hover:scale-102 hover:bg-white/20 animate-stagger-${index + 3}`
                        : 'text-center'
                    }
                  >
                    {Icon && !isGradient && (
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                        <Icon className="w-6 h-6 text-brand-primary-light" />
                      </div>
                    )}
                    <p
                      className={
                        isGradient
                          ? 'text-2xl sm:text-3xl font-bold mb-1'
                          : 'text-3xl font-bold text-gray-900 mb-1'
                      }
                    >
                      {stat.value}
                    </p>
                    <p
                      className={
                        isGradient
                          ? 'text-xs sm:text-sm text-blue-100'
                          : 'text-sm text-gray-600'
                      }
                    >
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Additional children */}
          {children}
        </div>
      </div>

      {/* Float animation keyframes for gradient variant */}
      {isGradient && (
        <style jsx>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(30px, -30px);
            }
          }
        `}</style>
      )}
    </section>
  );
});

export default PageHero;
