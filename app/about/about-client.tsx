"use client";

import React from "react";
import Header from "@/src/components/common/Header";
import Footer from "@/src/components/Footer";
import BackgroundDecorations from "@/src/components/common/BackgroundDecorations";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";
import OurStory from "@/src/components/about/OurStory";
import CoreValues from "@/src/components/about/CoreValues";
import TeamSection from "@/src/components/about/TeamSection";
import Milestones from "@/src/components/about/Milestones";
import SocialRow from "@/src/components/about/SocialRow";
import AboutCTA from "@/src/components/about/AboutCTA";

export default function AboutPageClient() {
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
                title="About AnyTrans"
                subtitle="Empowering global communication through innovative translation technology"
              />
            </div>

            {/* Our Story Section */}
            <OurStory />

            {/* Core Values Section */}
            <CoreValues />

            {/* Team Section */}
            <TeamSection />

            {/* Milestones Section */}
            <Milestones />

            {/* Social Media Section */}
            <SocialRow />

            {/* CTA Section */}
            <AboutCTA />
          </ContentContainer>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}