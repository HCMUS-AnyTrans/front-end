import type { Metadata } from 'next';
import { Sidebar } from '@/src/components/Sidebar';

export const metadata: Metadata = {
  title: 'Support - AnyTrans',
  description: 'Get help and support for your translation needs.',
};

export default function SupportPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col max-w-none">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
              Support
            </h1>
            <p className="text-sm text-[#717680] font-nunito">
              Get help with your translation projects and account questions.
            </p>
          </div>
        </div>
        <div className="flex-1 px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#717680] font-nunito">
              Support center coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
