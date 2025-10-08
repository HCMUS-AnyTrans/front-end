import PricingPlanCard from './PricingPlanCard';
import { PricingPlansGridProps } from '@/src/types/pricing';

export default function PricingPlansGrid({
  plans,
  billingPeriod,
}: PricingPlansGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {plans.map((plan) => (
        <PricingPlanCard
          key={plan.name}
          plan={plan}
          billingPeriod={billingPeriod}
        />
      ))}
    </div>
  );
}
