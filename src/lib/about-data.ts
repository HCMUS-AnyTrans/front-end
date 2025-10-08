import {
  Target,
  Zap,
  Shield,
  Heart,
  Globe,
  Calendar,
  Mail,
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react';
import {
  Stat,
  CoreValue,
  Milestone,
  TeamMember,
  SocialLink,
} from '@/src/types/about';

export const stats: Stat[] = [
  { number: '100+', label: 'Languages Supported' },
  { number: '50K+', label: 'Active Users' },
  { number: '1M+', label: 'Documents Translated' },
  { number: '98%', label: 'Accuracy Rate' },
];

export const coreValues: CoreValue[] = [
  {
    icon: Target,
    title: 'Precision',
    description:
      'We deliver accurate translations that preserve meaning and context across languages.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Speed',
    description:
      'Lightning-fast translation without compromising quality, powered by advanced AI.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Your documents are protected with enterprise-grade encryption and privacy.',
    color: 'green',
  },
  {
    icon: Heart,
    title: 'User-Centric',
    description:
      'Built with simplicity and user experience at the heart of every feature.',
    color: 'pink',
  },
];

export const milestones: Milestone[] = [
  {
    year: '2021',
    title: 'Company Founded',
    description:
      'AnyTrans was born from a vision to make translation accessible to everyone.',
  },
  {
    year: '2022',
    title: '10K+ Users',
    description:
      'Reached our first major milestone with users from 50+ countries.',
  },
  {
    year: '2023',
    title: 'AI Integration',
    description:
      'Launched advanced AI-powered translation engine with 98% accuracy.',
  },
  {
    year: '2024',
    title: 'Global Expansion',
    description:
      'Expanded to support 100+ languages and opened offices in 3 continents.',
  },
];

export const team: TeamMember[] = [
  {
    name: 'Minh Nguyen',
    role: 'CEO & Founder',
    image: '/MinhNguyen01.jpg',
    bio: 'Former Google Translate engineer with 10+ years in NLP',
  },
  {
    name: 'Trong Nhan',
    role: 'CTO',
    image: '/TrongNhan01.jpg',
    bio: 'AI researcher specializing in machine translation systems',
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'Twitter', icon: Twitter },
  { name: 'LinkedIn', icon: Linkedin },
  { name: 'GitHub', icon: Github },
];
