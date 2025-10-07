'use client';

import React from 'react';
import { Upload, FileText, Zap, CheckCircle2, Languages } from 'lucide-react';

type StepUploadProps = {
  onUpload: () => void;
};

export default function StepUpload({ onUpload }: StepUploadProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Your Document
            </h2>
            <p className="text-gray-600">
              Drag and drop your file or click to browse
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-12 text-center transition-all cursor-pointer bg-gray-50 hover:bg-blue-50">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <button
              onClick={onUpload}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <Upload className="w-5 h-5" />
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: DOCX, PDF, XLSX, PPTX, TXT
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum file size: 50MB
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Fast Translation</h3>
          <p className="text-sm text-gray-600">
            Get results in seconds with AI-powered translation
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Format Preserved</h3>
          <p className="text-sm text-gray-600">
            Maintain original layout, fonts, and styling
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <Languages className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">100+ Languages</h3>
          <p className="text-sm text-gray-600">
            Translate between any language pair
          </p>
        </div>
      </div>
    </div>
  );
}
