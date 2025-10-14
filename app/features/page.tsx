import type { Metadata } from 'next';
import FeaturesClient from './features-client';

export const metadata: Metadata = {
  title: 'Features | Anytrans',
  description:
    'Explore Anytrans powerful translation features - document translation, subtitle translation, and more professional tools for global content.',
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
