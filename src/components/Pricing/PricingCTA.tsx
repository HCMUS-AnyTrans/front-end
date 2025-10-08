import { BaseCTA } from '@/src/components/Common';

export default function PricingCTA() {
  return (
    <BaseCTA
      variant="pricing"
      title="Still have questions?"
      description="Our team is here to help you find the perfect plan for your needs."
      primaryButton={{
        text: 'Contact Sales',
        href: '/contact',
      }}
      secondaryButton={{
        text: 'Schedule Demo',
      }}
    />
  );
}
