import { BaseCard } from '@/src/components/Common';
import { PricingPlanCardProps } from '@/src/types/pricing';

export default function PricingPlanCard({
  plan,
  billingPeriod,
}: PricingPlanCardProps) {
  const price = plan.customPricing
    ? null
    : plan.price === 0
      ? 0
      : billingPeriod === 'monthly'
        ? plan.monthlyPrice
        : plan.yearlyPrice;

  const Icon = plan.icon;

  return (
    <BaseCard
      variant="pricing"
      icon={<Icon className={`w-7 h-7 ${plan.iconColor}`} />}
      iconWrapperClass={plan.iconBg}
      title={plan.name}
      description={plan.tagline}
      popular={plan.popular}
      price={price}
      priceLabel={`/${billingPeriod === 'monthly' ? 'month' : 'year'}`}
      cta={plan.cta}
      features={plan.features}
      className={plan.popular ? 'md:scale-105' : ''}
    />
  );
}
