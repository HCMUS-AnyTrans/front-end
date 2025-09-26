import React from "react";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";

const STORY_CONTENT = [
  "AnyTrans was founded with a simple yet powerful vision: to break down language barriers and make professional translation accessible to everyone. In today's interconnected world, effective communication across languages is not just a luxury—it's a necessity.",
  "Our journey began when we recognized that traditional translation services were often slow, expensive, and inconsistent. We set out to create a solution that combines the speed and efficiency of AI with the accuracy and nuance that only comes from deep understanding of language and culture.",
  "Today, AnyTrans serves thousands of users worldwide, from individual freelancers to large enterprises, helping them communicate effectively across linguistic boundaries and expand their global reach."
];

export default function OurStory() {
  return (
    <section className="mb-24">
      <ContentContainer>
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Our Story"
            className="mb-8"
          />
          <div className="space-y-6 text-lg text-[#717680] font-nunito leading-relaxed">
            {STORY_CONTENT.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
