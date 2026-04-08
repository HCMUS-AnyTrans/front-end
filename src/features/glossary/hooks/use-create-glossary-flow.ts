'use client';

import { useState } from 'react';
import { resetSourceSpecificState, type GlossarySourceType } from '../data';

export function useCreateGlossaryFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const [sourceType, setSourceType] = useState<GlossarySourceType>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const reset = () => {
    setStep(1);
    setSourceType(null);
    setSelectedTemplateId(null);
    setDocumentFiles([]);
  };

  const changeSourceType = (nextSourceType: GlossarySourceType) => {
    const nextState = resetSourceSpecificState({
      nextSourceType,
      selectedTemplateId,
      documentFiles,
    });

    setSourceType(nextSourceType);
    setSelectedTemplateId(nextState.selectedTemplateId);
    setDocumentFiles(nextState.documentFiles as File[]);
  };

  return {
    step,
    setStep,
    sourceType,
    changeSourceType,
    selectedTemplateId,
    setSelectedTemplateId,
    documentFiles,
    setDocumentFiles,
    reset,
  };
}
