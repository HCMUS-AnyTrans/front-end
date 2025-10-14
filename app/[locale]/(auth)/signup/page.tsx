import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your AnyTrans account to start translating documents, subtitles, and more.",
};

export default function SignupPage() {
  return <SignupForm />;
}