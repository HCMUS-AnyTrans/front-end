'use client';

import React from 'react';
import { ArrowLeft, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ConfigureActionButtonsProps } from './types';

export default function ConfigureActionButtons({
  onBack,
  onTranslate,
  isProcessing,
  disabled = false,
  translateButtonText = 'Start Translation',
  processingText = 'Processing...',
  backButtonText = 'Back',
}: ConfigureActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        onClick={onBack}
        variant="outline"
        size="xl"
        className="border-2 border-gray-300 hover:border-gray-400 rounded-xl shadow-sm h-14"
      >
        <ArrowLeft className="w-4 h-4" />
        {backButtonText}
      </Button>
      <Button
        onClick={onTranslate}
        disabled={disabled || isProcessing}
        variant="gradient"
        size="2xl"
        className="h-14"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            {processingText}
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            {translateButtonText}
          </>
        )}
      </Button>
    </div>
  );
}
