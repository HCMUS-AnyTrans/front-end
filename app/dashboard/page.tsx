import type { Metadata } from 'next';
import { Sidebar } from '@/src/components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard - AnyTrans',
  description: 'Your translation dashboard with recent projects and activity.',
};

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col max-w-none overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-[#717680] font-nunito">
              Welcome back! Here&apos;s an overview of your translation
              activity.
            </p>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 pt-20 lg:pt-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Documents Translated
                </h3>
                <p className="text-2xl font-bold text-[#414651] font-nunito">
                  24
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Languages Used
                </h3>
                <p className="text-2xl font-bold text-[#414651] font-nunito">
                  8
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#717680] font-nunito mb-2">
                  Credits Remaining
                </h3>
                <p className="text-2xl font-bold text-[#19398f] font-nunito">
                  156
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#414651] font-nunito mb-4">
                Recent Activity
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-[#414651] font-nunito">
                      Business Proposal.docx
                    </p>
                    <p className="text-xs text-[#717680] font-nunito">
                      English → Vietnamese • 2 hours ago
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-[#414651] font-nunito">
                      Marketing Report.pdf
                    </p>
                    <p className="text-xs text-[#717680] font-nunito">
                      English → Spanish • 1 day ago
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#414651] font-nunito">
                      Technical Manual.docx
                    </p>
                    <p className="text-xs text-[#717680] font-nunito">
                      English → Japanese • 3 days ago
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
