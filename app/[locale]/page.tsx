import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackgroundDecorations } from '@/components/Common';
import {
  FeatureGrid,
  PricingTabs,
  ReviewSection,
  Hero,
  Statistics,
  About,
} from '@/components/HomePage';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white flex flex-col min-h-screen">
      <BackgroundDecorations />

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header />
        <main className="flex-1">
          <Hero />
          <Statistics />
          <FeatureGrid />
          <About />
          <PricingTabs />
          <ReviewSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
