'use client';

import React, { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      className={`${cardBg} rounded-3xl w-full max-w-[380px] p-8 flex flex-col relative border-2 ${
        isHighlighted
          ? 'border-transparent shadow-2xl scale-105 animate-fade-in-up'
          : isHovered
            ? 'border-blue-200 shadow-xl scale-[1.02]'
            : 'border-gray-100 shadow-lg hover:border-blue-100'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 ease-out`}
      style={{
        height: isHighlighted ? '700px' : '660px',
        ...(isHighlighted && {
          animation:
            'shimmer 3s ease-in-out infinite, float 6s ease-in-out infinite',
        }),
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {isHighlighted && (
        <>
          {/* Animated glow effect */}
          <div
            className=" absolute inset-0 rounded-3xl blur-xl opacity-30 animate-pulse-glow"
            style={{
              background: 'linear-gradient(45deg, #4169E1, #1e3a8a, #4169E1)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}
          />
        </>
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
          className={`${buttonBg} rounded-xl h-14 w-full font-bold text-base transition-all duration-300 hover:scale-[1.05] hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer`}
        >
          {cta}
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        @keyframes shimmer {
          0% {
            box-shadow:
              0 0 20px rgba(65, 105, 225, 0.3),
              0 0 40px rgba(65, 105, 225, 0.2);
          }
          50% {
            box-shadow:
              0 0 30px rgba(65, 105, 225, 0.5),
              0 0 60px rgba(65, 105, 225, 0.3);
          }
          100% {
            box-shadow:
              0 0 20px rgba(65, 105, 225, 0.3),
              0 0 40px rgba(65, 105, 225, 0.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1.05);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-24">
          {/* Header */}
          <div
            className={`flex flex-col items-center gap-8 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
          >
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-5xl lg:text-6xl leading-tight text-[#0F172A]">
                Choose Plan
                <br />
                <span className="text-[#173fb6] inline-block transition-all duration-1000 ease-out">
                  That's Right For You
                </span>
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                Choose plan that works best for you, feel free to contact us
              </p>
            </div>

            {/* Tab selector */}
            <div className="bg-white rounded-2xl shadow-md p-2 w-[360px] h-[72px] flex items-center gap-2 transition-all duration-500 hover:shadow-xl">
              <button
                onClick={() => setSelectedTab('personal')}
                className={`cursor-pointer flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 ${
                  selectedTab === 'personal'
                    ? 'bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] text-white shadow-lg scale-[1.02]'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setSelectedTab('enterprise')}
                className={`cursor-pointer flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 ${
                  selectedTab === 'enterprise'
                    ? 'bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] text-white shadow-lg scale-[1.02]'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="flex flex-wrap items-center justify-center gap-8 w-full">
            {currentPlans.map((plan, index) => (
              <div
                key={`${selectedTab}-${index}`}
                className="transition-all duration-700"
                style={{
                  animation: `fade-in-up 0.8s ease-out ${index * 0.15}s both`,
                }}
              >
                <PricingCard
                  {...plan}
                  isHovered={hoveredCard === `${selectedTab}-${index}`}
                  onHover={(hovered) =>
                    setHoveredCard(hovered ? `${selectedTab}-${index}` : null)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
