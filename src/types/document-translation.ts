import React from 'react';

export type DTStep = 'upload' | 'configure' | 'review';

export type StepDef = {
  number: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};
