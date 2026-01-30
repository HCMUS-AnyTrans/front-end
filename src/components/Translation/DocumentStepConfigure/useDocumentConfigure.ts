'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface TopicOption {
  value: string;
  label: string;
  icon: string;
}

interface UseDocumentConfigureReturn {
  topic: string;
  setTopic: (topic: string) => void;
  glossaryMode: 'upload' | 'paste';
  setGlossaryMode: (mode: 'upload' | 'paste') => void;
  glossaryFile: File | null;
  setGlossaryFile: (file: File | null) => void;
  glossaryText: string;
  setGlossaryText: (text: string) => void;
  topics: TopicOption[];
  activeTopicLabel: string;
}

export function useDocumentConfigure(): UseDocumentConfigureReturn {
  const [topic, setTopic] = useState('auto-detect');
  const [glossaryMode, setGlossaryMode] = useState<'upload' | 'paste'>(
    'upload'
  );
  const [glossaryFile, setGlossaryFile] = useState<File | null>(null);
  const [glossaryText, setGlossaryText] = useState('');

  const t = useTranslations('documentTranslation.configure');

  const topics: TopicOption[] = useMemo(
    () => [
      {
        value: 'auto-detect',
        label: t('topic.domains.autoDetect'),
        icon: '🤖',
      },
      {
        value: 'information-technology',
        label: t('topic.domains.informationTechnology'),
        icon: '💻',
      },
      { value: 'medical', label: t('topic.domains.medical'), icon: '⚕️' },
      { value: 'marketing', label: t('topic.domains.marketing'), icon: '📢' },
      { value: 'legal', label: t('topic.domains.legal'), icon: '⚖️' },
      { value: 'education', label: t('topic.domains.education'), icon: '🎓' },
      { value: 'finance', label: t('topic.domains.finance'), icon: '💰' },
      {
        value: 'engineering',
        label: t('topic.domains.engineering'),
        icon: '⚙️',
      },
      { value: 'science', label: t('topic.domains.science'), icon: '🔬' },
    ],
    [t]
  );

  const activeTopicLabel =
    topics.find((item) => item.value === topic)?.label || '';

  return {
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
  };
}
