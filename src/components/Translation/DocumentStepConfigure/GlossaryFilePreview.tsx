'use client';

import React from 'react';
import { FileJson, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlossaryFilePreviewProps {
  fileName: string;
  fileSize: number;
  onClear: () => void;
}

export function GlossaryFilePreview({
  fileName,
  fileSize,
  onClear,
}: GlossaryFilePreviewProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <FileJson className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{fileName}</p>
          <p className="text-xs text-gray-600">
            {(fileSize / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      <Button
        onClick={onClear}
        variant="ghost"
        size="icon"
        className="hover:bg-purple-100 rounded-lg"
      >
        <X className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
  );
}
