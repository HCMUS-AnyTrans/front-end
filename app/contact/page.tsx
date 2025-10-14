import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/app/contact/contact-client";

export const metadata: Metadata = {
  title: "Contact Us - Anytrans",
  description: "Get in touch with the Anytrans team. Send us a message, find our contact information, or connect with us on social media. We're here to help with all your translation needs.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
