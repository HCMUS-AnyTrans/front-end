import type { Metadata } from 'next';
import SupportClient from './support-client';

export const metadata: Metadata = {
  title: 'Support Center - Anytrans',
  description:
    'Get help with your translation projects and find answers to common questions. Contact our support team for assistance.',
};

export default function SupportPage() {
  return <SupportClient />;
}
