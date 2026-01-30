'use client';

import React from 'react';
import { AboutContent } from './AboutContent';
import { AboutFloatingCards } from './AboutFloatingCards';

export default function About() {
  return (
    <section className="w-full py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-50 to-brand-100" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-100/40 to-brand-200/60 blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <AboutContent />
          <AboutFloatingCards />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
