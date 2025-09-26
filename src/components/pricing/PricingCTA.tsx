import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentContainer from "@/src/components/common/ContentContainer";

export default function PricingCTA() {
  return (
    <section className="mt-24">
      <ContentContainer>
        <div className="bg-gradient-to-r from-[#19398f] to-[#142457] rounded-2xl p-8 sm:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <MessageCircle size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-bold font-inter mb-4">
              Still not sure? Contact our team for a custom plan.
            </h2>
            <p className="text-lg text-white/90 font-nunito mb-8">
              Our sales team is here to help you find the perfect solution for your translation needs.
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#19398f] hover:bg-gray-100 font-semibold font-nunito px-8 py-3 cursor-pointer"
            >
              Contact Sales
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
