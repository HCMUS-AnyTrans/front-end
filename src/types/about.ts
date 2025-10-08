import { LucideIcon } from 'lucide-react';

export interface Stat {
  number: string;
  label: string;
}

export interface CoreValue {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
}

export interface AboutHeroProps {
  stats: Stat[];
}

export interface AboutStoryProps {
  mission: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  vision: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
}

export interface AboutValuesProps {
  values: CoreValue[];
}

export interface AboutTimelineProps {
  milestones: Milestone[];
}

export interface AboutTeamProps {
  team: TeamMember[];
}

export interface AboutSocialProps {
  socialLinks: SocialLink[];
}
