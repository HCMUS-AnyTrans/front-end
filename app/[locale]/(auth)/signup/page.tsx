import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SignupForm } from "./signup-form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Anytrans account to start translating documents, subtitles, and more.",
};

export default function SignupPage() {
  return <SignupForm />;
}