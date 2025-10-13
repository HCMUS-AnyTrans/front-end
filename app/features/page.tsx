import type { Metadata } from 'next';
import FeaturesClient from './features-client';

export const metadata: Metadata = {
  title: 'Features | AnyTrans',
  description:
    'Explore AnyTrans powerful translation features - document translation, subtitle translation, and more professional tools for global content.',
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
