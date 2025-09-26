import React from "react";
import { Target, Zap, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-gray-200 hover:border-[#19398f]/30">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-[#19398f]/10 rounded-full flex items-center justify-center">
          <div className="text-[#19398f]">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-[#142457] font-inter">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-[#717680] font-nunito leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

const CORE_VALUES = [
  {
    icon: <Target size={32} />,
    title: "Accuracy First",
    description: "We prioritize precision in every translation, ensuring your message is conveyed exactly as intended across languages and cultures."
  },
  {
    icon: <Zap size={32} />,
    title: "Lightning Fast",
    description: "Our advanced AI technology delivers high-quality translations in seconds, not hours, helping you meet tight deadlines."
  },
  {
    icon: <Globe size={32} />,
    title: "Global Reach",
    description: "Supporting 100+ languages and dialects, we help businesses and individuals connect with audiences worldwide."
  },
  {
    icon: <Shield size={32} />,
    title: "Security & Privacy",
    description: "Your documents and data are protected with enterprise-grade security, ensuring complete confidentiality and compliance."
  }
];

export default function CoreValues() {
  return (
    <section className="mb-24">
      <ContentContainer>
        <div className="mb-12">
          <SectionHeader 
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
