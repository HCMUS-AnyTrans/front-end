import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore AnyTrans features - document translation, subtitle translation, and more translation tools.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#19398f] mb-6 font-inter">
            AnyTrans Features
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito">
            Discover our comprehensive translation tools designed to make your content accessible to global audiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link 
            href="/features/document-translation"
            className="group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#19398f] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#19398f] bg-opacity-10 p-3 rounded-lg mr-4">
                <FileText className="h-8 w-8 text-[#19398f]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#142457] group-hover:text-[#19398f] transition-colors font-inter">
                Document Translation
              </h2>
            </div>
            <p className="text-gray-600 mb-4 font-nunito">
              Translate DOCX, PDF, and PPTX files while preserving original formatting. Perfect for business documents, reports, and presentations.
            </p>
            <div className="flex items-center text-[#19398f] font-semibold font-nunito">
              Learn more →
            </div>
          </Link>

          <Link 
            href="/features/subtitle-translation"
            className="group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#19398f] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#19398f] bg-opacity-10 p-3 rounded-lg mr-4">
                <Video className="h-8 w-8 text-[#19398f]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#142457] group-hover:text-[#19398f] transition-colors font-inter">
                Subtitle Translation
              </h2>
            </div>
            <p className="text-gray-600 mb-4 font-nunito">
              Translate video subtitles with perfect timing synchronization. Support for SRT, VTT, and MP4 formats.
            </p>
            <div className="flex items-center text-[#19398f] font-semibold font-nunito">
              Learn more →
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-[#142457] mb-4 font-inter">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6 font-nunito">
              Try AnyTrans today and experience the power of professional translation tools.
            </p>
            <Link 
              href="/signup"
              className="bg-[#19398f] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#142457] transition-colors inline-block font-nunito"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
