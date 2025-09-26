"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  contact?: boolean;
}

function PricingCard({ 
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

export default function PricingTabs() {
  const personalPlans = [
    {
      name: "Starter",
      tagline: "Perfect for individuals getting started",
      price: "$9",
      billing: "/month",
      features: [
        "10,000 credits/month",
        "Basic translation",
        "Email support",
        "Standard quality",
        "3 file formats"
      ],
      cta: "Get Started"
    },
    {
      name: "Plus",
      tagline: "Ideal for freelancers and small projects",
      price: "$29",
      billing: "/month",
      features: [
        "50,000 credits/month",
        "Advanced translation",
        "Priority support",
        "High quality output",
        "All file formats",
        "API access"
      ],
      cta: "Get Started",
      recommended: true
    }
  ];

  const enterprisePlans = [
    {
      name: "Enterprise Starter",
      tagline: "Have a go and test your superpowers",
      price: "$999",
      billing: "/month",
      features: [
        "200,000 credits/month",
        "5 user seats",
        "Advanced analytics",
        "Custom integrations",
        "24/7 phone support"
      ],
      cta: "Get Started"
    },
    {
      name: "Enterprise Growth",
      tagline: "Scale your translation operations",
      price: "$1999",
      billing: "/month",
      features: [
        "500,000 credits/month",
        "15 user seats",
        "Advanced analytics",
        "Custom integrations",
        "24/7 phone support",
        "Dedicated account manager"
      ],
      cta: "Get Started",
      recommended: true
    },
    {
      name: "Enterprise Custom",
      tagline: "Tailored solutions for your business",
      price: "Contact us",
      billing: "",
      features: [
        "Unlimited credits",
        "Unlimited user seats",
        "Custom workflows",
        "On-premise deployment",
        "SLA guarantees",
        "Custom training"
      ],
      cta: "Contact Sales",
      contact: true
    }
  ];
  
  return (
    <section className="w-full py-12 bg-white">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-9 text-center">
            <div className="flex flex-col gap-9">
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-[1.3] text-[#191a15] font-inter max-w-[492px]">
                Choose Plan<br />
                That&apos;s Right For You
              </h2>
              <p className="text-base lg:text-lg text-[#a6a6a6] font-inter">
                Choose plan that works best for you, feel free to contact us
              </p>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="personal" 
                  className="px-8 py-3 rounded-md font-semibold font-nunito data-[state=active]:bg-[#19398f] data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-200 cursor-pointer"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger 
                  value="enterprise"
                  className="px-8 py-3 rounded-md font-semibold font-nunito data-[state=active]:bg-[#19398f] data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-200 cursor-pointer"
                >
                  Enterprise
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="personal" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {personalPlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="enterprise" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enterprisePlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
