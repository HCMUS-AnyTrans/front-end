'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface ReviewStatsProps {
  ratingValue: string;
  ratingLabel: string;
  usersValue: string;
  usersLabel: string;
  projectsValue: string;
  projectsLabel: string;
}

export function ReviewStats({
  ratingValue,
  ratingLabel,
  usersValue,
  usersLabel,
  projectsValue,
  projectsLabel,
}: ReviewStatsProps) {
  return (
    <div className="flex items-center justify-center gap-12 mt-10">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-1">
          {ratingValue}
        </div>
        <div className="text-sm text-muted-foreground">{ratingLabel}</div>
      </div>
      <div className="w-px h-12 bg-border" />
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-1">{usersValue}</div>
        <div className="text-sm text-muted-foreground">{usersLabel}</div>
      </div>
      <div className="w-px h-12 bg-border" />
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-1">
          {projectsValue}
        </div>
        <div className="text-sm text-muted-foreground">{projectsLabel}</div>
      </div>
    </div>
  );
}

export function ReviewSectionHeader() {
  const t = useTranslations('home.reviews');

  return (
    <div className="text-center mb-16">
      <h2 className="font-bold text-4xl lg:text-6xl leading-tight text-foreground mb-6">
        {t('header.title')}
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t('header.description')}
      </p>

      <ReviewStats
        ratingValue={t('stats.rating.value')}
        ratingLabel={t('stats.rating.label')}
        usersValue={t('stats.users.value')}
        usersLabel={t('stats.users.label')}
        projectsValue={t('stats.projects.value')}
        projectsLabel={t('stats.projects.label')}
      />
    </div>
  );
}
