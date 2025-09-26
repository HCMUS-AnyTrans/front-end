import React from "react";
import ContentContainer from "@/src/components/common/ContentContainer";

interface HeroContactProps {
  title?: string;
  subtitle?: string;
}

export default function HeroContact({ 
  title = "Get in Touch",
  subtitle = "We'd love to hear from you. Fill out the form or reach us directly."
}: HeroContactProps) {
  return (
    <div className="text-center mb-16">
      <ContentContainer>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#142457] font-inter mb-4">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-[#717680] font-nunito max-w-3xl mx-auto">
          {subtitle}
        </p>
      </ContentContainer>
    </div>
  );
}
