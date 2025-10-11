'use client';

import React from 'react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/30 to-brand-50/40" />

      {/* Large animated gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-primary) / 0.15) 0%, transparent 70%)',
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />

      <div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)',
          animation: 'float-slow 25s ease-in-out infinite reverse',
        }}
      />

      <div
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-primary-light) / 0.15) 0%, transparent 70%)',
          animation: 'float-slow 30s ease-in-out infinite',
        }}
      />

      {/* Medium floating orbs */}
      <div
        className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full opacity-20 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-primary) / 0.1) 0%, transparent 70%)',
          animation: 'float-medium 15s ease-in-out infinite',
        }}
      />

      <div
        className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] rounded-full opacity-15 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
          animation: 'float-medium 18s ease-in-out infinite reverse',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--brand-primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--brand-primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            hsl(var(--brand-primary) / 0.05) 35px,
            hsl(var(--brand-primary) / 0.05) 36px
          )`,
        }}
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, 0.4) 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
      `}</style>
    </div>
  );
}
