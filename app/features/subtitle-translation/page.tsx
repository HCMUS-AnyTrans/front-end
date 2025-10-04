import type { Metadata } from 'next';
import { SubtitleTranslationInterface } from './subtitle-translation-interface';

export const metadata: Metadata = {
  title: 'Subtitle Translation - AnyTrans',
  description:
    'Translate video subtitles with AnyTrans - AI-powered context-aware translation for movies, TV shows, and video content with perfect timing synchronization.',
};

export default function SubtitleTranslationPage() {
  return <SubtitleTranslationInterface />;
}
