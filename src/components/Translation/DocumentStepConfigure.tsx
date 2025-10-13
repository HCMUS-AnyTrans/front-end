'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Upload,
  X,
  FileJson,
  Info,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TranslationSettingsCard, ConfigureActionButtons } from './shared';

type StepConfigureProps = {
  fileName: string;
  sourceLanguage: string;
  targetLanguage: string;
  translationProcess: string;
  onChangeSource: (value: string) => void;
  onChangeTarget: (value: string) => void;
  onChangeProcess: (value: string) => void;
  onBack: () => void;
  onTranslate: () => void;
  isTranslating: boolean;
};

export default function StepConfigure({
  fileName,
  sourceLanguage,
  targetLanguage,
  translationProcess,
  onChangeSource,
  onChangeTarget,
  onChangeProcess,
  onBack,
  onTranslate,
  isTranslating,
}: StepConfigureProps) {
  const [topic, setTopic] = useState('auto-detect');
  const [glossaryMode, setGlossaryMode] = useState<'upload' | 'paste'>(
    'upload'
  );
  const [glossaryFile, setGlossaryFile] = useState<File | null>(null);
  const [glossaryText, setGlossaryText] = useState('');
  const [showGlossaryInfo, setShowGlossaryInfo] = useState(false);

  // Topic/Domain options
  const topics = [
    { value: 'auto-detect', label: 'Auto Detect', icon: '🤖' },
    {
      value: 'information-technology',
      label: 'Information Technology',
      icon: '💻',
    },
    { value: 'medical', label: 'Medical & Healthcare', icon: '⚕️' },
    { value: 'marketing', label: 'Marketing & Advertising', icon: '📢' },
    { value: 'legal', label: 'Legal & Compliance', icon: '⚖️' },
    { value: 'education', label: 'Education & Academic', icon: '🎓' },
    { value: 'finance', label: 'Finance & Banking', icon: '💰' },
    { value: 'engineering', label: 'Engineering & Technical', icon: '⚙️' },
    { value: 'science', label: 'Science & Research', icon: '🔬' },
  ];

  const handleGlossaryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['.csv', '.txt', '.xlsx', '.xls'];
      const fileExtension = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase();

      if (!validTypes.some((type) => fileExtension === type)) {
        alert('Please upload a valid glossary file (CSV, TXT, or Excel)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Glossary file must be smaller than 5MB');
        return;
      }

      setGlossaryFile(file);
    }
  };

  const removeGlossary = () => {
    setGlossaryFile(null);
    setGlossaryText('');
  };

  return (
    <div className="space-y-6">
      {/* Document Information */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Document Information
            </h3>
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-sm text-[#4169E1] hover:text-[#1e3a8a] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Change file
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 mb-1">{fileName}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  2,847 words
                </span>
                <span>•</span>
                <span>DOCX</span>
                <span>•</span>
                <span>245 KB</span>
                <span>•</span>
                <span>8 pages</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Settings */}
      <TranslationSettingsCard
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        translationMode={translationProcess}
        onChangeSource={onChangeSource}
        onChangeTarget={onChangeTarget}
        onChangeMode={onChangeProcess}
        sourceLanguageOptions={[
          'English',
          'Spanish',
          'French',
          'German',
          'Japanese',
          'Chinese',
          'Korean',
          'Vietnamese',
        ]}
        targetLanguageOptions={[
          'Vietnamese',
          'Chinese',
          'Korean',
          'Thai',
          'Indonesian',
          'Japanese',
          'English',
        ]}
        showNote={true}
        noteText="Context-aware mode provides better accuracy by understanding the document's context and terminology."
      />

      {/* Topic/Domain Selection */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Topic (Domain)
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Select the content domain to improve translation accuracy with
            specialized terminology
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-3">
            <Label
              htmlFor="topic"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Content Domain
            </Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select content domain" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.icon} {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Domain Info */}
            {topic === 'auto-detect' && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Sparkles className="w-4 h-4 text-[#4169E1] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#1e3a8a]">
                  AI will automatically detect the content domain based on your
                  document's terminology and context.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Custom Glossary Section */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Custom Glossary
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  Optional
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Attach a glossary to ensure consistent terminology during
                translation
              </p>
            </div>
            <Button
              onClick={() => setShowGlossaryInfo(!showGlossaryInfo)}
              variant="ghost"
              size="sm"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <Info className="w-4 h-4" />
              Help
            </Button>
          </div>

          {showGlossaryInfo && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-900 font-semibold mb-2">
                What is a glossary?
              </p>
              <p className="text-sm text-purple-700 mb-3">
                A glossary is a list of terms and their preferred translations.
                Upload your glossary to ensure consistent translation of
                industry-specific terminology, brand names, or technical terms.
              </p>
              <div className="space-y-1">
                <p className="text-xs text-purple-600">
                  <strong>Supported formats:</strong> CSV, TXT, Excel (.xlsx,
                  .xls)
                </p>
                <p className="text-xs text-purple-600">
                  <strong>Example CSV format:</strong>
                </p>
                <code className="block text-xs bg-purple-100 text-purple-800 p-2 rounded mt-1">
                  source_term,target_term
                  <br />
                  API,API
                  <br />
                  cloud computing,điện toán đám mây
                </code>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => setGlossaryMode('upload')}
              variant={glossaryMode === 'upload' ? 'default' : 'secondary'}
              size="default"
              className={`flex-1 rounded-lg ${
                glossaryMode === 'upload'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button
              onClick={() => setGlossaryMode('paste')}
              variant={glossaryMode === 'paste' ? 'default' : 'secondary'}
              size="default"
              className={`flex-1 rounded-lg ${
                glossaryMode === 'paste'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Paste Content
            </Button>
          </div>

          {/* Upload Mode */}
          {glossaryMode === 'upload' && !glossaryFile && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all min-h-[200px] flex items-center justify-center">
              <input
                type="file"
                id="glossary-upload"
                accept=".csv,.txt,.xlsx,.xls"
                onChange={handleGlossaryUpload}
                className="hidden"
              />
              <label
                htmlFor="glossary-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Upload className="w-7 h-7 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  CSV, TXT, Excel (Max 5MB)
                </p>
              </label>
            </div>
          )}

          {/* Uploaded File Display */}
          {glossaryMode === 'upload' && glossaryFile && (
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <FileJson className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {glossaryFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {(glossaryFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                onClick={removeGlossary}
                variant="ghost"
                size="icon"
                className="hover:bg-purple-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
          )}

          {/* Paste Mode */}
          {glossaryMode === 'paste' && (
            <div>
              <Textarea
                placeholder="Paste your glossary here... (e.g., one term per line: source term | target term)"
                rows={8}
                value={glossaryText}
                onChange={(e) => setGlossaryText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
              />
              {glossaryText && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {
                      glossaryText.split('\n').filter((line) => line.trim())
                        .length
                    }{' '}
                    terms detected
                  </span>
                  <Button
                    onClick={removeGlossary}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-xl shadow-sm">
        <CardHeader className="p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4169E1]" />
            Ready to Translate
          </h3>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Languages</p>
              <p className="font-semibold text-gray-900 text-sm">
                {sourceLanguage} → {targetLanguage}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Mode</p>
              <p className="font-semibold text-gray-900 text-sm capitalize">
                {translationProcess.replace('-', ' ')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Domain</p>
              <p className="font-semibold text-gray-900 text-sm">
                {topics.find((t) => t.value === topic)?.label}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Glossary</p>
              <p className="font-semibold text-gray-900 text-sm">
                {glossaryFile || glossaryText ? (
                  <span className="text-purple-600">✓ Added</span>
                ) : (
                  <span className="text-gray-400">Not added</span>
                )}
              </p>
            </div>
          </div>

          {/* Estimated Credits */}
          <div className="mt-4 pt-4 border-t border-blue-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Estimated Credits
              </p>
              <p className="text-xs text-gray-600">
                Based on document size and settings
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#4169E1]">28</p>
              <p className="text-xs text-gray-600">credits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <ConfigureActionButtons
        onBack={onBack}
        onTranslate={onTranslate}
        isProcessing={isTranslating}
        disabled={false}
        translateButtonText="Start Translation"
        processingText="Translating..."
      />
    </div>
  );
}
