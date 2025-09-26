import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContentContainer from "@/src/components/common/ContentContainer";
import SectionHeader from "@/src/components/common/SectionHeader";

interface FAQ {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  faqs: FAQ[];
}

export default function PricingFAQ({ faqs }: PricingFAQProps) {
  return (
    <section className="mt-24">
      <ContentContainer>
        <div className="mb-12">
          <SectionHeader 
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our pricing and plans"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#142457] font-nunito hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#717680] font-nunito pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentContainer>
    </section>
  );
}
