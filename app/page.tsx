import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { BackgroundDecorations } from '@/src/components/Common';
import { Hero, Statistics, About } from '@/src/components/HomePage';
import { FeatureGrid, PricingTabs, ReviewSection } from '@/src/components/Home';

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
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
