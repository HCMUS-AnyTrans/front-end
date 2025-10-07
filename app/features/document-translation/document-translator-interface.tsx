'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/src/temp/Sidebar';
import {
  Upload,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  RefreshCw,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  Languages,
} from 'lucide-react';

export default function DocumentTranslatorInterface() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Configure, 3: Review
  const [hasDocument, setHasDocument] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Vietnamese');
  const [translationProcess, setTranslationProcess] = useState(
    'Professional Translation'
  );

  const originalText = `Business Proposal: Digital Transformation Initiative

Executive Summary
This document outlines our comprehensive digital transformation strategy to modernize our operations and improve customer experience. The initiative will span 18 months and require significant investment in technology infrastructure.

Key Objectives:
1. Streamline internal processes through automation
2. Enhance customer engagement via digital channels
3. Improve data analytics capabilities
4. Ensure scalability for future growth

Implementation Timeline:
- Phase 1 (Months 1-6): Infrastructure setup and staff training
- Phase 2 (Months 7-12): System integration and testing
- Phase 3 (Months 13-18): Full deployment and optimization

Budget Allocation:
- Technology Infrastructure: $2.5M
- Staff Training: $500K
- External Consultants: $750K
- Contingency: $250K

Expected ROI:
We anticipate a 25% increase in operational efficiency and 15% improvement in customer satisfaction scores within the first year of implementation.`;

  const translatedText = `Đề xuất Kinh doanh: Sáng kiến Chuyển đổi Số

Tóm tắt Điều hành
Tài liệu này trình bày chiến lược chuyển đổi số toàn diện để hiện đại hóa hoạt động và cải thiện trải nghiệm khách hàng. Sáng kiến sẽ kéo dài 18 tháng và đòi hỏi đầu tư đáng kể vào cơ sở hạ tầng công nghệ.

Mục tiêu Chính:
1. Tinh gọn quy trình nội bộ thông qua tự động hóa
2. Tăng cường tương tác khách hàng qua các kênh số
3. Cải thiện khả năng phân tích dữ liệu
4. Đảm bảo khả năng mở rộng cho tăng trưởng tương lai

Lịch trình Triển khai:
- Giai đoạn 1 (Tháng 1-6): Thiết lập cơ sở hạ tầng và đào tạo nhân viên
- Giai đoạn 2 (Tháng 7-12): Tích hợp hệ thống và thử nghiệm
- Giai đoạn 3 (Tháng 13-18): Triển khai đầy đủ và tối ưu hóa

Phân bổ Ngân sách:
- Cơ sở hạ tầng Công nghệ: $2.5M
- Đào tạo Nhân viên: $500K
- Tư vấn Bên ngoài: $750K
- Dự phòng: $250K

ROI Dự kiến:
Chúng tôi dự đoán tăng 25% hiệu quả hoạt động và cải thiện 15% điểm hài lòng khách hàng trong năm đầu triển khai.`;

  const handleFileUpload = () => {
    setHasDocument(true);
    setCurrentStep(2);
  };

  const handleTranslation = async () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handleDownload = () => {
    console.log('Downloading translated document...');
  };

  const steps = [
    { number: 1, label: 'Upload', icon: Upload },
    { number: 2, label: 'Configure', icon: Settings },
    { number: 3, label: 'Review', icon: Eye },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Document Translator
                </h1>
                <p className="text-sm text-gray-600">
                  Professional translation with preserved formatting • Supports
                  DOCX, PDF, XLSX, PPTX
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 lg:gap-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                    <React.Fragment key={step.number}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-100 text-green-700'
                              : isActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-500'}`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-8 h-0.5 mb-6 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'}`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {currentStep === 1 && (
              /* Step 1: Upload */
              <div className="space-y-6">
                {/* Upload Area */}
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
                        onClick={handleFileUpload}
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

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Fast Translation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get results in seconds with AI-powered translation
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Format Preserved
                    </h3>
                    <p className="text-sm text-gray-600">
                      Maintain original layout, fonts, and styling
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <Languages className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      100+ Languages
                    </h3>
                    <p className="text-sm text-gray-600">
                      Translate between any language pair
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              /* Step 2: Configure */
              <div className="space-y-6">
                {/* Document Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Document Information
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Change file
                    </button>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 mb-1">
                        Business_Proposal_2024.docx
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          2,847 words
                        </span>
                        <span>•</span>
                        <span>245 KB</span>
                        <span>•</span>
                        <span>8 pages</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Translation Settings - match subtitle layout */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Translation Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Source language
                      </label>
                      <select
                        value={sourceLanguage}
                        onChange={(e) => setSourceLanguage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Target language
                      </label>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>Vietnamese</option>
                        <option>Chinese</option>
                        <option>Korean</option>
                        <option>Thai</option>
                        <option>Indonesian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Translation Mode
                      </label>
                      <select
                        value={translationProcess}
                        onChange={(e) => setTranslationProcess(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="context-aware">
                          Context-Aware (Recommended)
                        </option>
                        <option value="literal">Literal Translation</option>
                        <option value="creative">Creative Adaptation</option>
                        <option value="formal">Formal/Documentary</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Professional translation may take
                      longer but provides better accuracy and context awareness.
                    </p>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Document Preview
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                      <div className="prose prose-sm max-w-none">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          Business Proposal: Digital Transformation Initiative
                        </h3>
                        <p className="text-gray-700 mb-4">
                          <strong>Executive Summary</strong>
                          <br />
                          This document outlines our comprehensive digital
                          transformation strategy to modernize our operations
                          and improve customer experience...
                        </p>
                        <p className="text-gray-700">
                          <strong>Key Objectives:</strong>
                          <br />
                          1. Streamline internal processes through automation
                          <br />
                          2. Enhance customer engagement via digital channels
                          <br />
                          3. Improve data analytics capabilities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleTranslation}
                    disabled={isTranslating}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
                  >
                    {isTranslating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Start Translation
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              /* Step 3: Review */
              <div className="space-y-6">
                {/* Success Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">
                        Translation Complete!
                      </h3>
                      <p className="text-green-50">
                        Your document has been successfully translated and is
                        ready for review.
                      </p>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="bg-white hover:bg-green-50 text-green-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Export DOCX
                    </button>
                  </div>
                </div>

                {/* Translation Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">
                      Words Translated
                    </p>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Time Taken</p>
                    <p className="text-2xl font-bold text-gray-900">3.2s</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Credits Used</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                </div>

                {/* Side by Side Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">
                            Original ({sourceLanguage})
                          </h3>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          Source
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-gray-50 rounded-xl p-6 h-[500px] overflow-y-auto">
                        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
                          {originalText}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Translated */}
                  <div className="bg-white rounded-2xl shadow-sm border-2 border-green-200">
                    <div className="px-6 py-4 border-b border-green-200 bg-green-50 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-gray-900">
                            Translation ({targetLanguage})
                          </h3>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          Translated
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-green-50 rounded-xl p-6 h-[500px] overflow-y-auto">
                        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
                          {translatedText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-gray-200">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setHasDocument(false);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Translate Another Document
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-all">
                      <Eye className="w-5 h-5" />
                      Preview
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
