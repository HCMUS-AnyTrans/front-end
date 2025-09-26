"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  isHighlighted?: boolean;
}

function FeatureCard({ title, description, isHighlighted = false }: FeatureCardProps) {
  const cardBg = isHighlighted ? "bg-[#19398f]" : "bg-white";
  const textColor = isHighlighted ? "text-white" : "text-[#142457]";
  const descColor = isHighlighted ? "text-white" : "text-[#19398f]";
  const buttonBg = isHighlighted ? "border-white" : "border-[#19398f]";
  const arrowColor = isHighlighted ? "stroke-white" : "stroke-[#19398f]";
  
  return (
    <div className={`${cardBg} relative w-[265px] h-[420px] rounded-[10px] border border-[#d9ebff] shadow-sm overflow-hidden`}>
      {/* Background gradient for highlighted card */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#19398f] to-[#142457]" />
      )}
      
      {/* Icon section */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] flex items-center justify-center">
        <FileText size={40} className={isHighlighted ? "text-white" : "text-[#19398f]"} />
      </div>
      
      {/* Content section */}
      <div className="absolute bottom-0 left-0 right-0 h-[210px] flex flex-col items-center justify-center text-center px-6 gap-5">
        <h3 className={`font-bold text-xl leading-[1.4] ${textColor} font-nunito`}>
          {title}
        </h3>
        <p className={`font-normal text-base leading-6 ${descColor} font-nunito`}>
          {description}
        </p>
        
        {/* Arrow button */}
        <button className={`w-9 h-9 rounded-full border ${buttonBg} flex items-center justify-center hover:bg-opacity-10 hover:bg-gray-500 transition-colors`}>
          <ArrowRight size={16} className={arrowColor} />
        </button>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col items-center gap-9">
          <h2 className="font-bold text-[50px] leading-[1.3] text-black text-center max-w-[657px] font-inter">
            We provides best Feature for customer
          </h2>
          
          <div className="flex items-center justify-between w-full gap-8">
            <FeatureCard
              title="Document Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
              isHighlighted={true}
            />
            
            <FeatureCard
              title="Subtitle Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
            />
            
            <FeatureCard
              title="........... Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
