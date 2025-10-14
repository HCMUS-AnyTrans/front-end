import React from "react";
import type { Metadata } from "next";
import PricingPageClient from "@/app/pricing/pricing-client";

export const metadata: Metadata = {
  title: "Pricing - Anytrans",
  description: "Choose the perfect translation plan for your needs. Flexible pricing for individuals and businesses with features like document translation, subtitle translation, and more.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
