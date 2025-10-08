import { BaseCTA } from '@/src/components/Common';

export default function AboutCTA() {
  return (
    <BaseCTA
      variant="about"
      title="Ready to Break Language Barriers?"
      description="Join thousands of users who trust AnyTrans for their translation needs. Start translating documents today."
      primaryButton={{
        text: 'Get Started Free',
        href: '/signup',
      }}
      secondaryButton={{
        text: 'Contact Sales',
        href: '/contact',
      }}
    />
  );
}
