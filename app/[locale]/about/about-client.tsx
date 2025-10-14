'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  AboutHero,
  AboutStory,
  AboutValues,
  AboutTimeline,
  AboutTeam,
  AboutCTA,
  AboutSocial,
} from '@/components/About';
import { socialLinks } from '@/lib/about-data';
import { Target, Globe } from 'lucide-react';

export default function AboutPageClient() {
  const t = useTranslations('about');

  const stats = [
    {
      number: t('hero.stats.languages.number'),
      label: t('hero.stats.languages.label'),
    },
    {
      number: t('hero.stats.users.number'),
      label: t('hero.stats.users.label'),
    },
    {
      number: t('hero.stats.documents.number'),
      label: t('hero.stats.documents.label'),
    },
    {
      number: t('hero.stats.accuracy.number'),
      label: t('hero.stats.accuracy.label'),
    },
  ];

  const mission = {
    icon: Target,
    title: t('mission.title'),
    description: t('mission.description'),
  };

  const vision = {
    icon: Globe,
    title: t('vision.title'),
    description: t('vision.description'),
  };

  const coreValues = [
    {
      icon: Target,
      title: t('values.precision.title'),
      description: t('values.precision.description'),
      color: 'blue' as const,
    },
    {
      icon: Globe,
      title: t('values.speed.title'),
      description: t('values.speed.description'),
      color: 'purple' as const,
    },
    {
      icon: Target,
      title: t('values.security.title'),
      description: t('values.security.description'),
      color: 'green' as const,
    },
    {
      icon: Globe,
      title: t('values.userCentric.title'),
      description: t('values.userCentric.description'),
      color: 'pink' as const,
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: t('timeline.2021.title'),
      description: t('timeline.2021.description'),
    },
    {
      year: '2022',
      title: t('timeline.2022.title'),
      description: t('timeline.2022.description'),
    },
    {
      year: '2023',
      title: t('timeline.2023.title'),
      description: t('timeline.2023.description'),
    },
    {
      year: '2024',
      title: t('timeline.2024.title'),
      description: t('timeline.2024.description'),
    },
  ];

  const team = [
    {
      name: t('team.minhNguyen.name'),
      role: t('team.minhNguyen.role'),
      image: '/MinhNguyen01.jpg',
      bio: t('team.minhNguyen.bio'),
    },
    {
      name: t('team.trongNhan.name'),
      role: t('team.trongNhan.role'),
      image: '/TrongNhan01.jpg',
      bio: t('team.trongNhan.bio'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <AboutHero stats={stats} />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <AboutStory mission={mission} vision={vision} />
          <AboutValues values={coreValues} />
          <AboutTimeline milestones={milestones} />
          <AboutTeam team={team} />
          <AboutCTA />
          <AboutSocial socialLinks={socialLinks} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
