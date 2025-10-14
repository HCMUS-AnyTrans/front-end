import React from "react";
import type { Metadata } from "next";
import AboutPageClient from "@/app/about/about-client";

export const metadata: Metadata = {
  title: "About Us - Anytrans",
  description: "Learn about Anytrans - our mission, values, team, and journey in making translation accessible to everyone. Meet the people behind the innovative translation platform.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
