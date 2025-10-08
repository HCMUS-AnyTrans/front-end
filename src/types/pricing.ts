import { LucideIcon } from 'lucide-react';

export type BillingPeriod = 'monthly' | 'yearly';
export type PlanTab = 'personal' | 'enterprise';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  price?: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  customPricing?: boolean;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingHeroProps {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange: (period: BillingPeriod) => void;
}

export interface PricingTabsProps {
  activeTab: PlanTab;
  onTabChange: (tab: PlanTab) => void;
}

export interface PricingPlanCardProps {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
}

export interface PricingPlansGridProps {
  plans: PricingPlan[];
  billingPeriod: BillingPeriod;
}

export interface PricingFAQProps {
  faqs: FAQItem[];
  openIndex: number | null;
  onToggle: (index: number | null) => void;
}
