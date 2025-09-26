import React from "react";
import { Rocket, Zap, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

type MilestoneCardProps = Milestone;

function MilestoneCard({ year, title, description, icon }: MilestoneCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-gray-200 hover:border-[#19398f]/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-[#19398f]/10 rounded-full flex items-center justify-center">
            <div className="text-[#19398f]">
              {icon}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#19398f] font-nunito">
              {year}
            </div>
            <h3 className="text-lg font-semibold text-[#142457] font-inter">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#717680] font-nunito leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

interface MilestonesProps {
  milestones?: Milestone[];
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2023",
    title: "Company Founded",
    description: "AnyTrans was born from a vision to make professional translation accessible to everyone, starting with our MVP.",
    icon: <Rocket size={24} />
  },
  {
    year: "2024",
    title: "AI Engine Launch",
    description: "Released our proprietary AI translation engine, achieving 95% accuracy across major language pairs.",
    icon: <Zap size={24} />
  },
  {
    year: "2024",
    title: "10K+ Users",
    description: "Reached our first major milestone of 10,000 active users, processing over 1 million documents.",
    icon: <Users size={24} />
  },
  {
    year: "2025",
    title: "Enterprise Features",
    description: "Launched advanced enterprise features including SSO, custom glossaries, and dedicated support.",
    icon: <Award size={24} />
  }
];

export default function Milestones({ milestones = DEFAULT_MILESTONES }: MilestonesProps) {
  return (
    <section className="mb-24">
      <ContentContainer>
        <div className="mb-12">
          <SectionHeader 
            title="Our Journey"
            subtitle="Key milestones in our mission to transform translation"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
