import React from 'react';

interface BackgroundPatternProps {
  variant?: 'dots' | 'gradient-blobs';
  opacity?: number;
}

export default function BackgroundPattern({
  variant = 'dots',
  opacity = 0.02,
}: BackgroundPatternProps) {
  if (variant === 'gradient-blobs') {
    return (
      <div className="absolute inset-0" style={{ opacity }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/40 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4169E1 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
