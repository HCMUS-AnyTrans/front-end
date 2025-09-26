import React from "react";
import PricingCard, { PricingPlan } from "./PricingCard";

interface PricingGridProps {
  plans: PricingPlan[];
  columns?: "2" | "3";
}

export default function PricingGrid({ plans, columns = "3" }: PricingGridProps) {
  const gridClasses = columns === "2" 
    ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className={gridClasses}>
      {plans.map((plan, index) => (
        <PricingCard key={index} {...plan} />
      ))}
    </div>
  );
}
