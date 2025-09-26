import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AnyTrans",
    default: "Authentication | AnyTrans",
  },
  description: "Sign in to your AnyTrans account or create a new one to start translating.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {children}
      </div>
    </div>
  );
}
