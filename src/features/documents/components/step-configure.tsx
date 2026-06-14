'use client';

import { AppCard, AppCardContent } from '@/components/ui/app-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LanguageSelector } from './language-selector';
import { DomainSelector } from './domain-selector';
import type { DomainOption } from './domain-selector';
import { ToneSelector } from './tone-selector';
import { PdfFlowSelector } from './pdf-flow-selector';
import { GlossarySection } from './glossary-section';
import { FontConfigurationSection } from './font-configuration-section';
import { ConfigureEstimateCard } from './configure-estimate-card';
import { ConfigureEstimateSummary } from './configure-estimate-summary';
import { ConfigureActionsPanel } from './configure-actions-panel';
import { ConfigureMobileActionBar } from './configure-mobile-action-bar';
import { useManualTerms } from '../hooks/use-manual-terms';
import { useStepConfigureState } from '../hooks/use-step-configure-state';
import { getFontConfigurationApplicable } from '../utils/document-wizard-selectors';
import { useTranslations } from 'next-intl';
import type { TranslationTemplate } from '@/features/translation-templates';
import type { DocTone } from '@/features/doc-tones';
import {
  apiLanguageToCode,
  TEMPLATE_CUSTOM_VALUE,
} from '@/features/translation-templates';
import type {
  TranslationConfig,
  LanguageCode,
  ParsedFontsByGroup,
  FontCheckItem,
  FontEnabledMap,
  PdfTranslationFlow,
} from '../types';
import type { Glossary, Term } from '@/features/glossary';
import type { CreditEstimateResponse } from '../types';

interface StepConfigureProps {
  config: TranslationConfig;
  onConfigChange: (updates: Partial<TranslationConfig>) => void;
  docTones: DocTone[];
  isLoadingDocTones: boolean;
  isDocTonesError: boolean;
  onRetryDocTones: () => void;
  translationTemplates: TranslationTemplate[];
  isLoadingTranslationTemplates: boolean;
  glossaries: Glossary[];
  selectedGlossaryTerms: Term[];
  isLoadingGlossaries: boolean;
  estimate: CreditEstimateResponse | undefined;
  isEstimating: boolean;
  estimateError: string | null;
  currentBalance?: number;
  isLoadingBalance?: boolean;
  domainOptions: DomainOption[];
  selectedDomainKey?: string | null;
  isLoadingDomains?: boolean;
  isPdfFile: boolean;
  pdfTranslationFlow: PdfTranslationFlow;
  fontsUsedByGroup: ParsedFontsByGroup;
  fontCheckItems: FontCheckItem[];
  keepOriginalFontSize: boolean;
  fontConfigEnabled: boolean;
  fontEnabledMap: FontEnabledMap;
  fontParseSupported: boolean | null;
  fontFlowUnavailable: boolean;
  fontCheckUnavailable: boolean;
  isCheckingFonts: boolean;
  onKeepOriginalFontSizeChange: (enabled: boolean) => void;
  onFontConfigEnabledChange: (enabled: boolean) => void;
  onFontEnabledChange: (fromFont: string, enabled: boolean) => void;
  onFontSelectionChange: (fromFont: string, toFont: string) => void;
  onPdfTranslationFlowChange: (flow: PdfTranslationFlow) => void;
  onBack: () => void;
  onStart: () => void;
  onStartWithoutTemplate: () => void;
  onStartWithTemplateSave: () => void;
  isLoading?: boolean;
}

export function StepConfigure({
  config,
  onConfigChange,
  docTones,
  isLoadingDocTones,
  isDocTonesError,
  onRetryDocTones,
  translationTemplates,
  isLoadingTranslationTemplates,
  glossaries,
  selectedGlossaryTerms,
  isLoadingGlossaries,
  estimate,
  isEstimating,
  estimateError,
  currentBalance,
  isLoadingBalance,
  domainOptions,
  selectedDomainKey,
  isLoadingDomains,
  isPdfFile,
  pdfTranslationFlow,
  fontsUsedByGroup,
  fontCheckItems,
  keepOriginalFontSize,
  fontConfigEnabled,
  fontEnabledMap,
  fontParseSupported,
  fontFlowUnavailable,
  fontCheckUnavailable,
  isCheckingFonts,
  onKeepOriginalFontSizeChange,
  onFontConfigEnabledChange,
  onFontEnabledChange,
  onFontSelectionChange,
  onPdfTranslationFlowChange,
  onBack,
  onStart,
  onStartWithoutTemplate,
  onStartWithTemplateSave,
  isLoading,
}: StepConfigureProps) {
  const t = useTranslations('documents.configure');
  const tTemplates = useTranslations('templates');
  const isUnknownSelectedDomain =
    Boolean(config.domainId) && !isLoadingDomains && !selectedDomainKey;
  const isFontConfigurationApplicable = getFontConfigurationApplicable({
    fileMime: isPdfFile ? 'application/pdf' : null,
    pdfTranslationFlow,
  });
  const { isInsufficientCredits, missingCredits, isStartDisabled } =
    useStepConfigureState({
      srcLang: config.srcLang,
      tgtLang: config.tgtLang,
      domainId: config.domainId,
      selectedDomainKey,
      customDomain: config.customDomain,
      estimate,
      isEstimating,
      currentBalance,
      fontsUsedByGroup,
      fontParseSupported,
      isCheckingFonts,
      isFontConfigurationApplicable,
      isLoading,
    });
  const { addManualTerm, updateManualTerm, removeManualTerm } = useManualTerms({
    manualTerms: config.manualTerms,
    onConfigChange,
  });
  const handleSourceLanguageChange = (lang: LanguageCode) =>
    onConfigChange({ srcLang: lang });
  const handleTargetLanguageChange = (lang: LanguageCode) =>
    onConfigChange({ tgtLang: lang });
  const handleDomainChange = (domainId: string) => onConfigChange({ domainId });
  const handleCustomDomainChange = (customDomain: string) =>
    onConfigChange({ customDomain });
  const handleToneChange = (tone: string) => onConfigChange({ tone });
  const handleCustomInstructionChange = (customInstruction: string) =>
    onConfigChange({ customInstruction });
  const handleGlobalContextChange = (globalContext: string) =>
    onConfigChange({ globalContext });
  const handleSaveAsTemplateChange = (saveAsTemplate: boolean) =>
    onConfigChange({ saveAsTemplate });
  const handleTemplateNameChange = (templateName: string) =>
    onConfigChange({ templateName });
  const handleTemplateSelect = (value: string) => {
    if (value === TEMPLATE_CUSTOM_VALUE) {
      onConfigChange({
        templateId: null,
        saveAsTemplate: false,
        templateName: '',
      });
      return;
    }

    const template = translationTemplates.find((item) => item.id === value);
    if (!template) return;

    onConfigChange({
      templateId: template.id,
      srcLang: apiLanguageToCode(template.srcLang) ?? config.srcLang,
      tgtLang: apiLanguageToCode(template.tgtLang) ?? config.tgtLang,
      domainId: template.domainId,
      customDomain: template.customizedDomain ?? '',
      tone: template.docToneId,
      pdfTranslationFlow: template.pdfTranslationFlow,
      keepOriginalFontSize: template.keepOriginalFontSize ?? true,
      useSystemGlossary: template.useSystemGlossary ?? true,
      customInstruction: template.customInstruction ?? '',
      globalContext: template.globalContext ?? '',
      saveAsTemplate: false,
      templateName: '',
    });
  };
  const handleGlossarySelect = (id: string | null) =>
    onConfigChange({ selectedGlossaryId: id, glossaryInputMode: 'saved' });
  const handleGlossaryInputModeChange = (
    mode: TranslationConfig['glossaryInputMode'],
  ) => {
    if (mode === 'manual') {
      onConfigChange({ glossaryInputMode: mode, selectedGlossaryId: null });
      return;
    }

    if (mode === 'none') {
      onConfigChange({ glossaryInputMode: mode });
      return;
    }

    onConfigChange({ glossaryInputMode: mode });
  };
  const handleConfirmSavedGlossaryMode = () =>
    onConfigChange({ glossaryInputMode: 'saved', manualTerms: [] });
  const handleUseSystemGlossaryChange = (enabled: boolean) =>
    onConfigChange({ useSystemGlossary: enabled });

  const isStartBlocked =
    isStartDisabled || isLoadingDomains || isUnknownSelectedDomain;
  const selectedTemplate = config.templateId
    ? translationTemplates.find((template) => template.id === config.templateId)
    : null;
  const hasTemplateChanges = Boolean(
    selectedTemplate &&
      (apiLanguageToCode(selectedTemplate.srcLang) !== config.srcLang ||
        apiLanguageToCode(selectedTemplate.tgtLang) !== config.tgtLang ||
        selectedTemplate.domainId !== config.domainId ||
        (selectedTemplate.customizedDomain ?? '') !== config.customDomain ||
        selectedTemplate.docToneId !== config.tone ||
        selectedTemplate.pdfTranslationFlow !== config.pdfTranslationFlow ||
        (selectedTemplate.keepOriginalFontSize ?? true) !==
          config.keepOriginalFontSize ||
        (selectedTemplate.useSystemGlossary ?? true) !== config.useSystemGlossary ||
        (selectedTemplate.customInstruction ?? '') !== config.customInstruction ||
        (selectedTemplate.globalContext ?? '') !== config.globalContext),
  );
  const templateSelectValue = hasTemplateChanges
    ? TEMPLATE_CUSTOM_VALUE
    : config.templateId ?? TEMPLATE_CUSTOM_VALUE;
  const isCustomTemplateState = !config.templateId || hasTemplateChanges;
  const handleStartClick = () => {
    if (isCustomTemplateState) {
      if (config.saveAsTemplate) {
        onStartWithTemplateSave();
        return;
      }

      onStartWithoutTemplate();
      return;
    }

    onStart();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5 pb-24 xl:pb-0">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left: config sections */}
        <div className="space-y-4">
          <AppCard>
            <AppCardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>{t('templateLabel')}</Label>
                <Select
                  value={templateSelectValue}
                  onValueChange={handleTemplateSelect}
                  disabled={isLoadingTranslationTemplates}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('templatePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TEMPLATE_CUSTOM_VALUE}>
                      {t('customTemplate')}
                    </SelectItem>
                    {config.templateId && !selectedTemplate ? (
                      <SelectItem value={config.templateId}>
                        {config.templateName || t('savedCustomTemplate')}
                      </SelectItem>
                    ) : null}
                    {translationTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isCustomTemplateState ? (
                  <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {t('saveAsTemplate')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('customTemplateHint')}
                        </p>
                      </div>
                      <Switch
                        checked={config.saveAsTemplate}
                        onCheckedChange={handleSaveAsTemplateChange}
                      />
                    </div>
                    {config.saveAsTemplate ? (
                      <div className="space-y-2">
                        <Label htmlFor="template-name">
                          {tTemplates('fields.name')}
                        </Label>
                        <Input
                          id="template-name"
                          value={config.templateName}
                          onChange={(event) =>
                            handleTemplateNameChange(event.target.value)
                          }
                          placeholder={tTemplates('form.namePlaceholder')}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </AppCardContent>
          </AppCard>

          <LanguageSelector
            srcLang={config.srcLang}
            tgtLang={config.tgtLang}
            onSrcLangChange={handleSourceLanguageChange}
            onTgtLangChange={handleTargetLanguageChange}
          />

          <AppCard>
            <AppCardContent className="space-y-6 pt-6">
              <DomainSelector
                domains={domainOptions}
                value={config.domainId}
                selectedDomainKey={selectedDomainKey}
                customValue={config.customDomain}
                isLoading={isLoadingDomains}
                onChange={handleDomainChange}
                onCustomValueChange={handleCustomDomainChange}
              />
              <ToneSelector
                tones={docTones}
                value={config.tone}
                isLoading={isLoadingDocTones}
                isError={isDocTonesError}
                onRetry={onRetryDocTones}
                onChange={handleToneChange}
              />
              {isPdfFile ? (
                <PdfFlowSelector
                  value={pdfTranslationFlow}
                  onChange={onPdfTranslationFlowChange}
                />
              ) : null}
            </AppCardContent>
          </AppCard>

          <AppCard>
            <AppCardContent className="space-y-5 pt-6">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {t('customRulesTitle')}
                </h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-instruction">
                  {t('customInstructionLabel')}
                </Label>
                <Textarea
                  id="custom-instruction"
                  rows={6}
                  value={config.customInstruction}
                  onChange={(event) =>
                    handleCustomInstructionChange(event.target.value)
                  }
                  placeholder={t('customInstructionPlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="global-context">{t('globalContextLabel')}</Label>
                <Textarea
                  id="global-context"
                  rows={6}
                  value={config.globalContext}
                  onChange={(event) => handleGlobalContextChange(event.target.value)}
                  placeholder={t('globalContextPlaceholder')}
                />
              </div>
            </AppCardContent>
          </AppCard>

          {isFontConfigurationApplicable ? (
            <FontConfigurationSection
              fontsUsedByGroup={fontsUsedByGroup}
              tgtLang={config.tgtLang}
              fontCheckItems={fontCheckItems}
              keepOriginalFontSize={keepOriginalFontSize}
              fontConfigEnabled={fontConfigEnabled}
              fontEnabledMap={fontEnabledMap}
              fontSelections={config.fontSelections}
              fontParseSupported={fontParseSupported}
              fontFlowUnavailable={fontFlowUnavailable}
              fontCheckUnavailable={fontCheckUnavailable}
              isCheckingFonts={isCheckingFonts}
              onKeepOriginalFontSizeChange={onKeepOriginalFontSizeChange}
              onConfigEnabledChange={onFontConfigEnabledChange}
              onFontEnabledChange={onFontEnabledChange}
              onSelectionChange={onFontSelectionChange}
            />
          ) : null}

          <GlossarySection
            glossaries={glossaries}
            selectedDomainKey={selectedDomainKey}
            glossaryInputMode={config.glossaryInputMode}
            selectedGlossaryId={config.selectedGlossaryId}
            selectedGlossaryTermCount={selectedGlossaryTerms.length}
            isLoadingGlossaries={isLoadingGlossaries}
            onSelectGlossary={handleGlossarySelect}
            onGlossaryInputModeChange={handleGlossaryInputModeChange}
            onConfirmSavedGlossaryMode={handleConfirmSavedGlossaryMode}
            useSystemGlossary={config.useSystemGlossary}
            onUseSystemGlossaryChange={handleUseSystemGlossaryChange}
            manualTerms={config.manualTerms}
            onAddManualTerm={addManualTerm}
            onUpdateManualTerm={updateManualTerm}
            onRemoveManualTerm={removeManualTerm}
          />
        </div>

        {/* Right: estimate + actions (sticky on xl, shown inline below config on mobile) */}
        <div className="hidden space-y-4 xl:block xl:sticky xl:top-4 xl:self-start">
          <ConfigureEstimateCard
            isEstimating={isEstimating}
            estimate={estimate}
            estimateError={estimateError}
            isInsufficientCredits={isInsufficientCredits}
            missingCredits={missingCredits}
            currentBalance={currentBalance}
            isLoadingBalance={isLoadingBalance}
          />
          <ConfigureActionsPanel
            onBack={onBack}
            onStart={handleStartClick}
            isLoading={isLoading}
            isStartDisabled={isStartBlocked}
            isInsufficientCredits={isInsufficientCredits}
          />
        </div>
      </div>

      {/* ── Mobile/tablet: estimate summary inline ── */}
      {!isEstimating && estimate && (
        <ConfigureEstimateSummary
          estimate={estimate}
          isInsufficientCredits={isInsufficientCredits}
          missingCredits={missingCredits}
        />
      )}

      {/* ── Mobile sticky action bar ── */}
      <ConfigureMobileActionBar
        onBack={onBack}
        onStart={handleStartClick}
        isLoading={isLoading}
        isStartDisabled={isStartBlocked}
        isInsufficientCredits={isInsufficientCredits}
      />
    </div>
  );
}
