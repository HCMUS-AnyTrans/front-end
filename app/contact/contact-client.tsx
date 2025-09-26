"use client";

import React from "react";
import Header from "@/src/components/common/Header";
import Footer from "@/src/components/Footer";
import BackgroundDecorations from "@/src/components/common/BackgroundDecorations";
import ContentContainer from "@/src/components/common/ContentContainer";
import HeroContact from "@/src/components/contact/HeroContact";
import ContactForm from "@/src/components/contact/ContactForm";
import ContactInfo from "@/src/components/contact/ContactInfo";
import SocialRow from "@/src/components/about/SocialRow";
import ContactCTA from "@/src/components/contact/ContactCTA";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BackgroundDecorations />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <ContentContainer className="py-12">
            {/* Hero Section */}
            <HeroContact />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <ContactInfo />
              </div>
            </div>

            {/* Social Media Section */}
            <SocialRow 
              title="Connect With Us"
              subtitle="Follow us on social media for updates and translation tips"
            />

            {/* FAQ Prompt Section */}
            <ContactCTA />
          </ContentContainer>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}