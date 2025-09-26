import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentContainer from "@/src/components/common/ContentContainer";

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export default function ContactCTA({ 
  title = "Have questions about our services?",
  subtitle = "Check out our pricing plans or learn more about what we offer.",
  primaryButton = { text: "View Pricing", href: "/pricing" },
  secondaryButton = { text: "Learn More", href: "/about" }
}: ContactCTAProps) {
  return (
    <section className="text-center">
      <ContentContainer>
        <div className="bg-gradient-to-r from-[#19398f] to-[#142457] rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl mx-auto">
            <MessageCircle size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-bold font-inter mb-4">
              {title}
            </h2>
            <p className="text-lg text-white/90 font-nunito mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#19398f] hover:bg-gray-100 font-semibold font-nunito px-8 py-3 cursor-pointer"
                asChild
              >
                <a href={primaryButton.href}>
                  {primaryButton.text}
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#19398f] font-semibold font-nunito px-8 py-3 cursor-pointer"
                asChild
              >
                <a href={secondaryButton.href}>
                  {secondaryButton.text}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
