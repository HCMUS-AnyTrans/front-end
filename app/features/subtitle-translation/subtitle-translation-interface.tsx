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
  Globe,
  Sparkles,
  RefreshCw,
  Search,
  FileText,
  Calendar,
  User,
  Tag,
  BookOpen,
  ArrowRight,
  Copy,
  Edit3,
  Save,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/src/components/Sidebar';

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
                  Subtitle Translation
                </h1>
                <p className="text-sm text-[#717680] font-nunito">
                  AI-powered context-aware translation for movies, TV shows, and
                  video content
                </p>
              </div>

              <div className="flex items-center gap-3">
                {showReview && (
                  <Button
                    onClick={handleExport}
                    className="bg-[#19398f] hover:bg-[#142457] text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
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
                        Translation Mode
                      </label>
                      <select
                        value={translationMode}
                        onChange={(e) => setTranslationMode(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e9eaeb] rounded-md text-sm text-[#717680] font-nunito focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                      >
                        <option value="context-aware">
                          Context-Aware (Recommended)
                        </option>
                        <option value="literal">Literal Translation</option>
                        <option value="creative">Creative Adaptation</option>
                        <option value="formal">Formal/Documentary</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={handleTranslation}
                        disabled={!selectedFile || isProcessing}
                        className="w-full bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
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
                  {/* Left Panel - Upload & Context */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* File Upload */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
                        Upload Subtitle Files
                      </h3>

                      <div className="border-2 border-dashed border-[#a4a7ae] rounded-lg p-8 text-center">
                        <Film className="w-12 h-12 text-[#19398f] mx-auto mb-4" />
                        <p className="text-sm text-[#717680] font-nunito mb-4">
                          <span className="text-[#19398f] font-semibold">
                            Drag & drop
                          </span>{' '}
                          subtitle files here
                        </p>
                        <p className="text-xs text-[#717680] font-nunito mb-4">
                          SRT • VTT • ASS • SSA • MP4
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".srt,.vtt,.ass,.ssa,.mp4"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="subtitle-upload"
                        />
                        <Button
                          onClick={() =>
                            document.getElementById('subtitle-upload')?.click()
                          }
                          className="bg-[#19398f] hover:bg-[#142457] text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>

                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file) => (
                            <div
                              key={file.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedFile?.id === file.id
                                  ? 'border-[#19398f] bg-[#eaf4ff]'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedFile(file)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileVideo className="w-5 h-5 text-[#19398f]" />
                                  <div>
                                    <p className="text-sm font-medium text-[#414651] font-nunito">
                                      {file.fileName}
                                    </p>
                                    <p className="text-xs text-[#717680] font-nunito">
                                      {file.fileType} • {file.fileSize} •{' '}
                                      {file.subtitleCount} subtitles
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      file.status === 'uploaded'
                                        ? 'bg-green-100 text-green-700'
                                        : file.status === 'processing'
                                          ? 'bg-blue-100 text-blue-700'
                                          : file.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                  >
                                    {file.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Movie Context Detection */}
                    {movieContext && (
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-[#19398f]" />
                          <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                            Content Analysis
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {movieContext.confidence}% match
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {movieContext.sourceType === 'tv_show' && (
                                <Tag className="w-4 h-4 text-blue-500" />
                              )}
                              {movieContext.sourceType === 'movie' && (
                                <Film className="w-4 h-4 text-purple-500" />
                              )}
                              {movieContext.sourceType === 'documentary' && (
                                <BookOpen className="w-4 h-4 text-green-500" />
                              )}
                              <h4 className="text-lg font-bold text-[#414651] font-nunito">
                                {movieContext.title} ({movieContext.year})
                              </h4>
                            </div>

                            {movieContext.season && movieContext.episode && (
                              <p className="text-sm text-[#19398f] font-nunito mb-2">
                                {movieContext.season} • {movieContext.episode}
                              </p>
                            )}

                            <p className="text-sm text-[#717680] font-nunito">
                              {movieContext.genre.join(' • ')}
                            </p>
                          </div>

                          <div className="text-sm text-[#717680] font-nunito space-y-1">
                            {movieContext.director && (
                              <p>
                                <span className="font-semibold">Director:</span>{' '}
                                {movieContext.director}
                              </p>
                            )}
                            <p>
                              <span className="font-semibold">Cast:</span>{' '}
                              {movieContext.cast.slice(0, 3).join(', ')}
                            </p>
                          </div>

                          <div className="text-sm text-[#717680] font-nunito">
                            <p className="font-semibold mb-1">Plot:</p>
                            <p>{movieContext.plot}</p>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-nunito">
                              Context verified - Ready for translation
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Panel - Original Subtitles Preview */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                            Subtitle Preview
                          </h3>
                          {originalSubtitles.length > 0 && (
                            <span className="text-sm text-[#717680] font-nunito">
                              {originalSubtitles.length} subtitles
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        {originalSubtitles.length > 0 ? (
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {originalSubtitles.map((subtitle) => (
                              <div
                                key={subtitle.id}
                                className="p-3 border border-gray-200 rounded-lg hover:border-[#19398f] hover:bg-[#f8fafc] transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-7 h-7 bg-[#19398f] bg-opacity-10 rounded-lg flex items-center justify-center">
                                      <span className="text-xs font-bold text-[#19398f]">
                                        {subtitle.id}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="flex items-center gap-1 text-xs text-[#717680] font-nunito">
                                        <Clock className="w-3 h-3" />
                                        <span>{subtitle.startTime}</span>
                                      </div>
                                      <ArrowRight className="w-3 h-3 text-gray-400" />
                                      <div className="flex items-center gap-1 text-xs text-[#717680] font-nunito">
                                        <Clock className="w-3 h-3" />
                                        <span>{subtitle.endTime}</span>
                                      </div>
                                    </div>

                                    <p className="text-sm text-[#414651] font-nunito leading-relaxed">
                                      {subtitle.originalText}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-[#414651] font-nunito mb-2">
                              No subtitles loaded
                            </h4>
                            <p className="text-sm text-[#717680] font-nunito">
                              Upload a subtitle file to see preview and start
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
                      {translatedSubtitles.length} subtitles
                    </span>
                    <Button
                      onClick={handleExport}
                      className="bg-[#19398f] hover:bg-[#142457] text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export SRT
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original Subtitles */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-[#19398f]" />
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                        Original ({sourceLanguage})
                      </h3>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {originalSubtitles.map((subtitle) => (
                        <div
                          key={subtitle.id}
                          className="p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 bg-[#19398f] bg-opacity-10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-[#19398f]">
                                  {subtitle.id}
                                </span>
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-medium text-[#717680] font-nunito">
                                  {subtitle.startTime} → {subtitle.endTime}
                                </span>
                              </div>

                              <p className="text-sm text-[#414651] font-nunito">
                                {subtitle.originalText}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Translated Subtitles */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Languages className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-[#414651] font-nunito">
                        Translation ({targetLanguage})
                      </h3>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {translatedSubtitles.map((subtitle) => (
                        <div
                          key={subtitle.id}
                          className={`p-3 border rounded-lg ${
                            subtitle.isEdited
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  subtitle.isEdited
                                    ? 'bg-blue-100'
                                    : 'bg-green-100'
                                }`}
                              >
                                <span
                                  className={`text-xs font-bold ${
                                    subtitle.isEdited
                                      ? 'text-blue-700'
                                      : 'text-green-700'
                                  }`}
                                >
                                  {subtitle.id}
                                </span>
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-medium text-[#717680] font-nunito">
                                  {subtitle.startTime} → {subtitle.endTime}
                                </span>
                                {subtitle.isEdited && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    Edited
                                  </span>
                                )}
                              </div>

                              <textarea
                                value={subtitle.translatedText}
                                onChange={(e) =>
                                  handleEditTranslation(
                                    subtitle.id,
                                    e.target.value
                                  )
                                }
                                className="w-full text-sm text-[#414651] font-nunito bg-transparent border-none resize-none focus:outline-none"
                                rows={2}
                                placeholder="Translation will appear here..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
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
