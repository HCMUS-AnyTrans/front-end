import type { Metadata } from 'next';
import { AuthBackground } from '@/components/Auth';

export const metadata: Metadata = {
  title: {
    template: '%s | Anytrans',
    default: 'Authentication | Anytrans',
  },
  description:
    'Sign in to your Anytrans account or create a new one to start translating.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <AuthBackground />

      <div className="w-full max-w-md space-y-8 relative z-10">{children}</div>
    </div>
  );
}
