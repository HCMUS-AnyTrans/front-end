import type { Metadata } from 'next';
import TranslationHistoryInterface from './translation-history-interface';

export const metadata: Metadata = {
  title: 'Translation History - AnyTrans',
  description:
    'View and manage your translation history with AnyTrans - track all your translated documents and projects.',
};

export default function TranslationHistoryPage() {
  return <TranslationHistoryInterface />;
}
