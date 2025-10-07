import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import Statistics from '@/src/components/Statistics';
import FeatureGrid from '@/src/components/Home/FeatureGrid';
import About from '@/src/components/About';
import PricingTabs from '@/src/components/Home/PricingTabs';
import ReviewSection from '@/src/components/Home/ReviewSection';
import Footer from '@/src/components/Footer';
import BackgroundDecorations from '@/src/components/Common/BackgroundDecorations';

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
