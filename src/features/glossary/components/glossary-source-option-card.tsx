'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlossarySourceOptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function GlossarySourceOptionCard({
  title,
  description,
  icon: Icon,
  isActive,
  onClick,
}: GlossarySourceOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/30 hover:bg-muted/40',
      )}
    >
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-lg border',
          isActive
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'border-border bg-background text-muted-foreground',
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="space-y-1">
        <p
          className={cn(
            'text-sm font-medium',
            isActive ? 'text-primary' : 'text-foreground',
          )}
        >
          {title}
        </p>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
