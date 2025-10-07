'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

function PricingCard({
  name,
  tagline,
  price,
  billing,
  features,
  cta,
  recommended = false,
  contact = false,
  isHovered = false,
  onHover,
}: PricingCardProps) {
  const isHighlighted = recommended;
  const cardBg = isHighlighted
    ? 'bg-gradient-to-br from-[#4169E1] to-[#1e3a8a]'
    : 'bg-white';
  const titleColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const taglineColor = isHighlighted ? 'text-white/80' : 'text-gray-400';
  const priceColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const featureBg = isHighlighted
    ? 'bg-white/10 backdrop-blur-sm'
    : 'bg-gray-50';
  const featureTextColor = isHighlighted ? 'text-white' : 'text-[#0F172A]';
  const checkBgColor = isHighlighted ? 'bg-white/20' : 'bg-blue-50';
  const checkColor = isHighlighted ? 'text-white' : 'text-blue-600';
  const buttonBg = isHighlighted
    ? 'bg-white text-[#4169E1] hover:bg-gray-50'
    : 'bg-[#4169E1] text-white hover:bg-[#1e3a8a]';

  return (
    <div
      className={`${cardBg} rounded-3xl w-full max-w-[380px] p-8 flex flex-col relative transition-all duration-500 ease-out border-2 ${
        isHighlighted
          ? 'border-transparent shadow-2xl scale-105'
          : isHovered
            ? 'border-blue-200 shadow-xl scale-[1.02]'
            : 'border-gray-100 shadow-lg hover:border-blue-100'
      }`}
      style={{
        height: isHighlighted ? '700px' : '660px',
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          Most Popular
        </div>
      )}

      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3
            className={`font-bold text-3xl ${titleColor} transition-colors duration-300`}
          >
            {name}
          </h3>
          <p
            className={`text-base ${taglineColor} max-w-[280px] transition-colors duration-300`}
          >
            {tagline}
          </p>

          {contact ? (
            <div
              className={`text-4xl font-bold ${priceColor} mt-4 transition-colors duration-300`}
            >
              Contact us
            </div>
          ) : (
            <div className="flex items-baseline mt-4">
              <span
                className={`font-semibold text-2xl ${priceColor} transition-colors duration-300`}
              >
                $
              </span>
              <span
                className={`font-bold text-6xl ${priceColor} ml-2 transition-colors duration-300`}
              >
                {price}
              </span>
              <span
                className={`text-lg ${taglineColor} ml-2 transition-colors duration-300`}
              >
                {billing}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${featureBg} rounded-2xl p-6 flex-grow flex flex-col transition-all duration-300`}
      >
        <div className="flex flex-col gap-5 flex-grow mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 transition-all duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkBgColor}`}
              >
                <Check
                  size={14}
                  className={`${checkColor} transition-colors duration-300`}
                  strokeWidth={3}
                />
              </div>
              <span
                className={`font-semibold text-sm ${featureTextColor} transition-colors duration-300`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`${buttonBg} rounded-xl h-14 w-full font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2`}
        >
          {cta}
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default function PricingTabs() {
  const [selectedTab, setSelectedTab] = useState<'personal' | 'enterprise'>(
    'enterprise'
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const personalPlans = [
    {
      name: 'Starter',
      tagline: 'Perfect for individuals getting started',
      price: '9',
      billing: '/month',
      features: [
        '10,000 credits/month',
        'Basic translation',
        'Email support',
        'Standard quality',
        '3 file formats',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Plus',
      tagline: 'Ideal for freelancers and small projects',
      price: '29',
      billing: '/month',
      features: [
        '50,000 credits/month',
        'Advanced translation',
        'Priority support',
        'High quality output',
        'All file formats',
        'API access',
      ],
      cta: 'Get Started',
      recommended: true,
    },
  ];

  const enterprisePlans = [
    {
      name: 'Enterprise Starter',
      tagline: 'Have a go and test your superpowers',
      price: '999',
      billing: '/month',
      features: [
        '200,000 credits/month',
        '5 user seats',
        'Advanced analytics',
        'Custom integrations',
        '24/7 phone support',
      ],
      cta: 'Buy now',
    },
    {
      name: 'Enterprise Growth',
      tagline: 'Scale your translation operations',
      price: '999',
      billing: '/month',
      features: [
        '500,000 credits/month',
        '15 user seats',
        'Advanced analytics',
        'Custom integrations',
        '24/7 phone support',
        'Dedicated account manager',
      ],
      cta: 'Buy now',
      recommended: true,
    },
    {
      name: 'Enterprise Custom',
      tagline: 'Tailored solutions for your business',
      price: '999',
      billing: '/month',
      features: [
        'Unlimited credits',
        'Unlimited user seats',
        'Custom workflows',
        'On-premise deployment',
        'SLA guarantees',
        'Custom training',
      ],
      cta: 'Buy now',
    },
  ];

  const currentPlans =
    selectedTab === 'personal' ? personalPlans : enterprisePlans;

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-5xl lg:text-6xl leading-tight text-[#0F172A]">
                Choose Plan
                <br />
                That's Right For You
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                Choose plan that works best for you, feel free to contact us
              </p>
            </div>

            {/* Tab selector */}
            <div className="bg-white rounded-2xl shadow-md p-2 w-[360px] h-[72px] flex items-center gap-2">
              <button
                onClick={() => setSelectedTab('personal')}
                className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedTab === 'personal'
                    ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-[#0F172A] shadow-sm'
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setSelectedTab('enterprise')}
                className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedTab === 'enterprise'
                    ? 'bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            {currentPlans.map((plan, index) => (
              <PricingCard
                key={`${selectedTab}-${index}`}
                {...plan}
                isHovered={hoveredCard === `${selectedTab}-${index}`}
                onHover={(hovered) =>
                  setHoveredCard(hovered ? `${selectedTab}-${index}` : null)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
