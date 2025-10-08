import { BaseCTA } from '@/src/components/Common';

export default function ContactCTA() {
  return (
    <BaseCTA
      variant="contact"
      title="Have a Question?"
      description="Check out our FAQ section for quick answers to common questions about our translation services."
      primaryButton={{
        text: 'Visit FAQ',
        href: '/support',
      }}
    />
  );
}
