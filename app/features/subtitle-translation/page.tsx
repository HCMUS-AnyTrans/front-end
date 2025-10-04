import type { Metadata } from 'next';
import { Sidebar } from '@/src/components/Sidebar';

export const metadata: Metadata = {
  title: 'Subtitle Translation',
  description:
    'Translate video subtitles with AnyTrans - support for SRT, VTT, MP4 content with perfect timing synchronization.',
};

export default function SubtitleTranslationPage() {
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
              Subtitle Translation
            </h1>
            <p className="text-sm text-[#717680] font-nunito">
              Bring your video content to global audiences with perfectly
              synchronized subtitle translations.
            </p>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-gray-600 mb-8 font-nunito">
              Upload SRT, VTT, or MP4 files and get perfectly synchronized
              translations with timing preservation.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#142457] mb-3 font-nunito">
                  Supported Formats
                </h3>
                <ul className="space-y-2 text-gray-600 font-nunito">
                  <li>• SubRip Subtitles (.srt)</li>
                  <li>• WebVTT Files (.vtt)</li>
                  <li>• MP4 Video Files (.mp4)</li>
                  <li>• ASS/SSA Subtitles</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#142457] mb-3 font-nunito">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-600 font-nunito">
                  <li>• Perfect timing synchronization</li>
                  <li>• Multiple subtitle formats</li>
                  <li>• Video preview integration</li>
                  <li>• Batch subtitle processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
