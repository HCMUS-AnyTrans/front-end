import { BenefitsSection } from './components/benefits-section';
import { FaqCtaSection } from './components/faq-cta-section';
import { HeroSection } from './components/hero-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { PricingSection } from './components/pricing-section';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqCtaSection />
      </main>
    </div>
  );
}
