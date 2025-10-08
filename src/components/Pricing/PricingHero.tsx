import { Star } from 'lucide-react';
import { PricingHeroProps } from '@/src/types/pricing';

export default function PricingHero({
  billingPeriod,
  onBillingPeriodChange,
}: PricingHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">
            Simple, Transparent Pricing
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Choose Your Perfect Plan
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          Start free, upgrade as you grow. No hidden fees, cancel anytime.
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm p-1 rounded-xl border border-white/20">
          <button
            onClick={() => onBillingPeriodChange('monthly')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all text-sm sm:text-base ${billingPeriod === 'monthly' ? 'bg-white text-blue-600 shadow-lg' : 'text-white hover:text-blue-100'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => onBillingPeriodChange('yearly')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all relative text-sm sm:text-base ${billingPeriod === 'yearly' ? 'bg-white text-blue-600 shadow-lg' : 'text-white hover:text-blue-100'}`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
