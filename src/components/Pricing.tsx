"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isHighlighted?: boolean;
  isPopular?: boolean;
}

function PricingCard({ title, description, price, features, isHighlighted = false, isPopular = false }: PricingCardProps) {
  const cardBg = isHighlighted ? "bg-[#173fb6]" : "bg-white";
  const titleColor = isHighlighted ? "text-white" : "text-[#191a15]";
  const descColor = isHighlighted ? "text-white" : "text-[#a6a6a6]";
  const priceColor = isHighlighted ? "text-white" : "text-[#191a15]";
  const buttonBg = isHighlighted ? "bg-[#173fb6] text-white" : "bg-white text-[#173fb6] shadow-md";
  const cardHeight = isPopular ? "h-[688px]" : "h-[644px]";
  const cardShadow = isHighlighted ? "shadow-lg" : "";
  
  return (
    <div className={`${cardBg} ${cardHeight} ${cardShadow} rounded-[24px] w-[374px] p-5 flex flex-col relative`}>
      <div className="flex flex-col items-center gap-7 flex-grow">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className={`font-semibold text-[30px] leading-normal ${titleColor} font-inter`}>
            {title}
          </h3>
          <p className={`font-medium text-lg leading-[27px] ${descColor} max-w-[210px] font-inter`}>
            {description}
          </p>
          
          <div className="relative">
            <span className={`font-medium text-lg ${priceColor} font-inter`}>$</span>
            <span className={`font-semibold text-[50px] leading-[30px] ${priceColor} font-inter ml-4`}>
              {price}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-[10px] p-6 w-full flex-grow flex flex-col">
          <div className="flex flex-col gap-6 flex-grow">
            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-[26px] h-[26px] flex items-center justify-center">
                    <Check size={20} className="text-green-600" />
                  </div>
                  <span className="font-semibold text-lg text-[#191a15] font-nunito">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <button className={`${buttonBg} rounded-xl h-[60px] w-full font-semibold text-lg font-inter hover:opacity-90 transition-opacity mt-12`}>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<"personal" | "enterprise">("enterprise");
  
  return (
    <section className="w-full py-16 bg-white">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col items-center gap-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-9 text-center">
            <div className="flex flex-col gap-9">
              <h2 className="font-bold text-[50px] leading-[1.3] text-[#191a15] font-inter max-w-[492px]">
                Choose Plan<br />
                That's Right For You
              </h2>
              <p className="text-lg text-[#a6a6a6] font-inter">
                Choose plan that works best for you, feel free to contact us
              </p>
            </div>
            
            {/* Plan selector */}
            <div className="bg-white rounded-[10px] shadow-sm p-2 w-[340px] h-[70px] flex items-center">
              <button
                onClick={() => setSelectedPlan("personal")}
                className={`flex-1 h-[53px] rounded-md font-semibold text-xl transition-colors font-nunito ${
                  selectedPlan === "personal" 
                    ? "bg-white text-black shadow-sm" 
                    : "bg-transparent text-black"
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setSelectedPlan("enterprise")}
                className={`flex-1 h-[53px] rounded-md font-semibold text-xl transition-colors font-nunito ${
                  selectedPlan === "enterprise" 
                    ? "bg-[#19398f] text-white" 
                    : "bg-transparent text-black"
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>
          
          {/* Pricing cards */}
          <div className="flex items-center justify-between w-full gap-8">
            <PricingCard
              title="Enterprise Starter"
              description="Have a go and test your superpowers"
              price="999"
              features={[
                "200.000 credits/month",
                "5 user seat",
                "5 user seat",
                "5 user seat",
                "5 user seat"
              ]}
            />
            
            <PricingCard
              title="Enterprise Growth"
              description="Have a go and test your superpowers"
              price="999"
              features={[
                "200.000 credits/month",
                "5 user seat",
                "5 user seat",
                "5 user seat",
                "5 user seat"
              ]}
              isHighlighted={true}
              isPopular={true}
            />
            
            <PricingCard
              title="Enterprise Custom"
              description="Have a go and test your superpowers"
              price="999"
              features={[
                "200.000 credits/month",
                "5 user seat",
                "5 user seat",
                "5 user seat",
                "5 user seat"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
