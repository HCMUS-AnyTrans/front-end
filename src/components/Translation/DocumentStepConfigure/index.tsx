'use client';

import { useTranslations } from 'next-intl';
import { TranslationSettingsCard, ConfigureActionButtons } from '../shared';
import { DocumentInfoCard } from './DocumentInfoCard';
import { TopicSelector } from './TopicSelector';
import { GlossarySection } from './GlossarySection';
import { ConfigurationSummary } from './ConfigurationSummary';
import { useDocumentConfigure } from './useDocumentConfigure';

type StepConfigureProps = {
  fileName: string;
  sourceLanguage: string;
  targetLanguage: string;
  translationProcess: string;
  onChangeSource: (value: string) => void;
  onChangeTarget: (value: string) => void;
  onChangeProcess: (value: string) => void;
  onBack: () => void;
  onTranslate: () => void;
  isTranslating: boolean;
};

export default function StepConfigure({
  fileName,
  sourceLanguage,
  targetLanguage,
  translationProcess,
  onChangeSource,
  onChangeTarget,
  onChangeProcess,
  onBack,
  onTranslate,
  isTranslating,
}: StepConfigureProps) {
  const t = useTranslations('documentTranslation.configure');
  const {
    topic,
    setTopic,
    glossaryMode,
    setGlossaryMode,
    glossaryFile,
    setGlossaryFile,
    glossaryText,
    setGlossaryText,
    topics,
    activeTopicLabel,
  } = useDocumentConfigure();

  return (
    <div className="space-y-6">
      <DocumentInfoCard fileName={fileName} onBack={onBack} />

      <TranslationSettingsCard
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        translationMode={translationProcess}
        onChangeSource={onChangeSource}
        onChangeTarget={onChangeTarget}
        onChangeMode={onChangeProcess}
        sourceLanguageOptions={[
          'English',
          'Spanish',
          'French',
          'German',
          'Japanese',
          'Chinese',
          'Korean',
          'Vietnamese',
        ]}
        targetLanguageOptions={[
          'Vietnamese',
          'Chinese',
          'Korean',
          'Thai',
          'Indonesian',
          'Japanese',
          'English',
        ]}
        showNote={true}
        noteText={t('translationSettings.note')}
        texts={{
          title: t('translationSettings.title'),
          sourceLanguageLabel: t('translationSettings.sourceLanguage'),
          targetLanguageLabel: t('translationSettings.targetLanguage'),
          translationModeLabel: t('translationSettings.translationMode'),
          sourceLanguagePlaceholder: t(
            'translationSettings.selectSourceLanguage'
          ),
          targetLanguagePlaceholder: t(
            'translationSettings.selectTargetLanguage'
          ),
          translationModePlaceholder: t(
            'translationSettings.selectTranslationMode'
          ),
          modeLabels: {
            contextAware: t('translationSettings.modes.contextAware'),
            literal: t('translationSettings.modes.literal'),
            creative: t('translationSettings.modes.creative'),
            formal: t('translationSettings.modes.formal'),
          },
        }}
      />

      <TopicSelector topic={topic} onChange={setTopic} topics={topics} />

      <GlossarySection
        glossaryMode={glossaryMode}
        onModeChange={setGlossaryMode}
        glossaryFile={glossaryFile}
        onFileChange={setGlossaryFile}
        glossaryText={glossaryText}
        onTextChange={setGlossaryText}
      />

      <ConfigurationSummary
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        translationProcess={translationProcess}
        topicLabel={activeTopicLabel}
        hasGlossary={!!glossaryFile || !!glossaryText}
      />

      <ConfigureActionButtons
        onBack={onBack}
        onTranslate={onTranslate}
        isProcessing={isTranslating}
        disabled={false}
        backButtonText={t('actions.back')}
        translateButtonText={t('actions.startTranslation')}
        processingText={t('actions.translating')}
      />
    </div>
  );
}
