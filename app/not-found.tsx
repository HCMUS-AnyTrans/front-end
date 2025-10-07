'use client';

import Link from 'next/link';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-48 top-[500px] w-[400px] h-[400px] lg:w-[634px] lg:h-[634px] bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20"></div>
        <div className="absolute right-[-120px] top-[200px] w-[400px] h-[400px] lg:w-[634px] lg:h-[634px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center gap-8">
              {/* Error Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#19398f] to-[#142457] rounded-full flex items-center justify-center">
                <HelpCircle size={48} className="text-white" />
              </div>

              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-[#142457] font-inter">
                  Page Not Found
                </h1>
                <p className="font-medium text-lg sm:text-xl text-[#717680] max-w-lg mx-auto font-nunito">
                  Sorry, we couldn&apos;t find the page you&apos;re looking for.
                  The page might have been moved, deleted, or you entered the
                  wrong URL.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 bg-[#19398f] text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#142457] transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <Home size={20} />
                  Go Home
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="flex items-center justify-center gap-2 bg-white text-[#19398f] border-2 border-[#19398f] px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </button>
              </div>

              {/* Additional Help */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl max-w-lg">
                <h3 className="font-semibold text-lg text-[#142457] mb-2 font-nunito">
                  Need Help?
                </h3>
                <p className="text-[#717680] mb-4 font-nunito">
                  If you believe this is an error, please contact our support
                  team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#19398f] font-semibold hover:underline cursor-pointer font-nunito"
                >
                  Contact Support
                  <ArrowLeft size={16} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
