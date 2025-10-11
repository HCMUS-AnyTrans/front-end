'use client';

import React, { useState } from 'react';
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
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
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
  isHovered = false,
  onHover,
}: ReviewCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div
      className={`bg-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-500 ease-out border ${
        isHovered
          ? 'border-brand-300 shadow-2xl -translate-y-2 scale-[1.02]'
          : 'border-border shadow-lg hover:shadow-xl'
      }`}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Background gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-brand-50/50 to-accent/50 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Decorative quote icon */}
      <div
        className={`absolute top-6 right-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-50'
        }`}
      >
        <Quote size={48} className="text-brand-100" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with avatar and info */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary-light to-brand-primary-dark flex items-center justify-center text-white font-bold text-lg transition-all duration-500 ${
                isHovered ? 'scale-110 shadow-lg' : ''
              }`}
            >
              {initials}
            </div>
            {/* Icon badge */}
            <div
              className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card flex items-center justify-center shadow-md transition-all duration-500 ${
                isHovered ? 'scale-110' : ''
              }`}
            >
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
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
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
            "{review}"
          </p>
        </div>

        {/* Metadata footer */}
        <div
          className={`pt-4 border-t transition-colors duration-300 ${
            isHovered ? 'border-brand-100' : 'border-border'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isHovered ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            />
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      rating: 5,
      review:
        'AnyTrans has revolutionized how we handle multilingual content. The document translation feature maintains perfect formatting, and the quality is outstanding.',
      metadata: 'Translated 50+ marketing documents',
      icon: <FileText size={14} strokeWidth={2.5} />,
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Content Creator',
      company: 'MediaFlow',
      rating: 5,
      review:
        'The subtitle translation feature is a game-changer. Perfect timing synchronization and the interface is incredibly intuitive. Highly recommended!',
      metadata: 'Processed 30+ video projects',
      icon: <Video size={14} strokeWidth={2.5} />,
    },
    {
      name: 'Aisha Patel',
      role: 'Project Manager',
      company: 'GlobalReach',
      rating: 4,
      review:
        'Excellent platform for our international projects. The speed and accuracy of translations have improved our workflow significantly.',
      metadata: 'Managed translations for 15+ languages',
      icon: <Globe size={14} strokeWidth={2.5} />,
    },
    {
      name: 'David Chen',
      role: 'Technical Writer',
      company: 'DevDocs',
      rating: 5,
      review:
        'As a technical writer, I need precise translations. AnyTrans delivers consistently high-quality results while preserving technical terminology.',
      metadata: 'Translated 100+ technical documents',
      icon: <FileText size={14} strokeWidth={2.5} />,
    },
    {
      name: 'Emma Thompson',
      role: 'E-learning Specialist',
      company: 'EduTech',
      rating: 5,
      review:
        'The platform makes it easy to localize our educational content. The user interface is clean and the results are always professional.',
      metadata: 'Localized 25+ courses',
      icon: <Video size={14} strokeWidth={2.5} />,
    },
    {
      name: 'James Wilson',
      role: 'Marketing Coordinator',
      company: 'StartupHub',
      rating: 4,
      review:
        'Great value for money. The personal plan is perfect for our startup needs, and the translation quality exceeds expectations.',
      metadata: 'Translated content for 8+ markets',
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
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust AnyTrans for their
            translation needs
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">4.9</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              {...review}
              isHovered={hoveredCard === index}
              onHover={(hovered) => setHoveredCard(hovered ? index : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
