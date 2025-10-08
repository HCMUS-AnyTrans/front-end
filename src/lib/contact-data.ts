import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Headphones,
  Users,
  Globe,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Youtube,
} from 'lucide-react';
import { ContactMethod, Office, SocialLink, Reason } from '@/src/types/contact';

export const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Our team will respond within 24 hours',
    contact: 'support@anytrans.com',
    color: 'blue',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 9am to 6pm',
    contact: '+1 (555) 123-4567',
    color: 'green',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Available 24/7 for instant support',
    contact: 'Start Chat',
    color: 'purple',
  },
];

export const offices: Office[] = [
  {
    city: 'San Francisco',
    country: 'USA',
    address: '123 Market Street, Suite 500',
    zipcode: 'CA 94103',
  },
  {
    city: 'London',
    country: 'UK',
    address: '45 Kings Road, Chelsea',
    zipcode: 'SW3 4ND',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Marina Boulevard #28-00',
    zipcode: '018989',
  },
];

export const socialLinks: SocialLink[] = [
  { icon: Twitter, name: 'Twitter', url: '#', color: 'text-blue-400' },
  { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'text-blue-600' },
  { icon: Facebook, name: 'Facebook', url: '#', color: 'text-blue-500' },
  { icon: Instagram, name: 'Instagram', url: '#', color: 'text-pink-500' },
  { icon: Github, name: 'GitHub', url: '#', color: 'text-gray-700' },
  { icon: Youtube, name: 'YouTube', url: '#', color: 'text-red-600' },
];

export const reasons: Reason[] = [
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Multilingual support staff',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Offices in 3 continents',
  },
];
