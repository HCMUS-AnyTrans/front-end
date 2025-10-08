'use client';

import React from 'react';
import { Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText?: string;
  translatedText?: string;
  onDownload?: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  originalText = 'Loading original text...',
  translatedText = 'Loading translated text...',
  onDownload,
}: PreviewModalProps) {
  const handleDownload = () => {
    onDownload?.();
    // In a real implementation, this would trigger a DOCX download
    console.log('Downloading DOCX file...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[90vw] h-[80vh] max-h-[800px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold text-[#19398f] font-nunito">
            Preview Translation
          </DialogTitle>
          <DialogDescription className="text-sm text-[#717680] font-nunito">
            Compare your original document with the translated version
          </DialogDescription>
        </DialogHeader>

        {/* Split view content */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Original text panel */}
          <div className="flex-1 flex flex-col lg:border-r border-gray-200 min-h-0 lg:min-h-[400px]">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-sm text-[#414651] font-nunito">
                Original
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-auto min-h-[200px] lg:min-h-0">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-nunito">
                  {originalText}
                </div>
              </div>
            </div>
          </div>

          {/* Translated text panel */}
          <div className="flex-1 flex flex-col min-h-0 lg:min-h-[400px] border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-sm text-[#414651] font-nunito">
                Translated
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-auto min-h-[200px] lg:min-h-0">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-nunito">
                  {translatedText}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="font-semibold font-nunito"
            >
              Close
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download as DOCX
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
