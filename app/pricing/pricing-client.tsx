"use client";

import React from "react";
import Header from "@/src/components/common/Header";
import Footer from "@/src/components/Footer";
import BackgroundDecorations from "@/src/components/common/BackgroundDecorations";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";
import PricingTabs from "@/src/components/pricing/PricingTabs";
import PricingFAQ from "@/src/components/pricing/PricingFAQ";
import PricingCTA from "@/src/components/pricing/PricingCTA";
import { PricingPlan } from "@/src/components/pricing/PricingCard";

export default function PricingPageClient() {
  const personalPlans: PricingPlan[] = [
    {
      name: "Free",
      tagline: "Perfect for trying out AnyTrans",
      price: "$0",
      billing: "/month",
      features: [
        "Up to 5 document translations per month",
        "Basic document formats (PDF, DOCX, TXT)",
        "10+ supported languages",
        "Standard translation quality",
        "Email support"
      ],
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      tagline: "For professionals and small teams",
      price: "$29",
      billing: "/month",
      features: [
        "Unlimited document translations",
        "All document formats supported",
        "50+ supported languages",
        "High-quality AI translations",
        "Subtitle translation included",
        "Priority email support",
        "Translation history & management",
        "API access (100 requests/day)"
      ],
      cta: "Start Pro Trial",
      recommended: true
    }
  ];

  const enterprisePlans: PricingPlan[] = [
    {
      name: "Business",
      tagline: "For growing businesses",
      price: "$99",
      billing: "/month",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom translation glossaries",
        "Advanced formatting preservation",
        "Unlimited API requests",
        "Phone & chat support",
        "SSO integration",
        "Usage analytics & reporting"
      ],
      cta: "Start Business Trial"
    },
    {
      name: "Enterprise",
      tagline: "For large organizations",
      price: "$299",
      billing: "/month",
      features: [
        "Everything in Business",
        "Dedicated account manager",
        "Custom integrations",
        "On-premise deployment options",
        "Advanced security features",
        "Custom SLA agreements",
        "Training & onboarding",
        "24/7 priority support"
      ],
      cta: "Contact Sales"
    },
    {
      name: "Custom",
      tagline: "Tailored for your needs",
      price: "Contact us",
      billing: "",
      features: [
        "Custom pricing based on volume",
        "Dedicated infrastructure",
        "Custom feature development",
        "White-label solutions",
        "Compliance certifications",
        "Multi-region deployment",
        "Custom reporting & analytics",
        "Executive support"
      ],
      cta: "Contact Sales",
      contact: true
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. If you upgrade mid-cycle, you'll be charged a prorated amount."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for all paid plans. No credit card required. You can cancel anytime during the trial period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. Enterprise customers can also pay via invoice."
    },
    {
      question: "How accurate are the translations?",
      answer: "Our AI-powered translation engine achieves 95%+ accuracy for major language pairs. For specialized content, we recommend our Business or Enterprise plans which include custom glossaries and human review options."
    },
    {
      question: "What file formats do you support?",
      answer: "We support all major document formats including PDF, DOCX, XLSX, PPTX, TXT, HTML, and more. Subtitle formats include SRT, VTT, ASS, and SSA."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure data centers, and comply with GDPR, CCPA, and other privacy regulations. Your documents are processed securely and deleted after translation."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
    },
    {
      question: "Can I integrate AnyTrans with my existing tools?",
      answer: "Yes! We offer REST API access, webhooks, and integrations with popular tools like Slack, Google Drive, Dropbox, and more. Enterprise plans include custom integration support."
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BackgroundDecorations />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <ContentContainer className="py-12">
            {/* Page Header */}
            <div className="text-center mb-16">
              <SectionHeader 
                title="Simple, Transparent Pricing"
                subtitle="Choose the perfect plan for your translation needs. Start free, upgrade as you grow."
              />
            </div>

            {/* Pricing Tabs */}
            <PricingTabs 
              personalPlans={personalPlans}
              enterprisePlans={enterprisePlans}
            />

            {/* FAQ Section */}
            <PricingFAQ faqs={faqs} />

            {/* CTA Section */}
            <PricingCTA />
          </ContentContainer>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}