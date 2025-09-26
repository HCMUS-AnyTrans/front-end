import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

type TeamMemberCardProps = TeamMember;

function TeamMemberCard({ name, role, avatar }: TeamMemberCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-gray-200 hover:border-[#19398f]/30">
      <CardHeader className="text-center pb-6">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-[#19398f] text-white text-lg font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold text-[#142457] font-inter">
          {name}
        </h3>
        <p className="text-[#717680] font-nunito">
          {role}
        </p>
      </CardHeader>
    </Card>
  );
}

interface TeamSectionProps {
  members: TeamMember[];
}

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Nguyen Minh Nguyen",
    role: "Co-Founder & CEO"
  },
  {
    name: "Nguyen Trong Nhan", 
    role: "Co-Founder & CTO"
  }
];

export default function TeamSection({ members = DEFAULT_TEAM_MEMBERS }: TeamSectionProps) {
  return (
    <section className="mb-24">
      <ContentContainer>
        <div className="mb-12">
          <SectionHeader 
            title="Meet the Team"
            subtitle="The passionate individuals behind AnyTrans"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {members.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
