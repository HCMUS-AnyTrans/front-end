'use client';

import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/src/components/Sidebar';

export function DocumentTranslatorInterface() {
  const [hasDocument, setHasDocument] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Vietnamese');
  const [translationProcess, setTranslationProcess] = useState(
    'Professional Translation'
  );
  const [domain, setDomain] = useState('Auto detect');

  // Sample content for demo purposes
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
    // Simulate file upload
    setHasDocument(true);
    console.log('File uploaded successfully');
  };

  const handleTranslation = async () => {
    setIsTranslating(true);

    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
      setShowReview(true);
    }, 3000);
  };

  const handlePreview = () => {
    setShowReview(true);
  };

  const handleDownload = () => {
    // In a real implementation, this would trigger a DOCX download
    console.log('Downloading translated document...');
  };

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
                  Document Translator
                </h1>
                <p className="text-sm text-[#717680] font-nunito">
                  Translate your documents in seconds — accurate, fast, and
                  beautifully formatted
                </p>
              </div>

              <div className="flex items-center gap-3">
                {hasDocument && (
                  <Button
                    onClick={handlePreview}
                    className="bg-[#19398f] hover:bg-[#142457] text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {!showReview ? (
              <div className="space-y-6">
                {/* Translation Settings - Top Panel */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
                    Translation Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                        Source language
                      </label>
                      <select
                        value={sourceLanguage}
                        onChange={(e) => setSourceLanguage(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                        Target language
                      </label>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                      >
                        <option>Vietnamese</option>
                        <option>Chinese</option>
                        <option>Korean</option>
                        <option>Thai</option>
                        <option>Indonesian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                        Translation Process
                      </label>
                      <select
                        value={translationProcess}
                        onChange={(e) => setTranslationProcess(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                      >
                        <option>Professional Translation</option>
                        <option>Quick Translation</option>
                        <option>High Accuracy</option>
                        <option>Creative Adaptation</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={handleTranslation}
                        disabled={!hasDocument || isTranslating}
                        className="w-full bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito"
                      >
                        {isTranslating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Start Translation
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Panel - Upload */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
                        Upload Documents
                      </h3>

                      <div className="border-2 border-dashed border-[#a4a7ae] rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-[#19398f] mx-auto mb-4" />
                        <p className="text-sm text-[#717680] font-nunito mb-4">
                          <span className="text-[#19398f] font-semibold">
                            Drag & drop
                          </span>{' '}
                          documents here
                        </p>
                        <p className="text-xs text-[#717680] font-nunito mb-4">
                          DOCX • PDF • XLSX • PPTX • TXT
                        </p>
                        <Button
                          onClick={handleFileUpload}
                          className="bg-[#19398f] hover:bg-[#142457] text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>

                      {/* Status indicator */}
                      {hasDocument && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700 font-nunito">
                            ✓ Sample business proposal uploaded successfully.
                            Ready for translation.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Panel - Document Preview */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                            Document Preview
                          </h3>
                          {hasDocument && (
                            <span className="text-sm text-[#717680] font-nunito">
                              2,847 words
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        {hasDocument ? (
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <h4 className="text-lg font-bold text-[#414651] font-nunito mb-2">
                                Business Proposal: Digital Transformation
                                Initiative
                              </h4>
                              <p className="text-sm text-[#717680] font-nunito leading-relaxed">
                                Executive Summary - This document outlines our
                                comprehensive digital transformation strategy to
                                modernize our operations and improve customer
                                experience...
                              </p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <h4 className="text-lg font-bold text-[#414651] font-nunito mb-2">
                                Key Objectives
                              </h4>
                              <ul className="text-sm text-[#717680] font-nunito space-y-1">
                                <li>
                                  • Streamline internal processes through
                                  automation
                                </li>
                                <li>
                                  • Enhance customer engagement via digital
                                  channels
                                </li>
                                <li>• Improve data analytics capabilities</li>
                                <li>• Ensure scalability for future growth</li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-[#414651] font-nunito mb-2">
                              No document loaded
                            </h4>
                            <p className="text-sm text-[#717680] font-nunito">
                              Upload a document to see preview and start
                              translation
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Review Panel - Before/After Translation */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowReview(false)}
                      className="border-gray-300 hover:border-[#19398f] hover:text-[#19398f]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Settings
                    </Button>
                    <h2 className="text-xl font-bold text-[#414651] font-nunito">
                      Translation Review
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#717680] font-nunito">
                      2,847 words translated
                    </span>
                    <Button
                      onClick={handleDownload}
                      className="bg-[#19398f] hover:bg-[#142457] text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export DOCX
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original Document */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-[#19398f]" />
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                        Original ({sourceLanguage})
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                      <div className="text-sm text-[#414651] font-nunito leading-relaxed whitespace-pre-line">
                        {originalText}
                      </div>
                    </div>
                  </div>

                  {/* Translated Document */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                        Translation ({targetLanguage})
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                      <div className="text-sm text-[#414651] font-nunito leading-relaxed whitespace-pre-line">
                        {translatedText}
                      </div>
                    </div>
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
