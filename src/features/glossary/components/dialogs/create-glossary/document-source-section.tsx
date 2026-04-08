'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { CreateGlossaryFormValues } from '../../../data';
import { GlossaryDocumentSourcePanel } from './document-source-panel';

type GlossaryDocumentSourceSectionProps = {
  form: UseFormReturn<CreateGlossaryFormValues>;
  domain: string;
  documentFiles: File[];
  onDocumentFilesChange: (files: File[]) => void;
};

export function GlossaryDocumentSourceSection({
  form,
  domain,
  documentFiles,
  onDocumentFilesChange,
}: GlossaryDocumentSourceSectionProps) {
  const t = useTranslations('glossary');

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {domain === 'other' ? (
        <div className="flex-none rounded-xl border bg-background/70 p-4">
          <FormField
            control={form.control}
            name="customizedDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('stepTwo.customDomainLabel')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('stepTwo.customDomainPlaceholder')}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  {t('stepTwo.customDomainDescription')}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : null}

      <div className="min-h-[320px] flex-1">
        <GlossaryDocumentSourcePanel
          files={documentFiles}
          onFilesChange={onDocumentFilesChange}
        />
      </div>
    </div>
  );
}
