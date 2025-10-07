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
  Film,
  Sparkles,
  RefreshCw,
  FileText,
  Tag,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/src/temp/Sidebar';

interface SubtitleFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  duration: string;
  language: string;
  subtitleCount: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
}

interface MovieContext {
  title: string;
  year: string;
  season?: string;
  episode?: string;
  genre: string[];
  director?: string;
  cast: string[];
  plot: string;
  confidence: number;
  sourceType: 'movie' | 'tv_show' | 'documentary' | 'other';
}

interface SubtitleEntry {
  id: string;
  startTime: string;
  endTime: string;
  originalText: string;
  translatedText: string;
  speaker?: string;
  context?: string;
  isEdited: boolean;
}

export function SubtitleTranslationInterface() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Configure, 3: Review
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
  const [showReview, setShowReview] = useState(false);
  const [selectedSubtitleId, setSelectedSubtitleId] = useState<string | null>(
    null
  );

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

  // Enhanced context detection from subtitle content
  const detectMovieContext = (
    fileName: string,
    subtitleContent?: string
  ): MovieContext => {
    // In a real implementation, this would use AI to analyze the subtitle content
    // For demo, we'll simulate different types based on filename
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
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

      // Auto-detect movie context for first file
      if (newFiles.length > 0) {
        const context = detectMovieContext(newFiles[0].fileName);
        setMovieContext(context);
        setSelectedFile(newFiles[0]);
        setOriginalSubtitles(sampleSubtitles);
      }
      setCurrentStep(2);
    }
  };

  const handleTranslation = async () => {
    setIsProcessing(true);

    // Simulate translation process with AI context analysis
    setTimeout(() => {
      const translatedSubtitles = sampleSubtitles.map((subtitle, index) => ({
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

      setTranslatedSubtitles(translatedSubtitles);
      setIsProcessing(false);
      setShowReview(true);
      setCurrentStep(3);
    }, 3000);
  };

  const handleEditTranslation = (id: string, newText: string) => {
    setTranslatedSubtitles((prev) =>
      prev.map((subtitle) =>
        subtitle.id === id
          ? { ...subtitle, translatedText: newText, isEdited: true }
          : subtitle
      )
    );
  };

  const handleExport = () => {
    // In a real implementation, this would export the translated subtitles
    console.log('Exporting translated subtitles:', translatedSubtitles);
  };

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
                  Subtitle Translator
                </h1>
                <p className="text-sm text-gray-600">
                  AI-powered context-aware translation for movies, TV shows, and
                  video content
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 lg:gap-3">
                {[
                  { number: 1, label: 'Upload', icon: Upload },
                  { number: 2, label: 'Configure', icon: Settings },
                  { number: 3, label: 'Review', icon: Eye },
                ].map((step, index) => {
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
                            <CheckCircle className="w-5 h-5" />
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
                      {index < 2 && (
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
              <div className="space-y-6">
                {/* Upload Area */}
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
                        onChange={handleFileUpload}
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

                {/* Features (subtitle-specific) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Context-Aware Translation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automatic movie/TV show context detection for more
                      accurate, natural translations
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
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Document Info */}
                {selectedFile && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        File Information
                      </h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Change files
                      </button>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileVideo className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 mb-1">
                          {selectedFile.fileName}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>{selectedFile.fileType}</span>
                          <span>•</span>
                          <span>{selectedFile.fileSize}</span>
                          <span>•</span>
                          <span>{selectedFile.subtitleCount} subtitles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Translation Settings */}
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
                        value={translationMode}
                        onChange={(e) => setTranslationMode(e.target.value)}
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

                  {movieContext && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <p className="text-sm text-amber-800">
                        <strong>Detected context:</strong> {movieContext.title}{' '}
                        • {movieContext.year} • {movieContext.genre.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtitle Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Subtitle Preview
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                      {originalSubtitles.length > 0 ? (
                        <div className="space-y-2">
                          {originalSubtitles.slice(0, 8).map((subtitle) => (
                            <div
                              key={subtitle.id}
                              className="p-3 border border-gray-200 rounded-lg bg-white"
                            >
                              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {subtitle.startTime} → {subtitle.endTime}
                                </span>
                              </div>
                              <p className="text-sm text-gray-800">
                                {subtitle.originalText}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-sm text-gray-600">
                          No subtitles loaded yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleTranslation}
                    disabled={!selectedFile || isProcessing}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Processing...
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
              <div className="space-y-6">
                {/* Success Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">
                        Translation Complete!
                      </h3>
                      <p className="text-green-50">
                        Your subtitles have been translated and are ready for
                        review.
                      </p>
                    </div>
                    <button
                      onClick={handleExport}
                      className="bg-white hover:bg-green-50 text-green-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Export SRT
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

                {/* Side by Side Review */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          Original ({sourceLanguage})
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                        <div className="space-y-3">
                          {originalSubtitles.map((s) => (
                            <div key={s.id} className="text-sm text-gray-800">
                              <span className="text-gray-500 mr-2">
                                {s.startTime} → {s.endTime}
                              </span>
                              {s.originalText}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border-2 border-green-200">
                    <div className="px-6 py-4 border-b border-green-200 bg-green-50 rounded-t-2xl">
                      <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-900">
                          Translation ({targetLanguage})
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-green-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                        <div className="space-y-3">
                          {translatedSubtitles.map((s) => (
                            <div key={s.id} className="text-sm text-gray-800">
                              <span className="text-gray-500 mr-2">
                                {s.startTime} → {s.endTime}
                              </span>
                              {s.translatedText}
                            </div>
                          ))}
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
                      setShowReview(false);
                      setSelectedFile(null);
                      setOriginalSubtitles([]);
                      setTranslatedSubtitles([]);
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
                      onClick={handleExport}
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
