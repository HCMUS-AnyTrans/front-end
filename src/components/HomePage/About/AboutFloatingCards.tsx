'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { FloatingCard } from './FloatingCard';

export function AboutFloatingCards() {
  const t = useTranslations('home.about');

  const cards = [
    {
      icon: <Users size={28} strokeWidth={2} />,
      category: t('cards.document.category'),
      title: t('cards.document.title'),
      bgColor: 'bg-[#80eac2]',
      delay: 0,
      position: 'top-8 right-0 w-[320px]',
    },
    {
      icon: <Users size={28} strokeWidth={2} />,
      category: t('cards.subtitle.category'),
      title: t('cards.subtitle.title'),
      bgColor: 'bg-[#7d87ff]',
      delay: 200,
      position: 'top-1/2 -translate-y-1/2 left-8 w-[320px]',
    },
    {
      icon: <Users size={28} strokeWidth={2} />,
      category: t('cards.glossary.category'),
      title: t('cards.glossary.title'),
      bgColor: 'bg-[#f3aa01]',
      delay: 400,
      position: 'bottom-8 right-4 w-[300px]',
    },
  ];

  return (
    <div className="relative w-full lg:w-auto flex items-center justify-center">
      <div className="relative w-full max-w-md lg:w-[450px] h-[500px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-brand-200/30 to-brand-50/50 blur-2xl" />

        {cards.map((card, index) => (
          <div
            key={index}
            className={`absolute ${card.position} animate-float`}
            style={{
              animation: 'float 6s ease-in-out infinite',
              animationDelay: `${card.delay}ms`,
              zIndex: index === 1 ? 10 : 'auto',
            }}
          >
            <FloatingCard
              icon={card.icon}
              category={card.category}
              title={card.title}
              bgColor={card.bgColor}
              delay={card.delay}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
