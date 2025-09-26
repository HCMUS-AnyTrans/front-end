"use client";

import React, { useState } from "react";
import { Upload, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewModal } from "@/src/components/PreviewModal";
import { Sidebar } from "@/src/components/Sidebar";

export function DocumentTranslatorInterface() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);

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
    console.log("File uploaded successfully");
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    // In a real implementation, this would trigger a DOCX download
    console.log("Downloading translated document...");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-none">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#414651] font-nunito leading-tight mb-1">
              Document Translator
            </h1>
            <p className="text-sm text-[#717680] font-nunito">
              Translate your documents in seconds — accurate, fast, and beautifully formatted
            </p>
          </div>
        </div>

        <div className="flex-1 px-8 py-6">
          <div className="max-w-6xl mx-auto">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl border border-[#d5d7da] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                Source language
              </label>
              <select className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent">
                <option>Choose language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                Target language
              </label>
              <select className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-slate-900 font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent">
                <option>Vietnamese</option>
                <option>Chinese</option>
                <option>Japanese</option>
                <option>Korean</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                Process
              </label>
              <select className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent">
                <option>Professional Translation</option>
                <option>Quick Translation</option>
                <option>High Accuracy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-black mb-2 font-nunito">
                Domain
              </label>
              <select className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent">
                <option>Auto detect</option>
                <option>Business</option>
                <option>Technical</option>
                <option>Legal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="rounded-xl border-2 border-dashed border-[#a4a7ae] p-16 mb-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <Upload className="w-16 h-16 text-[#19398f]" strokeWidth={1.5} />
            </div>
            <div className="max-w-md">
              <p className="text-sm text-[#717680] font-nunito">
                <span className="text-[#19398f] font-semibold">Drag and drop</span>{" "}
                here to upload multiple files
                <br />
                File types supported: MS Word (.docx), PDF, MS Excel (.xlsx), MS PowerPoint (.pptx), Text File (.txt) | The maximum file size: 300MB
              </p>
            </div>
            <Button 
              onClick={handleFileUpload}
              className="bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito"
            >
              <FileText className="w-4 h-4 mr-2" />
              Upload Sample Document
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            className="bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito px-8"
            disabled={!hasDocument}
          >
            Translation
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handlePreview}
            className="border-[#19398f] text-[#19398f] hover:bg-[#19398f] hover:text-white font-semibold font-nunito px-8"
            disabled={!hasDocument}
          >
            Preview
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="border-[#19398f] text-[#19398f] hover:bg-[#19398f] hover:text-white font-semibold font-nunito px-8"
            disabled={!hasDocument}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

            {/* Status indicator */}
            {hasDocument && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-nunito">
                  ✓ Sample business proposal uploaded successfully. Ready for translation and preview.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        originalText={originalText}
        translatedText={translatedText}
        onDownload={handleDownload}
      />
    </div>
  );
}
