'use client';

import { useId } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { getDomainLabel, useDomains } from '@/features/domains';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { glossaryLanguages, type CreateGlossaryFormValues } from '../data';

interface CreateGlossaryStepOneProps {
  form: UseFormReturn<CreateGlossaryFormValues>;
}

export function CreateGlossaryStepOne({ form }: CreateGlossaryStepOneProps) {
  const id = useId();
  const locale = useLocale();
  const t = useTranslations('glossary');
  const { domains, isLoading: isLoadingDomains } = useDomains();
  const glossaryDomains = domains.filter((domain) => domain.key !== 'auto');

  return (
    <div className="px-8 pb-4">
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${id}-name`}>{t('name')}</FieldLabel>
              <Input
                {...field}
                id={`${id}-name`}
                aria-invalid={fieldState.invalid}
                placeholder={t('form.namePlaceholder')}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="domain"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              data-disabled={isLoadingDomains}
            >
              <FieldLabel>{t('domain')}</FieldLabel>
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                disabled={isLoadingDomains}
                variant="outline"
                spacing={3}
                aria-invalid={fieldState.invalid}
                className="grid w-full grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:grid-cols-5 lg:grid-cols-7"
              >
                {glossaryDomains.map((domain) => {
                  const Icon = domain.icon;
                  const isSelected = field.value === domain.key;

                  return (
                    <ToggleGroupItem
                      key={domain.id}
                      value={domain.key}
                      className={cn(
                        'h-auto min-h-24 items-start justify-start rounded-xl px-3 py-3 text-left',
                        'flex-col gap-2 whitespace-normal',
                        isSelected
                          ? 'border-primary/90 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                          : 'bg-card text-foreground hover:border-primary/50 hover:bg-muted/70 hover:text-foreground',
                      )}
                    >
                      <Icon
                        className={cn(
                          isSelected
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground',
                        )}
                      />
                      <span className="text-xs font-medium leading-relaxed">
                        {getDomainLabel(domain, locale)}
                      </span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
              {isLoadingDomains ? (
                <FieldDescription>
                  {t('stepTwo.templateLoading')}
                </FieldDescription>
              ) : null}
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <FieldSet>
          <FieldLegend variant="label">{t('form.languagePair')}</FieldLegend>
          <FieldGroup className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <Controller
              control={form.control}
              name="srcLang"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="min-w-0 flex-1"
                >
                  <FieldLabel htmlFor={`${id}-src-lang`} className="sr-only">
                    {t('form.srcLangPlaceholder')}
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={`${id}-src-lang`}
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder={t('form.srcLangPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {glossaryLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {t(`languages.${lang.code}`)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <div className="flex size-8 shrink-0 items-center justify-center self-center rounded-full bg-muted text-muted-foreground sm:mt-2 sm:self-auto sm:rotate-0 rotate-90">
              <ArrowRightLeft className="size-4" />
            </div>

            <Controller
              control={form.control}
              name="tgtLang"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="min-w-0 flex-1"
                >
                  <FieldLabel htmlFor={`${id}-tgt-lang`} className="sr-only">
                    {t('form.tgtLangPlaceholder')}
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={`${id}-tgt-lang`}
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder={t('form.tgtLangPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {glossaryLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {t(`languages.${lang.code}`)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
