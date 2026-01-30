'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  review: string;
  metadata: string;
  icon: React.ReactNode;
}

export function ReviewCard({
  name,
  role,
  company,
  rating,
  review,
  metadata,
  icon,
}: ReviewCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="group bg-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300 ease-out border border-border shadow-lg hover:shadow-2xl hover:border-brand-300 hover:-translate-y-2 hover:scale-[1.02] will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-6 right-6 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-12 transition-all duration-300">
        <Quote size={48} className="text-brand-100" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary-light to-brand-primary-dark flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
              <div className="text-primary">{icon}</div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg text-foreground truncate mb-1">
              {name}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {role} at{' '}
              <span className="font-semibold text-foreground">{company}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`transition-all duration-300 ${
                  i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {rating}.0
          </span>
        </div>

        <div className="flex-1 mb-5">
          <p className="text-foreground leading-relaxed text-[15px]">
            &quot;{review}&quot;
          </p>
        </div>

        <div className="pt-4 border-t border-border group-hover:border-brand-100 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors duration-300" />
            <p className="text-sm text-muted-foreground font-medium">
              {metadata}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
