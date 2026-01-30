'use client';

import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href?: string;
  color?: string;
}

export interface SocialLinksSectionProps {
  title: string;
  subtitle: string;
  socialLinks: SocialLink[];
  variant?: 'default' | 'compact';
}

export function SocialLinksSection({
  title,
  subtitle,
  socialLinks,
  variant = 'default',
}: SocialLinksSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const titleSize = variant === 'compact' ? 'text-xl' : 'text-2xl';
  const marginBottom = variant === 'compact' ? 'mb-6' : 'mb-8';

  return (
    <section>
      <Card
        className={`p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div
          className={`text-center ${marginBottom} transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h3 className={`${titleSize} font-bold text-gray-900 mb-2`}>
            {title}
          </h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.name}
                variant="outline"
                className={`flex items-center gap-3 bg-gray-50 hover:bg-brand-primary-light/10 border-gray-200 hover:border-brand-primary-light/30 px-6 py-3 h-auto rounded-xl font-medium text-gray-700 hover:text-brand-primary-light transition-all duration-300 hover:scale-110 hover:shadow-lg group ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? '0ms' : `${200 + idx * 100}ms`,
                }}
                asChild={!!link.href}
              >
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Icon
                      className={`w-5 h-5 ${link.color || ''} transition-transform duration-300 group-hover:rotate-12`}
                    />
                    {link.name}
                  </a>
                ) : (
                  <>
                    <Icon
                      className={`w-5 h-5 ${link.color || ''} transition-transform duration-300 group-hover:rotate-12`}
                    />
                    {link.name}
                  </>
                )}
              </Button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
