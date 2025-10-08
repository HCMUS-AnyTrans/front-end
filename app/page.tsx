import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { BackgroundDecorations } from '@/src/components/Common';
import {
  FeatureGrid,
  PricingTabs,
  ReviewSection,
  Hero,
  Statistics,
  About,
} from '@/src/components/HomePage';

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white flex flex-col min-h-screen overflow-hidden">
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
