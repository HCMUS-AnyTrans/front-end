'use client';

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full py-8 lg:py-12 overflow-hidden">
      {/* Background Decorations with animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            opacity: isVisible ? 1 : 0,
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: isVisible ? '0ms' : '200ms',
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left side - Content */}
        <div className="flex flex-col gap-6 sm:gap-7 max-w-[625px] relative z-10 text-center lg:text-left">
          <div className="relative">
            <h1
              className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[80px] leading-tight sm:leading-tight lg:leading-[1.1] xl:leading-[90px] text-black transition-all duration-1000 ease-out"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
              }}
            >
              We&apos;re here to
              <br />
              enhance your{' '}
              <span
                className="text-brand-primary inline-block transition-all duration-1000 ease-out bg-accent-foreground/20 px-2 py-1 rounded-md"
                style={{
                  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '0ms' : '200ms',
                }}
              >
                translation
              </span>
            </h1>
          </div>

          <p
            className=" text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground max-w-[448px] mx-auto lg:mx-0 transition-all duration-1000 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: isVisible ? '0ms' : '300ms',
            }}
          >
            Dịch thông minh hơn, không khó hơn. AnyTrans mang đến cho bạn tốc
            độ, độ chính xác và các tính năng mới nhất để quản lý mọi nội dung
            một cách đơn giản
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 transition-all duration-1000 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: isVisible ? '0ms' : '500ms',
            }}
          >
            <Button variant="gradient-primary" size="hero">
              Free Trial
            </Button>

            <Button variant="outline-gradient" size="hero" className="group">
              <Play
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              View Demo
            </Button>
          </div>
        </div>

        {/* Right side - Banner Image - Hidden on mobile */}
        <div
          className="hidden lg:flex flex-shrink-0 w-full lg:w-auto lg:max-w-[500px] xl:max-w-[600px] transition-all duration-1000 ease-out"
          style={{
            transform: isVisible
              ? 'translateX(0) scale(1)'
              : 'translateX(50px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: isVisible ? '0ms' : '600ms',
          }}
        >
          <img
            src="/Banner-Homepage.svg"
            alt="AnyTrans Translation Services Banner"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
