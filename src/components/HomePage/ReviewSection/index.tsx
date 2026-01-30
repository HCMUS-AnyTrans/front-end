'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Video, Globe } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { ReviewSectionHeader } from './ReviewStats';

interface Review {
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  metadata: string;
  icon: React.ReactNode;
}

export default function ReviewSection() {
  const t = useTranslations('home.reviews');

  const reviews = useMemo(
    (): Review[] => [
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
    ],
    [t]
  );

  return (
    <section className="w-full py-20 bg-gradient-to-br from-muted via-accent/30 to-accent/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-100/40 to-accent/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/40 to-brand-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewSectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
