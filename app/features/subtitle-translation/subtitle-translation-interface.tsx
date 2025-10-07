// FILE: app/features/subtitle-translation/subtitle-translation-client.tsx
'use client';

import React, { useState } from 'react';
import {
  Upload,
  Settings,
  Download,
  FileVideo,
  Clock,
  Languages,
  Zap,
  Eye,
  CheckCircle,
  Sparkles,
  RefreshCw,
  FileText,
  Tag,
} from 'lucide-react';
import StepHeader from '@/src/components/Translation/StepHeader';
import StepUpload from '@/src/components/Translation//StepUpload';
import StepConfigure from '@/src/components/Translation/SubtitleTranslation/StepConfigure';
import StepReview from '@/src/components/Translation/StepReview';
import type {
  TranslationStep,
  StepDef,
  SubtitleFile,
  MovieContext,
  SubtitleEntry,
} from '@/src/types/translation';

export default function SubtitleTranslationClient() {
  const [currentStep, setCurrentStep] = useState<TranslationStep>('upload'); // 'upload' | 'configure' | 'review'
  const [uploadedFiles, setUploadedFiles] = useState<SubtitleFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<SubtitleFile | null>(null);
  const [movieContext, setMovieContext] = useState<MovieContext | null>(null);
  const [originalSubtitles, setOriginalSubtitles] = useState<SubtitleEntry[]>(
    []
  );
  const [translatedSubtitles, setTranslatedSubtitles] = useState<
    SubtitleEntry[]
  >([]);
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Vietnamese');
  const [translationMode, setTranslationMode] = useState('context-aware');
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: StepDef[] = [
    { number: 1, label: 'Upload', icon: Upload },
    { number: 2, label: 'Configure', icon: Settings },
    { number: 3, label: 'Review', icon: Eye },
  ];

  // Sample subtitle data for demo
  const sampleSubtitles: SubtitleEntry[] = [
    {
      id: '1',
      startTime: '00:01:23,456',
      endTime: '00:01:26,789',
      originalText: "I can't believe we're actually doing this.",
      translatedText: '',
      isEdited: false,
    },
    {
      id: '2',
      startTime: '00:01:27,123',
      endTime: '00:01:30,456',
      originalText: 'The stakes have never been higher.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '3',
      startTime: '00:01:31,789',
      endTime: '00:01:35,123',
      originalText: 'But we have no choice. The world depends on us.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '4',
      startTime: '00:01:36,000',
      endTime: '00:01:39,500',
      originalText: 'This is our moment to make a difference.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '5',
      startTime: '00:01:40,000',
      endTime: '00:01:43,200',
      originalText: 'Are you ready for what comes next?',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '6',
      startTime: '00:01:44,000',
      endTime: '00:01:47,200',
      originalText: 'I can do this.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '7',
      startTime: '00:01:48,000',
      endTime: '00:01:51,200',
      originalText: 'I will not let you down.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '8',
      startTime: '00:01:52,000',
      endTime: '00:01:55,200',
      originalText: 'We will succeed.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '9',
      startTime: '00:01:56,000',
      endTime: '00:01:59,200',
      originalText: 'I believe in you.',
      translatedText: '',
      isEdited: false,
    },
    {
      id: '10',
      startTime: '00:02:00,000',
      endTime: '00:02:03,200',
      originalText: 'We will succeed.',
      translatedText: '',
      isEdited: false,
    },
  ];

  const detectMovieContext = (
    fileName: string,
    subtitleContent?: string
  ): MovieContext => {
    const isTVShow =
      fileName.toLowerCase().includes('s0') ||
      fileName.toLowerCase().includes('episode');
    const isDocumentary =
      fileName.toLowerCase().includes('documentary') ||
      fileName.toLowerCase().includes('doc');

    if (isTVShow) {
      return {
        title: 'Breaking Bad',
        year: '2008',
        season: 'Season 5',
        episode: 'Episode 14',
        genre: ['Crime', 'Drama', 'Thriller'],
        cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
        plot: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
        confidence: 92,
        sourceType: 'tv_show',
      };
    } else if (isDocumentary) {
      return {
        title: 'Planet Earth II',
        year: '2016',
        genre: ['Documentary', 'Nature', 'Wildlife'],
        cast: ['David Attenborough'],
        plot: "Wildlife documentary series exploring the unique characteristics of Earth's most iconic habitats.",
        confidence: 96,
        sourceType: 'documentary',
      };
    } else {
      return {
        title: 'The Last Guardian',
        year: '2023',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        director: 'Alex Rivera',
        cast: ['Emma Stone', 'Ryan Gosling', 'Michael Fassbender'],
        plot: 'A team of elite operatives must infiltrate a heavily guarded facility to prevent a global catastrophe.',
        confidence: 94,
        sourceType: 'movie',
      };
    }
  };

  const handleUpload = (files: FileList) => {
    const newFiles: SubtitleFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      fileName: file.name,
      fileType: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      duration: '01:45:23',
      language: 'English',
      subtitleCount: 1247,
      status: 'uploaded',
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    if (newFiles.length > 0) {
      const context = detectMovieContext(newFiles[0].fileName);
      setMovieContext(context);
      setSelectedFile(newFiles[0]);
      setOriginalSubtitles(sampleSubtitles);
    }

    setCurrentStep('configure');
  };

  const handleTranslate = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      const translated = sampleSubtitles.map((subtitle, index) => ({
        ...subtitle,
        translatedText:
          [
            'Tôi không thể tin là chúng ta thực sự đang làm điều này.',
            'Những rủi ro chưa bao giờ cao đến thế.',
            'Nhưng chúng ta không có lựa chọn nào khác. Thế giới đang trông cậy vào chúng ta.',
            'Đây là khoảnh khắc của chúng ta để tạo nên sự khác biệt.',
            'Bạn đã sẵn sàng cho những gì sắp tới chưa?',
          ][index] || '',
      }));
      setTranslatedSubtitles(translated);
      setIsProcessing(false);
      setCurrentStep('review');
    }, 3000);
  };

  const handleExport = () => {
    // Placeholder: actual export logic can be implemented later
    console.log('Exporting translated subtitles:', translatedSubtitles);
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setUploadedFiles([]);
    setSelectedFile(null);
    setMovieContext(null);
    setOriginalSubtitles([]);
    setTranslatedSubtitles([]);
    setIsProcessing(false);
  };

  const handleTranslateAnother = () => {
    setCurrentStep('upload');
    setUploadedFiles([]);
    setSelectedFile(null);
    setMovieContext(null);
    setOriginalSubtitles([]);
    setTranslatedSubtitles([]);
    setIsProcessing(false);
    setSourceLanguage('English');
    setTargetLanguage('Vietnamese');
    setTranslationMode('context-aware');
  };

  const handleFileUpload = () => {
    // This function will be called by the StepUpload component
    // For demo purposes, we'll simulate file selection
    const mockFile = new File([''], 'sample.srt', { type: 'text/plain' });

    // Create a mock FileList using DataTransfer
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);

    handleUpload(dataTransfer.files);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <StepHeader
        currentStep={currentStep}
        steps={steps}
        onBackToUpload={handleBackToUpload}
        title="Subtitle Translator"
        description="AI-powered context-aware translation for movies, TV shows, and video content"
      />

      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'upload' && (
            <StepUpload variant="subtitle" onUpload={handleFileUpload} />
          )}

          {currentStep === 'configure' && (
            <StepConfigure
              selectedFile={selectedFile}
              movieContext={movieContext}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              translationMode={translationMode}
              onChangeSource={setSourceLanguage}
              onChangeTarget={setTargetLanguage}
              onChangeMode={setTranslationMode}
              originalSubtitles={originalSubtitles}
              onBack={() => setCurrentStep('upload')}
              onTranslate={handleTranslate}
              isProcessing={isProcessing}
            />
          )}

          {currentStep === 'review' && (
            <StepReview
              variant="subtitle"
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              originalSubtitles={originalSubtitles}
              translatedSubtitles={translatedSubtitles}
              onExport={handleExport}
              onTranslateAnother={handleTranslateAnother}
            />
          )}
        </div>
      </div>
    </div>
  );
}
