'use client';

import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { STStep, StepDef } from '@/src/types/subtitle-translation';

type STHeaderProps = {
  currentStep: STStep;
  steps: StepDef[];
  onBackToUpload: () => void;
};

export default function STHeader({
  currentStep,
  steps,
  onBackToUpload,
}: STHeaderProps) {
  const current =
    currentStep === 'upload' ? 1 : currentStep === 'configure' ? 2 : 3;

  return (
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

          <div className="flex items-center gap-2 lg:gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = current === step.number;
              const isCompleted = current > step.number;
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
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mb-6 ${current > step.number ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {currentStep !== 'upload' && (
            <button
              onClick={onBackToUpload}
              className="hidden lg:inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Change files
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
