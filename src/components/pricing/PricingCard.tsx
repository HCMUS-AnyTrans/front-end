import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
}

type PricingCardProps = PricingPlan;

export default function PricingCard({ 
  name, 
  tagline, 
  price, 
  billing, 
  features, 
  cta, 
  recommended = false,
  contact = false
}: PricingCardProps) {
  return (
    <Card className={`h-full flex flex-col relative ${
      recommended 
        ? "border-[#19398f] shadow-lg ring-2 ring-[#19398f]/20" 
        : "border-gray-200 hover:border-[#19398f]/30"
    } transition-all duration-200`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#19398f] text-white px-4 py-1 rounded-full text-sm font-semibold">
            Recommended
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <h3 className="text-2xl font-bold text-[#142457] font-inter mb-2">
          {name}
        </h3>
        <p className="text-[#717680] font-nunito">
          {tagline}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 text-center">
        <div className="mb-6">
          {contact ? (
            <div className="text-3xl font-bold text-[#142457] font-inter">
              Contact us
            </div>
          ) : (
            <>
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-4xl font-bold text-[#142457] font-inter">
                  {price}
                </span>
                <span className="text-[#717680] ml-1 font-nunito">
                  {billing}
                </span>
              </div>
            </>
          )}
        </div>
        
        <ul className="space-y-3 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <Check size={12} className="text-green-600" />
              </div>
              <span className="text-[#414651] font-nunito text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-6">
        <Button 
          className={`w-full h-12 font-semibold font-nunito cursor-pointer ${
            recommended 
              ? "bg-[#19398f] hover:bg-[#142457] text-white" 
              : "bg-white hover:bg-[#19398f] text-[#19398f] hover:text-white border border-[#19398f]"
          }`}
          variant={recommended ? "default" : "outline"}
        >
          {cta}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
