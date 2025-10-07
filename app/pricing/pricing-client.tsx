'use client';

import React, { useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  Users,
  Crown,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Star,
} from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('personal');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const personalPlans: any[] = [
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

  const enterprisePlans: any[] = [
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

  const faqs = [
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

  const currentPlans =
    activeTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
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
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all text-sm sm:text-base ${billingPeriod === 'monthly' ? 'bg-white text-blue-600 shadow-lg' : 'text-white hover:text-blue-100'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
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

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${activeTab === 'personal' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Personal
              </button>
              <button
                onClick={() => setActiveTab('enterprise')}
                className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${activeTab === 'enterprise' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Enterprise
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentPlans.map((plan) => {
              const Icon = plan.icon;
              const price = plan.customPricing
                ? null
                : plan.price === 0
                  ? 0
                  : billingPeriod === 'monthly'
                    ? plan.monthlyPrice
                    : plan.yearlyPrice;
              const savings =
                plan.monthlyPrice && plan.yearlyPrice
                  ? Math.round(plan.monthlyPrice * 12 - plan.yearlyPrice)
                  : 0;

              return (
                <div
                  key={plan.name}
                  className={`bg-white rounded-2xl overflow-hidden transition-all ${plan.popular ? 'border-2 border-blue-600 shadow-2xl md:scale-105' : 'border border-gray-200 shadow-lg hover:shadow-xl'}`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${plan.iconBg}`}
                    >
                      <Icon className={`w-7 h-7 ${plan.iconColor}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">{plan.tagline}</p>

                    <div className="mb-6">
                      {price !== null ? (
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                              ${price}
                            </span>
                            <span className="text-gray-600">
                              /{billingPeriod === 'monthly' ? 'month' : 'year'}
                            </span>
                          </div>
                          {billingPeriod === 'yearly' && savings > 0 && (
                            <p className="text-sm text-green-600 mt-2">
                              Save ${savings}/year
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                          Contact us
                        </div>
                      )}
                    </div>

                    <button
                      className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                    >
                      {plan.cta}
                    </button>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-900 mb-4">
                        What's included:
                      </p>
                      {plan.features.map((feature: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="mt-16 sm:mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaqIndex === idx ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Still have questions?
                </h2>
                <p className="text-lg text-blue-100 mb-8">
                  Our team is here to help you find the perfect plan for your
                  needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg">
                    Contact Sales
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold transition-all">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
