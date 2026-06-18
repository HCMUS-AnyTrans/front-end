import { z } from 'zod';

export const customInstructionTemplateSchema = z.object({
  id: z.string(),
  name: z.object({ en: z.string(), vi: z.string() }),
  description: z.object({ en: z.string(), vi: z.string() }),
  instruction: z.object({ en: z.string(), vi: z.string() }),
  displayOrder: z.number(),
  createdAt: z.string(),
});

export type CustomInstructionTemplate = z.infer<
  typeof customInstructionTemplateSchema
>;
