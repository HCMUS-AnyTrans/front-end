'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  RefreshCw,
  Zap,
  AlertCircle,
  Upload,
  X,
  FileJson,
  Info,
  Briefcase,
  Sparkles,
} from 'lucide-react';

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

// Shadcn-style components
const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 pb-6">{children}</div>
);

const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold text-gray-900 mb-2"
  >
    {children}
  </label>
);

const Select = ({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  >
    {children}
  </select>
);

const Textarea = ({
  placeholder,
  rows = 6,
  value,
  onChange,
}: {
  placeholder: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
  />
);

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  className?: string;
}) => {
  const baseClasses =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm';
  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:from-gray-400 disabled:to-gray-500'
      : 'bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Document Information
            </h3>
            <button
              onClick={onBack}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Change file
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Translation Settings
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label htmlFor="source-lang">Source Language</Label>
              <Select
                value={sourceLanguage}
                onChange={(e) => onChangeSource(e.target.value)}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
                <option>Chinese</option>
                <option>Korean</option>
                <option>Vietnamese</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="target-lang">Target Language</Label>
              <Select
                value={targetLanguage}
                onChange={(e) => onChangeTarget(e.target.value)}
              >
                <option>Vietnamese</option>
                <option>Chinese</option>
                <option>Korean</option>
                <option>Thai</option>
                <option>Indonesian</option>
                <option>Japanese</option>
                <option>English</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="translation-mode">Translation Mode</Label>
              <Select
                value={translationProcess}
                onChange={(e) => onChangeProcess(e.target.value)}
              >
                <option value="context-aware">
                  Context-Aware (Recommended)
                </option>
                <option value="literal">Literal Translation</option>
                <option value="creative">Creative Adaptation</option>
                <option value="formal">Formal/Documentary</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Context-aware mode provides better accuracy
              by understanding the document's context and terminology.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Topic/Domain Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Topic (Domain)
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Select the content domain to improve translation accuracy with
            specialized terminology
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="topic">Content Domain</Label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>

            {/* Domain Info */}
            {topic === 'auto-detect' && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  AI will automatically detect the content domain based on your
                  document's terminology and context.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Custom Glossary Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-gray-700" />
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
            <button
              onClick={() => setShowGlossaryInfo(!showGlossaryInfo)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              <Info className="w-4 h-4" />
              Help
            </button>
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
        <CardContent>
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setGlossaryMode('upload')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                glossaryMode === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setGlossaryMode('paste')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                glossaryMode === 'paste'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Paste Content
            </button>
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
              <button
                onClick={removeGlossary}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
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
                  <button
                    onClick={removeGlossary}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Ready to Translate
          </h3>
        </CardHeader>
        <CardContent>
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
              <p className="text-2xl font-bold text-blue-600">28</p>
              <p className="text-xs text-gray-600">credits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={onTranslate}
          disabled={isTranslating}
          className="px-8 py-4 text-lg"
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
        </Button>
      </div>
    </div>
  );
}
