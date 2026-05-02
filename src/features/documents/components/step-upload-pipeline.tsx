'use client';

import { CheckCircle2, CloudUpload, Loader2, ScanSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { UploadPipelineStatus } from '../utils/document-wizard-selectors';

const PIPELINE_STEPS = [
  { key: 'uploading', icon: CloudUpload, label: 'pipelineUploading' },
  { key: 'confirming', icon: CheckCircle2, label: 'pipelineConfirming' },
  { key: 'analyzing', icon: ScanSearch, label: 'pipelineAnalyzing' },
] as const;

type PipelineStepKey = (typeof PIPELINE_STEPS)[number]['key'];
type PipelineVisualState = 'pending' | 'active' | 'done';

function getPipelineStepState(
  stepKey: PipelineStepKey,
  currentStatus: UploadPipelineStatus,
): PipelineVisualState {
  const order: PipelineStepKey[] = ['uploading', 'confirming', 'analyzing'];
  const currentIdx = order.indexOf(currentStatus as PipelineStepKey);
  const stepIdx = order.indexOf(stepKey);

  if (currentIdx < 0) return 'pending';
  if (stepIdx < currentIdx) return 'done';
  if (stepIdx === currentIdx) return 'active';
  return 'pending';
}

interface StepUploadPipelineProps {
  pipelineStatus: UploadPipelineStatus;
}

export function StepUploadPipeline({
  pipelineStatus,
}: StepUploadPipelineProps) {
  const t = useTranslations('documents.upload');

  return (
    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-around gap-1 sm:gap-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const state = getPipelineStepState(step.key, pipelineStatus);
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex items-center gap-1 sm:gap-2">
              {idx > 0 ? (
                <div
                  className={cn(
                    'h-px w-8 shrink-0 sm:w-12 md:w-24',
                    state === 'pending' ? 'bg-border' : 'bg-primary/40',
                  )}
                />
              ) : null}

              <div
                className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all',
                  state === 'done' && 'bg-primary/15 text-primary',
                  state === 'active' &&
                    'bg-primary/20 text-primary ring-2 ring-primary/20',
                  state === 'pending' && 'bg-muted text-muted-foreground',
                )}
              >
                {state === 'done' ? (
                  <CheckCircle2 className="size-3.5 shrink-0" />
                ) : state === 'active' ? (
                  <Loader2 className="size-3.5 shrink-0 animate-spin" />
                ) : (
                  <Icon className="size-3.5 shrink-0" />
                )}
                <span className="hidden sm:inline">
                  {t(step.label, { defaultMessage: step.key })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
