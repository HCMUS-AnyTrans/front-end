import type { Metadata } from "next";
import { DocumentTranslatorInterface } from "./document-translator-interface";

export const metadata: Metadata = {
  title: "Document Translation",
  description: "Translate your documents with AnyTrans - support for DOCX, PDF, PPTX and more with perfect formatting preservation.",
};

export default function DocumentTranslationPage() {
  return <DocumentTranslatorInterface />;
}
