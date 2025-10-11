import { Sparkles, Zap, Shield, Users, Crown } from 'lucide-react';
import { PricingPlan, FAQItem } from '@/types/pricing';

export const personalPlans: PricingPlan[] = [
  {
    name: 'Free',
    tagline: 'Perfect for trying out AnyTrans',
    price: 0,
    icon: Sparkles,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-100',
    features: [
      { text: 'Up to 5 document translations per month', included: true },
      { text: 'Basic document formats (PDF, DOCX, TXT)', included: true },
      { text: '10+ supported languages', included: true },
      { text: 'Standard translation quality', included: true },
      { text: 'Email support', included: true },
      { text: 'Translation history', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Pro',
    tagline: 'For professionals and small teams',
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Zap,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    features: [
      { text: 'Unlimited document translations', included: true },
      { text: 'All document formats supported', included: true },
      { text: '50+ supported languages', included: true },
      { text: 'High-quality AI translations', included: true },
      { text: 'Subtitle translation included', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Translation history & management', included: true },
      { text: 'API access (100 requests/day)', included: true },
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
];

export const enterprisePlans: PricingPlan[] = [
  {
    name: 'Business',
    tagline: 'For growing businesses',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Users,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team collaboration tools', included: true },
      { text: 'Custom translation glossaries', included: true },
      { text: 'Advanced formatting preservation', included: true },
      { text: 'Unlimited API requests', included: true },
      { text: 'Phone & chat support', included: true },
      { text: 'SSO integration', included: true },
      { text: 'Usage analytics & reporting', included: true },
    ],
    cta: 'Start Business Trial',
  },
  {
    name: 'Enterprise',
    tagline: 'For large organizations',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    icon: Crown,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    features: [
      { text: 'Everything in Business', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'On-premise deployment options', included: true },
      { text: 'Advanced security features', included: true },
      { text: 'Custom SLA agreements', included: true },
      { text: 'Training & onboarding', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'Contact Sales',
  },
  {
    name: 'Custom',
    tagline: 'Tailored for your needs',
    customPricing: true,
    icon: Shield,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    features: [
      { text: 'Custom pricing based on volume', included: true },
      { text: 'Dedicated infrastructure', included: true },
      { text: 'Custom feature development', included: true },
      { text: 'White-label solutions', included: true },
      { text: 'Compliance certifications', included: true },
      { text: 'Multi-region deployment', included: true },
      { text: 'Custom reporting & analytics', included: true },
      { text: 'Executive support', included: true },
    ],
    cta: 'Contact Sales',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Can I change my plan at any time?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. If you upgrade mid-cycle, you'll be charged a prorated amount.",
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes! We offer a 14-day free trial for all paid plans. No credit card required. You can cancel anytime during the trial period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. Enterprise customers can also pay via invoice.',
  },
  {
    question: 'How accurate are the translations?',
    answer:
      'Our AI-powered translation engine achieves 95%+ accuracy for major language pairs. For specialized content, we recommend our Business or Enterprise plans which include custom glossaries and human review options.',
  },
  {
    question: 'What file formats do you support?',
    answer:
      'We support all major document formats including PDF, DOCX, XLSX, PPTX, TXT, HTML, and more. Subtitle formats include SRT, VTT, ASS, and SSA.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use enterprise-grade encryption, secure data centers, and comply with GDPR, CCPA, and other privacy regulations. Your documents are processed securely and deleted after translation.',
  },
];
