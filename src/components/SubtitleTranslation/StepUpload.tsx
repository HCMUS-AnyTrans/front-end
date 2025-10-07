// FILE: src/components/subtitle-translation/StepUpload.tsx
'use client';

import React from 'react';
import { Upload, FileText, Sparkles, Film, Tag } from 'lucide-react';

type StepUploadProps = {
  onUpload: (files: FileList) => void;
};

export default function StepUpload({ onUpload }: StepUploadProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Your Subtitle Files
          </h2>
          <p className="text-gray-600 mb-6">
            Drag and drop your files or click to browse
          </p>

          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-12 transition-all cursor-pointer bg-gray-50 hover:bg-blue-50">
            <input
              type="file"
              multiple
              accept=".srt,.vtt,.ass,.ssa,.mp4"
              onChange={(e) => {
                if (e.target.files) onUpload(e.target.files);
              }}
              className="hidden"
              id="subtitle-upload"
            />
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <button
              onClick={() =>
                document.getElementById('subtitle-upload')?.click()
              }
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <Upload className="w-5 h-5" />
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: SRT, VTT, ASS, SSA, MP4
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum file size: 50MB
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Context-Aware Translation
          </h3>
          <p className="text-sm text-gray-600">
            Automatic movie/TV show context detection for more accurate, natural
            translations
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
            <Film className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Multi-Format Support
          </h3>
          <p className="text-sm text-gray-600">
            SRT, VTT, ASS, SSA, and MP4 subtitle formats
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3">
            <Tag className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Speaker Detection
          </h3>
          <p className="text-sm text-gray-600">
            Identify and preserve speaker names and dialogue context
          </p>
        </div>
      </div>
    </div>
  );
}
