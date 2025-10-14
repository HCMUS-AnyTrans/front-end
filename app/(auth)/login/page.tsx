import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Anytrans account to access translation tools and manage your content.",
};

export default function LoginPage() {
  return <LoginForm />;
}