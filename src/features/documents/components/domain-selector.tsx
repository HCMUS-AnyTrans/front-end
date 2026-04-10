'use client';

import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface DomainOption {
  id: string;
  key: string;
  label: string;
  icon: LucideIcon;
}

interface DomainSelectorProps {
  domains: DomainOption[];
  value: string;
  selectedDomainKey?: string | null;
  customValue: string;
  isLoading?: boolean;
  onChange: (domainId: string) => void;
  onCustomValueChange: (value: string) => void;
}

export function DomainSelector({
  domains,
  value,
  selectedDomainKey,
  customValue,
  isLoading,
  onChange,
  onCustomValueChange,
}: DomainSelectorProps) {
  const t = useTranslations('documents');

  return (
    <div>
      <Label className="mb-2 block">{t('configure.domainLabel')}</Label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onChange(domain.id)}
              disabled={isLoading}
              className={cn(
                'flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center transition-all',
                value === domain.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-foreground hover:bg-muted/50',
                isLoading && 'cursor-wait opacity-70',
              )}
            >
              <Icon className="size-4" />
              <span className="text-xs font-medium">{domain.label}</span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="mt-3 text-xs text-muted-foreground">
          {t('configure.savedGlossaryLoading')}
        </p>
      ) : null}

      {selectedDomainKey === 'other' ? (
        <div className="mt-3 space-y-2">
          <Label htmlFor="custom-domain-input" className="text-sm">
            {t('configure.customDomainLabel')}
          </Label>
          <Input
            id="custom-domain-input"
            value={customValue}
            onChange={(event) => onCustomValueChange(event.target.value)}
            placeholder={t('configure.customDomainPlaceholder')}
          />
          <p className="text-xs text-muted-foreground">
            {t('configure.customDomainDescription')}
          </p>
        </div>
      ) : null}
    </div>
  );
}
