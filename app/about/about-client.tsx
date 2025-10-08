import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import {
  AboutHero,
  AboutStory,
  AboutValues,
  AboutTimeline,
  AboutTeam,
  AboutCTA,
  AboutSocial,
} from '@/src/components/About';
import {
  stats,
  coreValues,
  milestones,
  team,
  socialLinks,
} from '@/src/lib/about-data';
import { Target, Globe } from 'lucide-react';

export default function AboutPageClient() {
  const mission = {
    icon: Target,
    title: 'Our Mission',
    description:
      'To democratize professional translation services by leveraging cutting-edge AI technology, making it fast, accurate, and accessible to businesses and individuals worldwide. We believe that language should never be a barrier to opportunity, knowledge, or connection.',
  };

  const vision = {
    icon: Globe,
    title: 'Our Vision',
    description:
      "To create a world where language differences don't limit human potential. We envision a future where everyone can communicate seamlessly across borders, cultures, and languages, fostering global collaboration and understanding through innovative translation technology.",
  };

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
