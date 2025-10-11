import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-foreground font-inter leading-[1.3] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base lg:text-lg text-muted-foreground font-nunito max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
