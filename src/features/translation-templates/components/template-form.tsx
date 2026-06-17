'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, FileText, Loader2 } from 'lucide-react';
import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  getDefaultDocToneValue,
  getDocToneDescription,
  getDocToneLabel,
  useDocTones,
} from '@/features/doc-tones';
import { getDomainLabel, useDomains } from '@/features/domains';
import { CustomInstructionTemplateDialog } from '@/features/custom-instruction-templates/components/custom-instruction-template-dialog';
import { sourceLanguages, targetLanguages } from '@/features/documents/data';
import { cn } from '@/lib/utils';
import { translationTemplateSchema } from '../data';
import {
  formValuesToTemplatePayload,
  templateToFormValues,
} from '../utils/translation-template-utils';
import {
  useCreateTranslationTemplate,
  useUpdateTranslationTemplate,
} from '../hooks';
import type {
  TranslationTemplate,
  TranslationTemplateFormValues,
} from '../types';

interface TemplateFormProps {
  mode: 'create' | 'edit';
  template?: TranslationTemplate | null;
  isLoading?: boolean;
}

export function TemplateForm({ mode, template, isLoading }: TemplateFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const t = useTranslations('templates');
  const tCommon = useTranslations('common');
  const tDocuments = useTranslations('documents');
  const { domains, getDomainById } = useDomains();
  const {
    data: docTones = [],
    isLoading: isLoadingDocTones,
    isError: isDocTonesError,
    refetch: refetchDocTones,
  } = useDocTones();
  const form = useForm<TranslationTemplateFormValues>({
    resolver: zodResolver(translationTemplateSchema),
    defaultValues: templateToFormValues(template),
  });

  useEffect(() => {
    form.reset(templateToFormValues(template));
  }, [form, template]);

  const { createTemplateAsync, isCreating } = useCreateTranslationTemplate();
  const { updateTemplateAsync, isUpdating } = useUpdateTranslationTemplate();
  const isSaving = isCreating || isUpdating;
  const selectedDomainId = useWatch({
    control: form.control,
    name: 'domainId',
  });
  const selectedDomain = getDomainById(selectedDomainId);
  const isOtherDomain = selectedDomain?.key === 'other';
  const selectedDocToneId = useWatch({
    control: form.control,
    name: 'docToneId',
  });

  useEffect(() => {
    if (selectedDomainId && !selectedDomain) {
      return;
    }

    if (!isOtherDomain && form.getValues('customizedDomain')) {
      form.setValue('customizedDomain', '', { shouldDirty: true });
    }
  }, [form, isOtherDomain, selectedDomain, selectedDomainId]);

  useEffect(() => {
    if (docTones.length === 0) return;
    if (docTones.some((tone) => tone.id === selectedDocToneId)) return;

    const defaultDocTone = getDefaultDocToneValue(docTones);
    if (defaultDocTone && defaultDocTone !== selectedDocToneId) {
      form.setValue('docToneId', defaultDocTone, { shouldDirty: true });
    }
  }, [docTones, form, selectedDocToneId]);

  async function handleSubmit(values: TranslationTemplateFormValues) {
    if (isOtherDomain && !values.customizedDomain.trim()) {
      form.setError('customizedDomain', {
        message: t('form.customDomainRequired'),
      });
      return;
    }

    const normalizedValues = isOtherDomain
      ? values
      : { ...values, customizedDomain: '' };
    const payload = formValuesToTemplatePayload(normalizedValues);
    try {
      if (mode === 'create') {
        await createTemplateAsync(payload);
        toast.success(t('createSuccess'));
      } else if (template) {
        await updateTemplateAsync({ templateId: template.id, payload });
        toast.success(t('updateSuccess'));
      }
      router.push(`/${locale}/templates`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('saveError'));
    }
  }

  if (isLoading) {
    return (
      <AppCard>
        <AppCardContent
          padding="all"
          className="py-12 text-center text-sm text-muted-foreground"
        >
          {tCommon('loading')}
        </AppCardContent>
      </AppCard>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/${locale}/templates`)}
          >
            <ArrowLeft className="size-4" />
            {t('backToList')}
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
            {isSaving ? t('form.saving') : tCommon('save')}
          </Button>
        </div>

        <AppCard>
          <AppCardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form.namePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="srcLang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.sourceLanguage')}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sourceLanguages.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {tDocuments(`languages.${language.code}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tgtLang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.targetLanguage')}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {targetLanguages.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {tDocuments(`languages.${language.code}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="domainId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.domain')}</FormLabel>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {domains.map((domain) => {
                      const Icon = domain.icon;
                      const selected = field.value === domain.id;
                      return (
                        <button
                          key={domain.id}
                          type="button"
                          onClick={() => field.onChange(domain.id)}
                          className={cn(
                            'flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center transition-all',
                            selected
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border bg-card text-foreground hover:bg-muted/50',
                          )}
                        >
                          <Icon className="size-4" />
                          <span className="text-xs font-medium">
                            {getDomainLabel(domain, locale)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isOtherDomain ? (
              <FormField
                control={form.control}
                name="customizedDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.customizedDomain')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.customDomainPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="docToneId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.documentTone')}</FormLabel>
                  {isLoadingDocTones ? (
                    <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                      {tCommon('loading')}
                    </div>
                  ) : isDocTonesError ? (
                    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                      <span>{tDocuments('configure.toneLoadError')}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void refetchDocTones()}
                      >
                        {tDocuments('configure.retry')}
                      </Button>
                    </div>
                  ) : docTones.length === 0 ? (
                    <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                      {tDocuments('configure.noTones')}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {docTones.map((tone) => (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => field.onChange(tone.id)}
                          className={cn(
                            'flex min-h-20 flex-col items-start rounded-lg border p-2.5 text-left transition-all',
                            field.value === tone.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border bg-card hover:bg-muted/50',
                          )}
                        >
                          <span className="text-sm font-medium">
                            {getDocToneLabel(docTones, tone.id, locale)}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {getDocToneDescription(tone, locale)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-base font-semibold text-foreground">
              {t('fields.glossaryAndFontAndPdf')}
            </h3>
            <FormField
              control={form.control}
              name="useSystemGlossary"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4">
                  <div className="space-y-1">
                    <FormLabel className="m-0">
                      {tDocuments('configure.systemGlossaryTitle')}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="keepOriginalFontSize"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4">
                  <div className="space-y-1">
                    <FormLabel className="m-0">
                      {t('fields.keepOriginalFontSize')}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pdfTranslationFlow"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4">
                  <div className="space-y-1">
                    <FormLabel className="m-0">
                      {t('fields.preservePdfFormat')}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'format_preserved'}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked ? 'format_preserved' : 'non_format_preserved',
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customInstruction"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>{t('fields.customInstruction')}</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setTemplateDialogOpen(true)}
                    >
                      <FileText />
                      {t('fields.templateInstructionBtn')}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={t('form.customInstructionPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="globalContext"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.globalContext')}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={t('form.globalContextPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AppCardContent>
        </AppCard>
      </form>

      <CustomInstructionTemplateDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        onSelect={(instruction) => form.setValue('customInstruction', instruction)}
      />
    </Form>
  );
}
