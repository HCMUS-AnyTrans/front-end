import { z } from 'zod';

export const translationTemplateSchema = z.object({
  name: z.string().trim().min(1, 'Template name is required').max(200),
  srcLang: z.string().min(1),
  tgtLang: z.string().min(1),
  domainId: z.string().min(1),
  customizedDomain: z.string().max(100),
  docTone: z.string().min(1),
  pdfTranslationFlow: z.enum(['format_preserved', 'non_format_preserved']),
  keepOriginalFontSize: z.boolean(),
  customInstruction: z.string(),
  globalContext: z.string(),
});
