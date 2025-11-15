'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star, FileText, Video, Globe, Quote } from 'lucide-react';

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

function ReviewCard({
  name,
  role,
  company,
  avatar,
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
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative quote icon */}
      <div className="absolute top-6 right-6 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-12 transition-all duration-300">
        <Quote size={48} className="text-brand-100" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with avatar and info */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary-light to-brand-primary-dark flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              {initials}
            </div>
            {/* Icon badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
              <div className="text-primary">{icon}</div>
            </div>
          </div>

          {/* User info */}
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

        {/* Rating */}
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

        {/* Review text */}
        <div className="flex-1 mb-5">
          <p className="text-foreground leading-relaxed text-[15px]">
            &quot;{review}&quot;
          </p>
        </div>

        {/* Metadata footer */}
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

export default function ReviewSection() {
  const t = useTranslations('home.reviews');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const reviews = [
    {
      name: t('testimonials.sarah.name'),
      role: t('testimonials.sarah.role'),
      company: t('testimonials.sarah.company'),
      rating: 5,
      review: t('testimonials.sarah.review'),
      metadata: t('testimonials.sarah.metadata'),
      icon: <FileText size={14} strokeWidth={2.5} />,
    },
    {
      name: t('testimonials.miguel.name'),
      role: t('testimonials.miguel.role'),
      company: t('testimonials.miguel.company'),
      rating: 5,
      review: t('testimonials.miguel.review'),
      metadata: t('testimonials.miguel.metadata'),
      icon: <Video size={14} strokeWidth={2.5} />,
    },
    {
      name: t('testimonials.aisha.name'),
      role: t('testimonials.aisha.role'),
      company: t('testimonials.aisha.company'),
      rating: 4,
      review: t('testimonials.aisha.review'),
      metadata: t('testimonials.aisha.metadata'),
      icon: <Globe size={14} strokeWidth={2.5} />,
    },
    {
      name: t('testimonials.david.name'),
      role: t('testimonials.david.role'),
      company: t('testimonials.david.company'),
      rating: 5,
      review: t('testimonials.david.review'),
      metadata: t('testimonials.david.metadata'),
      icon: <FileText size={14} strokeWidth={2.5} />,
    },
    {
      name: t('testimonials.emma.name'),
      role: t('testimonials.emma.role'),
      company: t('testimonials.emma.company'),
      rating: 5,
      review: t('testimonials.emma.review'),
      metadata: t('testimonials.emma.metadata'),
      icon: <Video size={14} strokeWidth={2.5} />,
    },
    {
      name: t('testimonials.james.name'),
      role: t('testimonials.james.role'),
      company: t('testimonials.james.company'),
      rating: 4,
      review: t('testimonials.james.review'),
      metadata: t('testimonials.james.metadata'),
      icon: <Globe size={14} strokeWidth={2.5} />,
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-muted via-accent/30 to-accent/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-100/40 to-accent/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/40 to-brand-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-6xl leading-tight text-foreground mb-6">
            {t('header.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('header.description')}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {t('stats.rating.value')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.rating.label')}
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {t('stats.users.value')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.users.label')}
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {t('stats.projects.value')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.projects.label')}
              </div>
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
