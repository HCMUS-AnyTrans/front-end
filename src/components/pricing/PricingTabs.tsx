"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PricingGrid from "./PricingGrid";
import { PricingPlan } from "./PricingCard";

interface PricingTabsProps {
  personalPlans: PricingPlan[];
  enterprisePlans: PricingPlan[];
  defaultTab?: "personal" | "enterprise";
}

export default function PricingTabs({ 
  personalPlans, 
  enterprisePlans, 
  defaultTab = "personal" 
}: PricingTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="flex justify-center mb-12">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="personal" 
            className="px-8 py-3 rounded-md font-semibold font-nunito data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger 
            value="enterprise"
            className="px-8 py-3 rounded-md font-semibold font-nunito data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Enterprise
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="personal" className="mt-8">
        <PricingGrid plans={personalPlans} columns="2" />
      </TabsContent>

      <TabsContent value="enterprise" className="mt-8">
        <PricingGrid plans={enterprisePlans} columns="3" />
      </TabsContent>
    </Tabs>
  );
}
