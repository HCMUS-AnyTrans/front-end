// FILE: app/[locale]/features/document-translation/document-translator-interface.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, Eye, Settings } from 'lucide-react';
import {
  StepHeader,
  StepUpload,
  StepReview,
  DocumentStepConfigure,
} from '@/components/Translation';
import type { TranslationStep, StepDef } from '@/types/translation';

export default function DocumentTranslatorClient() {
  const t = useTranslations('documentTranslation');
  const [currentStep, setCurrentStep] = useState<TranslationStep>('upload');
  const [hasDocument, setHasDocument] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Vietnamese');
  const [translationProcess, setTranslationProcess] = useState('context-aware');

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

  const steps: StepDef[] = [
    { number: 1, label: t('steps.upload'), icon: Upload },
    { number: 2, label: t('steps.configure'), icon: Settings },
    { number: 3, label: t('steps.review'), icon: Eye },
  ];

  const handleFileUpload = () => {
    setHasDocument(true);
    setCurrentStep('configure');
  };

  const handleTranslation = async () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      setCurrentStep('review');
    }, 3000);
  };

  const handleDownload = () => {
    console.log('Downloading translated document...');
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setHasDocument(false);
    setIsTranslating(false);
  };

  const handleTranslateAnother = () => {
    setCurrentStep('upload');
    setHasDocument(false);
    setIsTranslating(false);
    setSourceLanguage('English');
    setTargetLanguage('Vietnamese');
    setTranslationProcess('context-aware');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <StepHeader
        currentStep={currentStep}
        steps={steps}
        onBackToUpload={handleBackToUpload}
        title={t('header.title')}
        description={t('header.description')}
      />

      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'upload' && (
            <StepUpload variant="document" onUpload={handleFileUpload} />
          )}

          {currentStep === 'configure' && (
            <DocumentStepConfigure
              fileName="Business_Proposal_2024.docx"
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              translationProcess={translationProcess}
              onChangeSource={setSourceLanguage}
              onChangeTarget={setTargetLanguage}
              onChangeProcess={setTranslationProcess}
              onBack={() => setCurrentStep('upload')}
              onTranslate={handleTranslation}
              isTranslating={isTranslating}
            />
          )}

          {currentStep === 'review' && (
            <StepReview
              variant="document"
              originalText={originalText}
              translatedText={translatedText}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onDownload={handleDownload}
              onTranslateAnother={handleTranslateAnother}
            />
          )}
        </div>
      </div>
    </div>
  );
}
