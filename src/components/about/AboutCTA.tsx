import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentContainer from "@/src/components/common/ContentContainer";

interface AboutCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function AboutCTA({ 
  title = "Ready to break language barriers?",
  subtitle = "Join thousands of users who trust AnyTrans for their translation needs.",
  buttonText = "Get Started Today",
  buttonHref = "/pricing"
}: AboutCTAProps) {
  return (
    <section className="text-center">
      <ContentContainer>
        <div className="bg-gradient-to-r from-[#19398f] to-[#142457] rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl mx-auto">
            <Heart size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-bold font-inter mb-4">
              {title}
            </h2>
            <p className="text-lg text-white/90 font-nunito mb-8">
              {subtitle}
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#19398f] hover:bg-gray-100 font-semibold font-nunito px-8 py-3 cursor-pointer"
              asChild
            >
              <a href={buttonHref}>
                {buttonText}
              </a>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
