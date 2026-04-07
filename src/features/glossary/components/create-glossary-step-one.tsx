'use client';

import { ArrowRightLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { getDomainLabel, useDomains } from '@/features/domains';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { glossaryLanguages, type CreateGlossaryFormValues } from '../data';

interface CreateGlossaryStepOneProps {
  form: UseFormReturn<CreateGlossaryFormValues>;
}

export function CreateGlossaryStepOne({ form }: CreateGlossaryStepOneProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const { domains, isLoading: isLoadingDomains } = useDomains();
  const glossaryDomains = domains.filter((domain) => domain.key !== 'auto');

  return (
    <div className="space-y-6 px-8 pb-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('name')}</FormLabel>
            <FormControl>
              <Input placeholder={t('form.namePlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="domain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('domain')}</FormLabel>
            <div className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
              {glossaryDomains.map((domain) => {
                const Icon = domain.icon;
                const isSelected = field.value === domain.key;

                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => field.onChange(domain.key)}
                    disabled={isLoadingDomains}
                    className={cn(
                      'flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/50',
                      isLoadingDomains && 'cursor-wait opacity-70'
                    )}
                  >
                    <Icon
                      className={cn(
                          'size-5',
                          isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                        )}
                    />
                    <span className="text-xs font-medium">{getDomainLabel(domain, locale)}</span>
                  </button>
                );
              })}
            </div>
            {isLoadingDomains ? (
              <p className="text-xs text-muted-foreground">{t('stepTwo.templateLoading')}</p>
            ) : null}
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <FormLabel className="mb-3 block">{t('form.languagePair')}</FormLabel>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <FormField
            control={form.control}
            name="srcLang"
            render={({ field }) => (
              <FormItem className="min-w-0 flex-1">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('form.srcLangPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {glossaryLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {t(`languages.${lang.code}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full bg-muted text-muted-foreground sm:rotate-0 rotate-90">
            <ArrowRightLeft className="size-4" />
          </div>

          <FormField
            control={form.control}
            name="tgtLang"
            render={({ field }) => (
              <FormItem className="min-w-0 flex-1">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('form.tgtLangPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {glossaryLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {t(`languages.${lang.code}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
